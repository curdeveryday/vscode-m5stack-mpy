import * as vscode from 'vscode';
import { endButtons, startButtons } from '../completion/buttons';
import { endImu } from '../completion/imu';
import { endLcd, startLcd } from '../completion/lcd';
import { M5_MICRO_PYTHON } from '../completion/M5CompletionProvider';
import { endMachine, startMachine } from '../completion/machine';
import { endRgb, startRgb } from '../completion/rgb';
import { startScreen } from '../completion/screen';
import { endSpeaker, startSpeaker } from '../completion/speaker';
import { endTime, startTimer } from '../completion/timer';
import { DOCUMENT_URI_SCHEME } from '../M5FileSystemProvider';
import { CompletionItems } from '../types';

const hoverItems: CompletionItems = {};

export const registerHoverItems = (completionItems: vscode.CompletionItem[]): void => {
  completionItems.forEach((item) => {
    hoverItems[item.label as string] = item;
  });
};

registerHoverItems([
  ...startButtons,
  ...endButtons,
  ...endImu,
  ...startLcd,
  ...endLcd,
  ...startMachine,
  ...endMachine,
  ...startRgb,
  ...endRgb,
  ...startScreen,
  ...startSpeaker,
  ...endSpeaker,
  ...startTimer,
  ...endTime,
]);

export const hoverProvider = vscode.languages.registerHoverProvider(
  { scheme: DOCUMENT_URI_SCHEME, language: M5_MICRO_PYTHON },
  {
    provideHover: (
      document: vscode.TextDocument,
      position: vscode.Position,
      token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.Hover> => {
      const range = document.getWordRangeAtPosition(position);
      const word = document.getText(range);

      if (hoverItems[word]) {
        const markdownDocumentation = hoverItems[word].documentation || '';

        return Promise.resolve(new vscode.Hover(markdownDocumentation));
      } else {
        return Promise.reject();
      }
    },
  }
);
