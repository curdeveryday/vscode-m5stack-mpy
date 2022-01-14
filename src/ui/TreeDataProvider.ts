import * as path from 'path';
import * as vscode from 'vscode';
import SerialManager from '../serial/SerialManager';

export const FILE = 'file';
export const FOLDER = 'folder';
export const COM = 'COM';

export enum Icons {
  com = 'folder-core.svg',
  folder = 'folder-resource.svg',
  python = 'python.svg',
  image = 'image.svg',
}

type DeviceContext = typeof FILE | typeof FOLDER | typeof COM;

export class M5FSResource extends vscode.TreeItem {
  public icon: string = '';
  constructor(
    public readonly label: string,
    private version: string,
    public parent: string,
    public com: string,
    public contextValue: DeviceContext,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public command?: vscode.Command
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.label}-${this.version}`;
    this.description = this.version;
    this.parent = parent;
    this.com = com;
    this.contextValue = contextValue;
    this.command = command;

    switch (contextValue) {
      case FILE: {
        if (this.label.indexOf('.py') > -1) {
          this.icon = Icons.python;
        }
        if (/(.jpg)|(.jpeg)|(.bmp)|(.png)|(.gif)/g.test(this.label.toLowerCase())) {
          this.icon = Icons.image;
        }
        break;
      }
      case FOLDER: {
        this.icon = Icons.folder;
        break;
      }
      case COM: {
        this.icon = Icons.com;
        break;
      }
    }

    this.iconPath = {
      light: path.join(__filename, '..', '..', 'resources', 'light', this.icon),
      dark: path.join(__filename, '..', '..', 'resources', 'dark', this.icon),
    };
  }
}

export class M5TreeDataProvider implements vscode.TreeDataProvider<M5FSResource> {
  constructor(private coms: string[]) {}

  getChildren(element?: M5FSResource): Thenable<M5FSResource[]> {
    if (!this.coms.length) {
      vscode.window.showInformationMessage('No file in empty root');
      return Promise.resolve([]);
    }

    if (!element) {
      return Promise.resolve(this._getChildrenCom(undefined));
    } else {
      return Promise.resolve(this._getChildrenCom(element));
    }
  }

  async _getChildrenCom(element: M5FSResource | undefined): Promise<M5FSResource[]> {
    const tree: M5FSResource[] = [];
    // Root to display COM devices
    if (!element) {
      for (let i = 0; i < this.coms.length; i++) {
        const comNode = new M5FSResource(
          this.coms[i],
          '',
          '',
          this.coms[i],
          COM,
          vscode.TreeItemCollapsibleState.Collapsed
        );
        tree.push(comNode);
      }
      return tree;
    } else {
      // Internal COM devices resources
      const com = element.com;
      let extraPath = element ? element.parent + '/' + element.label : '/flash';
      if (element.contextValue === COM) {
        extraPath = '/flash';
      }

      try {
        const dir = (await SerialManager.listDir(com, extraPath)).toString();
        dir.split(',').forEach((dir) => {
          if (!dir) {
            return [];
          }
          const isFile = dir.indexOf('.') > -1;
          const collapsibleState = isFile
            ? vscode.TreeItemCollapsibleState.None
            : vscode.TreeItemCollapsibleState.Collapsed;
          const node = new M5FSResource(dir, '', extraPath, com, isFile ? FILE : FOLDER, collapsibleState);
          // file open command
          if (isFile) {
            node.command = {
              command: 'extension.openSelection',
              title: 'readFile',
              arguments: [com, `${extraPath}/${dir}`],
            };
          }
          tree.push(node);
        });
      } catch (e: any) {
        vscode.window.showErrorMessage(e);
      }
    }

    return tree;
  }

  getTreeItem(element: M5FSResource): vscode.TreeItem {
    return element;
  }
}
