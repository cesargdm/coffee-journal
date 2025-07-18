#!/bin/bash

# Fix dependencies script
# This script ensures all dependencies are compatible with the current Expo SDK version

echo "🔧 Fixing dependencies for Expo compatibility..."

# Run expo install --fix
bunx expo install --fix

echo "✅ Dependencies fixed!"