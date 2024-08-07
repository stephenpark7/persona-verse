#!/bin/bash

# Check if the package name is provided
if [ -z "$1" ]; then
  echo "Please provide the package name to remove."
  echo "Usage: $0 <package-name>"
  exit 1
fi

PACKAGE_NAME=$1

# Function to remove the package from package-lock.json
remove_from_package_lock() {
  echo "Removing $PACKAGE_NAME from package-lock.json..."
  jq "del(.dependencies.\"$PACKAGE_NAME\") | del(.packages.\"node_modules/$PACKAGE_NAME\")" package-lock.json > package-lock.json.tmp && mv package-lock.json.tmp package-lock.json
}

# Function to remove the package from node_modules
remove_from_node_modules() {
  echo "Removing $PACKAGE_NAME from node_modules..."
  rm -rf "node_modules/$PACKAGE_NAME"
}

# Backup the original package-lock.json
echo "Backing up package-lock.json to package-lock.json.bak..."
cp package-lock.json package-lock.json.bak

# Remove the package
remove_from_package_lock
# remove_from_node_modules

# Reinstall dependencies
# echo "Reinstalling dependencies..."
# npm install

echo "Done. $PACKAGE_NAME has been removed."
