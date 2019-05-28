const vscode = require('vscode');
const serailportProvider = require('./serialport');
const fileProvider = require('./fileprovider');

let portList = [];
let selectedPorts = [];
let vscodeStatusBarCOMList = [];

function clearStatusBarCOMList() {
    vscodeStatusBarCOMList.forEach(item => item.dispose());
    vscodeStatusBarCOMList = [];
}

function PortList() {
    let item = vscode.window.createStatusBarItem();
    item.text = `Add M5Stack COM`;
    item.command = `vscode-m5stack-mpyreader.selectPorts`;
    item.show();
}

PortList.prototype.selectPorts = async function() {
    let _this = this;
    let comsInfo = await serailportProvider.getCOMs();
    portList = comsInfo.map(com => {
        return {
            label: com.comName,
            description: com.manufacturer,
            picked: selectedPorts.findIndex(p => p.label == com.comName) > -1
        }
    });
    selectedPorts = await vscode.window.showQuickPick(portList, { canPickMany: true }) || selectedPorts;
    clearStatusBarCOMList();
    selectedPorts.forEach(port => {
        let item = vscode.window.createStatusBarItem();
        item.text = `M5-${port.label}`;
        item.command = `vscode-m5stack-mpyreader.openPort${port.label}`;
        item.show();
        vscodeStatusBarCOMList.push(item);
        
        try {
            _this['subscriptions'].push(vscode.commands.registerCommand(`vscode-m5stack-mpyreader.openPort${port.label}`, () => PortList.prototype.openPort(port.label)));
        } catch {

        }

    });

    vscode.window.createTreeView('m5stack', {
        treeDataProvider: new fileProvider()
    });
}

PortList.prototype.openPort = async function(port) {
    let dir = await serailportProvider.listDir(port, '/');
    console.log(dir);
}

module.exports = PortList;