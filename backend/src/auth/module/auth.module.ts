import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Reflector } from '@nestjs/core';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { Manager, ManagerSchema } from '../schema/manager.schema';
import { Coder, CoderSchema } from '../schema/coder.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Manager.name, schema: ManagerSchema }, 
      { name: Coder.name, schema: CoderSchema }, 
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'MY_SECRET_KEY', 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, AuthGuard, RolesGuard, Reflector],
  exports: [JwtModule, AuthGuard, RolesGuard],
  controllers: [AuthController],
})
export class AuthModule {}
