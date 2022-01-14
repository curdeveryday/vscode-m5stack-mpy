import Crc, { FOOT_DATA, HEAD_DATA } from './Crc';

describe('Crc', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('crc16', () => {
    test('should compute crc16', () => {
      // ARRANGE
      const bytes = Buffer.from('mydata');

      // ACT
      const value = Crc.crc16(bytes, bytes.length);

      // ASSERT
      expect(value).toStrictEqual(27197);
    });
  });

  describe('coverCrc', () => {
    test('should append crc to buffer', () => {
      // ARRANGE
      const bytes = Buffer.from('mydata');

      // ACT
      const value = Crc.coverCrc(bytes);

      // ASSERT
      expect(value).toStrictEqual(Buffer.from([109, 121, 100, 97, 116, 97, 106, 61]));
    });
  });

  describe('checkReceiveCompleted', () => {
    test('should return valid received buffer', () => {
      // ARRANGE
      const bytes = Buffer.concat([Buffer.from(HEAD_DATA), Buffer.from('mydata'), Buffer.from(FOOT_DATA)]);

      // ACT
      const value = Crc.checkReceiveCompleted(bytes);

      // ASSERT
      expect(value).toStrictEqual(true);
    });

    test('should return invalid received buffer', () => {
      // ARRANGE
      const bytes = Buffer.concat([Buffer.from('mydata'), Buffer.from(FOOT_DATA)]);

      // ACT
      const value = Crc.checkReceiveCompleted(bytes);

      // ASSERT
      expect(value).toStrictEqual(false);
    });
  });
});
