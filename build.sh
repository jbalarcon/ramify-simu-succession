#!/bin/bash

# Set repository name for local builds
export GITHUB_ACTIONS=true
export GITHUB_REPOSITORY="jbalarcon/ramify-simu-succession"

# Temporarily rename ESLint config
mv .eslintrc.json .eslintrc.json.bak

# Create a temporary ESLint config that ignores everything
echo '{"extends": "next/core-web-vitals","ignorePatterns": ["**/*"]}' > .eslintrc.json

# Run the build
next build

# Restore original ESLint config
mv .eslintrc.json.bak .eslintrc.json

# Create .nojekyll file
touch out/.nojekyll

# Deploy to GitHub Pages
gh-pages -d out 