import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

var users : User[]  = [{
  Id: 1,
  FullName: 'Ahmed Elhoceny',
  UserName: 'Elhoceny',
  PassWord: '$2b$10$H6qtl2O85THr33fc713UA.2u.7OqU5Eb.ZLLiOG8sNYhdcEWBZynC',
  Email: 'ahmed@gmail.com',
  Phone: '0102682242'
}
]

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) : Promise<any> {
    const saltOrRounds = 10;
    createUserDto.PassWord = await bcrypt.hash(createUserDto.PassWord, saltOrRounds);
    users.push(createUserDto);
    return createUserDto;
  }

  async getUser(userName : string):Promise<any>{
    let searchedUser = users.find(ele => ele.UserName == userName);
    if(searchedUser)
      return searchedUser
    return null;
  }

  async findAll():Promise<any> {
    return users;
  }

  async findOne(id: number):Promise<any> {
    return users.find(ele => ele.Id == id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) : Promise<any> {
    let searchedItemIndex = users.findIndex(ele => ele.Id == id);
    users[searchedItemIndex].Email = updateUserDto.Email;
    users[searchedItemIndex].FullName = updateUserDto.FullName;
    users[searchedItemIndex].Phone = updateUserDto.Phone;
    users[searchedItemIndex].UserName = updateUserDto.UserName;
    return updateUserDto;
  }

  async remove(id: number) : Promise<any> {
    let searchedItemIndex = users.findIndex(ele => ele.Id == id);
    users.splice(searchedItemIndex , 1);
  }
}
