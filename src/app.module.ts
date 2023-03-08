import { Module } from '@nestjs/common';
import { UsersModule } from './resource/users/users.module';
import { AuthModule } from './resource/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'Auth_Nest_Demo'}),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
