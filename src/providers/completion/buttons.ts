import * as vscode from 'vscode';
import { buildCompletionItem } from './builder';

export const startButtons = [
  buildCompletionItem('btnA', 'Button A', ['.'], undefined, undefined, vscode.CompletionItemKind.Variable),
  buildCompletionItem('btnB', 'Button B', ['.'], undefined, undefined, vscode.CompletionItemKind.Variable),
  buildCompletionItem('btnC', 'Button C', ['.'], undefined, undefined, vscode.CompletionItemKind.Variable),
];

export const endButtons = [
  buildCompletionItem(
    'wasPressed',
    'wasPressed(event: func)',
    undefined,
    'Set a event when the button was pressed.',
    'wasPressed(${1})',
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem(
    'wasReleased',
    'wasReleased(event: func)',
    undefined,
    'Set a event when the button was released.',
    'wasReleased(${1})',
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem(
    'pressFor',
    'pressFor(interval: int|float, event: func)',
    undefined,
    'Set a event when the button was pressed for a few millisecond.',
    'pressFor(${1})',
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem(
    'wasDoublePress',
    'wasDoublePress(event: func)',
    undefined,
    'Set a event when the button was double pressed.',
    'wasDoublePress(${1})',
    vscode.CompletionItemKind.Method
  ),
];
