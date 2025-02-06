import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ManagerRole {
  CODER = 'coder',
  MANAGER = 'manager',
  USER = 'user',
}

export type ManagerDocument = Manager & Document;

@Schema()
export class Manager {
  @Prop({ type: String, required: true })
  first_name: string;

  @Prop({ type: String, required: true })
  last_name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: false })
  avatar?: string;

  @Prop({
    type: String,
    enum: Object.values(ManagerRole),
    default: ManagerRole.MANAGER,
  })
  role: ManagerRole;
}

export const ManagerSchema = SchemaFactory.createForClass(Manager);
