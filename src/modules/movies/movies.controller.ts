/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-23 23:25:55
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-09-21 11:35:43
 */
import { Get, Controller, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { PexelsDto } from './movies.dto';
import { LocaleEnum } from '../../common/constants/enum';
import { LocaleType } from '../../common/constants/typescript.d';

@Controller('movies')
@ApiTags('movies，视频')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('/pexels-popular')
  @ApiOperation({
    summary: '获取Pexels热门视频列表',
    description: '获取Pexels热门视频列表',
  })
  @ApiQuery({ name: 'page', description: '页码', required: false })
  @ApiQuery({ name: 'page_size', description: '每页数量', required: false })
  async getPexelsList(
    @Query('page') page: string | number,
    @Query('page_size') page_size: string | number,
  ): Promise<
    { meta: { [key: string]: string | number }; data: PexelsDto[] } | false
  > {
    return await this.moviesService._getPexelsList({
      page,
      page_size,
    });
  }

  @Get('/pexels-search')
  @ApiOperation({
    summary: '搜素获取Pexels视频',
    description: '搜素获取Pexels视频',
  })
  @ApiQuery({
    name: 'query',
    description: '关键字（注意：目前只支持英文搜索）',
    required: true,
  })
  @ApiQuery({
    name: 'orientation',
    description: '形状',
    required: false,
    enum: ['landscape', 'portrait', 'square'],
  })
  @ApiQuery({
    name: 'size',
    description: '大小',
    required: false,
    enum: ['large', 'medium', 'small'],
  })
  @ApiQuery({
    name: 'locale',
    description: '区域',
    required: false,
    enum: LocaleEnum,
  })
  @ApiQuery({ name: 'page', description: '页码', required: false })
  @ApiQuery({ name: 'page_size', description: '每页数量', required: false })
  async getPexelsSearchList(
    @Query('query') query: string,
    @Query('orientation') orientation: 'landscape' | 'portrait' | 'square',
    @Query('size') size: 'large' | 'medium' | 'small',
    @Query('locale') locale: LocaleType,
    @Query('page') page: string | number,
    @Query('page_size') page_size: string | number,
  ): Promise<
    { meta: { [key: string]: string | number }; data: PexelsDto[] } | false
  > {
    return await this.moviesService._getPexelsSearchList({
      query,
      orientation,
      size,
      locale,
      page,
      page_size,
    });
  }
}
