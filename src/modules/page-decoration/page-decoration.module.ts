/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-24 00:37:45
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-24 15:58:48
 */
import { Module } from '@nestjs/common';
import { PageDecorationController } from './page-decoration.controller';
import { PageDecorationService } from './page-decoration.service';

@Module({
  controllers: [PageDecorationController],
  providers: [PageDecorationService],
})
export class PageDecorationModule { }

export { PageDecorationController };
