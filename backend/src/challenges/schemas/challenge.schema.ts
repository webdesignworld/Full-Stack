

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum DifficultyLevel {
  EASY = 'Easy',
  MODERATE = 'Moderate',
  HARD = 'Hard',
}

export type ChallengeDocument = Challenge & Document;

@Schema()
export class Challenge {

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  category: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, enum: DifficultyLevel, required: true })
  difficulty_level: DifficultyLevel;

 
  @Prop({ type: Number })
  managerId: number;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
