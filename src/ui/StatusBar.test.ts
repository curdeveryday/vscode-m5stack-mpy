import * as vscode from 'vscode';
import SerialManager from '../serial/SerialManager';
import StatusBar, { DISCONNECT, RESET } from './StatusBar';

jest.mock('../serial/SerialManager', () => ({
  disconnect: jest.fn(),
  exec: () => Promise.resolve(Buffer.from('done')),
  removeFile: jest.fn(),
}));
jest.mock('./PortList', () => ({
  refreshTree: jest.fn(),
  removeSelectedComs: jest.fn(),
}));

describe('StatusBar', () => {
  beforeEach(() => {
    StatusBar.clear();
  });

  test('should add device to status bar', () => {
    // ARRANGE
    const newDevice = {
      label: 'm6stack',
      description: 'my m5',
      picked: true,
    };

    // ACT
    StatusBar.add(newDevice);

    // ASSERT
    expect(StatusBar.items.length).toBe(1);
  });

  test('should find device in status bar', () => {
    // ARRANGE
    const newDevice = {
      label: 'm6stack',
      description: 'my m5',
      picked: true,
    };

    // ACT
    StatusBar.add(newDevice);

    // ASSERT
    expect(StatusBar.has(newDevice)).toBe(true);
  });

  test('should remove device from status bar', () => {
    // ARRANGE
    const newDevice = {
      label: 'm5stack',
      description: 'my m5',
      picked: true,
    };

    // ACT
    StatusBar.add(newDevice);
    StatusBar.remove('m5stack');

    // ASSERT
    expect(StatusBar.items.length).toBe(0);
  });

  describe('actions', () => {
    test('should reset device', async () => {
      // ARRANGE
      const spy = jest
        .spyOn(vscode.window, 'showQuickPick')
        .mockResolvedValue({ label: RESET, description: '' });

      const spy2 = jest.spyOn(SerialManager, 'exec');

      // ACT
      await StatusBar._selectAction('m5stack');

      // ASSERT
      expect(spy).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
    });

    test('should disconnect device', async () => {
      // ARRANGE
      const spy = jest
        .spyOn(vscode.window, 'showQuickPick')
        .mockResolvedValue({ label: DISCONNECT, description: '' });

      const spy2 = jest.spyOn(SerialManager, 'disconnect');

      // ACT
      await StatusBar._selectAction('m5stack');

      // ASSERT
      expect(spy).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
    });
  });
});
