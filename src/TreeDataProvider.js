const vscode = require('vscode');
const serailportProvider = require('./serialport');
const FileType = require('./domain/FileType');

function TreeDataProvider(port) {
    this.port = port;
}

TreeDataProvider.prototype.getChildren = async function(element) {
    let tree = [];
    if(!element) {
        return this.port.map(p => {
            return {
                label: p,
                type: 'COM',
                collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
                contextValue: 'COM'
            }
        });
    }
    else if (element.type == 'COM') {
        let dir = await serailportProvider.listDir(element.label, '/flash');
        if(dir == false) {
            element.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
            return [];
        }
        let root_dir = [];
        if(dir.toString().indexOf(' ') > -1) {
            root_dir = dir.toString().split(' ').filter(item => item != '');
        } else {
            root_dir = dir.toString().split(',').filter(item => item != '');
        }
        let tree_data = root_dir.map(item => {
            if(item.indexOf('.') > -1) {
                return new FileType.File(element.label, item);
            } else {
                return new FileType.Folder(element.label, item);
            }
        }).sort((a, b) => a.type - b.type);
        tree = this.generateTree(tree_data, '/flash');
        return tree;
    }
    else {
        let dir = await serailportProvider.listDir(element.com, `${element.parent}/${element.label}`);
        let root_dir = [];
        if(dir.toString().indexOf(' ') > -1) {
            root_dir = dir.toString().split(' ').filter(item => item != '');
        } else {
            root_dir = dir.toString().split(',').filter(item => item != '');
        }
        let tree_data = root_dir.map(item => {
            if(item.indexOf('.') > -1) {
                return new FileType.File(element.com, item);
            } else {
                return new FileType.Folder(element.com, item);
            }
        }).sort((a, b) => a.type - b.type);
        tree = this.generateTree(tree_data, `/flash/${element.label}`);

        return tree;
    }
}

TreeDataProvider.prototype.getParent = function() {
    return 0;
}

TreeDataProvider.prototype.getTreeItem = function(element) {
    return element;
}

TreeDataProvider.prototype.onDidChangeTreeData = null;

TreeDataProvider.prototype.generateTree = function(tree_data, parent_path) {
    let tree = [];
    tree_data.forEach(item => {
        if(item.type == FileType.TYPE['FILE']) {
            let node = {
                label: item.name,
                parent: parent_path,
                type: item.type,
                com: item.com,
                contextValue: 'file',
                command: {
                    command: 'extension.openSelection',
                    title: 'readFile',
                    arguments: [item.com, `${parent_path}/${item.name}`]
                }
            }
            tree.push(node);
        }
        else if(item.type == FileType.TYPE['FOLDER']) {
            let node = {
                label: item.name,
                collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
                parent: parent_path,
                type: item.type,
                children: item.children,
                com: item.com,
                contextValue: 'folder'
            }
            tree.push(node);
        }
    });

    return tree;
}

module.exports = TreeDataProvider;