const vscode = require('vscode');
const PortList = require('./src/portlist');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	
	let portList = new PortList();

	context.subscriptions.push(vscode.commands.registerCommand('vscode-m5stack-mpyreader.selectPorts', portList.selectPorts, context));
	context.subscriptions.push(vscode.commands.registerCommand('vscode-m5stack-mpyreader.openPort', portList.openPort, context));

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
