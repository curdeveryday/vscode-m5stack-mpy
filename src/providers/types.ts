import * as vscode from 'vscode';

export interface CompletionItems {
  [key: string]: vscode.CompletionItem;
}
