const { SerialPort } = require('../vendor/node-usb-native/lib');

let Serialport = {};

// 包头分隔数据
const head_data = [0xaa, 0xab, 0xaa];

// 包尾分割数据
const foot_data = [0xab, 0xcc, 0xab];

// CRC表
const crc_table = [0x0000, 0xCC01, 0xD801, 0x1400, 0xF001, 0x3C00, 0x2800, 0xE401, 0xA001, 0x6C00, 0x7800, 0xB401, 0x5000, 0x9C01, 0x8801, 0x4400];

// 命令代码
const command_code = {
    IS_ONLINE: 0x00,
    GET_INFO: 0x01,
    EXEC: 0x02,
    LIST_DIR: 0x03,
    DOWNLOAD: 0x04,
    GET_FILE: 0x05,
    DOWNLOAD_FILE: 0x06,
    REMOVE_FILE: 0x07,
    SET_WIFI: 0x08,
};

// 默认配置
const defaultOpts = {
    baudRate: 115200
};

/**
 * 数据转换
 * @param {*} command_code 命令字节值
 * @param {*} data 转换数据
 */
const createDataBuffer = function(command_code, data) {
    return Buffer.concat([Buffer.from([command_code]), Buffer.from(data)]);
}

/**
 * 计算CRC值
 * @param {*} data 数据Buffer
 * @param {*} len Buffer长度
 */
const crc16 = function(data, len) {
    let crc = 0xffff;
    for(let i = 0; i < len; i++) {
        let ch = data[i];
        crc = crc_table[(ch ^ crc) & 15] ^ (crc >> 4);
        crc = crc_table[((ch >> 4) ^ crc) & 15] ^ (crc >> 4)
    }
    return crc;
}

/**
 * 填充CRC
 * @param {*} data Buffer
 */
const cover_crc = function(data) {
    let crc_result = crc16(data, data.length);
    return Buffer.concat([data, Buffer.from([crc_result >> 8, crc_result & 0x00FF])]);
}

/**
 * 绑定读取事件回调
 * @param {*} com 串口实例
 */
const bindReadEvent = function(com, cb) {
    if(com.on) {
        let result = Buffer.from([]);
        let head_data_checker = Buffer.alloc(3, 0x00);
        let foot_data_checker = Buffer.alloc(3, 0x00);
        let is_start = false;
        let is_end = false;
        com.on('readable', () => {
            while(com.readable) {
                let data = com.read(1);
                if(data == null) {
                    break;
                }
                if(!is_start) {
                    head_data_checker[0] = head_data_checker[1];
                    head_data_checker[1] = head_data_checker[2];
                    head_data_checker[2] = data[0];
                    if(head_data_checker.compare(Buffer.from(head_data)) == 0) {
                        is_start = true;
                    } else {
                        continue;
                    }
                }
                if(is_start && !is_end) {
                    foot_data_checker[0] = foot_data_checker[1];
                    foot_data_checker[1] = foot_data_checker[2];
                    foot_data_checker[2] = data[0];
                    if(foot_data_checker.compare(Buffer.from(foot_data)) == 0) {
                        is_end = true;
                        result = result.slice(1, result.length - 2);
                        if(crc16(Buffer.concat([Buffer.from(head_data), result.slice(0, -2)]), 0)) {
                            if(result[1] == 0x00) {
                                result = result.slice(2, -2);
                            } else {
                                result = null;
                            }
                        } else {
                            result = null;
                        }
                        com.close(err => {
                            if(err) {
                                
                            }
                            cb(result);
                        });
                        break;
                    } else {
                        result = Buffer.concat([result, data]);
                    }
                }
            }
        });
    } else {
        cb(false);
    }
}

/**
 * 获取所有串口
 */
Serialport.getCOMs = function() {
    return new Promise(resolve => {
        SerialPort.list((err, ports) => {
            if(err) {
                resolve([]);
                return;
            }
            resolve(ports);
        });
    });
}

/**
 * 读取文件
 * @param {*} com 串口号
 * @param {*} filename 文件名
 */
Serialport.readFile = function(com, filename) {
    return new Promise(resolve => {
        let data = cover_crc(createDataBuffer(command_code.GET_FILE, filename));
        let port = new SerialPort(com, defaultOpts, function(err) {
            if(err) {
                resolve(false);
                return;
            }
            bindReadEvent(port, resolve);
            port.write(data);
        });
    });
}

/**
 * 读取目录
 * @param {*} com 串口号
 * @param {*} dirname 文件夹路径
 */
Serialport.listDir = function(com, dirname) {
    return new Promise(resolve => {
        let data = cover_crc(createDataBuffer(command_code.LIST_DIR, dirname));
        let port = new SerialPort(com, defaultOpts, function(err) {
            if(err) {
                resolve(false);
                return;
            }
            bindReadEvent(port, resolve);
            port.write(data);
        });
    });
}

/**
 * 执行代码
 * @param {*} com 串口号
 * @param {*} code 代码
 */
Serialport.exec = function(com, code) {
    return new Promise(resolve => {
        let data = cover_crc(createDataBuffer(command_code.EXEC, code));
        let port = new SerialPort(com, defaultOpts, function(err) {
            if(err) {
                console.log(err);
                resolve(false);
                return;
            }
            bindReadEvent(port, resolve);
            port.write(data);
        });
    });
}

/**
 * 获取文件信息
 * @param {*} com 串口号
 */
Serialport.getInfo = function(com) {
    return new Promise(resolve => {
        let data = cover_crc(createDataBuffer(command_code.GET_INFO, '0'));
        let port = new SerialPort(com, defaultOpts, function(err) {
            if(err) {
                resolve(false);
                return;
            }
            bindReadEvent(port, resolve);
            port.write(data);
        });
    });
}

/**
 * 下载文件到设备
 * @param {*} com 串口号
 * @param {*} filename 文件名
 * @param {*} content 文件内容
 * @param {*} flag 写入方式 0x00追加 0x01覆写
 */
Serialport.download = function(com, filename, content, flag) {
    return new Promise(resolve => {
        let data = cover_crc(Buffer.concat([Buffer.from([command_code.DOWNLOAD_FILE]), Buffer.from(filename), Buffer.from([0x00]), Buffer.from([flag]), Buffer.from(content)]));
        let port = new SerialPort(com, defaultOpts, function(err) {
            if(err) {
                resolve(false);
                return;
            }
            bindReadEvent(port, resolve);
            port.write(data);
        });
    });
}

/**
 * 分段下载文件到设备
 * 当单个文件大小大于15kb时，则需要拆分文件后按顺序传输
 * @param {*} com 串口号
 * @param {*} filename 文件名
 * @param {Buffer} content 文件内容
 */
Serialport.bulkDownload = async function(com, filename, content) {
    let data_part = [];
    let max_data_length = 1024 * 15;
    if(content.length > max_data_length) {
        let part = Math.ceil(content.length / max_data_length);
        for(let i = 0; i < part; i++) {
            data_part[i] = content.slice(i * max_data_length, max_data_length * (i + 1));
        }
    }

    for(let i = 0; i < data_part.length; i++) {
        if(i == 0) {
            await this.download(com, filename, data_part[i], 0x01);
            continue;
        }
        await this.download(com, filename, data_part[i], 0x00);
    }

    return 'done';
}

/**
 * 删除文件
 * @param {*} com 串口号
 * @param {*} filename 文件名
 */
Serialport.removeFile = function(com, filename) {
    return new Promise(resolve => {
        let data = cover_crc(createDataBuffer(command_code.REMOVE_FILE, filename));
        let port = new SerialPort(com, defaultOpts, function(err) {
            if(err) {
                resolve(false);
                return;
            }
            bindReadEvent(port, resolve);
            port.write(data);
        });
    });
}

module.exports = Serialport;