

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateManagerDto } from '../../dto/create-manager.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerp(@Body() createManagerDto: CreateManagerDto) {
    return this.authService.register(createManagerDto);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
