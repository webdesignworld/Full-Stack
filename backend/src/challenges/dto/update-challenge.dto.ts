
import {
        IsString,
        IsEnum,
        IsOptional,
        IsNumber,
      } from 'class-validator';
      import { DifficultyLevel } from '../schemas/challenge.schema'; 
      
      export class UpdateChallengeDto {
        @IsString()
        @IsOptional()
        title?: string;
      
        @IsString()
        @IsOptional()
        category?: string;
      
        @IsString()
        @IsOptional()
        description?: string;
      
        @IsEnum(DifficultyLevel)
        @IsOptional()
        difficulty_level?: DifficultyLevel;
      
        @IsNumber()
        @IsOptional()
        managerId?: number;
      }
      
