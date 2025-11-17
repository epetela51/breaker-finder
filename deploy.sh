#!/bin/bash

# Deployment script for breaker-finder to Raspberry Pi
set -e  # Exit on any error

echo "Building the application..."
npm run build

if [ ! -d "dist" ]; then
    echo "Error: dist directory not found after build"
    exit 1
fi

# Configuration
PI_USER="ericpetela"
PI_HOST="192.168.4.195"
TEMP_DIR="/tmp/react-app"
WEB_DIR="/var/www/breaker-finder"

echo "Copying files to Raspberry Pi..."
scp -r dist/* ${PI_USER}@${PI_HOST}:${TEMP_DIR}

echo "Deploying to web directory..."
ssh ${PI_USER}@${PI_HOST} "sudo rm -rf ${WEB_DIR}/* && sudo mv ${TEMP_DIR}/* ${WEB_DIR}/ && sudo chown -R www-data:www-data ${WEB_DIR}"

echo "Deployment complete!"

