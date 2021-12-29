import { runTests } from '@vscode/test-electron';
import * as path from 'path';

async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, '../../');

    // The path to the extension test script
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, './suite/index');

    const supporttedVersion = [
      '1.48.2',
      '1.49.3',
      '1.50.1',
      '1.51.1',
      '1.52.1',
      '1.53.2',
      '1.54.3',
      '1.55.2',
      '1.56.2',
      '1.57.1',
      //'1.58.2', // not supported on Linux
      '1.59.1',
      '1.60.2',
      '1.61.1',
      '1.63.2',
    ];

    const launchArgs = [
      // This disables all extensions except the one being tested
      '--disable-extensions',
    ];

    // Download VS Code, unzip it and run the integration test
    for (let i = 0; i < supporttedVersion.length; i++) {
      const version = supporttedVersion[i];
      await runTests({ extensionDevelopmentPath, extensionTestsPath, version, launchArgs });
    }
  } catch (err) {
    console.error('Failed to run tests');
    process.exit(1);
  }
}

main();
