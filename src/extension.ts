import * as vscode from 'vscode';
import { endProvider, startProvider } from './providers/M5CompletionProvider';
import M5FileSystemProvider from './providers/M5FileSystemProvider';
import portList from './ui/PortList';

// Extensions code samples
// https://github.com/microsoft/vscode-extension-samples
export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "vscode-m5stack-mpy" is now active!');

  const selectPorts = () => portList.selectPorts();
  const openFile = (port: string, filepath: string) => portList.readFile(port, filepath);
  const refreshTree = () => portList.refreshTree();
  const createFile = (ev: any) => portList.create(ev);
  const removeFile = (ev: any) => portList.remove(ev);
  const uploadFile = (ev: any) => portList.upload(ev);
  const run = () => portList.run();

  context.subscriptions.push(
    vscode.commands.registerCommand('vscode-m5stack-mpyreader.selectPorts', selectPorts, context),
    vscode.commands.registerCommand('m5stack.refreshEntry', refreshTree, context),
    vscode.commands.registerCommand('extension.openSelection', openFile, context),
    vscode.commands.registerCommand('m5stack.addEntry', createFile, context),
    vscode.commands.registerCommand('m5stack.deleteEntry', removeFile, context),
    vscode.commands.registerCommand('m5stack.itemUpload', uploadFile, context),
    vscode.commands.registerCommand('m5stack.itemRun', run, context),
    vscode.workspace.registerFileSystemProvider('m5stackfs', M5FileSystemProvider),
    startProvider,
    endProvider
  );
}

export function deactivate() {}
