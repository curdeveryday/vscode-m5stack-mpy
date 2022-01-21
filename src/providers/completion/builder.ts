import * as vscode from 'vscode';

export const buildCompletionItem = (
  label: string,
  detail: string,
  commitCharacters: string[] | undefined,
  documentation: string | undefined,
  insertText: string | undefined,
  kind: vscode.CompletionItemKind = vscode.CompletionItemKind.Text,
  command?: vscode.Command
): vscode.CompletionItem => {
  const item = new vscode.CompletionItem(label, kind);
  item.detail = detail;

  if (commitCharacters) {
    item.commitCharacters = commitCharacters;
  }

  item.documentation = new vscode.MarkdownString(documentation);

  if (insertText) {
    item.insertText = new vscode.SnippetString(insertText);
  }

  if (command) {
    item.command = command;
  }

  return item;
};
