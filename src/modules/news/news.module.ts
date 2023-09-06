/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-24 00:37:45
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-24 00:40:39
 */
import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}

export { NewsController };
