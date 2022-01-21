import * as vscode from 'vscode';
import { DOCUMENT_URI_SCHEME } from '../M5FileSystemProvider';
import { buildCompletionItem } from './builder';
import { endButtons, startButtons } from './buttons';
import { endImu, startImu } from './imu';
import { endLcd, startLcd } from './lcd';
import { endMachine, startMachine } from './machine';
import { endRgb, startRgb } from './rgb';
import { startScreen } from './screen';
import { endSpeaker, startSpeaker } from './speaker';
import { endTime, startTimer } from './timer';
const variables: any[] = [];

// https://github.com/m5stack/M5Stack_MicroPython
// https://code.visualstudio.com/api/language-extensions/programmatic-language-features
// https://github.com/m5stack/UIFlow-Code/wiki/Hardware
// https://code.visualstudio.com/api/language-extensions/language-server-extension-guide

export const M5_MICRO_PYTHON = 'python';

const startProviderHandler = () => {
  const completions = [
    ...startButtons,
    ...startScreen,
    ...startSpeaker,
    ...startRgb,
    // imu
    buildCompletionItem(
      'imu',
      'imu',
      ['.'],
      'Before use need to import module imu.\n\n```import imu```',
      undefined,
      vscode.CompletionItemKind.Variable
    ),
    ...startLcd,
    ...startTimer,
    ...startMachine,
  ];

  /**
   * Auto add variable type
   */
  const variableCompletions = variables.map((item) => {
    const completion = new vscode.CompletionItem(item.varname, vscode.CompletionItemKind.TypeParameter);
    completion.detail = item.type;
    completion.commitCharacters = ['.'];
    return completion;
  });

  return completions.concat(variableCompletions);
};

const endProviderHandler = (
  document: vscode.TextDocument,
  position: vscode.Position,
  token: vscode.CancellationToken,
  context: vscode.CompletionContext
) => {
  let linePrefix = document.lineAt(position).text.substr(0, position.character);
  switch (true) {
    case linePrefix.endsWith('btnA.'):
    case linePrefix.endsWith('btnB.'):
    case linePrefix.endsWith('btnC.'): {
      return endButtons;
    }
    case linePrefix.endsWith('imu.'): {
      return startImu(linePrefix, variables);
    }
    case linePrefix.endsWith('lcd.'): {
      return endLcd;
    }
    case linePrefix.endsWith('machine.'): {
      return endMachine;
    }
    case linePrefix.endsWith('rgb.'): {
      return endRgb;
    }
    case linePrefix.endsWith('speaker.'): {
      return endSpeaker;
    }
    case linePrefix.endsWith('time.'): {
      return endTime;
    }
    default:
      break;
  }

  for (let i = 0; i < variables.length; i++) {
    switch (variables[i].type) {
      case 'imu': {
        return endImu;
      }
    }
  }

  return undefined;
};

export const startProvider = vscode.languages.registerCompletionItemProvider(
  { scheme: DOCUMENT_URI_SCHEME, language: M5_MICRO_PYTHON },
  { provideCompletionItems: startProviderHandler }
);
export const endProvider = vscode.languages.registerCompletionItemProvider(
  { scheme: DOCUMENT_URI_SCHEME, language: M5_MICRO_PYTHON },
  { provideCompletionItems: endProviderHandler },
  '.'
);
