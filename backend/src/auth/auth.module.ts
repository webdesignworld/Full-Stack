
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [
  
    JwtModule.register({
      secret: process.env.JWT_TOKEN || 'MY_SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthGuard,
    RolesGuard,
    Reflector, 
  
  ],
  exports: [
    JwtModule,
    AuthGuard,
    RolesGuard,
  
  ],
})
export class AuthModule {}


