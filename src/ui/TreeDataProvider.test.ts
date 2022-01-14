import * as vscode from 'vscode';
import { COM, FILE, FOLDER, Icons, M5FSResource, M5TreeDataProvider } from './TreeDataProvider';
jest.mock('../serial/SerialManager', () => ({
  listDir: () => Promise.resolve(['file1.py', 'directory']),
}));

describe('TreeDataProvider', () => {
  describe('M5FSResource', () => {
    test('should create com device fs resource', () => {
      // ACT
      const res = new M5FSResource(
        'device',
        'version',
        '',
        '/dev/tty',
        COM,
        vscode.TreeItemCollapsibleState.Collapsed
      );

      // ASSERT
      expect(res.com).toBe('/dev/tty');
      expect(res.description).toBe('version');
      expect(res.icon).toBe(Icons.com);
      expect(res.parent).toBe('');
      expect(res.tooltip).toBe('device-version');
    });
    test('should create python file fs resource', () => {
      // ACT
      const res = new M5FSResource(
        'file.py',
        'version',
        '',
        '/dev/tty',
        FILE,
        vscode.TreeItemCollapsibleState.Collapsed
      );

      // ASSERT
      expect(res.com).toBe('/dev/tty');
      expect(res.description).toBe('version');
      expect(res.icon).toBe(Icons.python);
      expect(res.parent).toBe('');
      expect(res.tooltip).toBe('file.py-version');
    });
    test('should create file fs resource', () => {
      // ACT
      const res = new M5FSResource(
        'file.jpg',
        'version',
        '',
        '/dev/tty',
        FILE,
        vscode.TreeItemCollapsibleState.Collapsed
      );

      // ASSERT
      expect(res.com).toBe('/dev/tty');
      expect(res.description).toBe('version');
      expect(res.icon).toBe(Icons.image);
      expect(res.parent).toBe('');
      expect(res.tooltip).toBe('file.jpg-version');
    });
    test('should create folder fs resource', () => {
      // ACT
      const res = new M5FSResource(
        'folder',
        'version',
        '',
        '/dev/tty',
        FOLDER,
        vscode.TreeItemCollapsibleState.Collapsed
      );

      // ASSERT
      expect(res.com).toBe('/dev/tty');
      expect(res.description).toBe('version');
      expect(res.icon).toBe(Icons.folder);
      expect(res.parent).toBe('');
      expect(res.tooltip).toBe('folder-version');
    });
  });

  describe('M5TreeDataProvider', () => {
    test('should show info message when no devices', () => {
      // ARRANGE
      const spy = jest.spyOn(vscode.window, 'showInformationMessage');

      const provider = new M5TreeDataProvider([]);

      // ACT
      provider.getChildren();

      // ASSERT
      expect(spy).toHaveBeenCalled();
    });
    test('should retrieve root node children', () => {
      // ARRANGE
      const provider = new M5TreeDataProvider(['device']);
      const spy = jest.spyOn(provider, '_getChildrenCom');

      // ACT
      provider.getChildren();

      // ASSERT
      expect(spy).toHaveBeenCalledWith(undefined);
    });
    test('should retrieve element node children', () => {
      // ARRANGE
      const provider = new M5TreeDataProvider(['device']);
      const element = new M5FSResource(
        'device',
        'version',
        '',
        '/dev/tty',
        COM,
        vscode.TreeItemCollapsibleState.Collapsed
      );
      const spy = jest.spyOn(provider, '_getChildrenCom');

      // ACT
      provider.getChildren(element);

      // ASSERT
      expect(spy).toHaveBeenCalledWith(element);
    });
    test('should build tree roots', async () => {
      // ARRANGE
      const provider = new M5TreeDataProvider(['device1', 'device2']);

      // ACT
      const rootNode = await provider._getChildrenCom(undefined);

      // ASSERT
      expect(rootNode).toStrictEqual([
        new M5FSResource('device1', '', '', 'device1', COM, vscode.TreeItemCollapsibleState.Collapsed),
        new M5FSResource('device2', '', '', 'device2', COM, vscode.TreeItemCollapsibleState.Collapsed),
      ]);
    });
    test('should build resource children', async () => {
      // ARRANGE
      const provider = new M5TreeDataProvider(['device1']);
      const element = new M5FSResource(
        'device',
        'version',
        '',
        '/dev/tty',
        COM,
        vscode.TreeItemCollapsibleState.Collapsed
      );

      // ACT
      const rootNode = await provider._getChildrenCom(element);

      // ASSERT
      const expectedChildResources = [
        new M5FSResource('file1.py', '', '/flash', '/dev/tty', FILE, vscode.TreeItemCollapsibleState.None, {
          command: 'extension.openSelection',
          title: 'readFile',
          arguments: ['/dev/tty', `/flash/file1.py`],
        }),
        new M5FSResource(
          'directory',
          '',
          '/flash',
          '/dev/tty',
          FOLDER,
          vscode.TreeItemCollapsibleState.Collapsed
        ),
      ];
      expect(rootNode).toStrictEqual(expectedChildResources);
    });
  });
});
