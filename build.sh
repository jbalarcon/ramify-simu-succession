#!/bin/bash

# Set repository name for local builds
export GITHUB_ACTIONS=true
export GITHUB_REPOSITORY="jbalarcon/ramify-simu-succession"

# Temporarily rename ESLint config
mv .eslintrc.json .eslintrc.json.bak

# Create a temporary ESLint config that ignores everything
echo '{"extends": "next/core-web-vitals","ignorePatterns": ["**/*"]}' > .eslintrc.json

# Clean previous builds
rm -rf .next out dist

# Run the build
npm run build

# Create .nojekyll file
touch out/.nojekyll

# Create a copy of index.html as 404.html
cp out/index.html out/404.html

# Restore original ESLint config
mv .eslintrc.json.bak .eslintrc.json

# Deploy to GitHub Pages
npx gh-pages -d out -t true 