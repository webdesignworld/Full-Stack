
import {
        IsString,
        IsNotEmpty,
        IsEmail,
        IsNumber,
        IsOptional,
        IsEnum,
      } from 'class-validator';
      import { ManagerRole } from '../schemas/manager.schema'; 
      
      export class CreateManagerDto {
        @IsNumber()
        @IsNotEmpty()
        id: number;
      
        @IsString()
        @IsNotEmpty()
        first_name: string;
      
        @IsString()
        @IsNotEmpty()
        last_name: string;
      
        @IsEmail()
        @IsNotEmpty()
        email: string;
      
        @IsString()
        @IsNotEmpty()
        password: string;
      
        @IsString()
        @IsOptional()
        avatar?: string;
      
        @IsEnum(ManagerRole)
        @IsNotEmpty()
        role: ManagerRole;
      }
      