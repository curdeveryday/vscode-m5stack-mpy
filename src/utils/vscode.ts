import * as vscode from 'vscode';

export const getSerialPortAndFileFromUri = (
  uri: vscode.Uri,
  platform: NodeJS.Platform
): { port: string; filepath: string } => {
  const args = uri.path.split('/');
  const port = platform === 'win32' ? args[1] : `/dev/${args[1]}`;
  const filepath = `/${args.slice(2).join('/')}`;

  return {
    port,
    filepath,
  };
};
