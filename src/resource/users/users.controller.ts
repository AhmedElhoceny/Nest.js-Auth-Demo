import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../auth/guards/JwtGuard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
//@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Res() response , @Body() createUserDto: CreateUserDto) : Promise<any> {

    try{
      var addedUser = await  this.usersService.create(createUserDto);

    return response.status(HttpStatus.CREATED).json({
      message : "User is Craeted",
      addedUser
    });
    }
    catch(err) 
    {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message : "Failed Process",
        createUserDto
      });
    }
  }

  @Get()
  async findAll(@Res() response ): Promise<any> {
    try {

      let allUsers = await this.usersService.findAll();

      return response.status(HttpStatus.OK).json({
        message : "Data",
        allUsers
      })
    } catch (error) {
      return response.status(HttpStatus.EXPECTATION_FAILED).json({
        message : "Failed",
        error
      })
    }
  }

  @Get(':id')
  async findOne(@Res() response , @Param('id') id: string): Promise<any> {

    try {
      var searchedItem = await this.usersService.findOne(+id)

      return response.status(HttpStatus.OK).json({
        message : "Data",
        searchedItem
      });
    } catch (error) {
      return response.status(HttpStatus.EXPECTATION_FAILED).json({
        message : "Failed",
        error
      })
    }
  }

  @Patch(':id')
  async update(@Res() response , @Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<any> {
    try {
      var updatedItem = await  this.usersService.update(+id, updateUserDto);

      return response.status(HttpStatus.OK).json({
        message:"Done",
        updatedItem
      })
    } catch (error) {

      return response.status(HttpStatus.EXPECTATION_FAILED).json({
        message : "Failed",
        error
      })

    }
  }

  @Delete(':id')
  async remove(@Res() response , @Param('id') id: string): Promise<any> {
    try {
      
      let removerItem = await this.usersService.remove(id);

      return response.status(HttpStatus.OK).json({
        message:"Done",
        removerItem
      })

    } catch (error) {
     
      return response.status(HttpStatus.EXPECTATION_FAILED).json({
        message : "Failed",
        error
      })
      
    }
  }
}
