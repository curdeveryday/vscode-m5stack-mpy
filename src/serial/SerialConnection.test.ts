import Crc from './Crc';
import SerialConnection from './SerialConnection';

jest.mock('../serial/SerialManager', () => ({
  connect: jest.fn(),
  disconnect: jest.fn(),
  download: jest.fn(),
  exec: () => Promise.resolve(Buffer.from('done')),
  isBusy: jest.fn(() => false),
  readFile: () => Promise.resolve(Buffer.from('done')),
  removeFile: jest.fn(),
}));

jest.mock('./Crc', () => ({
  checkReceiveCompleted: jest.fn(),
  coverCrc: jest.fn(),
}));

describe('SerialConnection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('send', () => {
    test('should handle sending command as buffer', async () => {
      // ARRANGE
      const conn = new SerialConnection('/dev/device', () => {});
      const spy = jest.spyOn(conn, 'write');

      setTimeout(() => {
        conn.resolve(Buffer.from('done'));
      }, 100);

      // ACT
      await conn.sendCommandWithBuffer(Buffer.from(''));

      // ASSERT
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('write', () => {
    test('should handle writing to device', async () => {
      // ARRANGE
      const conn = new SerialConnection('/dev/device', () => {});
      const spyWrite = jest.spyOn(conn.port, 'write');
      const spyDrain = jest.spyOn(conn.port, 'drain');

      // ACT
      await conn.write(Buffer.from(''));

      // ASSERT
      expect(spyWrite).toHaveBeenCalledTimes(1);
      expect(spyDrain).toHaveBeenCalledTimes(1);
    });
  });

  describe('onData', () => {
    test('should handle receiving data', async () => {
      // ARRANGE
      const conn = new SerialConnection('/dev/device', () => {});
      const spyCrc = jest.spyOn(Crc, 'checkReceiveCompleted').mockImplementationOnce(() => true);
      const spyResolve = jest.spyOn(conn, 'resolve');

      // ACT
      await conn.onData(Buffer.from([0x01, 0x02, 0x03, 0x04, 0x00]));

      // ASSERT
      expect(spyCrc).toHaveBeenCalledTimes(1);
      expect(spyResolve).toHaveBeenCalledTimes(1);
    });
    test('should handle errors on receiving data', async () => {
      // ARRANGE
      const conn = new SerialConnection('/dev/device', () => {});
      const spyCrc = jest.spyOn(Crc, 'checkReceiveCompleted').mockImplementationOnce(() => true);
      const spyReject = jest.spyOn(conn, 'reject');

      // ACT
      await conn.onData(Buffer.from([0x01, 0x02, 0x03, 0x04, 0x05]));

      // ASSERT
      expect(spyCrc).toHaveBeenCalledTimes(1);
      expect(spyReject).toHaveBeenCalledTimes(1);
    });
  });
});
