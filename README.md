# vscode-m5stack-mpy
A extension for M5Stack Micropython system.

## Features
- Write/Read files in M5Stack Device
- Syntax-highlighting
- Snippet
- Auto Completion
- Debugging

## Quick Start
- Install vscode-m5stack-mpy.
- Set M5Stack(UIFlow) in USB Mode.

![screenshot](./resources/quick-start-7.JPG)

- Click "Add M5Stack device" and select the correct serial port of M5Stack.

![screenshot](https://github.com/curdeveryday/vscode-m5stack-mpy/raw/master/resources/quick-start-1.png)

![screenshot](https://github.com/curdeveryday/vscode-m5stack-mpy/raw/master/resources/quick-start-2.png)

- Open M5Stack file tree. If Device resets, please click the refresh button to reopen the file tree.

![screenshot](https://github.com/curdeveryday/vscode-m5stack-mpy/raw/master/resources/quick-start-3.png)

- Editor a file.

![screenshot](https://github.com/curdeveryday/vscode-m5stack-mpy/raw/master/resources/quick-start-4.png)

- Run in M5Stack.

![screenshot](https://github.com/curdeveryday/vscode-m5stack-mpy/raw/master/resources/quick-start-5.png)

- Save file. You can press `ctrl + s` or click `File->Save` to save file.

![screenshot](https://github.com/curdeveryday/vscode-m5stack-mpy/raw/master/resources/quick-start-6.png)

## Uncompleted
- Auto Completion of Units and Modules.
- Display tips when hover on it.

## Development Notes
- When VSCode updates electron version, it should rebuild the serialport module in `/node_modules/@serialport/bingdings` and `/node_modules/usb-detection`. Move the new bingding.node and detection.node in `/node_modules/usb-native/native`.
```
node-gyp rebuild --target=${ELECTRON_VERSION} --arch=x64 --dist-url=https://atom.io/download/electron
```