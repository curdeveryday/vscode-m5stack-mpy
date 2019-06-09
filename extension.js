const vscode = require('vscode');
const PortList = require('./src/portlist');
const M5fs = require('./src/M5FileSystemProvider');
const M5Completion = require('./src/M5CompletionProvider');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	
	let portList = new PortList();

	context.subscriptions.push(vscode.commands.registerCommand('vscode-m5stack-mpyreader.selectPorts', portList.selectPorts, context));
	context.subscriptions.push(vscode.commands.registerCommand('extension.openSelection', portList.readFile, context));
	context.subscriptions.push(vscode.commands.registerCommand('extension.reset.device', portList.reset, context));
	context.subscriptions.push(vscode.commands.registerCommand('treeview.item.create', portList.create, context));
	context.subscriptions.push(vscode.commands.registerCommand('treeview.item.refresh', portList._refreshTree, context));
	context.subscriptions.push(vscode.commands.registerCommand('treeview.item.remove', portList.remove, context));
	context.subscriptions.push(vscode.commands.registerCommand('treeview.item.run', portList.run, context));
	context.subscriptions.push(vscode.commands.registerCommand('treeview.item.upload', portList.upload, context));
	context.subscriptions.push(vscode.workspace.registerFileSystemProvider('m5stackfs', M5fs));
	context.subscriptions.push(vscode.commands.registerCommand('m5py.add.type', (type, text, variables) => {
		variables.push({
			type: type,
			varname: text.substring(0, text.indexOf('=')).trim()
		});
	}, context));
	context.subscriptions.push(M5Completion.StartProvider, M5Completion.EndProvider);

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
