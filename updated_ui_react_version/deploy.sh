#!/bin/bash

# Configuration
VPS_USER="root"
VPS_IP="93.127.206.52"
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

    echo "📂 Navigating to repository root..."
    cd $REMOTE_ROOT

    echo "⬇️  Pulling latest changes from Git..."
    git pull origin main

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

    # ---- Set permissions ----
    echo "🔐 Setting file permissions..."
    chown -R www-data:www-data $DIST_DIR/backend
    chmod -R 755 $UPLOADS_DIR

    echo "🔄 Reloading Nginx..."
    systemctl reload nginx

    echo "✅ Deployment complete!"
    echo "   📌 Backend API: /backend/api/"
    echo "   📂 Uploads: $UPLOADS_DIR"
EOF
