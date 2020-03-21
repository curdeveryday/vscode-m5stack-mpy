'use strict';
const path = require('path');
const bindings = require('./native_loader').load(path.join(__dirname, 'native'), 'usb-native');
// const detectorBindings = require('./native_loader').load(path.join(__dirname, 'native'), 'detector');
// const serialportBindings = require('./native_loader').load(path.join(__dirname, 'native'), 'serialport');
const detectorBindings = require('usb-native').detector;
const serialportBindings = require('usb-native').SerialPort;
var listUnix = require('./list-unix');

var linux = process.platform !== 'win32' && process.platform !== 'darwin';

function listLinux(callback) {
  callback = callback || function(err) {
    if (err) {
      this.emit('error', err);
    }
  }.bind(this);
  return listUnix(callback);
}

var platformOptions = {};
if (process.platform !== 'win32') {
  platformOptions = {
    vmin: 1,
    vtime: 0
  };
}

module.exports = {
  // serialport bindings
  close: serialportBindings.close,
  drain: serialportBindings.drain,
  flush: serialportBindings.flush,
  list: linux ? listLinux : serialportBindings.list,
  open: serialportBindings.open,
  SerialportPoller: serialportBindings.SerialportPoller,
  set: serialportBindings.set,
  update: serialportBindings.update,
  write: serialportBindings.write,
  platformOptions: platformOptions,

  // usb-detection bindings
  registerAdded: detectorBindings.registerAdded,
  registerRemoved: detectorBindings.registerRemoved,
  startMonitoring: detectorBindings.startMonitoring,
  stopMonitoring: detectorBindings.stopMonitoring,
  find: detectorBindings.find
};

// module.exports = {
//   // serialport bindings
//   close: bindings.close,
//   drain: bindings.drain,
//   flush: bindings.flush,
//   list: linux ? listLinux : bindings.list,
//   open: bindings.open,
//   SerialportPoller: bindings.SerialportPoller,
//   set: bindings.set,
//   update: bindings.update,
//   write: bindings.write,
//   platformOptions: platformOptions,

//   // usb-detection bindings
//   registerAdded: bindings.registerAdded,
//   registerRemoved: bindings.registerRemoved,
//   startMonitoring: bindings.startMonitoring,
//   stopMonitoring: bindings.stopMonitoring,
//   find: bindings.find
// };
