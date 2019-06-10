const serailportProvider = require('./serialport');
const vscode = require('vscode');

const M5FileSystemProvider = function() {
    let files = {};
    return {
		readFile: uri => {
			return new Uint8Array(files[uri.path]);
		},
		onDidChangeFile: () => {
			return null;
		},
		watch: () => {
            return null;
        },
		stat: uri => {
			return {
				type: 0,
				ctime: 0,
				mtime: Date.now(),
				size: 0
			}
		},
		createDirectory: uri => {
		},
		readDirectory: uri => {
			return [];
		},
		writeFile: async uri => {
            if(!files[uri.path]) {
                let args = uri.path.split('/');
                let port = process.platform == 'win32' ? args[1] : `/dev/${args[1]}`;
                let filepath = `/${args.slice(2).join('/')}`;
                let text = await serailportProvider.readFile(port, filepath);
                if(text === false) {
                    vscode.window.showErrorMessage(`Open ${filepath} failed.`);
                    return;
                }
                files[uri.path] = Buffer.from(text);
            }
		},
		rename: uri => {
            
		},
		delete: uri => {
            
        },
        saveFile: async (uri, text) => {
            files[uri.path] = Buffer.from(text);
            let args = uri.path.split('/');
            let port = process.platform == 'win32' ? args[1] : `/dev/${args[1]}`;
            let filepath = `/${args.slice(2).join('/')}`;
            vscode.window.showWarningMessage(`Saving code, don't close the window.`);
            let r = await serailportProvider.download(port, filepath, text, 0x01);
            if(r == 'done') {
                vscode.window.showInformationMessage(`Saved ${filepath} successfully.`);
            } else {
                vscode.window.showErrorMessage(`Saved ${filepath} failed.`);
            }
        },
        removeCache: (key) => {
            delete files[key];
        }
	};
}

module.exports = M5FileSystemProvider();