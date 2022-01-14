import { Uri } from 'vscode';
import { getSerialPortAndFileFromUri } from './vscode';

describe('utils', () => {
  test('should return correct file and port info on windows platform', () => {
    // ARRANGE
    const uri = Uri.file('/device/file.txt');

    // ACT
    const result = getSerialPortAndFileFromUri(uri, 'win32');

    // ASSERT
    expect(result).toStrictEqual({
      filepath: '/file.txt',
      port: 'device',
    });
  });
  test('should return correct file and port on non windows platform', () => {
    // ARRANGE
    const uri = Uri.file('/device/file.txt');

    // ACT
    const result = getSerialPortAndFileFromUri(uri, 'linux');

    // ASSERT
    expect(result).toStrictEqual({
      filepath: '/file.txt',
      port: '/dev/device',
    });
  });
});
