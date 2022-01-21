import * as vscode from 'vscode';
import { buildCompletionItem } from './builder';
export const startTimer = [
  buildCompletionItem(
    'wait',
    'Delay few seconds.',
    undefined,
    'Delay few seconds.',
    'wait(${1})',
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem(
    'wait_ms',
    'Delay few milliseconds.',
    undefined,
    undefined,
    'wait_ms(${1})',
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem('time', 'Time', ['.'], undefined, undefined, vscode.CompletionItemKind.Module),
];

export const endTime = [
  buildCompletionItem(
    'ticks_ms',
    'ticks_ms()',
    undefined,
    'Get ticks by millisecond.',
    'ticks_ms()',
    vscode.CompletionItemKind.Method
  ),
];
