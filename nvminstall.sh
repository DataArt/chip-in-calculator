#!/bin/sh

# sourcing `nvm`
. ~/.nvm/nvm.sh

# Check nvm and install node with it

echo "Checking nvm." && nvm --version
if [ $? -ne 0 ]; then
    echo "nvm not installed."
    exit 1
fi

echo "Installing node.js"
nvm install && nvm use --delete-prefix v6.9.1