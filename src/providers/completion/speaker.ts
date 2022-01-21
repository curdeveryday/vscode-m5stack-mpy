import * as vscode from 'vscode';
import { buildCompletionItem } from './builder';

export const startSpeaker = [
  buildCompletionItem('speaker', 'Speaker', ['.'], undefined, undefined, vscode.CompletionItemKind.Module),
];

export const endSpeaker = [
  buildCompletionItem(
    'tone',
    'tone(frequency: int, duration: int)',
    undefined,
    undefined,
    'tone(${1:1800}, ${2: 200})',
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem(
    'sing',
    'sing(frequency: int, part: int|float)',
    undefined,
    undefined,
    'sing(${1:220}, ${2: 1})',
    vscode.CompletionItemKind.Method
  ),
  buildCompletionItem(
    'setVolume',
    'setVolume(volume: int)',
    undefined,
    'Set the volume of the speaker.',
    'setVolume(${1:1})',
    vscode.CompletionItemKind.Method
  ),
];
