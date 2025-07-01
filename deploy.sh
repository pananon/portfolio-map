#!/bin/bash

# Harimangal Pandey Portfolio - Deployment Script

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed. dist folder not found."
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""
echo "📁 Build files are ready in the 'dist' folder"
echo ""
echo "🌐 Deployment Options:"
echo "1. Netlify: Drag and drop the 'dist' folder to netlify.com"
echo "2. Vercel: Run 'vercel' command"
echo "3. GitHub Pages: Run 'npm run deploy'"
echo ""
echo "🎉 Ready for deployment!" 