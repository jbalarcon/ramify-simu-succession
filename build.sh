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
cp out/index.html out/404.html

# Deploy to GitHub Pages
npx gh-pages -d out 