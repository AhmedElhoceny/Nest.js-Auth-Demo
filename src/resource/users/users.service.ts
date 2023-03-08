import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, userDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private readonly userModel:Model<userDocument>) {}

  async create(createUserDto: CreateUserDto) : Promise<any> {

    const saltOrRounds = 10;
    createUserDto.PassWord = await bcrypt.hash(createUserDto.PassWord, saltOrRounds);

    var addingUserProcess = await new this.userModel(createUserDto);

    return addingUserProcess.save();
  }

  async getUser(userName : string):Promise<any>{
    // let searchedUser = users.find(ele => ele.UserName == userName);

    let searchedUser = this.userModel.findOne(obj => obj.UserName == userName).exec();

    if(searchedUser)
      return searchedUser
    return null;
  }

  async findAll():Promise<any> {
    return this.userModel.find().exec();
  }

  async findOne(id: number):Promise<any> {
    return this.userModel.findById(id).exec();
  }

  async update(id: number, updateUserDto: UpdateUserDto) : Promise<any> {
    
    var updatedExistedUser = this.userModel.findOneAndUpdate(obj => obj.Id == id , updateUserDto).exec()

    return updatedExistedUser;
  }

  async remove(id: string) : Promise<any> {
    
    let searchedItem =await this.userModel.deleteOne({id:id}).exec();

    return searchedItem;

  }
}
