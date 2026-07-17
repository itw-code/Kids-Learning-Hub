#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "=================================================="
echo "🚀 Starting Kids Learning Hub PWA Build Pipeline"
echo "=================================================="

# 1. Compile React coloring book app
echo "📦 Building React Coloring Book App..."
cd apps/coloring
npm install
npm run build
cd ../..

# 2. Package all static applications into /dist folder
echo "📂 Packaging all static apps into output /dist folder..."
rm -rf dist
mkdir -p dist/apps

# Copy PWA landing page and shared logic
cp index.html dist/
cp index.css dist/
cp manifest.json dist/
cp sw.js dist/
cp hub-nav.js dist/
cp hub-nav.css dist/

# Copy shared assets
if [ -d "assets" ]; then
  cp -r assets dist/
fi

# Copy baseline sub-apps
echo "📁 Copying Alphabet game..."
cp -r apps/alphabet dist/apps/

echo "📁 Copying Numbers game..."
cp -r apps/numbers dist/apps/

echo "📁 Copying Spelling game..."
cp -r apps/spelling dist/apps/

echo "📁 Copying Shapes game..."
cp -r apps/shapes dist/apps/

echo "📁 Copying Puzzles game..."
cp -r apps/puzzles dist/apps/

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
