import SerialConnection from './SerialConnection';
import { COMMAND_CODES } from './types';

type Connections = {
  [key: string]: SerialConnection;
};

class SerialManager {
  private m5: Connections;

  constructor() {
    this.m5 = {};
  }

  connect(com: string, openedCb: (err: unknown) => void) {
    console.log('opening connection', com);

    this.m5[com] = new SerialConnection(com, openedCb);
  }

  exec(com: string, code: string): Promise<Buffer> {
    return this.m5[com].sendCommand(COMMAND_CODES.exec, code);
  }

  listDir(com: string, dirname: string): Promise<Buffer> {
    return this.m5[com].sendCommand(COMMAND_CODES.listDir, dirname);
  }

  readFile(com: string, filename: string): Promise<Buffer> {
    return this.m5[com].sendCommand(COMMAND_CODES.getFile, filename);
  }

  download(
    com: string,
    filename: string,
    content: string | Buffer,
    flag: number,
    isBinary?: boolean
  ): Promise<Buffer> {
    const data = isBinary ? (content as Buffer) : Buffer.from(content);
    const buffer = Buffer.concat([
      Buffer.from([COMMAND_CODES.downloadFile]),
      Buffer.from(filename),
      Buffer.from([0x00]),
      Buffer.from([flag]),
      data,
    ]);
    return this.m5[com].sendCommandWithBuffer(buffer);
  }

  async bulkDownload(com: string, filename: string, content: string | Buffer, isBinary: boolean) {
    let dataChunks = [];
    let maxChunkLength = 1024; // * 15;
    if (content.length > maxChunkLength) {
      let part = Math.ceil(content.length / maxChunkLength);
      for (let i = 0; i < part; i++) {
        dataChunks[i] = content.slice(i * maxChunkLength, maxChunkLength * (i + 1));
      }
    }

    if (!dataChunks.length) {
      return this.download(com, filename, content, 0x01);
    } else {
      for (let i = 0; i < dataChunks.length; i++) {
        if (i === 0) {
          const create = await this.download(com, filename, dataChunks[i], 0x01, isBinary);
          continue;
        }
        const append = await this.download(com, filename, dataChunks[i], 0x00, isBinary);
      }
    }

    return Promise.resolve(Buffer.from('done'));
  }

  removeFile(com: string, filename: string) {
    return this.m5[com].sendCommand(COMMAND_CODES.removeFile, filename);
  }

  disconnect(com: string) {
    if (this.m5[com]) {
      this.m5[com].close((error?: Error | null) => {
        if (error) {
          console.log('Error while disconecting', error);
        }
        delete this.m5[com];
      });
    }
  }
}

export default new SerialManager();
