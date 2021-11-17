import * as vscode from 'vscode';
import SerialManager from '../serial/SerialManager';
import PortList from './PortList';
import { PickedItem } from './types';

const RESET = 'Reset';
const DISCONNECT = 'Disconnect';

const options = [
  {
    label: RESET,
    description: 'Reset device',
  },
  {
    label: DISCONNECT,
    description: 'Disconnect M5Stack',
  },
];

class StatusBar {
  private comList: vscode.StatusBarItem[] = [];
  private comListCommands: vscode.Disposable[] = [];

  add(com: PickedItem) {
    const item = vscode.window.createStatusBarItem();
    item.text = `${com.label}`;
    item.name = `${com.label}`;
    item.command = `vscode-m5stack-mpyreader.openPort${com.label}`;
    item.show();

    try {
      const disposable = vscode.commands.registerCommand(
        `vscode-m5stack-mpyreader.openPort${com.label}`,
        () => this.selectAction(com.label)
      );

      this.comList.push(item);
      this.comListCommands.push(disposable);
    } catch (e) {
      console.log(e);
    }
  }

  remove(com: string) {
    const index = this.comList.findIndex((comElt) => comElt.name === com);
    if (index > -1) {
      this.comList[index].dispose();
      this.comListCommands[index].dispose();
      this.comList.splice(index, 1);
      this.comListCommands.splice(index, 1);
    }
  }

  clear() {
    this.comList.forEach((item) => item.dispose());
    this.comListCommands.forEach((item) => item.dispose());
    this.comList = [];
    this.comListCommands = [];
  }

  has(com: PickedItem) {
    return (
      this.comList.findIndex((comElt) => {
        return comElt.text === com.label;
      }) > -1
    );
  }

  async selectAction(com: string) {
    const deviceSelectedAction = await vscode.window.showQuickPick(options);
    if (!deviceSelectedAction) {
      return;
    }
    switch (deviceSelectedAction.label) {
      case RESET:
        const r = await SerialManager.exec(com, 'machine.reset()');

        if (!r) {
          vscode.window.showErrorMessage('Reset device failed.');
        } else {
          vscode.window.showInformationMessage('Device is resetting.');
        }
        break;
      case DISCONNECT:
        SerialManager.disconnect(com);
        this.remove(com);
        PortList.removeSelectedComs(com);
        PortList.refreshTree();
        break;
      default:
        break;
    }
  }
}

export default new StatusBar();
