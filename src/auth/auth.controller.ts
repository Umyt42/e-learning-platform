import { Controller, Post, Body} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @ApiOperation({summary: 'Taze ulanyjy hasaba almak'})
    @Post('register')
    async register(@Body() data: CreateUserDto){
        return await this.authService.register(data);
    }

    @ApiOperation({ summary: 'Ulynyjy ucin giris'})
    @Post('login')
    async login(@Body() data: LoginUserDto){
        return await this.authService.login(data)
    }
}
