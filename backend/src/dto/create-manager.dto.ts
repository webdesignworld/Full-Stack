import { IsString, IsNotEmpty, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { ManagerRole } from '../auth/schema/manager.schema';

export class CreateManagerDto {
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

  @IsEnum(ManagerRole, { message: 'Role must be either "coder" or "manager"' })
  @IsOptional() 
  role?: ManagerRole;
}
