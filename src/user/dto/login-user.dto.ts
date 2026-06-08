import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty,  IsStrongPassword } from "class-validator";

export class LoginUserDto{
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty({message: 'Email bos bolmaly dal'})
    email!: string;

    @ApiProperty()
    @IsStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
        minLowercase: 0,
        minUppercase: 0,
    })
    @IsNotEmpty({message: 'password girizin'})
    password!: string

}