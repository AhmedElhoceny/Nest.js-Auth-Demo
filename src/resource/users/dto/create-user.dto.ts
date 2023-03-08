import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, MaxLength } from "class-validator"

export class CreateUserDto {
    _id: String
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    FullName : string
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    UserName : string
    @IsStrongPassword()
    @MaxLength(30)
    @IsNotEmpty()
    PassWord : string
    @IsEmail()
    @MaxLength(30)
    @IsNotEmpty()
    Email : string
    @MaxLength(30)
    @IsNotEmpty()
    Phone : string
}
