import * as vscode from 'vscode';
import { buildCompletionItem } from './builder';

export const startLcd = [
  buildCompletionItem(
    'lcd',
    'Lcd',
    ['.'],
    'Module Lcd \n\nhttps://github.com/m5stack/M5Stack_MicroPython#lcd',
    undefined,
    vscode.CompletionItemKind.Module
  ),
];

const fonts = [
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

const fontCompletion = fonts.map((font) =>
  buildCompletionItem(font, font, undefined, undefined, undefined, vscode.CompletionItemKind.Constant)
);

const colors = [
  'BLACK',
  'NAVY',
  'ARKGREEN',
  'DARKCYAN',
  'MAROON',
  'PURPLE',
  'OLIVE',
  'LIGHTGREY',
  'DARKGREY',
  'BLUE',
  'GREEN',
  'CYAN',
  'RED',
  'MAGENTA',
  'YELLOW',
  'WHITE',
  'ORANGE',
  'GREENYELLOW',
  'PINK',
];

const colorCompletion = colors.map((color) =>
  buildCompletionItem(color, color, undefined, undefined, undefined, vscode.CompletionItemKind.Constant)
);

const orientations = ['PORTRAIT', 'LANDSCAPE', 'PORTRAIT_FLIP', 'LANDSCAPE_FLIP'];

const orientationCompletion = orientations.map((orient) =>
  buildCompletionItem(orient, orient, undefined, undefined, undefined, vscode.CompletionItemKind.Constant)
);

export const endLcd = [
  buildCompletionItem(
    'arc',
    'arc(x: int, y: int, radius: int, thick: int, start: int, end: int, color: int)',
    undefined,
    'Draw a arc in screen.\n\nhttps://github.com/m5stack/M5Stack_MicroPython#lcdarcx-y-r-thick-start-end-color-fillcolor',
    'arc(${1:0}, ${2:0}, ${3:0}, ${4:0}, ${5:0}, ${6:0}, ${7:0xFFFFFF})',
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem(
    'clear',
    'clear(color?: int)',
    undefined,
    'Clear screen by a color.\n\n@_param_ `color` —— The color of the screen, default value is black.\n\nhttps://github.com/m5stack/M5Stack_MicroPython#lcdclearcolor',
    'clear(${1})',
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem(
    'circle',
    'circle(x: int, y: int, radius: int, color: int)',
    undefined,
    'Draw a circle in screen.\n\n@_param_ `x` —— The X coordinate of the centroid coordinates.\n\n@_param_ `y` —— The Y coordinate of the  centroid coordinates.\n\n@_param_ `radius` —— The radius of the circle.\n\n@_param_ `color` —— The color of the triangle.\n\nhttps://github.com/m5stack/M5Stack_MicroPython#lcdcirclex-y-r-color-fillcolor',
    'circle(${1:0}, ${2:0}, ${3:10}, ${7:0xFFFFFF})',
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem(
    'ellipse',
    'ellipse(x: int, y: int, rx: int, ry: int, color: int)',
    undefined,
    'Draw a ellipse in screen.\n\nhttps://github.com/m5stack/M5Stack_MicroPython#lcdellipsex-y-rx-ry-opt-color-fillcolor',
    'ellipse(${1:0}, ${2:0}, ${3:0}, ${4:0}, ${5:0xFFFFFF})',
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem(
    'fill',
    'fill(color: int)',
    undefined,
    'Fill screen by a color.\n\n@_param_ `color` —— The color of the screen.',
    'fill(${1})',
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem(
    'font',
    'font(font: string)',
    undefined,
    'Set font of the text.\n\n@_param_ `text` —— Text to display.\n\n@_param_ `font` —— Font type.There are `FONT_Default`, `FONT_Default_Small`, `FONT_DejaVu18`, `FONT_DejaVu24`, `FONT_DejaVu40`, `FONT_DejaVu56`, `FONT_DejaVu72`, `FONT_Ubuntu`, `FONT_Comic`\n\nhttps://github.com/m5stack/M5Stack_MicroPython#lcdfontfont-rotate-transparent-fixedwidth-dist-width-outline-color',
    'font(lcd.${1|FONT_Default,FONT_Default_Small,FONT_DejaVu18,FONT_DejaVu24,FONT_DejaVu40,FONT_DejaVu56,FONT_DejaVu72,FONT_Ubuntu,FONT_Comic|})',
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem(
    'line',
    'line(x1: int, y1: int, x2: int, y2: int, color: int)',
    undefined,
    'Draw a line in screen.\n\n@_param_ `x1` —— The X coordinate of the start point.\n\n@_param_ `y1` —— The Y coordinate of the start point.\n\n@_param_ `x2` —— The X coordinate of the end point.\n\n@_param_ `y2` —— The Y coordinate of the end point.\n\n@_param_ `color` —— The color of the line.\n\nhttps://github.com/m5stack/M5Stack_MicroPython#lcdlinex-y-x1-y1-color',
    'line(${1:0}, ${2:0}, ${3:0}, ${4:0}, ${5:0xFFFFFF})',
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem(
    'lineByAngle',
    'lineByAngle(x: int, y: int, start: int, length: int, angle: int, color: int)',
    undefined,
    'Draw the line from point (x,y) with length lenght starting st distance start from center.\n\n@_param_ `x` —— The X coordinate of the start point.\n\n@_param_ `y` —— The Y coordinate of the start point.\n\n@_param_ `start` —— Distance start from center.\n\n@_param_ `length` —— Line length.\n\n@_param_ `angle` —— The angle is given in degrees (0~359).\n\n@_param_ `color` —— The color of the line.\n\nhttps://github.com/m5stack/M5Stack_MicroPython#lcdlinebyanglex-y-start-length-angle-color',
    'lineByAngle(${1:0}, ${2:0}, ${3:0}, ${4:0}, ${5:0}, ${6:0xFFFFFF})',
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem(
    'pixel',
    'pixel(x: int, y: int, color: int)',
    undefined,
    'Draw a pixel in screen.\n\n@_param_ `x` —— The X coordinate of the pixel.\n\n@_param_ `y` —— The Y coordinate of the pixel.\n\n@_param_ `color` —— The color of the pixel. \n\nhttps://github.com/m5stack/M5Stack_MicroPython#lcdpixelx-y-color',
    'pixel(${1:0}, ${2:0}, ${3:0xFFFFFF})',
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem(
    'print',
    'print(text: string, x: int, y: int, color: int)',
    undefined,
    'Print text in screen.\n\n@_param_ `text` —— Text to display.\n\n@_param_ `x` —— The X coordinate of the text\n\n@_param_ `y` —— The Y coordinate of the text\n\n@_param_ `color` —— The color of the text\n\nhttps://github.com/m5stack/M5Stack_MicroPython#lcdprinttextx-y-color-rotate-transparent-fixedwidth-wrap',
    "print('${1}', ${2:0}, ${3:0}, ${4:0xFFFFFF})",
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem(
    'rect',
    'rect(x1: int, y1: int, x2: int, y2: int, color: int)',
    undefined,
    'Draw a rectangle in screen.\n\n@_param_ `x1` —— The X coordinate of the start point.\n\n@_param_ `y1` —— The Y coordinate of the start point.\n\n@_param_ `x2` —— The X coordinate of the end point.\n\n@_param_ `y2` —— The Y coordinate of the end point.\n\n@_param_ `color` —— The color of the rectangle.\n\nhttps://github.com/m5stack/M5Stack_MicroPython#lcdrectx-y-width-height-color-fillcolor',
    'rect(${1:0}, ${2:0}, ${3:0}, ${4:0}, ${5:0xFFFFFF})',
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem(
    'triangle',
    'triangle(x: int, y: int, x1: int, y1: int, x2: int, y2: int, color: int)',
    undefined,
    'Draw a triangle in screen.\n\n@_param_ `x` —— The X coordinate of the point A.\n\n@_param_ `y` —— The Y coordinate of the point A.\n\n@_param_ `x1` —— The X coordinate of the point B.\n\n@_param_ `y1` —— The Y coordinate of the point B.\n\n@_param_ `x2` —— The X coordinate of the point C.\n\n@_param_ `y2` —— The Y coordinate of the point C.\n\n@_param_ `color` —— The color of the triangle.\n\nhttps://github.com/m5stack/M5Stack_MicroPython#lcdtrianglex-y-x1-y1-x2-y2-color-fillcolor',
    'triangle(${1:0}, ${2:0}, ${3:0}, ${4:0}, ${5:0}, ${6:0}, ${7:0xFFFFFF})',
    vscode.CompletionItemKind.Method
  ),

  buildCompletionItem(
    'polygon',
    'polygon(x: int, y: int, radius: int, sides: int, thick: int, color: int)',
    undefined,
    'Draw a polygon in screen.\n\nhttps://github.com/m5stack/M5Stack_MicroPython#lcdpolyx-y-r-sides-thick-color-fillcolor-rotate',
    'polygon(${1:0}, ${2:0}, ${3:0}, ${4:0}, ${5:0}, ${6:0xFFFFFF})',
    vscode.CompletionItemKind.Method
  ),
  ...fontCompletion,
  ...colorCompletion,
  ...orientationCompletion,
];
