#!/bin/bash

# Configuration
VPS_USER="root"
VPS_IP="187.77.184.151"
REMOTE_ROOT="/var/www/happyvalley_frontend"
PROJECT_SUBDIR="updated_ui_react_version"

echo "🚀 Starting deployment to $VPS_USER@$VPS_IP..."

ssh $VPS_USER@$VPS_IP << 'EOF'
    set -e # Stop script on error

    REMOTE_ROOT="/var/www/happyvalley_frontend"
    PROJECT_SUBDIR="updated_ui_react_version"
    DIST_DIR="$REMOTE_ROOT/$PROJECT_SUBDIR/dist"
    BACKEND_DIR="$DIST_DIR/backend/api"
    UPLOADS_DIR="$BACKEND_DIR/uploads"

    # ---- DB Credentials ----
    DB_USER="root"
    DB_PASS='x1lZmHdSaW2DbdTdY/YGUPATwI8K'
    DB_NAME="happyvalley_frontend"
    DB_HOST="localhost"

    echo "📂 Navigating to repository root..."
    cd $REMOTE_ROOT

    echo "⬇️  Fetching and Resetting to Git main..."
    git fetch origin main
    git reset --hard origin/main

    echo "📂 Entering project subdirectory..."
    cd $PROJECT_SUBDIR

    # ---- Preserve existing uploads before build ----
    echo "💾 Backing up existing uploads..."
    BACKUP_DIR="/tmp/hvp_uploads_backup"
    if [ -d "$UPLOADS_DIR" ]; then
        rm -rf $BACKUP_DIR
        cp -r $UPLOADS_DIR $BACKUP_DIR
        echo "   ✅ Uploads backed up to $BACKUP_DIR"
    else
        echo "   ℹ️  No existing uploads to backup"
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

    # ---- Restore uploads after build ----
    echo "📁 Ensuring backend API directory exists..."
    mkdir -p $BACKEND_DIR

    if [ -d "$BACKUP_DIR" ]; then
        echo "🔄 Restoring uploads..."
        cp -r $BACKUP_DIR $UPLOADS_DIR
        echo "   ✅ Uploads restored"
        rm -rf $BACKUP_DIR
    fi

    # ---- Ensure upload directories exist ----
    mkdir -p $UPLOADS_DIR/hero
    mkdir -p $UPLOADS_DIR/attractions
    mkdir -p $UPLOADS_DIR/offers

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
