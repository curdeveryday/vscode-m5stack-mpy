import * as fs from 'fs';
import * as vscode from 'vscode';
import M5FileSystemProvider from '../providers/M5FileSystemProvider';
import SerialConnection from '../serial/SerialConnection';
import SerialManager from '../serial/SerialManager';
import Portlist from './PortList';
import StatusBar from './StatusBar';

jest.mock('../serial/SerialManager', () => ({
  connect: jest.fn(),
  disconnect: jest.fn(),
  download: jest.fn(),
  exec: () => Promise.resolve(Buffer.from('done')),
  isBusy: jest.fn(() => false),
  readFile: () => Promise.resolve(Buffer.from('done')),
  removeFile: jest.fn(),
}));
jest.mock('../providers/M5FileSystemProvider', () => ({
  disconnect: jest.fn(),
  exec: () => Promise.resolve(Buffer.from('done')),
  removeFile: jest.fn(),
  writeFile: jest.fn(),
}));
jest.mock('../serial/SerialConnection', () => ({
  disconnect: jest.fn(),
  exec: () => Promise.resolve(Buffer.from('done')),
  getCOMs: () => Promise.resolve([]),
  removeFile: jest.fn(),
}));
jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));

const buildActiveTextEditor = () => ({
  selections: [],
  visibleRanges: [],
  viewColumn: undefined,
  edit: jest.fn(),
  options: {},
  insertSnippet: jest.fn(),
  setDecorations: jest.fn(),
  revealRange: jest.fn(),
  show: jest.fn(),
  hide: jest.fn(),
  selection: {
    union: jest.fn(),
    with: jest.fn(),
    intersection: jest.fn(),
    isEqual: jest.fn(),
    contains: jest.fn(),
    active: {
      line: 0,
      character: 0,
      isBefore: jest.fn(),
      isBeforeOrEqual: jest.fn(),
      isAfterOrEqual: jest.fn(),
      isAfter: jest.fn(),
      compareTo: jest.fn(),
      translate: jest.fn(),
      with: jest.fn(),
      isEqual: jest.fn(),
    },

    anchor: {
      line: 0,
      character: 0,
      isBefore: jest.fn(),
      isBeforeOrEqual: jest.fn(),
      isAfterOrEqual: jest.fn(),
      isAfter: jest.fn(),
      compareTo: jest.fn(),
      translate: jest.fn(),
      with: jest.fn(),
      isEqual: jest.fn(),
    },
    isReversed: false,
    start: {
      line: 0,
      character: 0,
      isBefore: jest.fn(),
      isBeforeOrEqual: jest.fn(),
      isAfterOrEqual: jest.fn(),
      isAfter: jest.fn(),
      compareTo: jest.fn(),
      translate: jest.fn(),
      with: jest.fn(),
      isEqual: jest.fn(),
    },
    end: {
      line: 0,
      character: 0,
      isBefore: jest.fn(),
      isBeforeOrEqual: jest.fn(),
      isAfterOrEqual: jest.fn(),
      isAfter: jest.fn(),
      compareTo: jest.fn(),
      translate: jest.fn(),
      with: jest.fn(),
      isEqual: jest.fn(),
    },
    isEmpty: false,
    isSingleLine: false,
  },
  document: {
    uri: vscode.Uri.file('/file.py'),
    fileName: '',
    isUntitled: false,
    languageId: '',
    version: 1,
    isDirty: false,
    isClosed: false,
    eol: vscode.EndOfLine.LF,
    save: jest.fn(),
    lineAt: jest.fn(),
    lineCount: 0,
    offsetAt: jest.fn(),
    positionAt: jest.fn(),
    getText: jest.fn(() => 'python code'),
    getWordRangeAtPosition: jest.fn(),
    validateRange: jest.fn(),
    validatePosition: jest.fn(),
  },
});

const buildWebviewPanel = () => ({
  viewType: '',
  title: '',
  webview: {
    options: {},
    html: '',
    onDidReceiveMessage: jest.fn(),
    postMessage: jest.fn(),
    asWebviewUri: jest.fn(),
    cspSource: '',
  },
  options: {},
  viewColumn: undefined,
  active: false,
  visible: false,
  onDidChangeViewState: jest.fn(),
  onDidDispose: jest.fn(),
  reveal: jest.fn(),
  dispose: jest.fn(),
});

describe('PortList', () => {
  beforeEach(() => {
    StatusBar.clear();
    jest.clearAllMocks();
  });

  describe('selectPorts', () => {
    test('should connect selected port', async () => {
      // ARRANGE
      jest.spyOn(Portlist, 'refreshTree').mockImplementationOnce(() => {});
      jest.spyOn(SerialConnection, 'getCOMs').mockResolvedValue([
        {
          path: '/dev/device',
        },
      ]);
      // @ts-ignore
      jest.spyOn(vscode.window, 'showQuickPick').mockResolvedValue([
        {
          label: '/dev/device',
          picked: true,
        },
      ]);

      const spyConnect = jest.spyOn(SerialManager, 'connect');

      // ACT
      await Portlist.selectPorts();

      // ASSERT
      expect(spyConnect).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    test('should allow removing file', async () => {
      // ARRANGE
      // @ts-ignore
      jest.spyOn(vscode.window, 'showInformationMessage').mockResolvedValue('Yes');
      const spyRemoveFile = jest.spyOn(SerialManager, 'removeFile');
      const secondInfoMsg = jest.spyOn(vscode.window, 'showInformationMessage');

      // ACT{
      await Portlist.remove({ path: '/dev/device/flash/file.py' });

      // ASSERT
      expect(spyRemoveFile).toHaveBeenCalledTimes(1);
      expect(secondInfoMsg).toHaveBeenCalledTimes(1);
    });

    test('should allow discarding removing file', async () => {
      // ARRANGE
      // @ts-ignore
      jest.spyOn(vscode.window, 'showInformationMessage').mockResolvedValue('No');
      const spyRemoveFile = jest.spyOn(SerialManager, 'removeFile');
      const secondInfoMsg = jest.spyOn(vscode.window, 'showInformationMessage');

      // ACT{
      await Portlist.remove({ path: '/dev/device/flash/file.py' });

      // ASSERT
      expect(spyRemoveFile).toHaveBeenCalledTimes(0);
      expect(secondInfoMsg).toHaveBeenCalledTimes(1);
    });
  });

  describe('readFile', () => {
    test('should allow reading image files', async () => {
      // ARRANGE
      let htmlWebview: vscode.WebviewPanel = buildWebviewPanel();
      jest.spyOn(vscode.window, 'createWebviewPanel').mockImplementation(() => {
        return htmlWebview;
      });
      jest.spyOn(SerialManager, 'readFile').mockResolvedValue(Buffer.from('done'));

      // ACT
      await Portlist._readFile('/dev/device', '/dev/device/file.png');

      // ASSERT
      expect(htmlWebview.webview.html).toStrictEqual('<img src="data:image/png;base64,ZG9uZQ==" />');
    });

    test('should display a message in webview for non supported file type', async () => {
      // ARRANGE
      let htmlWebview: vscode.WebviewPanel = buildWebviewPanel();
      jest.spyOn(vscode.window, 'createWebviewPanel').mockImplementation(() => {
        return htmlWebview;
      });
      jest.spyOn(SerialManager, 'readFile').mockResolvedValue(Buffer.from('done'));

      // ACT
      await Portlist._readFile('/dev/device', '/dev/device/file.img');

      // ASSERT
      expect(htmlWebview.webview.html).toStrictEqual('<h1>Not supported format</h1>');
    });

    test('should allow reading supported text type files (.py/.json...)', async () => {
      // ARRANGE
      let htmlWebview: vscode.WebviewPanel = buildWebviewPanel();
      jest.spyOn(vscode.window, 'createWebviewPanel').mockImplementation(() => {
        return htmlWebview;
      });
      jest.spyOn(SerialManager, 'readFile').mockResolvedValue(Buffer.from('done'));
      const spyWrite = jest.spyOn(M5FileSystemProvider, 'writeFile');
      const spyWorkspaceOpen = jest.spyOn(vscode.workspace, 'openTextDocument');
      const spyShowTextDocument = jest.spyOn(vscode.window, 'showTextDocument');

      // ACT
      await Portlist._readFile('/dev/device', '/flash/file.py');

      // ASSERT
      expect(spyWrite).toHaveBeenCalled();
      expect(spyWorkspaceOpen).toHaveBeenCalled();
      expect(spyShowTextDocument).toHaveBeenCalled();
    });

    test('should disallow reading when device is busy', async () => {
      // ARRANGE
      let htmlWebview: vscode.WebviewPanel = buildWebviewPanel();
      jest.spyOn(vscode.window, 'createWebviewPanel').mockImplementation(() => {
        return htmlWebview;
      });
      jest.spyOn(SerialManager, 'readFile').mockResolvedValue(Buffer.from('done'));
      jest.spyOn(SerialManager, 'isBusy').mockImplementationOnce(() => true);
      const spyWrite = jest.spyOn(M5FileSystemProvider, 'writeFile');

      // ACT
      await Portlist._readFile('/dev/device', '/flash/file.py');

      // ASSERT
      expect(spyWrite).toHaveBeenCalledTimes(0);
    });
  });

  describe('reset', () => {
    test('should allow resetting device', async () => {
      // ARRANGE
      vscode.window.activeTextEditor = buildActiveTextEditor();
      jest.spyOn(vscode.window, 'showInputBox').mockResolvedValue('python.py');
      jest.spyOn(Portlist, 'refreshTree').mockImplementationOnce(() => {});
      jest.spyOn(SerialManager, 'exec').mockResolvedValue(Buffer.from('done'));
      const spyShowInfo = jest.spyOn(vscode.window, 'showInformationMessage');

      // ACT
      await Portlist._reset();

      // ASSERT
      expect(spyShowInfo).toHaveBeenCalled();
    });

    test('should show an error when resetting device has failed', async () => {
      // ARRANGE
      vscode.window.activeTextEditor = buildActiveTextEditor();
      jest.spyOn(vscode.window, 'showInputBox').mockResolvedValue('python.py');
      jest.spyOn(Portlist, 'refreshTree').mockImplementationOnce(() => {});
      jest.spyOn(SerialManager, 'exec').mockResolvedValue(Buffer.from('crc error'));
      const spyShowInfo = jest.spyOn(vscode.window, 'showErrorMessage');

      // ACT
      await Portlist._reset();

      // ASSERT
      expect(spyShowInfo).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    test('should allow creating new file', async () => {
      // ARRANGE
      jest.spyOn(vscode.window, 'showInputBox').mockResolvedValue('python.py');
      jest.spyOn(Portlist, 'refreshTree').mockImplementationOnce(() => {});
      jest.spyOn(SerialManager, 'download').mockResolvedValue(Buffer.from('done'));
      const spyShowInfo = jest.spyOn(vscode.window, 'showInformationMessage');

      // ACT
      await Portlist.create({ contextValue: 'COM' });

      // ASSERT
      expect(spyShowInfo).toHaveBeenCalled();
    });

    test('should show an error when creating new file has failed', async () => {
      // ARRANGE
      jest.spyOn(vscode.window, 'showInputBox').mockResolvedValue('python.py');
      jest.spyOn(Portlist, 'refreshTree').mockImplementationOnce(() => {});
      jest.spyOn(SerialManager, 'download').mockResolvedValue(Buffer.from('crc error'));
      const spyShowInfo = jest.spyOn(vscode.window, 'showErrorMessage');

      // ACT
      await Portlist.create({ contextValue: 'COM' });

      // ASSERT
      expect(spyShowInfo).toHaveBeenCalled();
    });
  });

  describe('run', () => {
    test('should allow to run code into device', async () => {
      // ARRANGE
      vscode.window.activeTextEditor = buildActiveTextEditor();
      const spy = jest.spyOn(SerialManager, 'exec').mockResolvedValue(Buffer.from('done'));
      const spy2 = jest.spyOn(vscode.window, 'showInformationMessage');

      // ACT
      await Portlist.run();

      // ASSERT
      expect(spy).toHaveBeenCalledWith('/dev/file.py', 'python code');
      expect(spy2).toHaveBeenCalled();
    });

    test('should show an error when running code into device has failed', async () => {
      // ARRANGE
      vscode.window.activeTextEditor = buildActiveTextEditor();
      const spy = jest.spyOn(SerialManager, 'exec').mockResolvedValue(Buffer.from('crc error'));
      const spy2 = jest.spyOn(vscode.window, 'showErrorMessage');

      // ACT
      await Portlist.run();

      // ASSERT
      expect(spy).toHaveBeenCalledWith('/dev/file.py', 'python code');
      expect(spy2).toHaveBeenCalled();
    });
  });

  describe('upload', () => {
    test('should allow uploading file', async () => {
      // ARRANGE
      jest.spyOn(vscode.window, 'showOpenDialog').mockResolvedValue([vscode.Uri.file('/users/me/python.py')]);
      const spyFs = jest.spyOn(fs, 'readFileSync').mockReturnValue(Buffer.from('text file content'));
      const spyWithProgress = jest.spyOn(vscode.window, 'withProgress');

      // ACT
      await Portlist.upload({});

      // ASSERT
      expect(spyFs).toHaveBeenCalledWith('/users/me/python.py');
      expect(spyWithProgress).toHaveBeenCalled();
    });

    test('should show an error when uploading file has failed', async () => {
      // ARRANGE
      jest.spyOn(vscode.window, 'showOpenDialog').mockResolvedValue([vscode.Uri.file('/users/me/python.py')]);
      jest.spyOn(fs, 'readFileSync').mockImplementationOnce(() => {
        throw new Error();
      });
      const spyShowError = jest.spyOn(vscode.window, 'showErrorMessage');

      // ACT
      await Portlist.upload({});

      // ASSERT
      expect(spyShowError).toHaveBeenCalled();
    });

    test('should show an error when uploading and filename is too long', async () => {
      // ARRANGE
      jest
        .spyOn(vscode.window, 'showOpenDialog')
        .mockResolvedValue([vscode.Uri.file('/users/me/python_long_long_long_long.py')]);
      jest.spyOn(fs, 'readFileSync').mockReturnValue(Buffer.from('text file content'));
      const spyShowError = jest.spyOn(vscode.window, 'showErrorMessage');

      // ACT
      await Portlist.upload({});

      // ASSERT
      expect(spyShowError).toHaveBeenCalled();
    });
  });
});
