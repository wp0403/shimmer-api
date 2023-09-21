/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-24 00:37:45
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-09-21 11:19:49
 */
import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}

export { MoviesController };
