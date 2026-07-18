#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "=================================================="
echo "🚀 Starting Kids Learning Hub PWA Build Pipeline"
echo "=================================================="

# 1. Compile legacy React coloring book app
echo "📦 Building Legacy React Coloring Book App..."
cd apps/coloring
npm install
npm run build
cd ../..

# Copy compiled React coloring book to public folder so Vite PWA scans and precaches its assets
rm -rf public/apps/coloring
mkdir -p public/apps/coloring
cp -r apps/coloring/dist/* public/apps/coloring/

# 2. Compile new unified React/TypeScript portal
echo "📦 Building New Unified React/TypeScript Portal..."
npm install
npm run build

# 3. Package remaining static applications and assets into /dist folder
echo "📂 Packaging all legacy assets into output /dist folder..."

# Ensure target folders exist
mkdir -p dist/apps

# Copy PWA landing page metadata and shared logic to dist
cp manifest.json dist/
cp hub-nav.js dist/
cp hub-nav.css dist/

# Copy shared assets
if [ -d "assets" ]; then
  cp -r assets dist/
fi

# Legacy baseline sub-apps (Alphabet, Numbers, Spelling, Shapes) are now native React/TS games inside the root app and no longer copied.

echo "📁 Copying global Helper-Scripts..."
cp -r apps/Helper-Scripts dist/apps/

echo "📁 Copying global images..."
cp -r apps/images dist/apps/

echo "📁 Copying global music..."
cp -r apps/music dist/apps/

# Overwrite coloring app folder with its compiled build output
# React coloring book packaging is handled automatically via the public folder.

echo "=================================================="
echo "✅ Build pipeline finished successfully!"
echo "📂 Output ready for Cloudflare Pages inside /dist"
echo "=================================================="
