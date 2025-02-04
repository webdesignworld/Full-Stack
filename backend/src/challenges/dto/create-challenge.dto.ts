
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { DifficultyLevel } from '../schemas/challenge.schema'; 

export class CreateChallengeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(DifficultyLevel)
  @IsNotEmpty()
  difficulty_level: DifficultyLevel;

  @IsNumber()
  @IsOptional()
  managerId?: number;
}
