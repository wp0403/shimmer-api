import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MoviesService {
  // 获取Pexels视频
  async _getPexelsList({
    page = 1,
    page_size = 10,
  }: {
    [key: string]: number | string;
  }) {
    // 调用路径
    const url = 'https://api.pexels.com/videos/popular';
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
    const data = response.data.videos;
    return {
      data,
      meta,
    };
  }

  // 搜索Pexels视频
  async _getPexelsSearchList({
    page = 1,
    page_size = 10,
    query,
    orientation,
    size = 'large',
    locale,
  }: {
    [key: string]: number | string;
  }) {
    // 调用路径
    const url = 'https://api.pexels.com/videos/search';
    const HEADERS = {
      Authorization: process.env.PEXELS_API_KEY,
    };
    const QUERIES = {
      page: page,
      per_page: page_size,
      query: query,
      orientation: orientation,
      size,
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
