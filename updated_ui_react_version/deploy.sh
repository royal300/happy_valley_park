#!/bin/bash

# Configuration
VPS_USER="root"
VPS_IP="93.127.206.52"
REMOTE_ROOT="/var/www/happyvalley_frontend" # NEW isolated directory
PROJECT_SUBDIR="updated_ui_react_version"

echo "🚀 Starting deployment to $VPS_USER@$VPS_IP..."

ssh $VPS_USER@$VPS_IP << EOF
    set -e # Stop script on error

    echo "📂 Navigating to repository root..."
    cd $REMOTE_ROOT

    echo "⬇️  Pulling latest changes from Git..."
    git pull origin main

    echo "📂 Entering project subdirectory..."
    cd $PROJECT_SUBDIR

    echo "📦 Installing dependencies..."
    npm install

    echo "🏗️  Building the project..."
    npm run build

    echo "🔄 Reloading Nginx..."
    systemctl reload nginx

    echo "✅ Deployment complete!"
EOF
