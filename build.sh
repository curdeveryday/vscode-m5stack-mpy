#!/bin/bash
./node_modules/.bin/electron-rebuild --version 13.5.2
mkdir -p build
cp node_modules/@serialport/bindings/bin/darwin-x64-89/bindings.node build/bindings.node