/* eslint-disable */
// Mocks for vscode namespace.
// - file to be instrumented with more object/method when needed.
// - to be kept in alphabetical order

const commands = {
  executeCommand: jest.fn(),
  registerCommand: jest.fn(() => ({
    show: jest.fn(),
    dispose: jest.fn(),
  })),
};

const debug = {
  onDidTerminateDebugSession: jest.fn(),
  startDebugging: jest.fn(),
};

const Diagnostic = jest.fn();
const DiagnosticSeverity = { Error: 0, Warning: 1, Information: 2, Hint: 3 };

const EndOfLine = {
  LF: 1,
};
class EventEmitter {
  constructor() {}
}

const FileSystemProvider = {};

const languages = {
  createDiagnosticCollection: jest.fn(),
};

const OverviewRulerLane = {
  Left: null,
};

const ProgressLocation = {
  Notification: 15,
};

const Range = jest.fn();

const StatusBarAlignment = {};
const StatusBarItem = {
  dispose: jest.fn(),
};

class TreeItem {
  constructor(label, collapsibleState) {}
}

const TreeItemCollapsibleState = {
  Collapsed: 1,
  Expanded: 2,
  None: 0,
};

const Uri = {
  file: (f) => {
    return { path: f };
  },
  parse: jest.fn(),
};

const ViewColumn = {
  One: 1,
};

const WebviewPanel = {};

const window = {
  activeTextEditor: {},
  createStatusBarItem: jest.fn(() => ({
    show: jest.fn(),
    dispose: jest.fn(),
  })),
  createTextEditorDecorationType: jest.fn(),
  createWebviewPanel: jest.fn(() => {
    return {
      webview: {
        html: '',
      },
    };
  }),
  showErrorMessage: jest.fn(),
  showInformationMessage: jest.fn(),
  showInputBox: jest.fn(),
  showOpenDialog: jest.fn(),
  showQuickPick: jest.fn(),
  showTextDocument: jest.fn(),
  showWarningMessage: jest.fn(),
  withProgress: jest.fn(),
};

const workspace = {
  getConfiguration: jest.fn(),
  onDidOpenTextDocument: jest.fn(),
  onDidSaveTextDocument: jest.fn(),
  onWillSaveTextDocument: jest.fn(),
  openTextDocument: jest.fn(),
  workspaceFolders: [],
};

const vscode = {
  commands,
  debug,
  Diagnostic,
  DiagnosticSeverity,
  EndOfLine,
  EventEmitter,
  FileSystemProvider,
  languages,
  OverviewRulerLane,
  ProgressLocation,
  Range,
  StatusBarItem,
  StatusBarAlignment,
  TreeItem,
  TreeItemCollapsibleState,
  Uri,
  ViewColumn,
  WebviewPanel,
  window,
  workspace,
};

module.exports = vscode;
