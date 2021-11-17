// CRC Table
const CRC_TABLE = [
  0x0000, 0xcc01, 0xd801, 0x1400, 0xf001, 0x3c00, 0x2800, 0xe401, 0xa001, 0x6c00, 0x7800, 0xb401, 0x5000,
  0x9c01, 0x8801, 0x4400,
];

// Header delimited data
export const HEAD_DATA = [0xaa, 0xab, 0xaa];

// Footer delimited data
const FOOT_DATA = [0xab, 0xcc, 0xab];

class Crc {
  /**
   * Compute crc value
   * @param {*} data Buffer data
   * @param {*} len Buffer length
   */
  crc16(data: Buffer, len: number): number {
    let crc = 0xffff;
    for (let i = 0; i < len; i++) {
      let ch = data[i];
      crc = CRC_TABLE[(ch ^ crc) & 15] ^ (crc >> 4);
      crc = CRC_TABLE[((ch >> 4) ^ crc) & 15] ^ (crc >> 4);
    }
    return crc;
  }

  /**
   * Fill CRC
   * @param {*} data Buffer
   */
  coverCrc(data: Buffer): Buffer {
    let crcResult = this.crc16(data, data.length);
    return Buffer.concat([data, Buffer.from([crcResult >> 8, crcResult & 0x00ff])]);
  }

  checkReceiveCompleted(buffer: Buffer): boolean {
    const headBuf = Buffer.from(HEAD_DATA);
    const footBuf = Buffer.from(FOOT_DATA);
    if (headBuf.compare(buffer.slice(0, 3)) === 0 && footBuf.compare(buffer.slice(-3)) === 0) {
      return true;
    }
    return false;
  }

  createDataBuffer(commandCode: number, data: string) {
    return Buffer.concat([Buffer.from([commandCode]), Buffer.from(data)]);
  }
}

export default new Crc();
