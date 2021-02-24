/**
 * M5Stack UIFlow USB Mode
 * 
 * Format
 * 
 * [HEAD DATA](3)[COMMAND](1)[STATE](1)[DATA](N)[CRC](2)[END DATA](3) 
 */

const { SerialPort } = require('node-usb-native');

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

const PORT = {};

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
 * 判断是否接受完成（校对包头包尾数据）
 * @param {*} buffer 
 */
const checkReceiveCompleted = function(buffer) {
    let head_buf = Buffer.from(head_data);
    let foot_buf = Buffer.from(foot_data);
    if(head_buf.compare(buffer.slice(0, 3)) == 0 && foot_buf.compare(buffer.slice(-3)) == 0) {
        return true;
    }
    return false;
}

/**
 * 绑定读取事件回调
 * @param {*} com 串口实例
 */
const bindReadEvent = function(com, cb) {
    let result = Buffer.from([]);
    com.on('data', (chunk) => {
        result = Buffer.concat([result, chunk]);
        if(result.slice(0, 3).compare(Buffer.from(head_data)) != 0) {
            console.log('[Error] boot start failed.');
            com.close(err => cb(false));
            return;
        }
        if(checkReceiveCompleted(result)) {
            let pre_data = result.slice(0, -5);
            if(crc16(pre_data, pre_data.length) == result.slice(-5, -3).readUInt16LE(0)) {
                com.close((err) => {
                    if(err) {
                        console.log(err);
                        cb(false);
                        return;
                    }
                    if(result[4] == 0x00) {
                        cb(result.slice(5, -5));
                    } else {
                        cb(false);
                    }
                });
                return;
            }
            com.close((err) => {
                console.log('Can not pass CRC.');
                if(err) {
                    console.log(err);
                }
                cb(false);
            });
        }
    });
}

const isUsingPort = function(com) {
    if(PORT[com]) {
        return PORT[com].isOpen();
    }
    return false;
}

/**
 * 获取所有串口
 */
Serialport.getCOMs = function() {
    return new Promise(resolve => {
        SerialPort.list().then(
            ports => resolve(ports),
            err => resolve([])
        )
    });
}

/**
 * 读取文件
 * @param {*} com 串口号
 * @param {*} filename 文件名
 */
Serialport.readFile = function(com, filename) {
    return new Promise(resolve => {
        if(isUsingPort()) {
            resolve(false);
            return;
        }
        let data = cover_crc(createDataBuffer(command_code.GET_FILE, filename));
        PORT[com] = new SerialPort(com, defaultOpts, function(err) {
            if(err) {
                console.log(err);
                resolve(false);
                return;
            }
            bindReadEvent(PORT[com], resolve);
            PORT[com].write(data);
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
        if(isUsingPort()) {
            resolve(false);
            return;
        }
        let data = cover_crc(createDataBuffer(command_code.LIST_DIR, dirname));
        PORT[com] = new SerialPort(com, defaultOpts, function(err) {
            if(err) {
                console.log(err);
                resolve(false);
                return;
            }
            bindReadEvent(PORT[com], resolve);
            PORT[com].write(data);
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
        if(isUsingPort()) {
            resolve(false);
            return;
        }
        let data = cover_crc(createDataBuffer(command_code.EXEC, code));
        PORT[com] = new SerialPort(com, defaultOpts, function(err) {
            if(err) {
                console.log(err);
                resolve(false);
                return;
            }
            bindReadEvent(PORT[com], resolve);
            PORT[com].write(data);
        });
    });
}

/**
 * 获取文件信息
 * @param {*} com 串口号
 */
Serialport.getInfo = function(com) {
    return new Promise(resolve => {
        if(isUsingPort()) {
            resolve(false);
            return;
        }
        let data = cover_crc(createDataBuffer(command_code.GET_INFO, '0'));
        PORT[com] = new SerialPort(com, defaultOpts, function(err) {
            if(err) {
                console.log(err);
                resolve(false);
                return;
            }
            bindReadEvent(PORT[com], resolve);
            PORT[com].write(data);
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
        if(isUsingPort()) {
            resolve(false);
            return;
        }
        let data = cover_crc(Buffer.concat([Buffer.from([command_code.DOWNLOAD_FILE]), Buffer.from(filename), Buffer.from([0x00]), Buffer.from([flag]), Buffer.from(content)]));
        PORT[com] = new SerialPort(com, defaultOpts, function(err) {
            if(err) {
                console.log(err);
                resolve(false);
                return;
            }
            bindReadEvent(PORT[com], resolve);
            PORT[com].write(data);
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
        if(isUsingPort()) {
            resolve(false);
            return;
        }
        let data = cover_crc(createDataBuffer(command_code.REMOVE_FILE, filename));
        PORT[com] = new SerialPort(com, defaultOpts, function(err) {
            if(err) {
                console.log(err);
                resolve(false);
                return;
            }
            bindReadEvent(PORT[com], resolve);
            PORT[com].write(data);
        });
    });
}

Serialport.disconnect = function(com) {
    if(isUsingPort()) {
        console.log(`${com} is using.`);
        PORT[com].close(err => PORT[com] = null);
    }
}

module.exports = Serialport;