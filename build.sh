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

# Copy legacy baseline sub-apps (DEPRECATED: Alphabet is now native React in the root app)
echo "📁 Copying Numbers game..."
cp -r apps/numbers dist/apps/

echo "📁 Copying Spelling game..."
cp -r apps/spelling dist/apps/

echo "📁 Copying Shapes game..."
cp -r apps/shapes dist/apps/

echo "📁 Copying global Helper-Scripts..."
cp -r apps/Helper-Scripts dist/apps/

echo "📁 Copying global images..."
cp -r apps/images dist/apps/

echo "📁 Copying global music..."
cp -r apps/music dist/apps/

# Overwrite coloring app folder with its compiled build output
echo "📁 Packaging compiled React Coloring Book..."
rm -rf dist/apps/coloring
cp -r apps/coloring/dist dist/apps/coloring

echo "=================================================="
echo "✅ Build pipeline finished successfully!"
echo "📂 Output ready for Cloudflare Pages inside /dist"
echo "=================================================="
