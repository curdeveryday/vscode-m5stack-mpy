// @ts-nocheck
const path = require('path');
const fs = require('fs');

/* By default a binding lookup is done in the following folders with an error thwron when bindings can not be found.
// This helper function aims at copying the correct bindings.node file into this folder

// /node_modules/@serialport/bindings/compiled/{VSCODE_NODE_VERSION}/{PLATFORM}/{ARCH}

[error] Activating extension curdeveryday.vscode-m5stack-mpy failed due to an error:
[error] Error: Could not locate the bindings file. Tried:
/node_modules/@serialport/bindings/build/bindings.node
/node_modules/@serialport/bindings/build/Debug/bindings.node
/node_modules/@serialport/bindings/build/Release/bindings.node
/node_modules/@serialport/bindings/out/Debug/bindings.node
/node_modules/@serialport/bindings/Debug/bindings.node
/node_modules/@serialport/bindings/out/Release/bindings.node
/node_modules/@serialport/bindings/Release/bindings.node
/node_modules/@serialport/bindings/build/default/bindings.node
/node_modules/@serialport/bindings/compiled/14.16.0/darwin/x64/bindings.node
/node_modules/@serialport/bindings/addon-build/release/install-root/bindings.node
/node_modules/@serialport/bindings/addon-build/debug/install-root/bindings.node
/node_modules/@serialport/bindings/addon-build/default/install-root/bindings.node
/node_modules/@serialport/bindings/lib/binding/node-v89-darwin-x64/bindings.node

This list of folders can be found in this repo

https://github.com/TooTallNate/node-bindings/blob/master/bindings.js#L51

An arbitrary decision is taken to use the `compiled` folder

Example: /node_modules/@serialport/bindings/compiled/14.16.0/darwin/x64/bindings.node

['module_root', 'compiled', 'version', 'platform', 'arch', 'bindings'],

version: process.versions.node
platform: process.platform
arch: process.arch

VSCode supported version: ^1.48.0

Tested on: full list of versions https://code.visualstudio.com/updates/

July 2020 (version 1.48.2)
August 2020 (version 1.49.3)
September 2020 (version 1.50.1)
October 2020 (version 1.51.1)
November 2020 (version 1.52.1)
January 2021 (version 1.53.2)
February 2021 (version 1.54.3)
March 2021 (version 1.55.2)
April 2021 (version 1.56.2)
May 2021 (version 1.57.1)
June 2021 (version 1.58.2)
July 2021 (version 1.59.1)
August 2021 (version 1.60.2)
September 2021 (version 1.61.2)
October 2021 (version 1.62.3)
November 2021 (version 1.63.2)
January 2022 (version 1.64) (NodeJS - 14.16.0)
February 2022 (version 1.65) (NodeJS - 14.16.0)
March 2022 (version 1.66) (NodeJS - 16.13.0)
April 2022 (version 1.67) (NodeJS - 16.13.0)

Below corresponding list of NodeJS version used in VSCode compiled version:
- 14.16.0
- 12.8.1
- 12.4.0
- 12.18.3
- 12.14.1
*/
const copyBindings = () => {
  const nodeJSVersions = ['12.14.1', '12.18.3', '12.4.0', '12.8.1', '14.16.0', '16.13.0', '16.13.2', '16.14.2', '16.17.1', '18.15.0'];
  const plaformsAndArch = [
    'darwin-x64',
    'darwin-arm',
    'darwin-arm64',
    'linux-x64',
    'linux-arm',
    'linux-arm64',
    'win32-x32',
    'win32-x64',
    'win32-arm',
    'win32-arm64',
  ];
  const platformBindingsFolder = path.join(__dirname, './lib/native/');

  try {
    // Remove lastly locally build
    fs.unlinkSync(path.join(__dirname, `/node_modules/@serialport/bindings/build/Release/bindings.node`));
  } catch (e) {}

  nodeJSVersions.forEach((n) => {
    plaformsAndArch.forEach((p) => {
      try {
        const serialportBindingFile = `${platformBindingsFolder}serialport-bindings-${p}.node`;
        const [platform, arch] = p.split('-');
        // node version must be vscode compiled version (typescript), available in About panel
        const destinationFolder = path.join(
          __dirname,
          `/node_modules/@serialport/bindings/compiled/${n}/${platform}/${arch}/`
        );

        // create destination directory
        if (!fs.existsSync(destinationFolder)) {
          fs.mkdirSync(destinationFolder, { recursive: true });
        }
        const destinationFile = `${destinationFolder}bindings.node`;

        fs.copyFileSync(serialportBindingFile, destinationFile);
        console.log('Finished copying from', serialportBindingFile, 'to', destinationFile);
      } catch (e) {
        console.error(e);
      }
    });
  });
};

copyBindings();
