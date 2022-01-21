import * as vscode from 'vscode';
import { buildCompletionItem } from './builder';

export const startRgb = [
  buildCompletionItem('rgb', 'Rgb', ['.'], undefined, undefined, vscode.CompletionItemKind.Module),
];

export const endRgb = [
  buildCompletionItem(
    'setColor',
    'setColor(index: int, color: int)',
    undefined,
    'Set the `index` rgb to the `color`.',
    'setColor(${1:1}, ${2:0xFFFFFF})',
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem(
    'setColorFrom',
    'setColorFrom(start: int, end: int, color: int)',
    undefined,
    'Set the rgb between `start` and `end` to the `color`.',
    'setColorFrom(${1:1}, ${2:5}, ${3:0xFFFFFF})',
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem(
    'setColorAll',
    'setColorAll(color: int)',
    undefined,
    'Set all rgb to the `color`.',
    'setColorAll(${1:0xFFFFFF})',
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem(
    'setBrightness',
    'setBrightness(brightness: int)',
    undefined,
    'Set the brightness of rgb.',
    'setBrightness(${1:10})',
    vscode.CompletionItemKind.Method
  ),
];
