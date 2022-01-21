import * as vscode from 'vscode';
import { endProvider, startProvider } from './providers/completion/M5CompletionProvider';
import { hoverProvider } from './providers/hover/M5HoverProvider';
import M5FileSystemProvider, { DOCUMENT_URI_SCHEME } from './providers/M5FileSystemProvider';
import portList from './ui/PortList';

// Extensions code samples
// https://github.com/microsoft/vscode-extension-samples
// https://code.visualstudio.com/api/references/extension-guidelines
export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "vscode-m5stack-mpy" is now active!');

  const selectPorts = () => portList.selectPorts();
  const openFile = (port: string, filepath: string) => portList.readFile(port, filepath);
  const refreshTree = () => portList.refreshTree();
  const createFile = (ev: any) => portList.create(ev);
  const removeFile = (ev: any) => portList.remove(ev);
  const uploadFile = (ev: any) => portList.upload(ev);
  const resetDevice = (ev: any) => portList.reset();
  const run = () => portList.run();

  context.subscriptions.push(
    vscode.commands.registerCommand('vscode-m5stack-mpyreader.selectPorts', selectPorts, context),
    vscode.commands.registerCommand('m5stack.refreshEntry', refreshTree, context),
    vscode.commands.registerCommand('extension.openSelection', openFile, context),
    vscode.commands.registerCommand('extension.reset.device', resetDevice, context),
    vscode.commands.registerCommand('m5stack.addEntry', createFile, context),
    vscode.commands.registerCommand('m5stack.deleteEntry', removeFile, context),
    vscode.commands.registerCommand('m5stack.itemUpload', uploadFile, context),
    vscode.commands.registerCommand('m5stack.itemRun', run, context),
    vscode.workspace.registerFileSystemProvider(DOCUMENT_URI_SCHEME, M5FileSystemProvider),
    startProvider,
    endProvider,
    hoverProvider
  );
}

export function deactivate() {}
