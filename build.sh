#!/bin/bash

# Build script for creating distributable packages

echo "🏗️  Building baseline-check for distribution..."

# Create distribution directory
mkdir -p dist

echo "📦 Packaging CLI tool..."
cd cli
npm pack
mv *.tgz ../dist/
cd ..

echo "🌐 Building website..."
cd site
npm run build
cd ..

echo "📋 Creating release bundle..."
# Create a complete package for GitHub releases
tar -czf dist/baseline-check-complete.tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=dist \
  --exclude=.git \
  .

echo "✅ Build complete!"
echo "📦 CLI package: dist/baseline-check-1.0.0.tgz"
echo "🌐 Website build: site/.next/"
echo "📋 Complete bundle: dist/baseline-check-complete.tar.gz"

echo ""
echo "🚀 To publish to npm:"
echo "  cd cli && npm publish"
echo ""
echo "🌐 To deploy website:"
echo "  cd site && npm run build && npm run start"