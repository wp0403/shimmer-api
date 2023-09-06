/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-24 00:37:45
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-24 15:58:48
 */
import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';

@Module({
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}

export { MusicController };
