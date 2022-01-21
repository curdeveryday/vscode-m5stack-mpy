import * as vscode from 'vscode';
import { buildCompletionItem } from './builder';

export const startImu = (linePrefix: string, variables: any[]) => [
  buildCompletionItem(
    'IMU',
    'IMU()',
    undefined,
    'Instanciate imu object',
    'IMU()',
    vscode.CompletionItemKind.Constructor,
    {
      command: 'm5py.add.type',
      arguments: ['imu', linePrefix, variables],
      title: 'trigger',
    }
  ),
];

export const endImu = [
  buildCompletionItem(
    'ypr',
    'Array for Yaw, Pitch, Roll values',
    undefined,
    undefined,
    'ypr[${1|0,1,2|}]',
    vscode.CompletionItemKind.Variable
  ),
  buildCompletionItem(
    'acceleration',
    'Array for acceleration Yaw, Pitch, Roll values',
    undefined,
    undefined,
    'acceleration[${1|0,1,2|}]',
    vscode.CompletionItemKind.Variable
  ),
  buildCompletionItem(
    'gyro',
    'Array for gyro Yaw, Pitch, Roll values',
    undefined,
    undefined,
    'gyro[${1|0,1,2|}]',
    vscode.CompletionItemKind.Variable
  ),
];
