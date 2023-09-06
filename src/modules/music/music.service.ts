import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MusicService {
  async _getDouyin() {
    // 调用路径
    const url = 'https://aweme.snssdk.com/aweme/v1/chart/music/list/';
    const HEADERS = {
      'user-agent': 'okhttp3',
    };
    const QUERIES = {
      device_platform: 'android',
      version_name: '13.2.0',
      version_code: '130200',
      aid: '1128',
      chart_id: '6853972723954146568',
      count: '100',
    };

    // 数据处理
    const getData = (data) => {
      if (!data) return [];
      try {
        return data.map((v) => {
          const item = v.music_info;
          return {
            id: item.id,
            title: item.title,
            album: item.album,
            artist: item.author,
            pic: item?.cover_large.url_list[0],
            lyric: item.lyric_url,
            url: item.play_url.uri,
            mobileUrl: item.play_url.uri,
            // h5Url: item.matched_song?.h5_url,
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
    const data = getData(response.data.music_list);
    return data;
  }
}
