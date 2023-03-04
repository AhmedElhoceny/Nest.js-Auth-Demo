import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/JwtStrategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService , UsersService , JwtStrategy],
  imports : [
    JwtModule.register({})
  ]
})
export class AuthModule {}
