import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PictureService {
  // 获取360壁纸类别
  async _getWallpaperTypeList360() {
    // 调用路径
    const url =
      'http://cdn.apc.360.cn/index.php?c=WallPaper&a=getAllCategoriesV2&from=360chrome';
    const HEADERS = {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    };

    // 数据处理
    const getData = (data) => {
      if (!data) return [];
      try {
        return data.map((v) => {
          return {
            id: v.id,
            title: v.name,
            wallpaper_num: v.order_num,
            tag: v.tag,
            create_time: v.create_time,
          };
        });
      } catch (error) {
        console.error('数据处理出错' + error);
        return [];
      }
    };

    const response = await axios.get(url, {
      headers: HEADERS,
    });
    const data = getData(response.data.data);
    return data;
  }

  // 获取360壁纸
  async _getWallpaperList360({
    type_id = 36,
    page = 1,
    page_size = 10,
  }: {
    [key: string]: number | string;
  }) {
    // 调用路径
    const url = 'http://wp.birdpaper.com.cn/intf/GetListByCategory';
    const HEADERS = {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    };
    const QUERIES = {
      cids: type_id,
      pageno: page,
      count: page_size,
    };

    // 数据处理
    const getData = (data) => {
      if (!data) return [];
      try {
        return data.map((v) => {
          return {
            id: v.id,
            category: v.category,
            tag: v.tag,
            type_id: v.class_id,
            url: v.url,
          };
        });
      } catch (error) {
        console.error('数据处理出错' + error);
        return [];
      }
    };

    const response = await axios.get(url, {
      headers: HEADERS,
      params: QUERIES,
    });

    const meta = {
      total: response.data.data.total_count,
      page: response.data.data.pageno,
      page_size: response.data.data.count,
    };
    const data = getData(response.data.data.list);
    return {
      data,
      meta,
    };
  }

  // 获取每日必应壁纸
  async _getDailyBing(is_redirect = false) {
    // 调用路径
    const url = 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1';
    const HEADERS = {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    };

    // 数据处理
    const getData = (data) => {
      if (!data) return false;
      if (!Array.isArray(data) || !data.length) return false;
      try {
        const obj = data[0];
        const year = obj.enddate.slice(0, 4);
        // 因为月份在 Date 对象中是从 0 开始计算的，所以需要减去 1
        const month = obj.enddate.slice(4, 6) - 1;
        const day = obj.enddate.slice(6, 8);

        const dateTime = new Date(year, month, day);
        if (JSON.parse(`${is_redirect}`)) {
          return {
            type: 'redirect',
            data: `https://cn.bing.com${obj.url}`,
          };
        }
        return {
          title: obj.title,
          copyright: obj.copyright,
          copyrightlink: `https://cn.bing.com${obj.copyrightlink}`,
          dateTime,
          url: `https://cn.bing.com${obj.url}`,
          urlbase: `https://cn.bing.com${obj.urlbase}`,
          quiz: `https://cn.bing.com${obj.quiz}`,
          hsh: obj.hsh,
        };
      } catch (error) {
        console.error('数据处理出错' + error);
        return false;
      }
    };

    const response = await axios.get(url, {
      headers: HEADERS,
    });
    const data = getData(response.data.images);
    return data;
  }

  // 获取Pexels图片
  async _getPexelsList({
    page = 1,
    page_size = 10,
  }: {
    [key: string]: number | string;
  }) {
    // 调用路径
    const url = 'https://api.pexels.com/v1/curated';
    const HEADERS = {
      Authorization: process.env.PEXELS_API_KEY,
    };
    const QUERIES = {
      page: page,
      per_page: page_size,
    };

    const response = await axios.get(url, {
      headers: HEADERS,
      params: QUERIES,
    });

    const meta = {
      page: response.data.page,
      page_size: response.data.per_page,
    };
    const data = response.data.photos;
    return {
      data,
      meta,
    };
  }

  // 搜索Pexels图片
  async _getPexelsSearchList({
    page = 1,
    page_size = 10,
    query,
    orientation,
    size = 'large',
    color,
    locale,
  }: {
    [key: string]: number | string;
  }) {
    // 调用路径
    const url = 'https://api.pexels.com/v1/search';
    const HEADERS = {
      Authorization: process.env.PEXELS_API_KEY,
    };
    const QUERIES = {
      page: page,
      per_page: page_size,
      query: query,
      orientation: orientation,
      size,
      color,
      locale,
    };

    const response = await axios.get(url, {
      headers: HEADERS,
      params: QUERIES,
    });

    const meta = {
      page: response.data.page,
      page_size: response.data.per_page,
      total: response.data.total_results,
    };
    const data = response.data.photos;
    return {
      data,
      meta,
    };
  }
}
