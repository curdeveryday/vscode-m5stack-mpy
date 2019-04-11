const serailportProvider = require('./serialport');
const vscode = require('vscode');

function PortList() {
    this.portList = [];
    this.selectedPorts = [];

    let item = vscode.window.createStatusBarItem();
    item.text = `[M5Stack-COM]`;
    item.command = `vscode-m5stack-mpyreader.selectPorts`;
    item.tooltip = `Select M5Stack COM`;
    item.show();
}

PortList.prototype.selectPorts = async function() {
    this.portList = await serailportProvider.getCOMs();
    this.selectedPorts = await vscode.window.showQuickPick(this.portList, { canPickMany: true }) || [];
}

module.exports = PortList;