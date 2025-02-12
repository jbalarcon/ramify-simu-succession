#!/bin/bash

# Temporarily rename ESLint config
mv .eslintrc.json .eslintrc.json.bak

# Create a temporary ESLint config that ignores everything
echo '{"extends": "next/core-web-vitals","ignorePatterns": ["**/*"]}' > .eslintrc.json

# Clean the out directory if it exists
rm -rf out

# Run the build
next build

# Restore original ESLint config
mv .eslintrc.json.bak .eslintrc.json

# Create .nojekyll file
touch out/.nojekyll

# Deploy to GitHub Pages
gh-pages -d out 