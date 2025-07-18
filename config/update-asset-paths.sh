#!/usr/bin/env bash

mv dist/assets/node_modules/* dist/assets/

# Update paths in files to remove node_modules
if [[ "$OSTYPE" == "darwin"* ]]; then
  find dist/_expo/static/js/web/ -type f -print0 | xargs -0 sed -i '' 's/\/node_modules\//\//g'
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  find dist/_expo/static/js/web/ -type f -print0 | xargs -0 sed -i 's/\/node_modules\//\//g'
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  find dist/_expo/static/js/web/ -type f -exec powershell -Command "(Get-Content {}).Replace('/node_modules/', '/') | Set-Content {}" \;
else
  echo "Unsupported OS: $OSTYPE"
  exit 1
fi