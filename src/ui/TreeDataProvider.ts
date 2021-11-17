import * as path from 'path';
import * as vscode from 'vscode';
import SerialManager from '../serial/SerialManager';

export const FILE = 'file';
export const FOLDER = 'folder';
export const COM = 'COM';

export class M5FSResource extends vscode.TreeItem {
  public icon: string = '';

  constructor(
    public readonly label: string,
    private version: string,
    public parent: string,
    public com: string,
    public contextValue: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.label}-${this.version}`;
    this.description = this.version;
    this.parent = parent;
    this.com = com;
    this.contextValue = contextValue;

    switch (contextValue) {
      case FILE: {
        if (this.label.indexOf('.py') > -1) {
          this.icon = 'python.svg';
        }
        if (/(.jpg)|(.jpeg)|(.bmp)|(.png)|(.gif)/g.test(this.label.toLowerCase())) {
          this.icon = 'image.svg';
        }
        break;
      }
      case FOLDER: {
        this.icon = 'folder-resource.svg';
        break;
      }
      case COM: {
        this.icon = 'folder-core.svg';
        break;
      }
    }

    this.iconPath = {
      light: path.join(__filename, '..', '..', 'resources', 'light', this.icon),
      dark: path.join(__filename, '..', '..', 'resources', 'dark', this.icon),
    };
  }
}

class M5TreeDataProvider implements vscode.TreeDataProvider<M5FSResource> {
  constructor(private port: string[]) {}

  getChildren(element: M5FSResource): Thenable<M5FSResource[]> {
    if (!this.port) {
      vscode.window.showInformationMessage('No file in empty root');
      return Promise.resolve([]);
    }

    if (!element) {
      return Promise.resolve(this.getChildrenCom(undefined));
    } else {
      return Promise.resolve(this.getChildrenCom(element));
    }
  }

  async getChildrenCom(element: M5FSResource | undefined): Promise<M5FSResource[]> {
    const tree: M5FSResource[] = [];
    // Root to display COM devices
    if (!element) {
      for (let i = 0; i < this.port.length; i++) {
        const comNode = new M5FSResource(
          this.port[i],
          '',
          '',
          this.port[i],
          'COM',
          vscode.TreeItemCollapsibleState.Collapsed
        );
        tree.push(comNode);
      }
      return tree;
    } else {
      // Internal COM devices resources
      const com = element.com;
      let extraPath = element ? element.parent + '/' + element.label : '/flash';
      if (element.contextValue === 'COM') {
        extraPath = '/flash';
      }

      try {
        const dir = (await SerialManager.listDir(com, extraPath)).toString();
        dir.split(',').forEach((dir) => {
          if (!dir) {
            return;
          }
          const isFile = dir.indexOf('.') > -1;
          const collapsibleState = isFile
            ? vscode.TreeItemCollapsibleState.None
            : vscode.TreeItemCollapsibleState.Collapsed;
          const node = new M5FSResource(
            dir,
            '',
            extraPath,
            com,
            isFile ? 'file' : 'folder',
            collapsibleState
          );
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

export { M5TreeDataProvider };
