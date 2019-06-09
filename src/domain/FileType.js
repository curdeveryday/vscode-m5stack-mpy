const TYPE = {
    "FOLDER": 0,
    "FILE": 1
}

function File(com, name) {
    this.name = name;
    this.com = com;
    this.type = TYPE['FILE'];
}

function Folder(com, name) {
    this.name = name;
    this.com = com;
    this.children = [];
    this.type = TYPE['FOLDER'];
}

module.exports = {
    TYPE,
    File,
    Folder
}