export const defaultOpts = {
  baudRate: 115200,
};

export const COMMAND_CODES = {
  isOnline: 0x00,
  getInfo: 0x01,
  exec: 0x02,
  listDir: 0x03,
  download: 0x04,
  getFile: 0x05,
  downloadFile: 0x06,
  removeFile: 0x07,
  setWifi: 0x08,
};
