/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(__webpack_require__(1));
const M5CompletionProvider_1 = __webpack_require__(2);
const M5FileSystemProvider_1 = __importDefault(__webpack_require__(3));
const PortList_1 = __importDefault(__webpack_require__(46));
// Extensions code samples
// https://github.com/microsoft/vscode-extension-samples
function activate(context) {
    console.log('Extension "vscode-m5stack-mpy" is now active!');
    const selectPorts = () => PortList_1.default.selectPorts();
    const openFile = (port, filepath) => PortList_1.default.readFile(port, filepath);
    const refreshTree = () => PortList_1.default.refreshTree();
    const createFile = (ev) => PortList_1.default.create(ev);
    const removeFile = (ev) => PortList_1.default.remove(ev);
    const uploadFile = (ev) => PortList_1.default.upload(ev);
    const run = () => PortList_1.default.run();
    context.subscriptions.push(vscode.commands.registerCommand('vscode-m5stack-mpyreader.selectPorts', selectPorts, context), vscode.commands.registerCommand('m5stack.refreshEntry', refreshTree, context), vscode.commands.registerCommand('extension.openSelection', openFile, context), vscode.commands.registerCommand('m5stack.addEntry', createFile, context), vscode.commands.registerCommand('m5stack.deleteEntry', removeFile, context), vscode.commands.registerCommand('m5stack.itemUpload', uploadFile, context), vscode.commands.registerCommand('m5stack.itemRun', run, context), vscode.workspace.registerFileSystemProvider('m5stackfs', M5FileSystemProvider_1.default), M5CompletionProvider_1.startProvider, M5CompletionProvider_1.endProvider);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

"use strict";
module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.endProvider = exports.startProvider = void 0;
const vscode = __importStar(__webpack_require__(1));
const variables = [];
const startProviderHandler = () => {
    const completions = [];
    /**
     * Button
     */
    completions[0] = new vscode.CompletionItem('btnA');
    completions[0].detail = 'ButtonA';
    completions[0].commitCharacters = ['.'];
    completions[1] = new vscode.CompletionItem('btnB');
    completions[1].detail = 'ButtonB';
    completions[1].commitCharacters = ['.'];
    completions[2] = new vscode.CompletionItem('btnC');
    completions[2].detail = 'ButtonC';
    completions[2].commitCharacters = ['.'];
    /**
     * Screen
     */
    completions[3] = new vscode.CompletionItem('setScreenColor', vscode.CompletionItemKind.Function);
    completions[3].detail = 'setScreenColor(color: int)';
    completions[3].documentation = new vscode.MarkdownString('Set Screen Color with RGB Hex value (0x000000 - 0xFFFFFF).');
    completions[3].insertText = new vscode.SnippetString('setScreenColor(${1:0x000000})');
    /**
     * Speaker
     */
    completions[4] = new vscode.CompletionItem('speaker', vscode.CompletionItemKind.Module);
    completions[4].detail = 'Speaker';
    completions[4].commitCharacters = ['.'];
    /**
     * RGB
     */
    completions[5] = new vscode.CompletionItem('rgb', vscode.CompletionItemKind.Module);
    completions[5].detail = 'Rgb';
    completions[5].commitCharacters = ['.'];
    /**
     * imu
     */
    completions[6] = new vscode.CompletionItem('imu', vscode.CompletionItemKind.Variable);
    completions[6].detail = 'imu';
    completions[6].documentation = new vscode.MarkdownString('Before use need to import module imu.\n\n```import imu```');
    completions[6].commitCharacters = ['.'];
    /**
     * Lcd
     */
    completions[7] = new vscode.CompletionItem('lcd', vscode.CompletionItemKind.Module);
    completions[7].detail = 'Lcd';
    completions[7].documentation = new vscode.MarkdownString('Module Lcd');
    completions[7].commitCharacters = ['.'];
    /**
     * Timer
     */
    completions[8] = new vscode.CompletionItem('wait', vscode.CompletionItemKind.Method);
    completions[8].detail = 'Delay few seconds.';
    completions[8].insertText = new vscode.SnippetString('wait(${1})');
    completions[9] = new vscode.CompletionItem('wait_ms', vscode.CompletionItemKind.Method);
    completions[9].detail = 'Delay few milliseconds.';
    completions[9].insertText = new vscode.SnippetString('wait_ms(${1})');
    completions[10] = new vscode.CompletionItem('time', vscode.CompletionItemKind.Module);
    completions[10].detail = 'Time';
    completions[10].commitCharacters = ['.'];
    /**
     * machine
     */
    completions[11] = new vscode.CompletionItem('machine', vscode.CompletionItemKind.Module);
    completions[11].detail = 'Machine';
    completions[11].commitCharacters = ['.'];
    /**
     * Auto add variable type
     */
    let variableCompletions = variables.map((item) => {
        let completion = new vscode.CompletionItem(item.varname, vscode.CompletionItemKind.TypeParameter);
        completion.detail = item.type;
        completion.commitCharacters = ['.'];
        return completion;
    });
    return completions.concat(variableCompletions);
};
const endProviderHandler = (document, position, token, context) => {
    let linePrefix = document.lineAt(position).text.substr(0, position.character);
    switch (true) {
        // Button
        case linePrefix.endsWith('btnA.'):
        case linePrefix.endsWith('btnB.'):
        case linePrefix.endsWith('btnC.'): {
            const completion0 = new vscode.CompletionItem('wasPressed', vscode.CompletionItemKind.Method);
            completion0.detail = 'wasPressed(event: func)';
            completion0.documentation = 'Set a event when the button was pressed.';
            completion0.insertText = new vscode.SnippetString('wasPressed(${1})');
            const completion1 = new vscode.CompletionItem('wasReleased', vscode.CompletionItemKind.Method);
            completion1.detail = 'wasReleased(event: func)';
            completion1.documentation = 'Set a event when the button was released.';
            completion1.insertText = new vscode.SnippetString('wasReleased(${1})');
            const completion2 = new vscode.CompletionItem('pressFor', vscode.CompletionItemKind.Method);
            completion2.detail = 'pressFor(interval: int|float, event: func)';
            completion2.documentation = 'Set a event when the button was pressed for a few millisecond.';
            completion2.insertText = new vscode.SnippetString('pressFor(${1})');
            const completion3 = new vscode.CompletionItem('wasDoublePress', vscode.CompletionItemKind.Method);
            completion3.detail = 'wasDoublePress(event: func)';
            completion3.documentation = 'Set a event when the button was double pressed.';
            completion3.insertText = new vscode.SnippetString('wasDoublePress(${1})');
            return [completion0, completion1, completion2, completion3];
        }
        // Speaker
        case linePrefix.endsWith('speaker.'): {
            let completion0 = new vscode.CompletionItem('tone', vscode.CompletionItemKind.Method);
            completion0.detail = 'tone(frequency: int, duration: int)';
            completion0.insertText = new vscode.SnippetString('tone(${1:1800}, ${2: 200})');
            let completion1 = new vscode.CompletionItem('sing', vscode.CompletionItemKind.Method);
            completion1.detail = 'sing(frequency: int, part: int|float)';
            completion1.insertText = new vscode.SnippetString('sing(${1:220}, ${2: 1})');
            let completion2 = new vscode.CompletionItem('setVolume', vscode.CompletionItemKind.Method);
            completion2.detail = 'setVolume(volume: int)';
            completion2.documentation = 'Set the volume of the speaker.';
            completion2.insertText = new vscode.SnippetString('setVolume(${1:1})');
            return [completion0, completion1, completion2];
        }
        // RGB
        case linePrefix.endsWith('rgb.'): {
            let completion0 = new vscode.CompletionItem('setColor', vscode.CompletionItemKind.Method);
            completion0.detail = 'setColor(index: int, color: int)';
            completion0.documentation = new vscode.MarkdownString('Set the `index` rgb to the `color`.');
            completion0.insertText = new vscode.SnippetString('setColor(${1:1}, ${2:0xFFFFFF})');
            let completion1 = new vscode.CompletionItem('setColorFrom', vscode.CompletionItemKind.Method);
            completion1.detail = 'setColorFrom(start: int, end: int, color: int)';
            completion1.documentation = new vscode.MarkdownString('Set the rgb between `start` and `end` to the `color`.');
            completion1.insertText = new vscode.SnippetString('setColorFrom(${1:1}, ${2:5}, ${3:0xFFFFFF})');
            let completion2 = new vscode.CompletionItem('setColorAll', vscode.CompletionItemKind.Method);
            completion2.detail = 'setColorAll(color: int)';
            completion2.documentation = new vscode.MarkdownString('Set all rgb to the `color`.');
            completion2.insertText = new vscode.SnippetString('setColorAll(${1:0xFFFFFF})');
            let completion3 = new vscode.CompletionItem('setBrightness', vscode.CompletionItemKind.Method);
            completion3.detail = 'setBrightness(brightness: int)';
            completion3.documentation = new vscode.MarkdownString('Set the brightness of rgb.');
            completion3.insertText = new vscode.SnippetString('setBrightness(${1:10})');
            return [completion0, completion1, completion2, completion3];
        }
        // imu
        case linePrefix.endsWith('imu.'): {
            let completion0 = new vscode.CompletionItem('IMU', vscode.CompletionItemKind.Constructor);
            completion0.detail = 'IMU()';
            completion0.documentation = 'Initance imu object';
            completion0.insertText = new vscode.SnippetString('IMU()');
            completion0.command = {
                command: 'm5py.add.type',
                arguments: ['imu', linePrefix, variables],
                title: 'trigger',
            };
            return [completion0];
        }
        // Lcd
        case linePrefix.endsWith('lcd.'): {
            let fonts = [
                'FONT_Default',
                'FONT_Default_Small',
                'FONT_DejaVu18',
                'FONT_DejaVu24',
                'FONT_DejaVu40',
                'FONT_DejaVu56',
                'FONT_DejaVu72',
                'FONT_Ubuntu',
                'FONT_Comic',
            ];
            let fontCompletion = fonts.map((font) => {
                let completion = new vscode.CompletionItem(font, vscode.CompletionItemKind.Constant);
                return completion;
            });
            let completion0 = new vscode.CompletionItem('clear', vscode.CompletionItemKind.Method);
            completion0.detail = 'clear(color?: int)';
            completion0.documentation = new vscode.MarkdownString('Clear screen by a color.\n\n@_param_ `color` —— The color of the screen, default value is black.');
            completion0.insertText = new vscode.SnippetString('clear(${1})');
            let completion1 = new vscode.CompletionItem('fill', vscode.CompletionItemKind.Method);
            completion1.detail = 'fill(color: int)';
            completion1.documentation = new vscode.MarkdownString('Fill screen by a color.\n\n@_param_ `color` —— The color of the screen.');
            completion1.insertText = new vscode.SnippetString('fill(${1})');
            let completion2 = new vscode.CompletionItem('print', vscode.CompletionItemKind.Method);
            completion2.detail = 'print(text: string, x: int, y: int, color: int)';
            completion2.documentation = new vscode.MarkdownString('Print text in screen.\n\n@_param_ `text` —— Text to display.\n\n@_param_ `x` —— The X coordinate of the text\n\n@_param_ `y` —— The Y coordinate of the text\n\n@_param_ `color` —— The color of the text');
            completion2.insertText = new vscode.SnippetString("print('${1}', ${2:0}, ${3:0}, ${4:0xFFFFFF})");
            let completion3 = new vscode.CompletionItem('font', vscode.CompletionItemKind.Method);
            completion3.detail = 'font(font: string)';
            completion3.documentation = new vscode.MarkdownString('Set font of the text.\n\n@_param_ `text` —— Text to display.\n\n@_param_ `font` —— Font type.There are `FONT_Default`, `FONT_Default_Small`, `FONT_DejaVu18`, `FONT_DejaVu24`, `FONT_DejaVu40`, `FONT_DejaVu56`, `FONT_DejaVu72`, `FONT_Ubuntu`, `FONT_Comic`');
            completion3.insertText = new vscode.SnippetString('font(lcd.${1|FONT_Default,FONT_Default_Small,FONT_DejaVu18,FONT_DejaVu24,FONT_DejaVu40,FONT_DejaVu56,FONT_DejaVu72,FONT_Ubuntu,FONT_Comic|})');
            let completion4 = new vscode.CompletionItem('pixel', vscode.CompletionItemKind.Method);
            completion4.detail = 'pixel(x: int, y: int, color: int)';
            completion4.documentation = new vscode.MarkdownString('Draw a pixel in screen.\n\n@_param_ `x` —— The X coordinate of the pixel.\n\n@_param_ `y` —— The Y coordinate of the pixel.\n\n@_param_ `color` —— The color of the pixel.');
            completion4.insertText = new vscode.SnippetString('pixel(${1:0}, ${2:0}, ${3:0xFFFFFF})');
            let completion5 = new vscode.CompletionItem('line', vscode.CompletionItemKind.Method);
            completion5.detail = 'line(x1: int, y1: int, x2: int, y2: int, color: int)';
            completion5.documentation = new vscode.MarkdownString('Draw a line in screen.\n\n@_param_ `x1` —— The X coordinate of the start point.\n\n@_param_ `y1` —— The Y coordinate of the start point.\n\n@_param_ `x2` —— The X coordinate of the end point.\n\n@_param_ `y2` —— The Y coordinate of the end point.\n\n@_param_ `color` —— The color of the line.');
            completion5.insertText = new vscode.SnippetString('line(${1:0}, ${2:0}, ${3:0}, ${4:0}, ${5:0xFFFFFF})');
            let completion6 = new vscode.CompletionItem('rect', vscode.CompletionItemKind.Method);
            completion6.detail = 'rect(x1: int, y1: int, x2: int, y2: int, color: int)';
            completion6.documentation = new vscode.MarkdownString('Draw a rectangle in screen.\n\n@_param_ `x1` —— The X coordinate of the start point.\n\n@_param_ `y1` —— The Y coordinate of the start point.\n\n@_param_ `x2` —— The X coordinate of the end point.\n\n@_param_ `y2` —— The Y coordinate of the end point.\n\n@_param_ `color` —— The color of the rectangle.');
            completion6.insertText = new vscode.SnippetString('rect(${1:0}, ${2:0}, ${3:0}, ${4:0}, ${5:0xFFFFFF})');
            let completion7 = new vscode.CompletionItem('triangle', vscode.CompletionItemKind.Method);
            completion7.detail = 'triangle(x: int, y: int, x1: int, y1: int, x2: int, y2: int, color: int)';
            completion7.documentation = new vscode.MarkdownString('Draw a triangle in screen.\n\n@_param_ `x` —— The X coordinate of the point A.\n\n@_param_ `y` —— The Y coordinate of the point A.\n\n@_param_ `x1` —— The X coordinate of the point B.\n\n@_param_ `y1` —— The Y coordinate of the point B.\n\n@_param_ `x2` —— The X coordinate of the point C.\n\n@_param_ `y2` —— The Y coordinate of the point C.\n\n@_param_ `color` —— The color of the triangle.');
            completion7.insertText = new vscode.SnippetString('triangle(${1:0}, ${2:0}, ${3:0}, ${4:0}, ${5:0}, ${6:0}, ${7:0xFFFFFF})');
            let completion8 = new vscode.CompletionItem('circle', vscode.CompletionItemKind.Method);
            completion8.detail = 'circle(x: int, y: int, radius: int, color: int)';
            completion8.documentation = new vscode.MarkdownString('Draw a circle in screen.\n\n@_param_ `x` —— The X coordinate of the centroid coordinates.\n\n@_param_ `y` —— The Y coordinate of the  centroid coordinates.\n\n@_param_ `radius` —— The radius of the circle.\n\n@_param_ `color` —— The color of the triangle.');
            completion8.insertText = new vscode.SnippetString('circle(${1:0}, ${2:0}, ${3:10}, ${7:0xFFFFFF})');
            let completion9 = new vscode.CompletionItem('ellipse', vscode.CompletionItemKind.Method);
            completion9.detail = 'ellipse(x: int, y: int, rx: int, ry: int, color: int)';
            completion9.documentation = new vscode.MarkdownString('Draw a ellipse in screen.');
            completion9.insertText = new vscode.SnippetString('ellipse(${1:0}, ${2:0}, ${3:0}, ${4:0}, ${5:0xFFFFFF})');
            let completion11 = new vscode.CompletionItem('arc', vscode.CompletionItemKind.Method);
            completion11.detail = 'arc(x: int, y: int, radius: int, thick: int, start: int, end: int, color: int)';
            completion11.documentation = new vscode.MarkdownString('Draw a arc in screen.');
            completion11.insertText = new vscode.SnippetString('arc(${1:0}, ${2:0}, ${3:0}, ${4:0}, ${5:0}, ${6:0}, ${7:0xFFFFFF})');
            let completion12 = new vscode.CompletionItem('polygon', vscode.CompletionItemKind.Method);
            completion12.detail = 'polygon(x: int, y: int, radius: int, sides: int, thick: int, color: int)';
            completion12.documentation = new vscode.MarkdownString('Draw a polygon in screen.');
            completion12.insertText = new vscode.SnippetString('polygon(${1:0}, ${2:0}, ${3:0}, ${4:0}, ${5:0}, ${6:0xFFFFFF})');
            return [
                completion0,
                completion1,
                completion2,
                completion3,
                completion4,
                completion5,
                completion6,
                completion7,
                completion8,
                completion9,
                completion11,
                completion12,
            ].concat(fontCompletion);
        }
        // Time
        case linePrefix.endsWith('time.'): {
            let completion0 = new vscode.CompletionItem('ticks_ms', vscode.CompletionItemKind.Method);
            completion0.detail = 'ticks_ms()';
            completion0.documentation = new vscode.MarkdownString('Get ticks by millisecond.');
            completion0.insertText = new vscode.SnippetString('ticks_ms()');
            return [completion0];
        }
        case linePrefix.endsWith('machine.'): {
            let completion0 = new vscode.CompletionItem('ADC', vscode.CompletionItemKind.Constructor);
            completion0.detail = 'ADC(pin: int)';
            completion0.documentation = new vscode.MarkdownString('Init a ADC object.\n\n@_param_ `pin` —— Pin value must be between 32 and 39');
            completion0.insertText = new vscode.SnippetString('ADC(${1})');
            let completion1 = new vscode.CompletionItem('DAC', vscode.CompletionItemKind.Constructor);
            completion1.detail = 'DAC(pin: int)';
            completion1.documentation = new vscode.MarkdownString('Init a DAC object.\n\n@_param_ `pin` —— Pin value only can be 25 or 26');
            completion1.insertText = new vscode.SnippetString('DAC(${1|25,26|})');
            let completion2 = new vscode.CompletionItem('UART', vscode.CompletionItemKind.Constructor);
            completion2.detail = 'UART()';
            completion2.documentation = new vscode.MarkdownString('Init a UART object.');
            completion2.insertText = new vscode.SnippetString('UART(1, tx=17, rx=16)');
            let completion3 = new vscode.CompletionItem('PWM', vscode.CompletionItemKind.Constructor);
            completion3.detail = 'PWM()';
            completion3.documentation = new vscode.MarkdownString('Init a PWM object.');
            completion3.insertText = new vscode.SnippetString('PWM(${1})');
            let completion4 = new vscode.CompletionItem('Pin', vscode.CompletionItemKind.Constructor);
            completion4.detail = 'Pin()';
            completion4.documentation = new vscode.MarkdownString('Init a Pin object.');
            completion4.insertText = new vscode.SnippetString('Pin(${1})');
            return [completion0, completion1, completion2, completion3, completion4];
        }
        default:
            break;
    }
    for (let i = 0; i < variables.length; i++) {
        switch (variables[i].type) {
            case 'imu':
                let completion0 = new vscode.CompletionItem('ypr', vscode.CompletionItemKind.Variable);
                completion0.detail = 'Array for Yaw, Pitch, Roll values';
                completion0.insertText = new vscode.SnippetString('ypr[${1|0,1,2|}]');
                let completion1 = new vscode.CompletionItem('acceleration', vscode.CompletionItemKind.Variable);
                completion1.detail = 'Array for acceleration Yaw, Pitch, Roll values';
                completion1.insertText = new vscode.SnippetString('acceleration[${1|0,1,2|}]');
                let completion2 = new vscode.CompletionItem('gyro', vscode.CompletionItemKind.Variable);
                completion2.detail = 'Array for gyro Yaw, Pitch, Roll values';
                completion2.insertText = new vscode.SnippetString('gyro[${1|0,1,2|}]');
                return [completion0, completion1, completion2];
        }
    }
    return undefined;
};
exports.startProvider = vscode.languages.registerCompletionItemProvider({ scheme: 'm5stackfs', language: 'python' }, { provideCompletionItems: startProviderHandler });
exports.endProvider = vscode.languages.registerCompletionItemProvider({ scheme: 'm5stackfs', language: 'python' }, { provideCompletionItems: endProviderHandler }, '.');


/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __importStar(__webpack_require__(1));
const SerialManager_1 = __importDefault(__webpack_require__(4));
class M5FileSystemProvider {
    constructor() {
        this.files = {};
        this._emitter = new vscode.EventEmitter();
        this.onDidChangeFile = this._emitter.event;
    }
    readFile(uri) {
        return new Uint8Array(this.files[uri.path]);
    }
    watch() {
        // ignore, fires for all changes...
        return new vscode.Disposable(() => { });
    }
    stat(uri) {
        return {
            type: 0,
            ctime: 0,
            mtime: Date.now(),
            size: 0,
        };
    }
    createDirectory(uri) { }
    readDirectory(uri) {
        return [];
    }
    writeFile(uri) {
        this._writeFile(uri);
    }
    async _writeFile(uri) {
        if (!this.files[uri.path]) {
            let args = uri.path.split('/');
            let port = process.platform === 'win32' ? args[1] : `/dev/${args[1]}`;
            let filepath = `/${args.slice(2).join('/')}`;
            const text = (await SerialManager_1.default.readFile(port, filepath)).toString();
            if (text === undefined) {
                vscode.window.showErrorMessage(`Open ${filepath} failed.`);
                return;
            }
            this.files[uri.path] = Buffer.from(text);
        }
    }
    rename(oldUri, newUri, options) { }
    delete(uri) { }
    async saveFile(uri, text) {
        this.files[uri.path] = Buffer.from(text);
        let args = uri.path.split('/');
        let port = process.platform === 'win32' ? args[1] : `/dev/${args[1]}`;
        let filepath = `/${args.slice(2).join('/')}`;
        vscode.window.showWarningMessage(`Saving code, don't close the window.`);
        let r = await SerialManager_1.default.download(port, filepath, text, 0x01);
        //let r = await SerialManager.bulkDownload(port, filepath, text);
        if (r.toString().indexOf('done') >= 0) {
            vscode.window.showInformationMessage(`Saved ${filepath} successfully.`);
        }
        else {
            vscode.window.showErrorMessage(`Saved ${filepath} failed.`);
        }
    }
    removeCache(key) {
        delete this.files[key];
    }
}
exports["default"] = new M5FileSystemProvider();


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const SerialConnection_1 = __importDefault(__webpack_require__(5));
const types_1 = __webpack_require__(45);
class SerialManager {
    constructor() {
        this.m5 = {};
    }
    connect(com, openedCb) {
        console.log('opening connection', com);
        this.m5[com] = new SerialConnection_1.default(com, openedCb);
    }
    exec(com, code) {
        return this.m5[com].sendCommand(types_1.COMMAND_CODES.exec, code);
    }
    listDir(com, dirname) {
        return this.m5[com].sendCommand(types_1.COMMAND_CODES.listDir, dirname);
    }
    readFile(com, filename) {
        return this.m5[com].sendCommand(types_1.COMMAND_CODES.getFile, filename);
    }
    download(com, filename, content, flag, isBinary) {
        const data = isBinary ? content : Buffer.from(content);
        const buffer = Buffer.concat([
            Buffer.from([types_1.COMMAND_CODES.downloadFile]),
            Buffer.from(filename),
            Buffer.from([0x00]),
            Buffer.from([flag]),
            data,
        ]);
        return this.m5[com].sendCommandWithBuffer(buffer);
    }
    async bulkDownload(com, filename, content, isBinary) {
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
        }
        else {
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
    removeFile(com, filename) {
        return this.m5[com].sendCommand(types_1.COMMAND_CODES.removeFile, filename);
    }
    disconnect(com) {
        if (this.m5[com]) {
            this.m5[com].close((error) => {
                if (error) {
                    console.log('Error while disconecting', error);
                }
                delete this.m5[com];
            });
        }
    }
}
exports["default"] = new SerialManager();


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const serialport_1 = __importDefault(__webpack_require__(6));
const Crc_1 = __importDefault(__webpack_require__(44));
const types_1 = __webpack_require__(45);
const comErroMessage = 'Communication error, sorry.';
class SerialConnection {
    constructor(tty, onOpenCb) {
        this.com = tty;
        this.port = new serialport_1.default(tty, types_1.defaultOpts);
        this.port.on('error', this.onError);
        this.port.on('open', this.onOpen.bind(this));
        this.port.on('data', this.onData.bind(this));
        this.received = Buffer.from([]);
        this.resolve = () => { };
        this.reject = () => { };
        this.onOpenCb = onOpenCb;
    }
    static getCOMs() {
        return new Promise((resolve) => {
            serialport_1.default.list().then((ports) => resolve(ports), (err) => resolve([]));
        });
    }
    sendCommand(code, data) {
        return this.sendCommandWithBuffer(Crc_1.default.createDataBuffer(code, data));
    }
    sendCommandWithBuffer(buffer) {
        this.received = Buffer.from([]);
        const self = this;
        return new Promise((resolve, reject) => {
            console.log('sending bytes', buffer);
            self.resolve = resolve;
            self.reject = reject;
            self.write(Crc_1.default.coverCrc(buffer));
        });
    }
    write(data) {
        try {
            this.port.write(data);
            this.port.drain((err) => {
                if (err) {
                    this.reject('drain error');
                    console.log('drain error', err);
                }
            });
        }
        catch (e) {
            this.reject('write error');
        }
    }
    onData(chunk) {
        this.received = Buffer.concat([this.received, chunk]);
        // DOES NOT SEEM TO BE USEFUL CHECK
        // if (this.received.slice(0, 3).compare(Buffer.from(HEAD_DATA)) !== 0) {
        //   console.log('[Error] boot start failed.');
        //   this.reject(comErroMessage);
        //   return;
        // }
        if (Crc_1.default.checkReceiveCompleted(this.received)) {
            if (this.received[4] === 0x00) {
                const buf = this.received.slice(5, -5);
                this.resolve(buf);
            }
            else {
                this.reject(comErroMessage);
            }
        }
    }
    onError(err) {
        console.log(err);
    }
    onOpen(err) {
        if (!err) {
            console.log(`opened connection on ${this.com}`);
            this.onOpenCb(err);
        }
    }
    close(cb) {
        this.port.close(cb);
    }
    chunk(buf, maxBytes) {
        const result = [];
        while (buf.length) {
            let i = buf.lastIndexOf(32, maxBytes + 1);
            // If no space found, try forward search
            if (i < 0) {
                i = buf.indexOf(32, maxBytes);
            }
            // If there's no space at all, take the whole string
            if (i < 0) {
                i = buf.length;
            }
            // This is a safe cut-off point; never half-way a multi-byte
            result.push(buf.slice(0, i));
            buf = buf.slice(i + 1); // Skip space (if any)
        }
        return result;
    }
}
exports["default"] = SerialConnection;


/***/ }),
/* 6 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SerialPort = __webpack_require__(7)
const Binding = __webpack_require__(19)
const parsers = __webpack_require__(38)

/**
 * @type {AbstractBinding}
 */
SerialPort.Binding = Binding

/**
 * @type {Parsers}
 */
SerialPort.parsers = parsers

module.exports = SerialPort


/***/ }),
/* 7 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const stream = __webpack_require__(8)
const util = __webpack_require__(9)
const debug = __webpack_require__(10)('serialport/stream')

//  VALIDATION
const DATABITS = Object.freeze([5, 6, 7, 8])
const STOPBITS = Object.freeze([1, 1.5, 2])
const PARITY = Object.freeze(['none', 'even', 'mark', 'odd', 'space'])
const FLOWCONTROLS = Object.freeze(['xon', 'xoff', 'xany', 'rtscts'])

const defaultSettings = Object.freeze({
  autoOpen: true,
  endOnClose: false,
  baudRate: 9600,
  dataBits: 8,
  hupcl: true,
  lock: true,
  parity: 'none',
  rtscts: false,
  stopBits: 1,
  xany: false,
  xoff: false,
  xon: false,
  highWaterMark: 64 * 1024,
})

const defaultSetFlags = Object.freeze({
  brk: false,
  cts: false,
  dtr: true,
  dts: false,
  rts: true,
})

function allocNewReadPool(poolSize) {
  const pool = Buffer.allocUnsafe(poolSize)
  pool.used = 0
  return pool
}

/**
 * A callback called with an error or null.
 * @typedef {function} errorCallback
 * @param {?error} error
 */

/**
 * A callback called with an error or an object with the modem line values (cts, dsr, dcd).
 * @typedef {function} modemBitsCallback
 * @param {?error} error
 * @param {?object} status
 * @param {boolean} [status.cts=false]
 * @param {boolean} [status.dsr=false]
 * @param {boolean} [status.dcd=false]
 */

/**
 * @typedef {Object} openOptions
 * @property {boolean} [autoOpen=true] Automatically opens the port on `nextTick`.
 * @property {number=} [baudRate=9600] The baud rate of the port to be opened. This should match one of the commonly available baud rates, such as 110, 300, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, or 115200. Custom rates are supported best effort per platform. The device connected to the serial port is not guaranteed to support the requested baud rate, even if the port itself supports that baud rate.
 * @property {number} [dataBits=8] Must be one of these: 8, 7, 6, or 5.
 * @property {number} [highWaterMark=65536] The size of the read and write buffers defaults to 64k.
 * @property {boolean} [lock=true] Prevent other processes from opening the port. Windows does not currently support `false`.
 * @property {number} [stopBits=1] Must be one of these: 1 or 2.
 * @property {string} [parity=none] Must be one of these: 'none', 'even', 'mark', 'odd', 'space'.
 * @property {boolean} [rtscts=false] flow control setting
 * @property {boolean} [xon=false] flow control setting
 * @property {boolean} [xoff=false] flow control setting
 * @property {boolean} [xany=false] flow control setting
 * @property {object=} bindingOptions sets binding-specific options
 * @property {Binding=} binding The hardware access binding. `Bindings` are how Node-Serialport talks to the underlying system. By default we auto detect Windows (`WindowsBinding`), Linux (`LinuxBinding`) and OS X (`DarwinBinding`) and load the appropriate module for your system.
 * @property {number} [bindingOptions.vmin=1] see [`man termios`](http://linux.die.net/man/3/termios) LinuxBinding and DarwinBinding
 * @property {number} [bindingOptions.vtime=0] see [`man termios`](http://linux.die.net/man/3/termios) LinuxBinding and DarwinBinding
 */

/**
 * Create a new serial port object for the `path`. In the case of invalid arguments or invalid options, when constructing a new SerialPort it will throw an error. The port will open automatically by default, which is the equivalent of calling `port.open(openCallback)` in the next tick. You can disable this by setting the option `autoOpen` to `false`.
 * @class SerialPort
 * @param {string} path - The system path of the serial port you want to open. For example, `/dev/tty.XXX` on Mac/Linux, or `COM1` on Windows.
 * @param {openOptions=} options - Port configuration options
 * @param {errorCallback=} openCallback - Called after a connection is opened. If this is not provided and an error occurs, it will be emitted on the port's `error` event. The callback will NOT be called if `autoOpen` is set to `false` in the `openOptions` as the open will not be performed.
 * @property {number} baudRate The port's baudRate. Use `.update` to change it. Read-only.
 * @property {object} binding The binding object backing the port. Read-only.
 * @property {boolean} isOpen `true` if the port is open, `false` otherwise. Read-only. (`since 5.0.0`)
 * @property {string} path The system path or name of the serial port. Read-only.
 * @throws {TypeError} When given invalid arguments, a `TypeError` will be thrown.
 * @emits open
 * @emits data
 * @emits close
 * @emits error
 * @alias module:serialport
 */
function SerialPort(path, options, openCallback) {
  if (!(this instanceof SerialPort)) {
    return new SerialPort(path, options, openCallback)
  }

  if (options instanceof Function) {
    openCallback = options
    options = {}
  }

  const settings = { ...defaultSettings, ...options }

  stream.Duplex.call(this, {
    highWaterMark: settings.highWaterMark,
  })

  const Binding = settings.binding || SerialPort.Binding

  if (!Binding) {
    throw new TypeError('"Bindings" is invalid pass it as `options.binding` or set it on `SerialPort.Binding`')
  }

  if (!path) {
    throw new TypeError(`"path" is not defined: ${path}`)
  }

  if (settings.baudrate) {
    throw new TypeError(`"baudrate" is an unknown option, did you mean "baudRate"?`)
  }

  if (typeof settings.baudRate !== 'number') {
    throw new TypeError(`"baudRate" must be a number: ${settings.baudRate}`)
  }

  if (DATABITS.indexOf(settings.dataBits) === -1) {
    throw new TypeError(`"databits" is invalid: ${settings.dataBits}`)
  }

  if (STOPBITS.indexOf(settings.stopBits) === -1) {
    throw new TypeError(`"stopbits" is invalid: ${settings.stopbits}`)
  }

  if (PARITY.indexOf(settings.parity) === -1) {
    throw new TypeError(`"parity" is invalid: ${settings.parity}`)
  }

  FLOWCONTROLS.forEach(control => {
    if (typeof settings[control] !== 'boolean') {
      throw new TypeError(`"${control}" is not boolean: ${settings[control]}`)
    }
  })

  const binding = new Binding({
    bindingOptions: settings.bindingOptions,
  })

  Object.defineProperties(this, {
    binding: {
      enumerable: true,
      value: binding,
    },
    path: {
      enumerable: true,
      value: path,
    },
    settings: {
      enumerable: true,
      value: settings,
    },
  })

  this.opening = false
  this.closing = false
  this._pool = allocNewReadPool(this.settings.highWaterMark)
  this._kMinPoolSpace = 128

  if (this.settings.autoOpen) {
    this.open(openCallback)
  }
}

util.inherits(SerialPort, stream.Duplex)

Object.defineProperties(SerialPort.prototype, {
  isOpen: {
    enumerable: true,
    get() {
      return this.binding.isOpen && !this.closing
    },
  },
  baudRate: {
    enumerable: true,
    get() {
      return this.settings.baudRate
    },
  },
})

/**
 * The `error` event's callback is called with an error object whenever there is an error.
 * @event error
 */

SerialPort.prototype._error = function (error, callback) {
  if (callback) {
    callback.call(this, error)
  } else {
    this.emit('error', error)
  }
}

SerialPort.prototype._asyncError = function (error, callback) {
  process.nextTick(() => this._error(error, callback))
}

/**
 * The `open` event's callback is called with no arguments when the port is opened and ready for writing. This happens if you have the constructor open immediately (which opens in the next tick) or if you open the port manually with `open()`. See [Useage/Opening a Port](#opening-a-port) for more information.
 * @event open
 */

/**
 * Opens a connection to the given serial port.
 * @param {errorCallback=} openCallback - Called after a connection is opened. If this is not provided and an error occurs, it will be emitted on the port's `error` event.
 * @emits open
 * @returns {undefined}
 */
SerialPort.prototype.open = function (openCallback) {
  if (this.isOpen) {
    return this._asyncError(new Error('Port is already open'), openCallback)
  }

  if (this.opening) {
    return this._asyncError(new Error('Port is opening'), openCallback)
  }

  this.opening = true
  debug('opening', `path: ${this.path}`)
  this.binding.open(this.path, this.settings).then(
    () => {
      debug('opened', `path: ${this.path}`)
      this.opening = false
      this.emit('open')
      if (openCallback) {
        openCallback.call(this, null)
      }
    },
    err => {
      this.opening = false
      debug('Binding #open had an error', err)
      this._error(err, openCallback)
    }
  )
}

/**
 * Changes the baud rate for an open port. Throws if you provide a bad argument. Emits an error or calls the callback if the baud rate isn't supported.
 * @param {object=} options Only supports `baudRate`.
 * @param {number=} [options.baudRate] The baud rate of the port to be opened. This should match one of the commonly available baud rates, such as 110, 300, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, or 115200. Custom rates are supported best effort per platform. The device connected to the serial port is not guaranteed to support the requested baud rate, even if the port itself supports that baud rate.
 * @param {errorCallback=} [callback] Called once the port's baud rate changes. If `.update` is called without a callback, and there is an error, an error event is emitted.
 * @returns {undefined}
 */
SerialPort.prototype.update = function (options, callback) {
  if (typeof options !== 'object') {
    throw TypeError('"options" is not an object')
  }

  if (!this.isOpen) {
    debug('update attempted, but port is not open')
    return this._asyncError(new Error('Port is not open'), callback)
  }

  const settings = { ...defaultSettings, ...options }
  this.settings.baudRate = settings.baudRate

  debug('update', `baudRate: ${settings.baudRate}`)
  this.binding.update(this.settings).then(
    () => {
      debug('binding.update', 'finished')
      if (callback) {
        callback.call(this, null)
      }
    },
    err => {
      debug('binding.update', 'error', err)
      return this._error(err, callback)
    }
  )
}

/**
 * Writes data to the given serial port. Buffers written data if the port is not open.

The write operation is non-blocking. When it returns, data might still not have been written to the serial port. See `drain()`.

Some devices, like the Arduino, reset when you open a connection to them. In such cases, immediately writing to the device will cause lost data as they wont be ready to receive the data. This is often worked around by having the Arduino send a "ready" byte that your Node program waits for before writing. You can also often get away with waiting around 400ms.

If a port is disconnected during a write, the write will error in addition to the `close` event.

From the [stream docs](https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback) write errors don't always provide the error in the callback, sometimes they use the error event.
> If an error occurs, the callback may or may not be called with the error as its first argument. To reliably detect write errors, add a listener for the 'error' event.

In addition to the usual `stream.write` arguments (`String` and `Buffer`), `write()` can accept arrays of bytes (positive numbers under 256) which is passed to `Buffer.from([])` for conversion. This extra functionality is pretty sweet.
 * @method SerialPort.prototype.write
 * @param  {(string|array|buffer)} data Accepts a [`Buffer`](http://nodejs.org/api/buffer.html) object, or a type that is accepted by the `Buffer` constructor (e.g. an array of bytes or a string).
 * @param  {string=} encoding The encoding, if chunk is a string. Defaults to `'utf8'`. Also accepts `'ascii'`, `'base64'`, `'binary'`, and `'hex'` See [Buffers and Character Encodings](https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings) for all available options.
 * @param  {function=} callback Called once the write operation finishes. Data may not yet be flushed to the underlying port. No arguments.
 * @returns {boolean} `false` if the stream wishes for the calling code to wait for the `'drain'` event to be emitted before continuing to write additional data; otherwise `true`.
 * @since 5.0.0
 */
const superWrite = SerialPort.prototype.write
SerialPort.prototype.write = function (data, encoding, callback) {
  if (Array.isArray(data)) {
    data = Buffer.from(data)
  }
  return superWrite.call(this, data, encoding, callback)
}

SerialPort.prototype._write = function (data, encoding, callback) {
  if (!this.isOpen) {
    return this.once('open', function afterOpenWrite() {
      this._write(data, encoding, callback)
    })
  }
  debug('_write', `${data.length} bytes of data`)
  this.binding.write(data).then(
    () => {
      debug('binding.write', 'write finished')
      callback(null)
    },
    err => {
      debug('binding.write', 'error', err)
      if (!err.canceled) {
        this._disconnected(err)
      }
      callback(err)
    }
  )
}

SerialPort.prototype._writev = function (data, callback) {
  debug('_writev', `${data.length} chunks of data`)
  const dataV = data.map(write => write.chunk)
  this._write(Buffer.concat(dataV), null, callback)
}

/**
 * Request a number of bytes from the SerialPort. The `read()` method pulls some data out of the internal buffer and returns it. If no data is available to be read, null is returned. By default, the data is returned as a `Buffer` object unless an encoding has been specified using the `.setEncoding()` method.
 * @method SerialPort.prototype.read
 * @param {number=} size Specify how many bytes of data to return, if available
 * @returns {(string|Buffer|null)} The data from internal buffers
 * @since 5.0.0
 */

/**
 * Listening for the `data` event puts the port in flowing mode. Data is emitted as soon as it's received. Data is a `Buffer` object with a varying amount of data in it. The `readLine` parser converts the data into string lines. See the [parsers](https://serialport.io/docs/api-parsers-overview) section for more information on parsers, and the [Node.js stream documentation](https://nodejs.org/api/stream.html#stream_event_data) for more information on the data event.
 * @event data
 */

SerialPort.prototype._read = function (bytesToRead) {
  if (!this.isOpen) {
    debug('_read', 'queueing _read for after open')
    this.once('open', () => {
      this._read(bytesToRead)
    })
    return
  }

  if (!this._pool || this._pool.length - this._pool.used < this._kMinPoolSpace) {
    debug('_read', 'discarding the read buffer pool because it is below kMinPoolSpace')
    this._pool = allocNewReadPool(this.settings.highWaterMark)
  }

  // Grab another reference to the pool in the case that while we're
  // in the thread pool another read() finishes up the pool, and
  // allocates a new one.
  const pool = this._pool
  // Read the smaller of rest of the pool or however many bytes we want
  const toRead = Math.min(pool.length - pool.used, bytesToRead)
  const start = pool.used

  // the actual read.
  debug('_read', `reading`, { start, toRead })
  this.binding.read(pool, start, toRead).then(
    ({ bytesRead }) => {
      debug('binding.read', `finished`, { bytesRead })
      // zero bytes means read means we've hit EOF? Maybe this should be an error
      if (bytesRead === 0) {
        debug('binding.read', 'Zero bytes read closing readable stream')
        this.push(null)
        return
      }
      pool.used += bytesRead
      this.push(pool.slice(start, start + bytesRead))
    },
    err => {
      debug('binding.read', `error`, err)
      if (!err.canceled) {
        this._disconnected(err)
      }
      this._read(bytesToRead) // prime to read more once we're reconnected
    }
  )
}

SerialPort.prototype._disconnected = function (err) {
  if (!this.isOpen) {
    debug('disconnected aborted because already closed', err)
    return
  }
  debug('disconnected', err)
  err.disconnected = true
  this.close(null, err)
}

/**
 * The `close` event's callback is called with no arguments when the port is closed. In the case of a disconnect it will be called with a Disconnect Error object (`err.disconnected == true`). In the event of a close error (unlikely), an error event is triggered.
 * @event close
 */

/**
 * Closes an open connection.
 *
 * If there are in progress writes when the port is closed the writes will error.
 * @param {errorCallback} callback Called once a connection is closed.
 * @param {Error} disconnectError used internally to propagate a disconnect error
 * @emits close
 * @returns {undefined}
 */
SerialPort.prototype.close = function (callback, disconnectError) {
  disconnectError = disconnectError || null

  if (!this.isOpen) {
    debug('close attempted, but port is not open')
    return this._asyncError(new Error('Port is not open'), callback)
  }

  this.closing = true
  debug('#close')
  this.binding.close().then(
    () => {
      this.closing = false
      debug('binding.close', 'finished')
      this.emit('close', disconnectError)
      if (this.settings.endOnClose) {
        this.emit('end')
      }
      if (callback) {
        callback.call(this, disconnectError)
      }
    },
    err => {
      this.closing = false
      debug('binding.close', 'had an error', err)
      return this._error(err, callback)
    }
  )
}

/**
 * Set control flags on an open port. Uses [`SetCommMask`](https://msdn.microsoft.com/en-us/library/windows/desktop/aa363257(v=vs.85).aspx) for Windows and [`ioctl`](http://linux.die.net/man/4/tty_ioctl) for OS X and Linux.
 * @param {object=} options All options are operating system default when the port is opened. Every flag is set on each call to the provided or default values. If options isn't provided default options is used.
 * @param {Boolean} [options.brk=false] sets the brk flag
 * @param {Boolean} [options.cts=false] sets the cts flag
 * @param {Boolean} [options.dsr=false] sets the dsr flag
 * @param {Boolean} [options.dtr=true] sets the dtr flag
 * @param {Boolean} [options.rts=true] sets the rts flag
 * @param {errorCallback=} callback Called once the port's flags have been set.
 * @since 5.0.0
 * @returns {undefined}
 */
SerialPort.prototype.set = function (options, callback) {
  if (typeof options !== 'object') {
    throw TypeError('"options" is not an object')
  }

  if (!this.isOpen) {
    debug('set attempted, but port is not open')
    return this._asyncError(new Error('Port is not open'), callback)
  }

  const settings = { ...defaultSetFlags, ...options }
  debug('#set', settings)
  this.binding.set(settings).then(
    () => {
      debug('binding.set', 'finished')
      if (callback) {
        callback.call(this, null)
      }
    },
    err => {
      debug('binding.set', 'had an error', err)
      return this._error(err, callback)
    }
  )
}

/**
 * Returns the control flags (CTS, DSR, DCD) on the open port.
 * Uses [`GetCommModemStatus`](https://msdn.microsoft.com/en-us/library/windows/desktop/aa363258(v=vs.85).aspx) for Windows and [`ioctl`](http://linux.die.net/man/4/tty_ioctl) for mac and linux.
 * @param {modemBitsCallback=} callback Called once the modem bits are retrieved.
 * @returns {undefined}
 */
SerialPort.prototype.get = function (callback) {
  if (!this.isOpen) {
    debug('get attempted, but port is not open')
    return this._asyncError(new Error('Port is not open'), callback)
  }

  debug('#get')
  this.binding.get().then(
    status => {
      debug('binding.get', 'finished')
      if (callback) {
        callback.call(this, null, status)
      }
    },
    err => {
      debug('binding.get', 'had an error', err)
      return this._error(err, callback)
    }
  )
}

/**
 * Flush discards data received but not read, and written but not transmitted by the operating system. For more technical details, see [`tcflush(fd, TCIOFLUSH)`](http://linux.die.net/man/3/tcflush) for Mac/Linux and [`FlushFileBuffers`](http://msdn.microsoft.com/en-us/library/windows/desktop/aa364439) for Windows.
 * @param  {errorCallback=} callback Called once the flush operation finishes.
 * @returns {undefined}
 */
SerialPort.prototype.flush = function (callback) {
  if (!this.isOpen) {
    debug('flush attempted, but port is not open')
    return this._asyncError(new Error('Port is not open'), callback)
  }

  debug('#flush')
  this.binding.flush().then(
    () => {
      debug('binding.flush', 'finished')
      if (callback) {
        callback.call(this, null)
      }
    },
    err => {
      debug('binding.flush', 'had an error', err)
      return this._error(err, callback)
    }
  )
}

/**
 * Waits until all output data is transmitted to the serial port. After any pending write has completed it calls [`tcdrain()`](http://linux.die.net/man/3/tcdrain) or [FlushFileBuffers()](https://msdn.microsoft.com/en-us/library/windows/desktop/aa364439(v=vs.85).aspx) to ensure it has been written to the device.
 * @param {errorCallback=} callback Called once the drain operation returns.
 * @returns {undefined}
 * @example
Write the `data` and wait until it has finished transmitting to the target serial port before calling the callback. This will queue until the port is open and writes are finished.

```js
function writeAndDrain (data, callback) {
  port.write(data);
  port.drain(callback);
}
```
 */
SerialPort.prototype.drain = function (callback) {
  debug('drain')
  if (!this.isOpen) {
    debug('drain queuing on port open')
    return this.once('open', () => {
      this.drain(callback)
    })
  }
  this.binding.drain().then(
    () => {
      debug('binding.drain', 'finished')
      if (callback) {
        callback.call(this, null)
      }
    },
    err => {
      debug('binding.drain', 'had an error', err)
      return this._error(err, callback)
    }
  )
}

/**
 * The `pause()` method causes a stream in flowing mode to stop emitting 'data' events, switching out of flowing mode. Any data that becomes available remains in the internal buffer.
 * @method SerialPort.prototype.pause
 * @see resume
 * @since 5.0.0
 * @returns `this`
 */

/**
 * The `resume()` method causes an explicitly paused, `Readable` stream to resume emitting 'data' events, switching the stream into flowing mode.
 * @method SerialPort.prototype.resume
 * @see pause
 * @since 5.0.0
 * @returns `this`
 */

/**
 * Retrieves a list of available serial ports with metadata. Only the `path` is guaranteed. If unavailable the other fields will be undefined. The `path` is either the path or an identifier (eg `COM1`) used to open the SerialPort.
 *
 * We make an effort to identify the hardware attached and have consistent results between systems. Linux and OS X are mostly consistent. Windows relies on 3rd party device drivers for the information and is unable to guarantee the information. On windows If you have a USB connected device can we provide a serial number otherwise it will be `undefined`. The `pnpId` and `locationId` are not the same or present on all systems. The examples below were run with the same Arduino Uno.
 * @type {function}
 * @returns {Promise} Resolves with the list of available serial ports.
 * @example
```js
// OSX example port
{
  path: '/dev/tty.usbmodem1421',
  manufacturer: 'Arduino (www.arduino.cc)',
  serialNumber: '752303138333518011C1',
  pnpId: undefined,
  locationId: '14500000',
  productId: '0043',
  vendorId: '2341'
}

// Linux example port
{
  path: '/dev/ttyACM0',
  manufacturer: 'Arduino (www.arduino.cc)',
  serialNumber: '752303138333518011C1',
  pnpId: 'usb-Arduino__www.arduino.cc__0043_752303138333518011C1-if00',
  locationId: undefined,
  productId: '0043',
  vendorId: '2341'
}

// Windows example port
{
  path: 'COM3',
  manufacturer: 'Arduino LLC (www.arduino.cc)',
  serialNumber: '752303138333518011C1',
  pnpId: 'USB\\VID_2341&PID_0043\\752303138333518011C1',
  locationId: 'Port_#0003.Hub_#0001',
  productId: '0043',
  vendorId: '2341'
}
```

```js
var SerialPort = require('serialport');

// promise approach
SerialPort.list()
  .then(ports) {...});
  .catch(err) {...});
```
 */
SerialPort.list = async function (callback) {
  debug('.list')
  if (!SerialPort.Binding) {
    throw new TypeError('No Binding set on `SerialPort.Binding`')
  }
  if (callback) {
    throw new TypeError('SerialPort.list no longer takes a callback and only returns a promise')
  }
  return SerialPort.Binding.list()
}

module.exports = SerialPort


/***/ }),
/* 8 */
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),
/* 9 */
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),
/* 10 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = __webpack_require__(11);
} else {
	module.exports = __webpack_require__(14);
}


/***/ }),
/* 11 */
/***/ ((module, exports, __webpack_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(12)(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),
/* 12 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(13);
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),
/* 13 */
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),
/* 14 */
/***/ ((module, exports, __webpack_require__) => {

/**
 * Module dependencies.
 */

const tty = __webpack_require__(15);
const util = __webpack_require__(9);

/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util.deprecate(
	() => {},
	'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
);

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = __webpack_require__(16);

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty.isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util.format(...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = __webpack_require__(12)(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts)
		.split('\n')
		.map(str => str.trim())
		.join(' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts);
};


/***/ }),
/* 15 */
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),
/* 16 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const os = __webpack_require__(17);
const tty = __webpack_require__(15);
const hasFlag = __webpack_require__(18);

const {env} = process;

let flagForceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false') ||
	hasFlag('color=never')) {
	flagForceColor = 0;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	flagForceColor = 1;
}

function envForceColor() {
	if ('FORCE_COLOR' in env) {
		if (env.FORCE_COLOR === 'true') {
			return 1;
		}

		if (env.FORCE_COLOR === 'false') {
			return 0;
		}

		return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(haveStream, {streamIsTTY, sniffFlags = true} = {}) {
	const noFlagForceColor = envForceColor();
	if (noFlagForceColor !== undefined) {
		flagForceColor = noFlagForceColor;
	}

	const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;

	if (forceColor === 0) {
		return 0;
	}

	if (sniffFlags) {
		if (hasFlag('color=16m') ||
			hasFlag('color=full') ||
			hasFlag('color=truecolor')) {
			return 3;
		}

		if (hasFlag('color=256')) {
			return 2;
		}
	}

	if (haveStream && !streamIsTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process.platform === 'win32') {
		// Windows 10 build 10586 is the first Windows release that supports 256 colors.
		// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE', 'DRONE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = Number.parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function getSupportLevel(stream, options = {}) {
	const level = supportsColor(stream, {
		streamIsTTY: stream && stream.isTTY,
		...options
	});

	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel({isTTY: tty.isatty(1)}),
	stderr: getSupportLevel({isTTY: tty.isatty(2)})
};


/***/ }),
/* 17 */
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),
/* 18 */
/***/ ((module) => {

"use strict";


module.exports = (flag, argv = process.argv) => {
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const position = argv.indexOf(prefix + flag);
	const terminatorPosition = argv.indexOf('--');
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};


/***/ }),
/* 19 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(10)('serialport/bindings')

switch (process.platform) {
  case 'win32':
    debug('loading WindowsBinding')
    module.exports = __webpack_require__(20)
    break
  case 'darwin':
    debug('loading DarwinBinding')
    module.exports = __webpack_require__(28)
    break
  default:
    debug('loading LinuxBinding')
    module.exports = __webpack_require__(33)
}


/***/ }),
/* 20 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const binding = __webpack_require__(21)('bindings.node')
const AbstractBinding = __webpack_require__(25)
const { promisify } = __webpack_require__(9)
const serialNumParser = __webpack_require__(26)

const asyncList = promisify(binding.list)
const asyncOpen = promisify(binding.open)
const asyncClose = promisify(binding.close)
const asyncRead = promisify(binding.read)
const asyncWrite = promisify(binding.write)
const asyncUpdate = promisify(binding.update)
const asyncSet = promisify(binding.set)
const asyncGet = promisify(binding.get)
const asyncGetBaudRate = promisify(binding.getBaudRate)
const asyncDrain = promisify(binding.drain)
const asyncFlush = promisify(binding.flush)
const { wrapWithHiddenComName } = __webpack_require__(27)

/**
 * The Windows binding layer
 */
class WindowsBinding extends AbstractBinding {
  static async list() {
    const ports = await asyncList()
    // Grab the serial number from the pnp id
    return wrapWithHiddenComName(
      ports.map(port => {
        if (port.pnpId && !port.serialNumber) {
          const serialNumber = serialNumParser(port.pnpId)
          if (serialNumber) {
            return {
              ...port,
              serialNumber,
            }
          }
        }
        return port
      })
    )
  }

  constructor(opt = {}) {
    super(opt)
    this.bindingOptions = { ...opt.bindingOptions }
    this.fd = null
    this.writeOperation = null
  }

  get isOpen() {
    return this.fd !== null
  }

  async open(path, options) {
    await super.open(path, options)
    this.openOptions = { ...this.bindingOptions, ...options }
    const fd = await asyncOpen(path, this.openOptions)
    this.fd = fd
  }

  async close() {
    await super.close()
    const fd = this.fd
    this.fd = null
    return asyncClose(fd)
  }

  async read(buffer, offset, length) {
    await super.read(buffer, offset, length)
    try {
      const bytesRead = await asyncRead(this.fd, buffer, offset, length)
      return { bytesRead, buffer }
    } catch (err) {
      if (!this.isOpen) {
        err.canceled = true
      }
      throw err
    }
  }

  async write(buffer) {
    this.writeOperation = super.write(buffer).then(async () => {
      if (buffer.length === 0) {
        return
      }
      await asyncWrite(this.fd, buffer)
      this.writeOperation = null
    })
    return this.writeOperation
  }

  async update(options) {
    await super.update(options)
    return asyncUpdate(this.fd, options)
  }

  async set(options) {
    await super.set(options)
    return asyncSet(this.fd, options)
  }

  async get() {
    await super.get()
    return asyncGet(this.fd)
  }

  async getBaudRate() {
    await super.get()
    return asyncGetBaudRate(this.fd)
  }

  async drain() {
    await super.drain()
    await this.writeOperation
    return asyncDrain(this.fd)
  }

  async flush() {
    await super.flush()
    return asyncFlush(this.fd)
  }
}

module.exports = WindowsBinding


/***/ }),
/* 21 */
/***/ ((module, exports, __webpack_require__) => {

/**
 * Module dependencies.
 */

var fs = __webpack_require__(22),
  path = __webpack_require__(23),
  fileURLToPath = __webpack_require__(24),
  join = path.join,
  dirname = path.dirname,
  exists =
    (fs.accessSync &&
      function(path) {
        try {
          fs.accessSync(path);
        } catch (e) {
          return false;
        }
        return true;
      }) ||
    fs.existsSync ||
    path.existsSync,
  defaults = {
    arrow: process.env.NODE_BINDINGS_ARROW || ' → ',
    compiled: process.env.NODE_BINDINGS_COMPILED_DIR || 'compiled',
    platform: process.platform,
    arch: process.arch,
    nodePreGyp:
      'node-v' +
      process.versions.modules +
      '-' +
      process.platform +
      '-' +
      process.arch,
    version: process.versions.node,
    bindings: 'bindings.node',
    try: [
      // node-gyp's linked version in the "build" dir
      ['module_root', 'build', 'bindings'],
      // node-waf and gyp_addon (a.k.a node-gyp)
      ['module_root', 'build', 'Debug', 'bindings'],
      ['module_root', 'build', 'Release', 'bindings'],
      // Debug files, for development (legacy behavior, remove for node v0.9)
      ['module_root', 'out', 'Debug', 'bindings'],
      ['module_root', 'Debug', 'bindings'],
      // Release files, but manually compiled (legacy behavior, remove for node v0.9)
      ['module_root', 'out', 'Release', 'bindings'],
      ['module_root', 'Release', 'bindings'],
      // Legacy from node-waf, node <= 0.4.x
      ['module_root', 'build', 'default', 'bindings'],
      // Production "Release" buildtype binary (meh...)
      ['module_root', 'compiled', 'version', 'platform', 'arch', 'bindings'],
      // node-qbs builds
      ['module_root', 'addon-build', 'release', 'install-root', 'bindings'],
      ['module_root', 'addon-build', 'debug', 'install-root', 'bindings'],
      ['module_root', 'addon-build', 'default', 'install-root', 'bindings'],
      // node-pre-gyp path ./lib/binding/{node_abi}-{platform}-{arch}
      ['module_root', 'lib', 'binding', 'nodePreGyp', 'bindings']
    ]
  };

/**
 * The main `bindings()` function loads the compiled bindings for a given module.
 * It uses V8's Error API to determine the parent filename that this function is
 * being invoked from, which is then used to find the root directory.
 */

function bindings(opts) {
  // Argument surgery
  if (typeof opts == 'string') {
    opts = { bindings: opts };
  } else if (!opts) {
    opts = {};
  }

  // maps `defaults` onto `opts` object
  Object.keys(defaults).map(function(i) {
    if (!(i in opts)) opts[i] = defaults[i];
  });

  // Get the module root
  if (!opts.module_root) {
    opts.module_root = exports.getRoot(exports.getFileName());
  }

  // Ensure the given bindings name ends with .node
  if (path.extname(opts.bindings) != '.node') {
    opts.bindings += '.node';
  }

  // https://github.com/webpack/webpack/issues/4175#issuecomment-342931035
  var requireFunc =
     true
      ? require
      : 0;

  var tries = [],
    i = 0,
    l = opts.try.length,
    n,
    b,
    err;

  for (; i < l; i++) {
    n = join.apply(
      null,
      opts.try[i].map(function(p) {
        return opts[p] || p;
      })
    );
    tries.push(n);
    try {
      b = opts.path ? requireFunc.resolve(n) : requireFunc(n);
      if (!opts.path) {
        b.path = n;
      }
      return b;
    } catch (e) {
      if (e.code !== 'MODULE_NOT_FOUND' &&
          e.code !== 'QUALIFIED_PATH_RESOLUTION_FAILED' &&
          !/not find/i.test(e.message)) {
        throw e;
      }
    }
  }

  err = new Error(
    'Could not locate the bindings file. Tried:\n' +
      tries
        .map(function(a) {
          return opts.arrow + a;
        })
        .join('\n')
  );
  err.tries = tries;
  throw err;
}
module.exports = exports = bindings;

/**
 * Gets the filename of the JavaScript file that invokes this function.
 * Used to help find the root directory of a module.
 * Optionally accepts an filename argument to skip when searching for the invoking filename
 */

exports.getFileName = function getFileName(calling_file) {
  var origPST = Error.prepareStackTrace,
    origSTL = Error.stackTraceLimit,
    dummy = {},
    fileName;

  Error.stackTraceLimit = 10;

  Error.prepareStackTrace = function(e, st) {
    for (var i = 0, l = st.length; i < l; i++) {
      fileName = st[i].getFileName();
      if (fileName !== __filename) {
        if (calling_file) {
          if (fileName !== calling_file) {
            return;
          }
        } else {
          return;
        }
      }
    }
  };

  // run the 'prepareStackTrace' function above
  Error.captureStackTrace(dummy);
  dummy.stack;

  // cleanup
  Error.prepareStackTrace = origPST;
  Error.stackTraceLimit = origSTL;

  // handle filename that starts with "file://"
  var fileSchema = 'file://';
  if (fileName.indexOf(fileSchema) === 0) {
    fileName = fileURLToPath(fileName);
  }

  return fileName;
};

/**
 * Gets the root directory of a module, given an arbitrary filename
 * somewhere in the module tree. The "root directory" is the directory
 * containing the `package.json` file.
 *
 *   In:  /home/nate/node-native-module/lib/index.js
 *   Out: /home/nate/node-native-module
 */

exports.getRoot = function getRoot(file) {
  var dir = dirname(file),
    prev;
  while (true) {
    if (dir === '.') {
      // Avoids an infinite loop in rare cases, like the REPL
      dir = process.cwd();
    }
    if (
      exists(join(dir, 'package.json')) ||
      exists(join(dir, 'node_modules'))
    ) {
      // Found the 'package.json' file or 'node_modules' dir; we're done
      return dir;
    }
    if (prev === dir) {
      // Got to the top
      throw new Error(
        'Could not find module root given file: "' +
          file +
          '". Do you have a `package.json` file? '
      );
    }
    // Try the parent dir next
    prev = dir;
    dir = join(dir, '..');
  }
};


/***/ }),
/* 22 */
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),
/* 23 */
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),
/* 24 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Module dependencies.
 */

var sep = (__webpack_require__(23).sep) || '/';

/**
 * Module exports.
 */

module.exports = fileUriToPath;

/**
 * File URI to Path function.
 *
 * @param {String} uri
 * @return {String} path
 * @api public
 */

function fileUriToPath (uri) {
  if ('string' != typeof uri ||
      uri.length <= 7 ||
      'file://' != uri.substring(0, 7)) {
    throw new TypeError('must pass in a file:// URI to convert to a file path');
  }

  var rest = decodeURI(uri.substring(7));
  var firstSlash = rest.indexOf('/');
  var host = rest.substring(0, firstSlash);
  var path = rest.substring(firstSlash + 1);

  // 2.  Scheme Definition
  // As a special case, <host> can be the string "localhost" or the empty
  // string; this is interpreted as "the machine from which the URL is
  // being interpreted".
  if ('localhost' == host) host = '';

  if (host) {
    host = sep + sep + host;
  }

  // 3.2  Drives, drive letters, mount points, file system root
  // Drive letters are mapped into the top of a file URI in various ways,
  // depending on the implementation; some applications substitute
  // vertical bar ("|") for the colon after the drive letter, yielding
  // "file:///c|/tmp/test.txt".  In some cases, the colon is left
  // unchanged, as in "file:///c:/tmp/test.txt".  In other cases, the
  // colon is simply omitted, as in "file:///c/tmp/test.txt".
  path = path.replace(/^(.+)\|/, '$1:');

  // for Windows, we need to invert the path separators from what a URI uses
  if (sep == '\\') {
    path = path.replace(/\//g, '\\');
  }

  if (/^.+\:/.test(path)) {
    // has Windows drive at beginning of path
  } else {
    // unix path…
    path = sep + path;
  }

  return host + path;
}


/***/ }),
/* 25 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(10)('serialport/binding-abstract')

/**
 * @name Binding
 * @type {AbstractBinding}
 * @since 5.0.0
 * @description The `Binding` is how Node-SerialPort talks to the underlying system. By default, we auto detect Windows, Linux and OS X, and load the appropriate module for your system. You can assign `SerialPort.Binding` to any binding you like. Find more by searching at [npm](https://npmjs.org/).
  Prevent auto loading the default bindings by requiring SerialPort with:
  ```js
  var SerialPort = require('@serialport/stream');
  SerialPort.Binding = MyBindingClass;
  ```
 */

/**
 * You never have to use `Binding` objects directly. SerialPort uses them to access the underlying hardware. This documentation is geared towards people who are making bindings for different platforms. This class can be inherited from to get type checking for each method.
 * @class AbstractBinding
 * @param {object} options options for the binding
 * @property {boolean} isOpen Required property. `true` if the port is open, `false` otherwise. Should be read-only.
 * @throws {TypeError} When given invalid arguments, a `TypeError` is thrown.
 * @since 5.0.0
 */
class AbstractBinding {
  /**
   * Retrieves a list of available serial ports with metadata. The `path` must be guaranteed, and all other fields should be undefined if unavailable. The `path` is either the path or an identifier (eg `COM1`) used to open the serialport.
   * @returns {Promise} resolves to an array of port [info objects](#module_serialport--SerialPort.list).
   */
  static async list() {
    debug('list')
  }

  constructor(opt = {}) {
    if (typeof opt !== 'object') {
      throw new TypeError('"options" is not an object')
    }
  }

  /**
   * Opens a connection to the serial port referenced by the path.
   * @param {string} path the path or com port to open
   * @param {openOptions} options openOptions for the serialport
   * @returns {Promise} Resolves after the port is opened and configured.
   * @rejects {TypeError} When given invalid arguments, a `TypeError` is rejected.
   */
  async open(path, options) {
    if (!path) {
      throw new TypeError('"path" is not a valid port')
    }

    if (typeof options !== 'object') {
      throw new TypeError('"options" is not an object')
    }
    debug('open')

    if (this.isOpen) {
      throw new Error('Already open')
    }
  }

  /**
   * Closes an open connection
   * @returns {Promise} Resolves once the connection is closed.
   * @rejects {TypeError} When given invalid arguments, a `TypeError` is rejected.
   */
  async close() {
    debug('close')
    if (!this.isOpen) {
      throw new Error('Port is not open')
    }
  }

  /**
   * Request a number of bytes from the SerialPort. This function is similar to Node's [`fs.read`](http://nodejs.org/api/fs.html#fs_fs_read_fd_buffer_offset_length_position_callback) except it will always return at least one byte.

The in progress reads must error when the port is closed with an error object that has the property `canceled` equal to `true`. Any other error will cause a disconnection.

   * @param {buffer} buffer Accepts a [`Buffer`](http://nodejs.org/api/buffer.html) object.
   * @param {integer} offset The offset in the buffer to start writing at.
   * @param {integer} length Specifies the maximum number of bytes to read.
   * @returns {Promise} Resolves with the number of bytes read after a read operation.
   * @rejects {TypeError} When given invalid arguments, a `TypeError` is rejected.
   */
  async read(buffer, offset, length) {
    if (!Buffer.isBuffer(buffer)) {
      throw new TypeError('"buffer" is not a Buffer')
    }

    if (typeof offset !== 'number' || isNaN(offset)) {
      throw new TypeError(`"offset" is not an integer got "${isNaN(offset) ? 'NaN' : typeof offset}"`)
    }

    if (typeof length !== 'number' || isNaN(length)) {
      throw new TypeError(`"length" is not an integer got "${isNaN(length) ? 'NaN' : typeof length}"`)
    }

    debug('read')
    if (buffer.length < offset + length) {
      throw new Error('buffer is too small')
    }

    if (!this.isOpen) {
      throw new Error('Port is not open')
    }
  }

  /**
   * Write bytes to the SerialPort. Only called when there is no pending write operation.

The in progress writes must error when the port is closed with an error object that has the property `canceled` equal to `true`. Any other error will cause a disconnection.

   * @param {buffer} buffer - Accepts a [`Buffer`](http://nodejs.org/api/buffer.html) object.
   * @returns {Promise} Resolves after the data is passed to the operating system for writing.
   * @rejects {TypeError} When given invalid arguments, a `TypeError` is rejected.
   */
  async write(buffer) {
    if (!Buffer.isBuffer(buffer)) {
      throw new TypeError('"buffer" is not a Buffer')
    }

    debug('write', buffer.length, 'bytes')
    if (!this.isOpen) {
      debug('write', 'error port is not open')

      throw new Error('Port is not open')
    }
  }

  /**
   * Changes connection settings on an open port. Only `baudRate` is supported.
   * @param {object=} options Only supports `baudRate`.
   * @param {number=} [options.baudRate] If provided a baud rate that the bindings do not support, it should reject.
   * @returns {Promise} Resolves once the port's baud rate changes.
   * @rejects {TypeError} When given invalid arguments, a `TypeError` is rejected.
   */
  async update(options) {
    if (typeof options !== 'object') {
      throw TypeError('"options" is not an object')
    }

    if (typeof options.baudRate !== 'number') {
      throw new TypeError('"options.baudRate" is not a number')
    }

    debug('update')
    if (!this.isOpen) {
      throw new Error('Port is not open')
    }
  }

  /**
   * Set control flags on an open port.
   * @param {object=} options All options are operating system default when the port is opened. Every flag is set on each call to the provided or default values. All options are always provided.
   * @param {Boolean} [options.brk=false] flag for brk
   * @param {Boolean} [options.cts=false] flag for cts
   * @param {Boolean} [options.dsr=false] flag for dsr
   * @param {Boolean} [options.dtr=true] flag for dtr
   * @param {Boolean} [options.rts=true] flag for rts
   * @param {Boolean} [options.lowLatency=false] flag for lowLatency mode on Linux
   * @returns {Promise} Resolves once the port's flags are set.
   * @rejects {TypeError} When given invalid arguments, a `TypeError` is rejected.
   */
  async set(options) {
    if (typeof options !== 'object') {
      throw new TypeError('"options" is not an object')
    }
    debug('set')
    if (!this.isOpen) {
      throw new Error('Port is not open')
    }
  }

  /**
   * Get the control flags (CTS, DSR, DCD) on the open port.
   * @returns {Promise} Resolves with the retrieved flags.
   * @rejects {TypeError} When given invalid arguments, a `TypeError` is rejected.
   */
  async get() {
    debug('get')
    if (!this.isOpen) {
      throw new Error('Port is not open')
    }
  }

  /**
   * Get the OS reported baud rate for the open port.
   * Used mostly for debugging custom baud rates.
   * @returns {Promise} Resolves with the current baud rate.
   * @rejects {TypeError} When given invalid arguments, a `TypeError` is rejected.
   */
  async getBaudRate() {
    debug('getbaudRate')
    if (!this.isOpen) {
      throw new Error('Port is not open')
    }
  }

  /**
   * Flush (discard) data received but not read, and written but not transmitted.
   * @returns {Promise} Resolves once the flush operation finishes.
   * @rejects {TypeError} When given invalid arguments, a `TypeError` is rejected.
   */
  async flush() {
    debug('flush')
    if (!this.isOpen) {
      throw new Error('Port is not open')
    }
  }

  /**
   * Drain waits until all output data is transmitted to the serial port. An in progress write should be completed before this returns.
   * @returns {Promise} Resolves once the drain operation finishes.
   * @rejects {TypeError} When given invalid arguments, a `TypeError` is rejected.
   */
  async drain() {
    debug('drain')
    if (!this.isOpen) {
      throw new Error('Port is not open')
    }
  }
}

module.exports = AbstractBinding


/***/ }),
/* 26 */
/***/ ((module) => {

const PARSERS = [/USB\\(?:.+)\\(.+)/, /FTDIBUS\\(?:.+)\+(.+?)A?\\.+/]

module.exports = pnpId => {
  if (!pnpId) {
    return null
  }
  for (const parser of PARSERS) {
    const sn = pnpId.match(parser)
    if (sn) {
      return sn[1]
    }
  }
  return null
}


/***/ }),
/* 27 */
/***/ ((module) => {

let warningSent = false

const wrapWithHiddenComName = async portsPromise => {
  const ports = await portsPromise
  return ports.map(port => {
    const newPort = { ...port }
    return Object.defineProperties(newPort, {
      comName: {
        get() {
          if (!warningSent) {
            warningSent = true
            console.warn(
              `"PortInfo.comName" has been deprecated. You should now use "PortInfo.path". The property will be removed in the next major release.`
            )
          }
          return newPort.path
        },
        enumerable: false,
      },
    })
  })
}

module.exports = {
  wrapWithHiddenComName,
}


/***/ }),
/* 28 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { promisify } = __webpack_require__(9)
const binding = __webpack_require__(21)('bindings.node')
const AbstractBinding = __webpack_require__(25)
const Poller = __webpack_require__(29)
const unixRead = __webpack_require__(31)
const unixWrite = __webpack_require__(32)
const { wrapWithHiddenComName } = __webpack_require__(27)

const defaultBindingOptions = Object.freeze({
  vmin: 1,
  vtime: 0,
})

const asyncList = promisify(binding.list)
const asyncOpen = promisify(binding.open)
const asyncClose = promisify(binding.close)
const asyncUpdate = promisify(binding.update)
const asyncSet = promisify(binding.set)
const asyncGet = promisify(binding.get)
const asyncGetBaudRate = promisify(binding.getBaudRate)
const asyncDrain = promisify(binding.drain)
const asyncFlush = promisify(binding.flush)

/**
 * The Darwin binding layer for OSX
 */
class DarwinBinding extends AbstractBinding {
  static list() {
    return wrapWithHiddenComName(asyncList())
  }

  constructor(opt = {}) {
    super(opt)
    this.bindingOptions = { ...defaultBindingOptions, ...opt.bindingOptions }
    this.fd = null
    this.writeOperation = null
  }

  get isOpen() {
    return this.fd !== null
  }

  async open(path, options) {
    await super.open(path, options)
    this.openOptions = { ...this.bindingOptions, ...options }
    const fd = await asyncOpen(path, this.openOptions)
    this.fd = fd
    this.poller = new Poller(fd)
  }

  async close() {
    await super.close()
    const fd = this.fd
    this.poller.stop()
    this.poller.destroy()
    this.poller = null
    this.openOptions = null
    this.fd = null
    return asyncClose(fd)
  }

  async read(buffer, offset, length) {
    await super.read(buffer, offset, length)
    return unixRead({ binding: this, buffer, offset, length })
  }

  async write(buffer) {
    this.writeOperation = super.write(buffer).then(async () => {
      if (buffer.length === 0) {
        return
      }
      await unixWrite({ binding: this, buffer })
      this.writeOperation = null
    })
    return this.writeOperation
  }

  async update(options) {
    await super.update(options)
    return asyncUpdate(this.fd, options)
  }

  async set(options) {
    await super.set(options)
    return asyncSet(this.fd, options)
  }

  async get() {
    await super.get()
    return asyncGet(this.fd)
  }

  async getBaudRate() {
    await super.get()
    return asyncGetBaudRate(this.fd)
  }

  async drain() {
    await super.drain()
    await this.writeOperation
    return asyncDrain(this.fd)
  }

  async flush() {
    await super.flush()
    return asyncFlush(this.fd)
  }
}

module.exports = DarwinBinding


/***/ }),
/* 29 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(10)
const logger = debug('serialport/bindings/poller')
const EventEmitter = __webpack_require__(30)
const PollerBindings = __webpack_require__(21)('bindings.node').Poller

const EVENTS = {
  UV_READABLE: 0b0001,
  UV_WRITABLE: 0b0010,
  UV_DISCONNECT: 0b0100,
}

function handleEvent(error, eventFlag) {
  if (error) {
    logger('error', error)
    this.emit('readable', error)
    this.emit('writable', error)
    this.emit('disconnect', error)
    return
  }
  if (eventFlag & EVENTS.UV_READABLE) {
    logger('received "readable"')
    this.emit('readable', null)
  }
  if (eventFlag & EVENTS.UV_WRITABLE) {
    logger('received "writable"')
    this.emit('writable', null)
  }
  if (eventFlag & EVENTS.UV_DISCONNECT) {
    logger('received "disconnect"')
    this.emit('disconnect', null)
  }
}

/**
 * Polls unix systems for readable or writable states of a file or serialport
 */
class Poller extends EventEmitter {
  constructor(fd, FDPoller = PollerBindings) {
    logger('Creating poller')
    super()
    this.poller = new FDPoller(fd, handleEvent.bind(this))
  }
  /**
   * Wait for the next event to occur
   * @param {string} event ('readable'|'writable'|'disconnect')
   * @returns {Poller} returns itself
   */
  once(event, callback) {
    switch (event) {
      case 'readable':
        this.poll(EVENTS.UV_READABLE)
        break
      case 'writable':
        this.poll(EVENTS.UV_WRITABLE)
        break
      case 'disconnect':
        this.poll(EVENTS.UV_DISCONNECT)
        break
    }
    return super.once(event, callback)
  }

  /**
   * Ask the bindings to listen for an event, it is recommend to use `.once()` for easy use
   * @param {EVENTS} eventFlag polls for an event or group of events based upon a flag.
   * @returns {undefined}
   */
  poll(eventFlag) {
    eventFlag = eventFlag || 0

    if (eventFlag & EVENTS.UV_READABLE) {
      logger('Polling for "readable"')
    }
    if (eventFlag & EVENTS.UV_WRITABLE) {
      logger('Polling for "writable"')
    }
    if (eventFlag & EVENTS.UV_DISCONNECT) {
      logger('Polling for "disconnect"')
    }

    this.poller.poll(eventFlag)
  }

  /**
   * Stop listening for events and cancel all outstanding listening with an error
   * @returns {undefined}
   */
  stop() {
    logger('Stopping poller')
    this.poller.stop()
    this.emitCanceled()
  }

  destroy() {
    logger('Destroying poller')
    this.poller.destroy()
    this.emitCanceled()
  }

  emitCanceled() {
    const err = new Error('Canceled')
    err.canceled = true
    this.emit('readable', err)
    this.emit('writable', err)
    this.emit('disconnect', err)
  }
}

Poller.EVENTS = EVENTS

module.exports = Poller


/***/ }),
/* 30 */
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),
/* 31 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const fs = __webpack_require__(22)
const debug = __webpack_require__(10)
const logger = debug('serialport/bindings/unixRead')
const { promisify } = __webpack_require__(9)

const readAsync = promisify(fs.read)

const readable = binding => {
  return new Promise((resolve, reject) => {
    binding.poller.once('readable', err => (err ? reject(err) : resolve()))
  })
}

const unixRead = async ({ binding, buffer, offset, length, fsReadAsync = readAsync }) => {
  logger('Starting read')
  if (!binding.isOpen) {
    const err = new Error('Port is not open')
    err.canceled = true
    throw err
  }

  try {
    const { bytesRead } = await fsReadAsync(binding.fd, buffer, offset, length, null)
    if (bytesRead === 0) {
      return unixRead({ binding, buffer, offset, length, fsReadAsync })
    }
    logger('Finished read', bytesRead, 'bytes')
    return { bytesRead, buffer }
  } catch (err) {
    logger('read error', err)
    if (err.code === 'EAGAIN' || err.code === 'EWOULDBLOCK' || err.code === 'EINTR') {
      if (!binding.isOpen) {
        const err = new Error('Port is not open')
        err.canceled = true
        throw err
      }
      logger('waiting for readable because of code:', err.code)
      await readable(binding)
      return unixRead({ binding, buffer, offset, length, fsReadAsync })
    }

    const disconnectError =
      err.code === 'EBADF' || // Bad file number means we got closed
      err.code === 'ENXIO' || // No such device or address probably usb disconnect
      err.code === 'UNKNOWN' ||
      err.errno === -1 // generic error

    if (disconnectError) {
      err.disconnect = true
      logger('disconnecting', err)
    }

    throw err
  }
}

module.exports = unixRead


/***/ }),
/* 32 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const fs = __webpack_require__(22)
const debug = __webpack_require__(10)
const logger = debug('serialport/bindings/unixWrite')
const { promisify } = __webpack_require__(9)

const writeAsync = promisify(fs.write)

const writable = binding => {
  return new Promise((resolve, reject) => {
    binding.poller.once('writable', err => (err ? reject(err) : resolve()))
  })
}

const unixWrite = async ({ binding, buffer, offset = 0, fsWriteAsync = writeAsync }) => {
  const bytesToWrite = buffer.length - offset
  logger('Starting write', buffer.length, 'bytes offset', offset, 'bytesToWrite', bytesToWrite)
  if (!binding.isOpen) {
    throw new Error('Port is not open')
  }
  try {
    const { bytesWritten } = await fsWriteAsync(binding.fd, buffer, offset, bytesToWrite)
    logger('write returned: wrote', bytesWritten, 'bytes')
    if (bytesWritten + offset < buffer.length) {
      if (!binding.isOpen) {
        throw new Error('Port is not open')
      }
      return unixWrite({ binding, buffer, offset: bytesWritten + offset, fsWriteAsync })
    }

    logger('Finished writing', bytesWritten + offset, 'bytes')
  } catch (err) {
    logger('write errored', err)
    if (err.code === 'EAGAIN' || err.code === 'EWOULDBLOCK' || err.code === 'EINTR') {
      if (!binding.isOpen) {
        throw new Error('Port is not open')
      }
      logger('waiting for writable because of code:', err.code)
      await writable(binding)
      return unixWrite({ binding, buffer, offset, fsWriteAsync })
    }

    const disconnectError =
      err.code === 'EBADF' || // Bad file number means we got closed
      err.code === 'ENXIO' || // No such device or address probably usb disconnect
      err.code === 'UNKNOWN' ||
      err.errno === -1 // generic error

    if (disconnectError) {
      err.disconnect = true
      logger('disconnecting', err)
    }

    logger('error', err)
    throw err
  }
}
module.exports = unixWrite


/***/ }),
/* 33 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { promisify } = __webpack_require__(9)
const binding = __webpack_require__(21)('bindings.node')
const AbstractBinding = __webpack_require__(25)
const linuxList = __webpack_require__(34)
const Poller = __webpack_require__(29)
const unixRead = __webpack_require__(31)
const unixWrite = __webpack_require__(32)
const { wrapWithHiddenComName } = __webpack_require__(27)

const defaultBindingOptions = Object.freeze({
  vmin: 1,
  vtime: 0,
})

const asyncOpen = promisify(binding.open)
const asyncClose = promisify(binding.close)
const asyncUpdate = promisify(binding.update)
const asyncSet = promisify(binding.set)
const asyncGet = promisify(binding.get)
const asyncGetBaudRate = promisify(binding.getBaudRate)
const asyncDrain = promisify(binding.drain)
const asyncFlush = promisify(binding.flush)

/**
 * The linux binding layer
 */
class LinuxBinding extends AbstractBinding {
  static list() {
    return wrapWithHiddenComName(linuxList())
  }

  constructor(opt = {}) {
    super(opt)
    this.bindingOptions = { ...defaultBindingOptions, ...opt.bindingOptions }
    this.fd = null
    this.writeOperation = null
  }

  get isOpen() {
    return this.fd !== null
  }

  async open(path, options) {
    await super.open(path, options)
    this.openOptions = { ...this.bindingOptions, ...options }
    const fd = await asyncOpen(path, this.openOptions)
    this.fd = fd
    this.poller = new Poller(fd)
  }

  async close() {
    await super.close()
    const fd = this.fd
    this.poller.stop()
    this.poller.destroy()
    this.poller = null
    this.openOptions = null
    this.fd = null
    return asyncClose(fd)
  }

  async read(buffer, offset, length) {
    await super.read(buffer, offset, length)
    return unixRead({ binding: this, buffer, offset, length })
  }

  async write(buffer) {
    this.writeOperation = super.write(buffer).then(async () => {
      if (buffer.length === 0) {
        return
      }
      await unixWrite({ binding: this, buffer })
      this.writeOperation = null
    })
    return this.writeOperation
  }

  async update(options) {
    await super.update(options)
    return asyncUpdate(this.fd, options)
  }

  async set(options) {
    await super.set(options)
    return asyncSet(this.fd, options)
  }

  async get() {
    await super.get()
    return asyncGet(this.fd)
  }

  async getBaudRate() {
    await super.get()
    return asyncGetBaudRate(this.fd)
  }

  async drain() {
    await super.drain()
    await this.writeOperation
    return asyncDrain(this.fd)
  }

  async flush() {
    await super.flush()
    return asyncFlush(this.fd)
  }
}

module.exports = LinuxBinding


/***/ }),
/* 34 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const childProcess = __webpack_require__(35)
const Readline = __webpack_require__(36)

// get only serial port names
function checkPathOfDevice(path) {
  return /(tty(S|WCH|ACM|USB|AMA|MFD|O|XRUSB)|rfcomm)/.test(path) && path
}

function propName(name) {
  return {
    DEVNAME: 'path',
    ID_VENDOR_ENC: 'manufacturer',
    ID_SERIAL_SHORT: 'serialNumber',
    ID_VENDOR_ID: 'vendorId',
    ID_MODEL_ID: 'productId',
    DEVLINKS: 'pnpId',
  }[name.toUpperCase()]
}

function decodeHexEscape(str) {
  return str.replace(/\\x([a-fA-F0-9]{2})/g, (a, b) => {
    return String.fromCharCode(parseInt(b, 16))
  })
}

function propVal(name, val) {
  if (name === 'pnpId') {
    const match = val.match(/\/by-id\/([^\s]+)/)
    return (match && match[1]) || undefined
  }
  if (name === 'manufacturer') {
    return decodeHexEscape(val)
  }
  if (/^0x/.test(val)) {
    return val.substr(2)
  }
  return val
}

function listLinux() {
  return new Promise((resolve, reject) => {
    const ports = []
    const ude = childProcess.spawn('udevadm', ['info', '-e'])
    const lines = ude.stdout.pipe(new Readline())
    ude.on('close', code => code && reject(new Error(`Error listing ports udevadm exited with error code: ${code}`)))
    ude.on('error', reject)
    lines.on('error', reject)

    let port = {}
    let skipPort = false
    lines.on('data', line => {
      const lineType = line.slice(0, 1)
      const data = line.slice(3)
      // new port entry
      if (lineType === 'P') {
        port = {
          manufacturer: undefined,
          serialNumber: undefined,
          pnpId: undefined,
          locationId: undefined,
          vendorId: undefined,
          productId: undefined,
        }
        skipPort = false
        return
      }

      if (skipPort) {
        return
      }

      // Check dev name and save port if it matches flag to skip the rest of the data if not
      if (lineType === 'N') {
        if (checkPathOfDevice(data)) {
          ports.push(port)
        } else {
          skipPort = true
        }
        return
      }

      // parse data about each port
      if (lineType === 'E') {
        const keyValue = data.match(/^(.+)=(.*)/)
        if (!keyValue) {
          return
        }
        const key = propName(keyValue[1])
        if (!key) {
          return
        }
        port[key] = propVal(key, keyValue[2])
      }
    })

    lines.on('finish', () => resolve(ports))
  })
}

module.exports = listLinux


/***/ }),
/* 35 */
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),
/* 36 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const DelimiterParser = __webpack_require__(37)

/**
 *  A transform stream that emits data after a newline delimiter is received.
 * @summary To use the `Readline` parser, provide a delimiter (defaults to `\n`). Data is emitted as string controllable by the `encoding` option (defaults to `utf8`).
 * @extends DelimiterParser
 * @example
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/tty-usbserial1')
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
parser.on('data', console.log)
*/
class ReadLineParser extends DelimiterParser {
  constructor(options) {
    const opts = {
      delimiter: Buffer.from('\n', 'utf8'),
      encoding: 'utf8',
      ...options,
    }

    if (typeof opts.delimiter === 'string') {
      opts.delimiter = Buffer.from(opts.delimiter, opts.encoding)
    }

    super(opts)
  }
}

module.exports = ReadLineParser


/***/ }),
/* 37 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { Transform } = __webpack_require__(8)

/**
 * A transform stream that emits data each time a byte sequence is received.
 * @extends Transform
 * @summary To use the `Delimiter` parser, provide a delimiter as a string, buffer, or array of bytes. Runs in O(n) time.
 * @example
const SerialPort = require('serialport')
const Delimiter = require('@serialport/parser-delimiter')
const port = new SerialPort('/dev/tty-usbserial1')
const parser = port.pipe(new Delimiter({ delimiter: '\n' }))
parser.on('data', console.log)
 */
class DelimiterParser extends Transform {
  constructor(options = {}) {
    super(options)

    if (options.delimiter === undefined) {
      throw new TypeError('"delimiter" is not a bufferable object')
    }

    if (options.delimiter.length === 0) {
      throw new TypeError('"delimiter" has a 0 or undefined length')
    }

    this.includeDelimiter = options.includeDelimiter !== undefined ? options.includeDelimiter : false
    this.delimiter = Buffer.from(options.delimiter)
    this.buffer = Buffer.alloc(0)
  }

  _transform(chunk, encoding, cb) {
    let data = Buffer.concat([this.buffer, chunk])
    let position
    while ((position = data.indexOf(this.delimiter)) !== -1) {
      this.push(data.slice(0, position + (this.includeDelimiter ? this.delimiter.length : 0)))
      data = data.slice(position + this.delimiter.length)
    }
    this.buffer = data
    cb()
  }

  _flush(cb) {
    this.push(this.buffer)
    this.buffer = Buffer.alloc(0)
    cb()
  }
}

module.exports = DelimiterParser


/***/ }),
/* 38 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  ByteLength: __webpack_require__(39),
  CCTalk: __webpack_require__(40),
  Delimiter: __webpack_require__(37),
  InterByteTimeout: __webpack_require__(41),
  Readline: __webpack_require__(36),
  Ready: __webpack_require__(42),
  Regex: __webpack_require__(43),
}


/***/ }),
/* 39 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { Transform } = __webpack_require__(8)

/**
 * Emit data every number of bytes
 * @extends Transform
 * @param {Object} options parser options object
 * @param {Number} options.length the number of bytes on each data event
 * @summary A transform stream that emits data as a buffer after a specific number of bytes are received. Runs in O(n) time.
 * @example
const SerialPort = require('serialport')
const ByteLength = require('@serialport/parser-byte-length')
const port = new SerialPort('/dev/tty-usbserial1')
const parser = port.pipe(new ByteLength({length: 8}))
parser.on('data', console.log) // will have 8 bytes per data event
 */
class ByteLengthParser extends Transform {
  constructor(options = {}) {
    super(options)

    if (typeof options.length !== 'number') {
      throw new TypeError('"length" is not a number')
    }

    if (options.length < 1) {
      throw new TypeError('"length" is not greater than 0')
    }

    this.length = options.length
    this.position = 0
    this.buffer = Buffer.alloc(this.length)
  }

  _transform(chunk, encoding, cb) {
    let cursor = 0
    while (cursor < chunk.length) {
      this.buffer[this.position] = chunk[cursor]
      cursor++
      this.position++
      if (this.position === this.length) {
        this.push(this.buffer)
        this.buffer = Buffer.alloc(this.length)
        this.position = 0
      }
    }
    cb()
  }

  _flush(cb) {
    this.push(this.buffer.slice(0, this.position))
    this.buffer = Buffer.alloc(this.length)
    cb()
  }
}

module.exports = ByteLengthParser


/***/ }),
/* 40 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { Transform } = __webpack_require__(8)

/**
 * Parse the CCTalk protocol
 * @extends Transform
 * @summary A transform stream that emits CCTalk packets as they are received.
 * @example
const SerialPort = require('serialport')
const CCTalk = require('@serialport/parser-cctalk')
const port = new SerialPort('/dev/ttyUSB0')
const parser = port.pipe(new CCtalk())
parser.on('data', console.log)
 */
class CCTalkParser extends Transform {
  constructor(maxDelayBetweenBytesMs = 50) {
    super()
    this.array = []
    this.cursor = 0
    this.lastByteFetchTime = 0
    this.maxDelayBetweenBytesMs = maxDelayBetweenBytesMs
  }
  _transform(buffer, _, cb) {
    if (this.maxDelayBetweenBytesMs > 0) {
      const now = Date.now()
      if (now - this.lastByteFetchTime > this.maxDelayBetweenBytesMs) {
        this.array = []
        this.cursor = 0
      }
      this.lastByteFetchTime = now
    }

    this.cursor += buffer.length
    // TODO: Better Faster es7 no supported by node 4
    // ES7 allows directly push [...buffer]
    // this.array = this.array.concat(Array.from(buffer)) //Slower ?!?
    Array.from(buffer).map(byte => this.array.push(byte))
    while (this.cursor > 1 && this.cursor >= this.array[1] + 5) {
      // full frame accumulated
      // copy command from the array
      const FullMsgLength = this.array[1] + 5

      const frame = Buffer.from(this.array.slice(0, FullMsgLength))
      // Preserve Extra Data
      this.array = this.array.slice(frame.length, this.array.length)
      this.cursor -= FullMsgLength
      this.push(frame)
    }
    cb()
  }
}

module.exports = CCTalkParser


/***/ }),
/* 41 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { Transform } = __webpack_require__(8)

/**
 * Emits data if there is a pause between packets for the specified amount of time.
 * @extends Transform
 * @param {Object} options parser options object
 * @param {Number} options.interval the period of silence in milliseconds after which data is emited
 * @param {Number} options.maxBufferSize the maximum number of bytes after which data will be emited. Defaults to 65536.
 * @summary A transform stream that emits data as a buffer after not receiving any bytes for the specified amount of time.
 * @example
const SerialPort = require('serialport')
const InterByteTimeout = require('@serialport/parser-inter-byte-timeout')
const port = new SerialPort('/dev/tty-usbserial1')
const parser = port.pipe(new InterByteTimeout({interval: 30}))
parser.on('data', console.log) // will emit data if there is a pause between packets greater than 30ms
 */

class InterByteTimeoutParser extends Transform {
  constructor(options) {
    super()
    options = { maxBufferSize: 65536, ...options }
    if (!options.interval) {
      throw new TypeError('"interval" is required')
    }

    if (typeof options.interval !== 'number' || Number.isNaN(options.interval)) {
      throw new TypeError('"interval" is not a number')
    }

    if (options.interval < 1) {
      throw new TypeError('"interval" is not greater than 0')
    }

    if (typeof options.maxBufferSize !== 'number' || Number.isNaN(options.maxBufferSize)) {
      throw new TypeError('"maxBufferSize" is not a number')
    }

    if (options.maxBufferSize < 1) {
      throw new TypeError('"maxBufferSize" is not greater than 0')
    }

    this.maxBufferSize = options.maxBufferSize
    this.currentPacket = []
    this.interval = options.interval
    this.intervalID = -1
  }
  _transform(chunk, encoding, cb) {
    clearTimeout(this.intervalID)
    for (let offset = 0; offset < chunk.length; offset++) {
      this.currentPacket.push(chunk[offset])
      if (this.currentPacket.length >= this.maxBufferSize) {
        this.emitPacket()
      }
    }
    this.intervalID = setTimeout(this.emitPacket.bind(this), this.interval)
    cb()
  }
  emitPacket() {
    clearTimeout(this.intervalID)
    if (this.currentPacket.length > 0) {
      this.push(Buffer.from(this.currentPacket))
    }
    this.currentPacket = []
  }
  _flush(cb) {
    this.emitPacket()
    cb()
  }
}

module.exports = InterByteTimeoutParser


/***/ }),
/* 42 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { Transform } = __webpack_require__(8)

/**
 * A transform stream that waits for a sequence of "ready" bytes before emitting a ready event and emitting data events
 * @summary To use the `Ready` parser provide a byte start sequence. After the bytes have been received a ready event is fired and data events are passed through.
 * @extends Transform
 * @example
const SerialPort = require('serialport')
const Ready = require('@serialport/parser-ready')
const port = new SerialPort('/dev/tty-usbserial1')
const parser = port.pipe(new Ready({ delimiter: 'READY' }))
parser.on('ready', () => console.log('the ready byte sequence has been received'))
parser.on('data', console.log) // all data after READY is received
 */
class ReadyParser extends Transform {
  /**
   *
   * @param {object} options options for the parser
   * @param {string|Buffer|array} options.delimiter data to look for before emitted "ready"
   */
  constructor(options = {}) {
    if (options.delimiter === undefined) {
      throw new TypeError('"delimiter" is not a bufferable object')
    }

    if (options.delimiter.length === 0) {
      throw new TypeError('"delimiter" has a 0 or undefined length')
    }

    super(options)
    this.delimiter = Buffer.from(options.delimiter)
    this.readOffset = 0
    this.ready = false
  }

  _transform(chunk, encoding, cb) {
    if (this.ready) {
      this.push(chunk)
      return cb()
    }
    const delimiter = this.delimiter
    let chunkOffset = 0
    while (this.readOffset < delimiter.length && chunkOffset < chunk.length) {
      if (delimiter[this.readOffset] === chunk[chunkOffset]) {
        this.readOffset++
      } else {
        this.readOffset = 0
      }
      chunkOffset++
    }
    if (this.readOffset === delimiter.length) {
      this.ready = true
      this.emit('ready')
      const chunkRest = chunk.slice(chunkOffset)
      if (chunkRest.length > 0) {
        this.push(chunkRest)
      }
    }
    cb()
  }
}

module.exports = ReadyParser


/***/ }),
/* 43 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { Transform } = __webpack_require__(8)

/**
 * A transform stream that uses a regular expression to split the incoming text upon.
 *
 * To use the `Regex` parser provide a regular expression to split the incoming text upon. Data is emitted as string controllable by the `encoding` option (defaults to `utf8`).
 * @extends Transform
 * @example
const SerialPort = require('serialport')
const Regex = require('@serialport/parser-regex')
const port = new SerialPort('/dev/tty-usbserial1')
const parser = port.pipe(new Regex({ regex: /[\r\n]+/ }))
parser.on('data', console.log)
 */
class RegexParser extends Transform {
  constructor(options) {
    const opts = {
      encoding: 'utf8',
      ...options,
    }

    if (opts.regex === undefined) {
      throw new TypeError('"options.regex" must be a regular expression pattern or object')
    }

    if (!(opts.regex instanceof RegExp)) {
      opts.regex = new RegExp(opts.regex)
    }
    super(opts)

    this.regex = opts.regex
    this.data = ''
  }

  _transform(chunk, encoding, cb) {
    const data = this.data + chunk
    const parts = data.split(this.regex)
    this.data = parts.pop()

    parts.forEach(part => {
      this.push(part)
    })
    cb()
  }

  _flush(cb) {
    this.push(this.data)
    this.data = ''
    cb()
  }
}

module.exports = RegexParser


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HEAD_DATA = void 0;
// CRC Table
const CRC_TABLE = [
    0x0000, 0xcc01, 0xd801, 0x1400, 0xf001, 0x3c00, 0x2800, 0xe401, 0xa001, 0x6c00, 0x7800, 0xb401, 0x5000,
    0x9c01, 0x8801, 0x4400,
];
// Header delimited data
exports.HEAD_DATA = [0xaa, 0xab, 0xaa];
// Footer delimited data
const FOOT_DATA = [0xab, 0xcc, 0xab];
class Crc {
    /**
     * Compute crc value
     * @param {*} data Buffer data
     * @param {*} len Buffer length
     */
    crc16(data, len) {
        let crc = 0xffff;
        for (let i = 0; i < len; i++) {
            let ch = data[i];
            crc = CRC_TABLE[(ch ^ crc) & 15] ^ (crc >> 4);
            crc = CRC_TABLE[((ch >> 4) ^ crc) & 15] ^ (crc >> 4);
        }
        return crc;
    }
    /**
     * Fill CRC
     * @param {*} data Buffer
     */
    coverCrc(data) {
        let crcResult = this.crc16(data, data.length);
        return Buffer.concat([data, Buffer.from([crcResult >> 8, crcResult & 0x00ff])]);
    }
    checkReceiveCompleted(buffer) {
        const headBuf = Buffer.from(exports.HEAD_DATA);
        const footBuf = Buffer.from(FOOT_DATA);
        if (headBuf.compare(buffer.slice(0, 3)) === 0 && footBuf.compare(buffer.slice(-3)) === 0) {
            return true;
        }
        return false;
    }
    createDataBuffer(commandCode, data) {
        return Buffer.concat([Buffer.from([commandCode]), Buffer.from(data)]);
    }
}
exports["default"] = new Crc();


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.COMMAND_CODES = exports.defaultOpts = void 0;
exports.defaultOpts = {
    baudRate: 115200,
};
exports.COMMAND_CODES = {
    isOnline: 0x00,
    getInfo: 0x01,
    exec: 0x02,
    listDir: 0x03,
    download: 0x04,
    getFile: 0x05,
    downloadFile: 0x06,
    removeFile: 0x07,
    setWifi: 0x08,
};


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const fs = __importStar(__webpack_require__(22));
const path = __importStar(__webpack_require__(23));
const vscode = __importStar(__webpack_require__(1));
const M5FileSystemProvider_1 = __importDefault(__webpack_require__(3));
const SerialConnection_1 = __importDefault(__webpack_require__(5));
const SerialManager_1 = __importDefault(__webpack_require__(4));
const FileTree_1 = __importDefault(__webpack_require__(47));
const StatusBar_1 = __importDefault(__webpack_require__(49));
class PortList {
    constructor() {
        this.imageCache = {};
        this.createStatusBar();
        this.selectedCOMs = [];
        vscode.workspace.onDidOpenTextDocument((e) => {
            if (e.uri.scheme !== 'm5stackfs') {
                return;
            }
        });
        vscode.workspace.onWillSaveTextDocument((e) => {
            if (e.document.isDirty) {
                if (e.document.uri.scheme !== 'm5stackfs') {
                    return;
                }
                M5FileSystemProvider_1.default.saveFile(e.document.uri, e.document.getText());
            }
        });
    }
    createStatusBar() {
        const item = vscode.window.createStatusBarItem();
        item.text = `Add M5Stack`;
        item.command = `vscode-m5stack-mpyreader.selectPorts`;
        item.show();
    }
    removeSelectedComs(com) {
        const index = this.selectedCOMs.findIndex((selected) => selected.label === com);
        if (index > -1) {
            this.selectedCOMs.splice(index, 1);
        }
    }
    async selectPorts() {
        let coms = await SerialConnection_1.default.getCOMs();
        coms = coms.filter((com) => com.vendorId === '1a86');
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
                SerialManager_1.default.disconnect(com.label);
            });
            this.selectedCOMs = [];
            StatusBar_1.default.clear();
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
            if (!StatusBar_1.default.has(port)) {
                StatusBar_1.default.add(port);
                if (port.picked) {
                    SerialManager_1.default.connect(port.label, (err) => {
                        if (!err) {
                            self.tree = new FileTree_1.default(this.selectedCOMs);
                        }
                    });
                }
            }
        });
    }
    async remove(ev) {
        let _ev = Object.assign({}, ev);
        if (ev.path !== undefined) {
            let args = ev.path.split('/');
            let port = process.platform === 'win32' ? args[1] : `/dev/${args[1]}`;
            _ev.com = port;
            _ev.label = args[args.length - 1];
            _ev.parent = `/${args.slice(2, args.length - 1).join('/')}`;
        }
        let confirm = await vscode.window.showInformationMessage(`Do you sure to delete file "${_ev.label}" ?`, {
            modal: true,
        }, 'Yes');
        if (confirm === 'Yes') {
            let r = await SerialManager_1.default.removeFile(_ev.com, `${_ev.parent}/${_ev.label}`);
            if (!r) {
                vscode.window.showErrorMessage(`Delete file "${_ev.label}" failed.`);
                return;
            }
            vscode.window.showInformationMessage(`Delete file "${_ev.label}" successfully.`);
            this.tree = new FileTree_1.default(this.selectedCOMs);
        }
    }
    readFile(port, filepath) {
        this._readFile(port, filepath);
    }
    async _readFile(port, filepath) {
        const filename = filepath.split('/').slice(-1).toString();
        if (/(.jpg)|(.jpeg)|(.bmp)|(.png)|(.gif)/g.test(filename.toLowerCase())) {
            const panel = vscode.window.createWebviewPanel('image', filename, vscode.ViewColumn.One, {});
            panel.webview.html = `<h1>Loading</h1>`;
            let base64Image = this.imageCache[filepath];
            if (!base64Image) {
                const img = await SerialManager_1.default.readFile(port, filepath);
                base64Image = img.toString('base64');
                this.imageCache[filepath] = base64Image;
            }
            const imageType = filename.split('.')[1];
            panel.webview.html = `<img src="data:image/${imageType};base64,${base64Image}" />`;
            return;
        }
        let uri = vscode.Uri.parse(`m5stackfs:/${port}${filepath}`);
        await M5FileSystemProvider_1.default.writeFile(uri);
        let doc = await vscode.workspace.openTextDocument(uri);
        await vscode.window.showTextDocument(doc, { preview: false });
    }
    async create(ev) {
        let filename = await vscode.window.showInputBox({
            placeHolder: 'File Name',
        });
        if (!filename) {
            return;
        }
        let r = Buffer.from([]);
        if (ev.contextValue === 'COM') {
            r = await SerialManager_1.default.download(ev.label, filename, '', 0x01);
        }
        else if (ev.contextValue === 'folder') {
            r = await SerialManager_1.default.download(ev.com, `${ev.parent}/${ev.label}/${filename}`, '', 0x01);
        }
        if (r?.toString().indexOf('done') < 0) {
            vscode.window.showErrorMessage(`Create "${filename}" failed.`);
            return;
        }
        vscode.window.showInformationMessage(`Create "${filename}" successfully.`);
        this.refreshTree();
    }
    async upload(ev) {
        let file = await vscode.window.showOpenDialog({});
        if (!file) {
            return;
        }
        const filename = file[0].path.split('/').slice(-1).toString();
        const content = process.platform === 'win32'
            ? fs.readFileSync(path.join(file[0].path.slice(1)))
            : fs.readFileSync(path.join(file[0].path));
        vscode.window.showWarningMessage(`"${filename}" Uploading, don't close the window.`);
        let r = Buffer.from([]);
        if (ev.contextValue === 'COM') {
            r = await SerialManager_1.default.download(ev.label, filename, content.toString(), 0x01);
        }
        else if (ev.contextValue === 'folder') {
            r = await SerialManager_1.default.download(ev.com, `${ev.parent}/${ev.label}/${filename}`, content, 0x01, false);
        }
        if (r?.toString().indexOf('done') < 0) {
            vscode.window.showErrorMessage(`Upload "${filename}" failed.`);
            return;
        }
        vscode.window.showInformationMessage(`Upload "${filename}" successfully.`);
        M5FileSystemProvider_1.default.removeCache(`/${ev.com}${ev.parent}/${ev.label}/${filename}`);
        this.refreshTree();
    }
    async run() {
        if (vscode.window.activeTextEditor) {
            const uri = vscode.window.activeTextEditor.document.uri;
            let text = vscode.window.activeTextEditor.document.getText();
            let args = uri.path.split('/');
            let port = process.platform === 'win32' ? args[1] : `/dev/${args[1]}`;
            const filename = args[args.length - 1].split('.')[0];
            let r = await SerialManager_1.default.exec(port, text);
            // let r = await SerialManager.exec(port, `import ${filename}`);
            if (r?.toString().indexOf('done') < 0) {
                vscode.window.showErrorMessage('Run failed.');
            }
            else {
                vscode.window.showInformationMessage('Run successfully.');
            }
        }
    }
    refreshTree() {
        this.tree = new FileTree_1.default(this.selectedCOMs);
    }
}
exports["default"] = new PortList();


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __importStar(__webpack_require__(1));
const TreeDataProvider_1 = __webpack_require__(48);
class FileTree {
    constructor(items) {
        this.tree = vscode.window.createTreeView('m5stack', {
            treeDataProvider: new TreeDataProvider_1.M5TreeDataProvider(items.map((item) => item.label)),
        });
    }
}
exports["default"] = FileTree;


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.M5TreeDataProvider = exports.M5FSResource = exports.COM = exports.FOLDER = exports.FILE = void 0;
const path = __importStar(__webpack_require__(23));
const vscode = __importStar(__webpack_require__(1));
const SerialManager_1 = __importDefault(__webpack_require__(4));
exports.FILE = 'file';
exports.FOLDER = 'folder';
exports.COM = 'COM';
class M5FSResource extends vscode.TreeItem {
    constructor(label, version, parent, com, contextValue, collapsibleState) {
        super(label, collapsibleState);
        this.label = label;
        this.version = version;
        this.parent = parent;
        this.com = com;
        this.contextValue = contextValue;
        this.collapsibleState = collapsibleState;
        this.icon = '';
        this.tooltip = `${this.label}-${this.version}`;
        this.description = this.version;
        this.parent = parent;
        this.com = com;
        this.contextValue = contextValue;
        switch (contextValue) {
            case exports.FILE: {
                if (this.label.indexOf('.py') > -1) {
                    this.icon = 'python.svg';
                }
                if (/(.jpg)|(.jpeg)|(.bmp)|(.png)|(.gif)/g.test(this.label.toLowerCase())) {
                    this.icon = 'image.svg';
                }
                break;
            }
            case exports.FOLDER: {
                this.icon = 'folder-resource.svg';
                break;
            }
            case exports.COM: {
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
exports.M5FSResource = M5FSResource;
class M5TreeDataProvider {
    constructor(port) {
        this.port = port;
    }
    getChildren(element) {
        if (!this.port) {
            vscode.window.showInformationMessage('No file in empty root');
            return Promise.resolve([]);
        }
        if (!element) {
            return Promise.resolve(this.getChildrenCom(undefined));
        }
        else {
            return Promise.resolve(this.getChildrenCom(element));
        }
    }
    async getChildrenCom(element) {
        const tree = [];
        // Root to display COM devices
        if (!element) {
            for (let i = 0; i < this.port.length; i++) {
                const comNode = new M5FSResource(this.port[i], '', '', this.port[i], 'COM', vscode.TreeItemCollapsibleState.Collapsed);
                tree.push(comNode);
            }
            return tree;
        }
        else {
            // Internal COM devices resources
            const com = element.com;
            let extraPath = element ? element.parent + '/' + element.label : '/flash';
            if (element.contextValue === 'COM') {
                extraPath = '/flash';
            }
            try {
                const dir = (await SerialManager_1.default.listDir(com, extraPath)).toString();
                dir.split(',').forEach((dir) => {
                    if (!dir) {
                        return;
                    }
                    const isFile = dir.indexOf('.') > -1;
                    const collapsibleState = isFile
                        ? vscode.TreeItemCollapsibleState.None
                        : vscode.TreeItemCollapsibleState.Collapsed;
                    const node = new M5FSResource(dir, '', extraPath, com, isFile ? 'file' : 'folder', collapsibleState);
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
            }
            catch (e) {
                vscode.window.showErrorMessage(e);
            }
        }
        return tree;
    }
    getTreeItem(element) {
        return element;
    }
}
exports.M5TreeDataProvider = M5TreeDataProvider;


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __importStar(__webpack_require__(1));
const SerialManager_1 = __importDefault(__webpack_require__(4));
const PortList_1 = __importDefault(__webpack_require__(46));
const RESET = 'Reset';
const DISCONNECT = 'Disconnect';
const options = [
    {
        label: RESET,
        description: 'Reset device',
    },
    {
        label: DISCONNECT,
        description: 'Disconnect M5Stack',
    },
];
class StatusBar {
    constructor() {
        this.comList = [];
        this.comListCommands = [];
    }
    add(com) {
        const item = vscode.window.createStatusBarItem();
        item.text = `${com.label}`;
        item.name = `${com.label}`;
        item.command = `vscode-m5stack-mpyreader.openPort${com.label}`;
        item.show();
        try {
            const disposable = vscode.commands.registerCommand(`vscode-m5stack-mpyreader.openPort${com.label}`, () => this.selectAction(com.label));
            this.comList.push(item);
            this.comListCommands.push(disposable);
        }
        catch (e) {
            console.log(e);
        }
    }
    remove(com) {
        const index = this.comList.findIndex((comElt) => comElt.name === com);
        if (index > -1) {
            this.comList[index].dispose();
            this.comListCommands[index].dispose();
            this.comList.splice(index, 1);
            this.comListCommands.splice(index, 1);
        }
    }
    clear() {
        this.comList.forEach((item) => item.dispose());
        this.comListCommands.forEach((item) => item.dispose());
        this.comList = [];
        this.comListCommands = [];
    }
    has(com) {
        return (this.comList.findIndex((comElt) => {
            return comElt.text === com.label;
        }) > -1);
    }
    async selectAction(com) {
        const deviceSelectedAction = await vscode.window.showQuickPick(options);
        if (!deviceSelectedAction) {
            return;
        }
        switch (deviceSelectedAction.label) {
            case RESET:
                const r = await SerialManager_1.default.exec(com, 'machine.reset()');
                if (!r) {
                    vscode.window.showErrorMessage('Reset device failed.');
                }
                else {
                    vscode.window.showInformationMessage('Device is resetting.');
                }
                break;
            case DISCONNECT:
                SerialManager_1.default.disconnect(com);
                this.remove(com);
                PortList_1.default.removeSelectedComs(com);
                PortList_1.default.refreshTree();
                break;
            default:
                break;
        }
    }
}
exports["default"] = new StatusBar();


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map