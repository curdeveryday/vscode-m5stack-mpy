import * as vscode from 'vscode';
import SerialManager from '../serial/SerialManager';

class M5FileSystemProvider implements vscode.FileSystemProvider {
  constructor() {}
  private files: any = {};

  readFile(uri: vscode.Uri) {
    return new Uint8Array(this.files[uri.path]);
  }

  private _emitter = new vscode.EventEmitter<vscode.FileChangeEvent[]>();
  readonly onDidChangeFile: vscode.Event<vscode.FileChangeEvent[]> = this._emitter.event;

  watch(): vscode.Disposable {
    // ignore, fires for all changes...
    return new vscode.Disposable(() => {});
  }

  stat(uri: vscode.Uri): vscode.FileStat {
    return {
      type: 0,
      ctime: 0,
      mtime: Date.now(),
      size: 0,
    };
  }

  createDirectory(uri: vscode.Uri): void {}

  readDirectory(uri: vscode.Uri): [string, vscode.FileType][] {
    return [];
  }

  async writeFile(uri: vscode.Uri) {
    await this._writeFile(uri);
  }

  async _writeFile(uri: vscode.Uri) {
    if (!this.files[uri.path]) {
      let args = uri.path.split('/');
      let port = process.platform === 'win32' ? args[1] : `/dev/${args[1]}`;
      let filepath = `/${args.slice(2).join('/')}`;
      const text = (await SerialManager.readFile(port, filepath)).toString();
      if (text === undefined) {
        vscode.window.showErrorMessage(`Open ${filepath} failed.`);
        return;
      }
      this.files[uri.path] = Buffer.from(text);
    }
  }

  rename(oldUri: vscode.Uri, newUri: vscode.Uri, options: { overwrite: boolean }): void {}

  delete(uri: vscode.Uri): void {}

  async saveFile(uri: vscode.Uri, text: string) {
    this.files[uri.path] = Buffer.from(text);
    let args = uri.path.split('/');
    let port = process.platform === 'win32' ? args[1] : `/dev/${args[1]}`;
    let filepath = `/${args.slice(2).join('/')}`;
    vscode.window.showWarningMessage(`Saving code, don't close the window.`);
    let r = await SerialManager.download(port, filepath, text, 0x01);
    //let r = await SerialManager.bulkDownload(port, filepath, text);
    if (r.toString().indexOf('done') >= 0) {
      vscode.window.showInformationMessage(`Saved ${filepath} successfully.`);
    } else {
      vscode.window.showErrorMessage(`Saved ${filepath} failed.`);
    }
  }
  removeCache(key: string) {
    delete this.files[key];
  }
}

export default new M5FileSystemProvider();
