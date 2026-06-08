import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator' 

export class CreateUserDto{
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
        minLowercase: 0,
        minUppercase: 0,
    })
    @IsNotEmpty()
    password!: string;

}