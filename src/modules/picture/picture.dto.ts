export class WallPaperType360Dto {
  id: number | string;
  title: string;
  wallpaper_num: number | string;
  tag: string;
  create_time: string;
}

export class WallPaper360Dto {
  id: number | string;
  category: string;
  type_id: number | string;
  tag: string;
  url: string;
}

export class DailyBingDto {
  title?: string;
  copyright?: string;
  copyrightlink?: string;
  dateTime?: Date | string | number;
  url?: string;
  urlbase?: string;
  quiz?: string;
  hsh?: string;
  type?: string;
  data?: string;
}
