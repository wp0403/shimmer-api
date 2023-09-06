/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-24 16:09:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-24 16:09:47
 */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RequestStatistic extends Document {
  @Prop({ required: true })
  path: string;

  @Prop({ default: 0 })
  count: number;
}

export const RequestStatisticSchema =
  SchemaFactory.createForClass(RequestStatistic);
