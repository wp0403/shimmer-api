/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-24 00:37:45
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-08-31 14:44:51
 */
import { Module } from '@nestjs/common';
import { ToolInterfaceController } from './tool-interface.controller';
import { ToolInterfaceService } from './tool-interface.service';
import { SpiderService } from '../spider/spider.service'

@Module({
  controllers: [ToolInterfaceController],
  providers: [ToolInterfaceService, SpiderService],
})
export class ToolInterfaceModule { }

export { ToolInterfaceController };
