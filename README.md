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

## Contributions

To verify changes of this plugin you build the plugin with

```
git clean -fdX
yarn cache clean
yarn
```

Then you start vscode with this directory as argument like this

```
code ./
```

Then you hit F5 and verify that it works.
See more on https://code.visualstudio.com/api
