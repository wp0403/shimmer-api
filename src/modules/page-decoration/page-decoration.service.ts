import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PageDecorationService {
  async _getSnow() {
    const filePath = path.join(process.cwd(), '/src/common/utils/snow.js');

    // 读取文件
    const file = fs.readFileSync(filePath, 'utf8');

    return {
      type: 'script',
      data: file
    }
  }

  async _getCherryBlossom() {
    const filePath = path.join(process.cwd(), '/src/common/utils/cherryBlossom.js');

    // 读取文件
    const file = fs.readFileSync(filePath, 'utf8');

    return {
      type: 'script',
      data: file
    }
  }

  async _getWave() {
    const filePath = path.join(process.cwd(), '/src/common/utils/wave.js');

    // 读取文件
    const file = fs.readFileSync(filePath, 'utf8');

    return {
      type: 'script',
      data: file
    }
  }
}
