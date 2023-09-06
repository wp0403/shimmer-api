/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-23 23:25:55
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-08-12 00:32:42
 */
import { Get, Controller } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MusicService } from './music.service';
import { DouyinDto } from './music.dto';

@Controller('music')
@ApiTags('music，音乐')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get('/douyin')
  @ApiOperation({
    summary: '获取抖音热门音乐列表',
    description: '获取抖音热门音乐列表',
  })
  async getDouyin(): Promise<DouyinDto[] | false> {
    return await this.musicService._getDouyin();
  }
}
