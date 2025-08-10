#!/bin/bash
echo "Starting Vercel build process..."

# Install dependencies
npm ci

# Build the project
npm run build

# Verify build output
if [ -d "dist" ]; then
    echo "✅ Build completed successfully!"
    echo "📦 Build output:"
    ls -la dist/
else
    echo "❌ Build failed - dist directory not found"
    exit 1
fi
