#!/bin/bash

# Set repository name for local builds
export GITHUB_ACTIONS=true
export GITHUB_REPOSITORY="jbalarcon/ramify-simu-succession"

# Clean previous builds
rm -rf .next out

# Run the build
npm run build

# Create necessary files for GitHub Pages
touch out/.nojekyll
cp out/404.html out/index.html

# Ensure all assets have correct paths
find out -type f -name "*.html" -exec sed -i 's|href="/|href="/ramify-simu-succession/|g' {} +
find out -type f -name "*.html" -exec sed -i 's|src="/|src="/ramify-simu-succession/|g' {} +

# Deploy to GitHub Pages
npx gh-pages -d out -t true 