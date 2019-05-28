const vscode = require('vscode');
const serial = require('./serialport');

function FileProvider() {}

FileProvider.prototype.getChildren = function(element) {
    let tree = [];
    return tree;
}

FileProvider.prototype.getParent = function() {}

FileProvider.prototype.getTreeItem = function(element) {
    return element;
}

FileProvider.prototype.onDidChangeTreeData = null;

module.exports = FileProvider;