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
*/

const copyBindings = () => {
  const plaformsAndArch = ['darwin-x64', 'linux-x64', 'win32-x32', 'win32-x64'];
  const platformBindingsFolder = path.join(__dirname, './lib/native/');

  try {
    // Remove lastly locally build
    fs.unlinkSync(path.join(__dirname, `/node_modules/@serialport/bindings/build/Release/bindings.node`));
  } catch (e) {}

  plaformsAndArch.forEach((p) => {
    try {
      const serialportBindingFile = `${platformBindingsFolder}serialport-bindings-${p}.node`;
      const [platform, arch] = p.split('-');
      // node version must be vscode compiled version (typescript), available in About panel
      const destinationFolder = path.join(
        __dirname,
        `/node_modules/@serialport/bindings/compiled/${process.versions.node}/${platform}/${arch}/`
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
};

copyBindings();
