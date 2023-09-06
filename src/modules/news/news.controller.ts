/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-23 23:25:55
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-24 15:48:38
 */
import { Get, Controller } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NewsService } from './news.service';
import {
  BaiduDto,
  WeiboDto,
  ToutiaoDto,
  ZhihuDto,
  KrDto,
  ThepaperDto,
  JuejinDto,
  NetEaseDto,
  TencentDto,
  BilibiliDto,
  SspaiDto,
  DouyinDto,
  KuaiShouDto,
  TieBaDto,
  IThomeDto,
} from './news.dto';

@Controller('news')
@ApiTags('News，新闻，热搜')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/baidu')
  @ApiOperation({
    summary: '获取百度热搜列表',
    description: '获取百度热搜的列表',
  })
  async getBaidu(): Promise<BaiduDto[] | false> {
    return await this.newsService._getBaidu();
  }

  @Get('/weibo')
  @ApiOperation({
    summary: '获取微博热搜列表',
    description: '获取微博热搜的列表',
  })
  async getWeibo(): Promise<WeiboDto[] | false> {
    return await this.newsService._getWeibo();
  }

  @Get('/toutiao')
  @ApiOperation({
    summary: '获取今日头条热搜列表',
    description: '获取今日头条热搜的列表',
  })
  async getToutiao(): Promise<ToutiaoDto[] | false> {
    return await this.newsService._getToutiao();
  }

  @Get('/zhihu')
  @ApiOperation({
    summary: '获取知乎热搜列表',
    description: '获取知乎热搜的列表',
  })
  async getZhihu(): Promise<ZhihuDto[] | false> {
    return await this.newsService._getZhihu();
  }

  @Get('/juejin')
  @ApiOperation({
    summary: '获取掘金热搜列表',
    description: '获取掘金热搜的列表',
  })
  async getJuejin(): Promise<JuejinDto[] | false> {
    return await this.newsService._getJuejin();
  }

  @Get('/thepaper')
  @ApiOperation({
    summary: '获取澎湃热搜列表',
    description: '获取澎湃热搜的列表',
  })
  async getThepaper(): Promise<ThepaperDto[] | false> {
    return await this.newsService._getThepaper();
  }

  @Get('/36kr')
  @ApiOperation({
    summary: '获取36氪热搜列表',
    description: '获取36氪热搜的列表',
  })
  async getKr(): Promise<KrDto[] | false> {
    return await this.newsService._getKr();
  }

  @Get('/netease')
  @ApiOperation({
    summary: '获取网易热搜列表',
    description: '获取网易热搜的列表',
  })
  async getNetEase(): Promise<NetEaseDto[] | false> {
    return await this.newsService._getNetEase();
  }

  @Get('/tencent')
  @ApiOperation({
    summary: '获取腾讯热搜列表',
    description: '获取腾讯热搜的列表',
  })
  async getTencent(): Promise<TencentDto[] | false> {
    return await this.newsService._getTencent();
  }

  @Get('/bilibili')
  @ApiOperation({
    summary: '获取bilibili热搜列表',
    description: '获取bilibili热搜的列表',
  })
  async getBilibili(): Promise<BilibiliDto[] | false> {
    return await this.newsService._getBilibili();
  }

  @Get('/sspai')
  @ApiOperation({
    summary: '获取少数派热搜列表',
    description: '获取少数派热搜的列表',
  })
  async getSspai(): Promise<SspaiDto[] | false> {
    return await this.newsService._getSspai();
  }

  @Get('/douyin')
  @ApiOperation({
    summary: '获取抖音热搜列表',
    description: '获取抖音热搜的列表',
  })
  async getDouyin(): Promise<DouyinDto[] | false> {
    return await this.newsService._getDouyin();
  }

  @Get('/kuaishou')
  @ApiOperation({
    summary: '获取快手热搜列表',
    description: '获取快手热搜的列表',
  })
  async getKuaiShou(): Promise<KuaiShouDto[] | false> {
    return await this.newsService._getKuaiShou();
  }

  @Get('/tieba')
  @ApiOperation({
    summary: '获取百度贴吧热搜列表',
    description: '获取百度贴吧热搜的列表',
  })
  async getTieBa(): Promise<TieBaDto[] | false> {
    return await this.newsService._getTieBa();
  }

  @Get('/ithome')
  @ApiOperation({
    summary: '获取it之家热搜列表',
    description: '获取it之家热搜的列表',
  })
  async getIThome(): Promise<IThomeDto[] | false> {
    return await this.newsService._getIThome();
  }
}
