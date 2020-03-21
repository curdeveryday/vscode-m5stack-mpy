const vscode = require('vscode');
const serailportProvider = require('./serialport');
const TreeDataProvider = require('./TreeDataProvider');
const M5fs = require('./M5FileSystemProvider');
const fs = require('fs');
const path = require('path');

let portList = [];
let selectedPorts = [];
let vscodeStatusBarCOMList = [];
let Tree = null;

function clearStatusBarCOMList() {
    vscodeStatusBarCOMList.forEach(item => item.dispose());
    vscodeStatusBarCOMList = [];
}

function PortList() {
    let item = vscode.window.createStatusBarItem();
    item.text = `Add M5Stack`;
    item.command = `vscode-m5stack-mpyreader.selectPorts`;
    item.show();

    vscode.workspace.onDidOpenTextDocument(e => {
        if(e.uri.scheme  !== 'm5stackfs') return;
    });

    vscode.workspace.onWillSaveTextDocument(e => {
        if(e.document.isDirty) {
            if(e.document.uri.scheme  !== 'm5stackfs') return;
            M5fs.saveFile(e.document.uri, e.document.getText());
        }
    });
    
}

PortList.prototype.selectPorts = async function() {
    let _this = this;
    let comsInfo = await serailportProvider.getCOMs();
    portList = comsInfo.map(com => {
        return {
            label: com.path,
            description: com.manufacturer,
            picked: selectedPorts.findIndex(p => p.label == com.path) > -1
        }
    });
    selectedPorts = await vscode.window.showQuickPick(portList, { canPickMany: true }) || selectedPorts;
    clearStatusBarCOMList();
    selectedPorts.forEach(port => {
        let item = vscode.window.createStatusBarItem();
        item.text = `${port.label}`;
        item.command = `vscode-m5stack-mpyreader.openPort${port.label}`;
        item.show();
        vscodeStatusBarCOMList.push(item);
        
        try {
            _this['subscriptions'].push(vscode.commands.registerCommand(`vscode-m5stack-mpyreader.openPort${port.label}`, () => PortList.prototype.selectAction(port.label)));
        } catch {}
    });

    Tree = vscode.window.createTreeView('m5stack', {
        treeDataProvider: new TreeDataProvider(selectedPorts.map(item => item.label))
    });
}

PortList.prototype.selectAction = async function(port) {
    let r = await vscode.window.showQuickPick([
        {
            label: 'Reset',
            description: 'Reset device'
        },
        {
            label: 'Disconnect',
            description: 'Disconnect M5Stack'
        }
    ]);
    if(!r) return;
    switch(r.label) {
        case 'Reset':
            let r = await serailportProvider.exec(port, 'machine.reset()');
            if(r == false) {
                vscode.window.showErrorMessage('Reset device failed.');
            } else {
                vscode.window.showInformationMessage('Device is resetting.');
            }
            break;
        case 'Disconnect':
            serailportProvider.disconnect();
            break;
        default:
            break;
    }
}

PortList.prototype.readFile = async function(port, filepath) {
    let filename = filepath.split('/').slice(-1).toString();
    if(/(.jpg)|(.jpeg)|(.bmp)|(.png)|(.gif)/g.test(filename.toLowerCase())) {
        const panel = vscode.window.createWebviewPanel('image', filename, vscode.ViewColumn.One, {});
        panel.webview.html = `<h1>Loading</h1>`;
        let img = await serailportProvider.readFile(port, filepath);
        panel.webview.html = `<img src="data:image/jpg;base64, ${Buffer.from(img).toString('base64')}" />`;
        return;
    }
    let uri = vscode.Uri.parse(`m5stackfs:/${port}${filepath}`);
    await M5fs.writeFile(uri);
    let doc = await vscode.workspace.openTextDocument(uri);
    await vscode.window.showTextDocument(doc, { preview: false });
}

PortList.prototype.reset = async function() {
    let uri = vscode.window.activeTextEditor.document.uri;
    let args = uri.path.split('/');
    let port = process.platform == 'win32' ? args[1] : `/dev/${args[1]}`;
    let r = await serailportProvider.exec(port, 'machine.reset()');
    if(r == false) {
        vscode.window.showErrorMessage('Reset device failed.');
    } else {
        vscode.window.showInformationMessage('Device is resetting.');
    }
}

PortList.prototype.run = async function() {
    let uri = vscode.window.activeTextEditor.document.uri;
    let text = vscode.window.activeTextEditor.document.getText();
    let args = uri.path.split('/');
    let port = process.platform == 'win32' ? args[1] : `/dev/${args[1]}`;
    let r = await serailportProvider.exec(port, text);
    if(r == false) {
        vscode.window.showErrorMessage('Run failed.');
    } else {
        vscode.window.showInformationMessage('Run successfully.');
    }
}

PortList.prototype.create = async function(ev) {
    let filename = await vscode.window.showInputBox({ placeHolder: 'File Name' });
    if(!filename) {
        return;
    }
    let r = false;
    if(ev.contextValue == 'COM') {
        r = await serailportProvider.download(ev.label, filename, '', 0x01);
    }
    else if (ev.contextValue == 'folder') {
        r = await serailportProvider.download(ev.com, `${ev.parent}/${ev.label}/${filename}`, '', 0x01);
    }
    if(!r) {
        vscode.window.showErrorMessage(`Create "${ filename }" failed.`);
        return;
    }
    vscode.window.showInformationMessage(`Create "${ filename }" successfully.`);
    PortList.prototype._refreshTree();
}

PortList.prototype.remove = async function(ev) {
    let _ev = Object.assign({}, ev);
    if(ev.path != undefined) {
        let args = ev.path.split('/');
        let port = process.platform == 'win32' ? args[1] : `/dev/${args[1]}`;
        _ev.com = port;
        _ev.label = args[args.length - 1];
        _ev.parent = `/${args.slice(2, args.length -1).join('/')}`;
    }
    let confirm = await vscode.window.showInformationMessage(`Do you sure to delete file "${_ev.label}" ?`, {
        modal: true
    }, 'Yes');
    if(confirm == 'Yes') {
        let r = await serailportProvider.removeFile(_ev.com, `${_ev.parent}/${_ev.label}`);
        if(!r) {
            vscode.window.showErrorMessage(`Delete file "${_ev.label}" failed.`);
            return;
        }
        vscode.window.showInformationMessage(`Delete file "${_ev.label}" successfully.`);
        PortList.prototype._refreshTree();
    }
}

PortList.prototype.upload = async function(ev) {
    let file = await vscode.window.showOpenDialog({});
    if(file == undefined) return;
    let filename = file[0].path.split('/').slice(-1).toString();
    let content = process.platform == 'win32' ? fs.readFileSync(path.join(file[0].path.slice(1))) : fs.readFileSync(path.join(file[0].path));
    let r = false;
    vscode.window.showWarningMessage(`"${ filename }" Uploading, don't close the window.`);
    if(ev.contextValue == 'COM') {
        r = await serailportProvider.download(ev.label, filename, content, 0x01);
    }
    else if (ev.contextValue == 'folder') {
        r = await serailportProvider.download(ev.com, `${ev.parent}/${ev.label}/${filename}`, content, 0x01);
    }
    if(!r) {
        vscode.window.showErrorMessage(`Upload "${ filename }" failed.`);
        return;
    }
    vscode.window.showInformationMessage(`Upload "${ filename }" successfully.`);
    M5fs.removeCache(`/${ev.com}${ev.parent}/${ev.label}/${filename}`);
    PortList.prototype._refreshTree();
}

PortList.prototype._refreshTree = function() {
    Tree.dispose();
    Tree = vscode.window.createTreeView('m5stack', {
        treeDataProvider: new TreeDataProvider(selectedPorts.map(item => item.label))
    });
}

module.exports = PortList;