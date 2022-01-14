import * as vscode from 'vscode';
import M5FileSystemProvider from './M5FileSystemProvider';

jest.mock('../serial/SerialManager', () => ({
  readFile: () => Promise.resolve(Buffer.from('done')),
}));

describe('M5FileSystemProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('writeFile', () => {
    test('should handle caching file content', async () => {
      // ACT
      const uri = vscode.Uri.file('/dev/device/flash/python.py');
      await M5FileSystemProvider.writeFile(uri);
      const fileContent = M5FileSystemProvider.readFile(uri);

      // ASSERT
      expect(fileContent).toStrictEqual(Uint8Array.from([100, 111, 110, 101]));
    });
  });

  describe('saveFile', () => {
    test('should handle saving edited file', async () => {
      // ACT
      const uri = vscode.Uri.file('/dev/device/flash/python.py');
      await M5FileSystemProvider.saveFile(uri, 'python code');
      const spyWithProgress = jest.spyOn(vscode.window, 'withProgress');

      // ASSERT
      expect(spyWithProgress).toHaveBeenCalled();
    });
  });
});
