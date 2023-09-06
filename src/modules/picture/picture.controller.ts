/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-23 23:25:55
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-27 16:30:32
 */
import { Get, Controller, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { cacheConfigDecorator } from '@decorator'
import { PictureService } from './picture.service';
import {
  DailyBingDto,
  WallPaper360Dto,
  WallPaperType360Dto,
} from './picture.dto';

const { CacheConfig } = cacheConfigDecorator;

@Controller('picture')
  @ApiTags('picture，图片，壁纸')
export class PictureController {
  constructor(private readonly pictureService: PictureService) { }

  @Get('/type-list-360')
  @ApiOperation({
    summary: '获取360壁纸类型列表',
    description: '获取360壁纸类型列表',
  })
  async getWallPaperTypeList360(): Promise<WallPaperType360Dto[] | false> {
    return await this.pictureService._getWallpaperTypeList360();
  }

  @Get('/list-360')
  @ApiOperation({
    summary: '获取360壁纸列表',
    description: '获取360壁纸列表',
  })
  @ApiQuery({ name: 'type_id', description: '壁纸类别id', required: false })
  @ApiQuery({ name: 'page', description: '页码', required: false })
  @ApiQuery({ name: 'page_size', description: '每页数量', required: false })
  async getWallPaperList360(
    @Query('type_id') type_id: string | number,
    @Query('page') page: string | number,
    @Query('page_size') page_size: string | number,
  ): Promise<
    | { meta: { [key: string]: string | number }; data: WallPaper360Dto[] }
    | false
  > {
    return await this.pictureService._getWallpaperList360({
      type_id,
      page,
      page_size,
    });
  }

  @Get('/daily-bing')
  @ApiQuery({
    name: 'is_redirect',
    description: '是否重定向',
    required: false,
  })
  @ApiOperation({
    summary: '获取每日必应壁纸',
    description: '获取每日必应壁纸',
  })
  @CacheConfig({ flag: false })
  async getDailyBing(
    @Query('is_redirect') is_redirect: boolean,
  ): Promise<DailyBingDto | false> {
    return await this.pictureService._getDailyBing(is_redirect);
  }
}
