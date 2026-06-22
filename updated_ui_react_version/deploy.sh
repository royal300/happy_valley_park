#!/bin/bash

# Configuration
VPS_USER="${DEPLOY_USER}"
VPS_IP="${DEPLOY_HOST}"

# DB Credentials injected from env
DB_USER="${DEPLOY_DB_USER}"
DB_PASS="${DEPLOY_DB_PASS}"
DB_NAME="${DEPLOY_DB_NAME}"
DB_HOST="${DEPLOY_DB_HOST}"
REMOTE_ROOT="/var/www/happyvalley_frontend"
PROJECT_SUBDIR="updated_ui_react_version"

echo "🚀 Starting deployment to $VPS_USER@$VPS_IP..."

ssh $VPS_USER@$VPS_IP "DB_USER='${DB_USER}' DB_PASS='${DB_PASS}' DB_NAME='${DB_NAME}' DB_HOST='${DB_HOST}' bash -s" << 'EOF'
    set -e # Stop script on error

    REMOTE_ROOT="/var/www/happyvalley_frontend"
    PROJECT_SUBDIR="updated_ui_react_version"
    DIST_DIR="$REMOTE_ROOT/$PROJECT_SUBDIR/dist"
    BACKEND_DIR="$DIST_DIR/backend/api"
    UPLOADS_DIR="$BACKEND_DIR/uploads"

    # ---- DB Credentials ----
    # Inherited from ssh wrapper environment variables

    echo "📂 Navigating to repository root..."
    cd $REMOTE_ROOT

    echo "⬇️  Fetching and Resetting to Git main..."
    git fetch origin main
    git reset --hard origin/main

    echo "📂 Entering project subdirectory..."
    cd $PROJECT_SUBDIR

    # ---- Ensure persistent uploads directory exists ----
    PERSISTENT_UPLOADS="$REMOTE_ROOT/persistent_uploads"
    echo "📁 Ensuring persistent uploads directory exists at $PERSISTENT_UPLOADS..."
    mkdir -p $PERSISTENT_UPLOADS/hero
    mkdir -p $PERSISTENT_UPLOADS/attractions
    mkdir -p $PERSISTENT_UPLOADS/offers

    # ---- Preserve existing uploads before build ----
    echo "💾 Checking for existing uploads to migrate..."
    if [ -d "$UPLOADS_DIR" ] && [ ! -L "$UPLOADS_DIR" ]; then
        echo "   🔄 Migrating old uploads to persistent storage..."
        cp -rn $UPLOADS_DIR/* $PERSISTENT_UPLOADS/ 2>/dev/null || true
    fi
    
    # Check if there's a nested backup from a previous bad deploy that we need to recover
    if [ -d "$UPLOADS_DIR/hvp_uploads_backup" ]; then
        echo "   🔄 Recovering nested uploads from previous deploy..."
        cp -rn $UPLOADS_DIR/hvp_uploads_backup/* $PERSISTENT_UPLOADS/ 2>/dev/null || true
    fi

    echo "📦 Installing dependencies..."
    npm install

    echo "⚙️  Ensuring FFmpeg is installed for video compression..."
    if ! command -v ffmpeg &> /dev/null; then
        echo "   ℹ️ FFmpeg not found, installing..."
        apt-get update
        apt-get install -y ffmpeg
    else
        echo "   ✅ FFmpeg is already installed."
    fi

    echo "🏗️  Building the project..."
    npm run build

    # ---- Link persistent uploads after build ----
    echo "📁 Ensuring backend API directory exists..."
    mkdir -p $BACKEND_DIR

    echo "🔗 Linking persistent uploads to dist..."
    # Remove the empty/default uploads dir created by the build
    rm -rf $UPLOADS_DIR
    # Create symlink
    ln -s $PERSISTENT_UPLOADS $UPLOADS_DIR
    echo "   ✅ Uploads linked successfully"

    # ---- Inject DB credentials into db.php (overrides git version) ----
    echo "🔑 Injecting DB credentials into backend..."
    DB_PHP_FILE="$BACKEND_DIR/db.php"
    cat > $DB_PHP_FILE << DBEOF
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

if (\$_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

\$host = '${DB_HOST}';
\$port = '3306';
\$db   = '${DB_NAME}';
\$user = '${DB_USER}';
\$pass = '${DB_PASS}';

\$charset = 'utf8mb4';

\$dsn = "mysql:host=\$host;dbname=\$db;charset=\$charset;port=\$port";
\$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    \$pdo = new PDO(\$dsn, \$user, \$pass, \$options);
} catch (\PDOException \$e) {
    \$pdo = null;
    error_log("Database connection failed: " . \$e->getMessage());
}
?>
DBEOF
    echo "   ✅ db.php credentials injected."

    # ---- Verify DB connection ----
    echo "🔍 Verifying MySQL DB connection..."
    if mysql -u"$DB_USER" -p"$DB_PASS" -e "USE $DB_NAME;" 2>/dev/null; then
        echo "   ✅ DB connection successful — $DB_NAME is accessible."
    else
        echo "   ⚠️  WARNING: Could not connect to DB '$DB_NAME' with provided credentials."
        echo "   Check that the MySQL user '$DB_USER' has access to '$DB_NAME'."
    fi

    # ---- Set permissions ----
    echo "🔐 Setting file permissions..."
    chown -R www-data:www-data $DIST_DIR/backend
    chmod -R 755 $UPLOADS_DIR

    echo "🔄 Reloading Nginx..."
    systemctl reload nginx

    echo "✅ Deployment complete!"
    echo "   📌 Backend API: /backend/api/"
    echo "   📂 Uploads: $UPLOADS_DIR"
    echo "   🗄️  DB: $DB_NAME @ $DB_HOST (user: $DB_USER)"
EOF
