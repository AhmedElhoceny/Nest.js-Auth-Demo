import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LogInReq } from './dto/LogIn';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService,private config: ConfigService) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    if (!user) return null;
    console.log(user.PassWord)
    const passwordValid = await bcrypt.compare(password,user.PassWord)
    if (!user) {
        throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
        return user;
    }
    return null;
  }
  async login(user: LogInReq) : Promise<any> {
      
      var searchedUser = await this.validateUser(user.username , user.passward);
      if(searchedUser)
      {
        const secret = this.config.get('JWT_SECRET');
        const payload = {
          sub: searchedUser.FullName
        };
        const token = await this.jwtService.signAsync(
          payload,
          {
            expiresIn: '8h',
            secret: secret,
          },
        );
    
        return {
          access_token: token,
        };
      }
}
}
