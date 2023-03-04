import { Module } from '@nestjs/common';
import { UsersModule } from './resource/users/users.module';
import { AuthModule } from './resource/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
