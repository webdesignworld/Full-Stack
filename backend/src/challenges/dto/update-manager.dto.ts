
import {
        IsString,
        IsEmail,
        IsNumber,
        IsOptional,
        IsEnum,
      } from 'class-validator';
      import { ManagerRole } from '../schemas/manager.schema'; 
      
      export class UpdateManagerDto {
        @IsNumber()
        @IsOptional()
        id?: number;
      
        @IsString()
        @IsOptional()
        first_name?: string;
      
        @IsString()
        @IsOptional()
        last_name?: string;
      
        @IsEmail()
        @IsOptional()
        email?: string;
      
        @IsString()
        @IsOptional()
        password?: string;
      
        @IsString()
        @IsOptional()
        avatar?: string;
      
        @IsEnum(ManagerRole)
        @IsOptional()
        role?: ManagerRole;
      }
      