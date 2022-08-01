// Run this script after install node-usb-native in your project
const { exec } = require('child_process');
const path = require('path');
const fetch = require('node-fetch');

/**
 * Retrieve VsCode Electron version
 *
 * Assuming everyone is using latest version of VsCode we pick electron version from their Microsoft repo
 * https://stackoverflow.com/questions/57230169/how-to-determine-the-current-and-future-electron-versions-of-vscode-at-extenti
 *
 * @returns latest version or a default one to compile with
 * */
const getVsCodeElectionVersion = async () => {
  const vscodeyarnUrl = 'https://raw.githubusercontent.com/microsoft/vscode/master/.yarnrc';
  const response = await fetch(vscodeyarnUrl);
  const body = await response.text();

  const versionRegexp = /target "(?<version>\d+\.\d+\.\d+)"/;

  const matches = versionRegexp.exec(body);

  if (matches.groups && matches.groups.version) {
    return Promise.resolve(matches.groups.version);
  }

  return Promise.resolve('18.3.5');
};

/**
 *
 */
const rebuild = async () => {
  const vscodeVersion = await getVsCodeElectionVersion();
  console.info('rebuilding with version of electron', vscodeVersion);
  const command = `./node_modules/.bin/electron-rebuild --version=${vscodeVersion} && mkdir -p build && cp node_modules/@serialport/bindings/bin/**/bindings.node build/bindings.node`;
  exec(command, (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });
};

rebuild();
