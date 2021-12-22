import * as vscode from 'vscode';
import SerialManager, { MAX_CHUNK_LENGTH } from '../serial/SerialManager';
import { getSerialPortAndFileFromUri } from '../utils/vscode';

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
      const { port, filepath } = getSerialPortAndFileFromUri(uri);
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
    try {
      this.files[uri.path] = Buffer.from(text);
      const { port, filepath } = getSerialPortAndFileFromUri(uri);
      return await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          cancellable: false,
          title: 'Saving code',
        },
        async (progress) => {
          progress.report({ increment: 0 });

          const numChunks = Math.ceil(text.length / MAX_CHUNK_LENGTH);

          let r = await SerialManager.bulkDownload(port, filepath, text, false, (chunkIdx) => {
            progress.report({ increment: (100 * chunkIdx) / numChunks });
          });

          if (r.toString().indexOf('done') >= 0) {
            progress.report({ increment: 100 });
          }

          return 1;
        }
      );
    } catch (e: any) {
      console.log('Error while saving', e.toString());
      return 0;
    }
  }
  removeCache(key: string) {
    delete this.files[key];
  }
}

export default new M5FileSystemProvider();
