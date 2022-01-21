import * as vscode from 'vscode';
import { buildCompletionItem } from './builder';
export const startMachine = [
  buildCompletionItem(
    'machine',
    'Machine',
    ['.'],
    'Module Machine \n\nhttps://github.com/m5stack/M5Stack_MicroPython\n\nhttps://github.com/m5stack/UIFlow-Code/wiki',
    undefined,
    vscode.CompletionItemKind.Module
  ),
];

export const endMachine = [
  buildCompletionItem(
    'ADC',
    'ADC(pin: int)',
    undefined,
    'Init a ADC object.\n\n@_param_ `pin` —— Pin value must be between 32 and 39',
    'ADC(${1})',
    vscode.CompletionItemKind.Constructor
  ),
  buildCompletionItem(
    'DAC',
    'DAC(pin: int)',
    undefined,
    'Init a DAC object.\n\n@_param_ `pin` —— Pin value only can be 25 or 26',
    'DAC(${1|25,26|})',
    vscode.CompletionItemKind.Constructor
  ),
  buildCompletionItem(
    'UART',
    'UART()',
    undefined,
    'Init a UART object.',
    'UART(1, tx=17, rx=16)',
    vscode.CompletionItemKind.Constructor
  ),
  buildCompletionItem(
    'PWM',
    'PWM()',
    undefined,
    'Init a PWM object.',
    'PWM(${1})',
    vscode.CompletionItemKind.Constructor
  ),
  buildCompletionItem(
    'Pin',
    'Pin()',
    undefined,
    'Init a Pin object.',
    'Pin(${1})',
    vscode.CompletionItemKind.Constructor
  ),
];
