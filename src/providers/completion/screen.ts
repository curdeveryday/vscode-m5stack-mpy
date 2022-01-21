import * as vscode from 'vscode';
import { buildCompletionItem } from './builder';

export const startScreen = [
  buildCompletionItem(
    'setScreenColor',
    'setScreenColor(color: int)',
    undefined,
    'Set Screen Color with RGB Hex value (0x000000 - 0xFFFFFF).',
    'setScreenColor(${1:0x000000})',
    vscode.CompletionItemKind.Function
  ),
];
