import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import M5FileSystemProvider, { DOCUMENT_URI_SCHEME } from '../providers/M5FileSystemProvider';
import SerialConnection from '../serial/SerialConnection';
import SerialManager, { MAX_CHUNK_LENGTH } from '../serial/SerialManager';
import { getSerialPortAndFileFromUri } from '../utils/vscode';
import FileTree from './FileTree';
import StatusBar from './StatusBar';
import { PickedItem } from './types';

type ResourceMapCache = {
  [key: string]: string;
};

const supportedTextFileTypes = ['py', 'json', 'txt'];

class PortList {
  private selectedCOMs: PickedItem[] = [];
  // @ts-ignore
  private tree: FileTree;
  private resourceCache: ResourceMapCache = {};
  constructor() {
    this._registerWorkspaceListeners();
  }

  _registerWorkspaceListeners() {
    vscode.workspace.onDidOpenTextDocument((e) => {
      if (e.uri.scheme !== DOCUMENT_URI_SCHEME) {
        return;
      }
    });

    vscode.workspace.onWillSaveTextDocument(async (e) => {
      if (e.document.isDirty) {
        if (e.document.uri.scheme !== DOCUMENT_URI_SCHEME) {
          return;
        }
        const result = await M5FileSystemProvider.saveFile(e.document.uri, e.document.getText());
        if (!result) {
          vscode.window.showErrorMessage(`Saved ${e.document.uri} failed.`);
        }
      }
    });
  }

  removeSelectedComs(com: string) {
    const index = this.selectedCOMs.findIndex((selected) => selected.label === com);
    if (index > -1) {
      this.selectedCOMs.splice(index, 1);
    }
  }

  async selectPorts() {
    let coms = await SerialConnection.getCOMs();

    const self = this;
    const portList = coms.map(({ path, manufacturer }) => {
      return {
        label: path,
        description: manufacturer,
        picked: self.selectedCOMs.findIndex((p) => p.label === path) > -1,
      };
    });

    const selected = await vscode.window.showQuickPick(portList, {
      canPickMany: true,
    });

    if (!selected || selected.length === 0) {
      this.selectedCOMs.forEach((com) => {
        SerialManager.disconnect(com.label);
      });
      this.selectedCOMs = [];
      StatusBar.clear();
      this.refreshTree();
      return;
    }

    this.selectedCOMs = !selected
      ? []
      : selected?.map(({ label, description }) => ({
          label,
          description,
          picked: true,
        }));

    this.selectedCOMs.forEach((port) => {
      if (!StatusBar.has(port)) {
        StatusBar.add(port);
        if (port.picked) {
          SerialManager.connect(port.label, (err) => {
            if (!err) {
              self.tree = new FileTree(this.selectedCOMs);
            }
          });
        }
      }
    });
  }

  async remove(ev: any) {
    let _ev = Object.assign({}, ev);
    if (ev.path !== undefined) {
      let args = ev.path.split('/');
      let port = process.platform === 'win32' ? args[1] : `/dev/${args[1]}`;
      _ev.com = port;
      _ev.label = args[args.length - 1];
      _ev.parent = `/${args.slice(2, args.length - 1).join('/')}`;
    }
    let confirm = await vscode.window.showInformationMessage(
      `Do you sure to delete file "${_ev.label}" ?`,
      {
        modal: true,
      },
      'Yes'
    );
    if (confirm === 'Yes') {
      let r = await SerialManager.removeFile(_ev.com, `${_ev.parent}/${_ev.label}`);
      if (!r) {
        vscode.window.showErrorMessage(`Delete file "${_ev.label}" failed.`);
        return;
      }
      vscode.window.showInformationMessage(`Delete file "${_ev.label}" successfully.`);

      this.tree = new FileTree(this.selectedCOMs);
    }
  }

  readFile(port: string, filepath: string) {
    this._readFile(port, filepath);
  }

  async _readFile(port: string, filepath: string) {
    const filename = filepath.split('/').slice(-1).toString();
    const fileExtension = filename.split('.')[1];
    if (/(.jpg)|(.jpeg)|(.bmp)|(.png)|(.gif)/g.test(filename.toLowerCase())) {
      const panel = vscode.window.createWebviewPanel('image', filename, vscode.ViewColumn.One, {});
      panel.webview.html = `<h1>Loading</h1>`;
      let base64Image = this.resourceCache[filepath];
      if (!base64Image) {
        const img = await SerialManager.readFile(port, filepath);
        base64Image = img.toString('base64');
        this.resourceCache[filepath] = base64Image;
      }

      panel.webview.html = `<img src="data:image/${fileExtension};base64,${base64Image}" />`;
      return;
    }
    if (!supportedTextFileTypes.includes(fileExtension)) {
      const panel = vscode.window.createWebviewPanel('not_supported', filename, vscode.ViewColumn.One, {});
      panel.webview.html = `<h1>Not supported format</h1>`;
      return;
    }
    let uri = vscode.Uri.parse(`${DOCUMENT_URI_SCHEME}:/${port}${filepath}`);

    if (!SerialManager.isBusy(port)) {
      await M5FileSystemProvider.writeFile(uri);
      let doc = await vscode.workspace.openTextDocument(uri);
      await vscode.window.showTextDocument(doc, { preview: false });
    } else {
      console.log('Device is busy, wait a bit');
    }
  }

  reset() {
    this._reset();
  }

  async _reset() {
    if (vscode.window.activeTextEditor) {
      const uri = vscode.window.activeTextEditor.document.uri;
      const args = uri.path.split('/');
      const port = process.platform === 'win32' ? args[1] : `/dev/${args[1]}`;
      const r = await SerialManager.exec(port, 'machine.reset()');

      if (r?.toString().indexOf('done') < 0) {
        vscode.window.showErrorMessage('Reset device failed.');
      } else {
        vscode.window.showInformationMessage('Device is resetting.');
      }
    }
  }

  async create(ev: any) {
    let filename = await vscode.window.showInputBox({
      placeHolder: 'File Name',
    });
    if (!filename || filename.indexOf('.') < 0) {
      return;
    }
    let r = Buffer.from([]);
    if (ev.contextValue === 'COM') {
      r = await SerialManager.download(ev.label, filename, '', 0x01);
    } else if (ev.contextValue === 'folder') {
      r = await SerialManager.download(ev.com, `${ev.parent}/${ev.label}/${filename}`, '', 0x01);
    }
    if (r?.toString().indexOf('done') < 0) {
      vscode.window.showErrorMessage(`Create "${filename}" failed.`);
      return;
    }
    vscode.window.showInformationMessage(`Create "${filename}" successfully.`);
    this.refreshTree();
  }

  async upload(ev: any) {
    let file = await vscode.window.showOpenDialog({});
    if (!file) {
      return;
    }
    const filename = file[0].path.split('/').slice(-1).toString().trim();

    if (filename.length > 28) {
      vscode.window.showErrorMessage(`File name is too long (max 28 characters).`);
    }

    try {
      const content =
        process.platform === 'win32'
          ? fs.readFileSync(path.join(file[0].path.slice(1)))
          : fs.readFileSync(path.join(file[0].path));

      const contextValue = ev.contextValue;
      const isDirectory = contextValue === 'COM';
      const port = isDirectory ? ev.label : ev.com;
      const filepath = isDirectory ? filename : `${ev.parent}/${ev.label}/${filename}`;

      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          cancellable: false,
          title: `Uploading '${filename}.'`,
        },
        async (progress) => {
          progress.report({ increment: 0 });

          const numChunks = Math.ceil(content.length / MAX_CHUNK_LENGTH);
          const increment = +(100 / numChunks).toFixed(2);

          let r = await SerialManager.bulkDownload(port, filepath, content, false, () => {
            progress.report({ increment });
          });

          if (r.toString().indexOf('done') >= 0) {
            progress.report({ increment: 100 });
            M5FileSystemProvider.removeCache(`/${ev.com}${ev.parent}/${ev.label}/${filename}`);
            this.refreshTree();
          }
        }
      );
    } catch (e: any) {
      console.log('Error while uploading', e.toString());
      vscode.window.showErrorMessage(`Upload failed.`);
    }
  }

  async run() {
    if (vscode.window.activeTextEditor) {
      const document = vscode.window.activeTextEditor.document;
      const uri = document.uri;
      const text = document.getText();
      const { port } = getSerialPortAndFileFromUri(uri, process.platform);
      const r = await SerialManager.exec(port, text);
      if (r?.toString().indexOf('done') < 0) {
        vscode.window.showErrorMessage('Run failed.');
      } else {
        vscode.window.showInformationMessage('Run successfully.');
      }
    }
  }

  refreshTree() {
    this.tree = new FileTree(this.selectedCOMs);
  }
}

export default new PortList();
