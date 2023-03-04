import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';

export class LogInReq {
    @IsString()
    @IsNotEmpty()
    username : string

    @IsString()
    @IsNotEmpty()
    passward : string
}