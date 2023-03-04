import { Controller,  Post , Body , HttpCode,HttpStatus, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInReq } from './dto/LogIn';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() dto:LogInReq) {
        var tokken = await this.authService.login(dto);
        return tokken;
    }
}