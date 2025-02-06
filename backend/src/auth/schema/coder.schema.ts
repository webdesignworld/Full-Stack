import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum CoderRole {
  CODER = 'coder',
  SENIOR_CODER = 'senior_coder',
  LEAD_CODER = 'lead_coder',
}

export type CoderDocument = Coder & Document;

@Schema()
export class Coder {
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
    enum: Object.values(CoderRole),
    default: CoderRole.CODER,
  })
  role: CoderRole;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;
}

export const CoderSchema = SchemaFactory.createForClass(Coder);
