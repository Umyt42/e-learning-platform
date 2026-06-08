import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
                private readonly jwtService: JwtService
    ){}

    async register(data: CreateUserDto){
        const existingUser = await this.userService.findByEmail(data.email);
        if (existingUser){
            throw new ConflictException('Bu email eyyam hasaba alnan')
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        const newUser = await this.userService.create({
            ...data,
            password: hashedPassword
        });
        const { password, ...cleanUser} = newUser;
        return this.generateToken(cleanUser)
    }

    async generateToken(user: Omit<User, 'password'>){
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        };

        return {
            access_token: this.jwtService.sign(payload),
            user
        }
    };

    async login(data: LoginUserDto){
        const user = await this.userService.findByEmail(data.email);
        if (!user){
            throw new UnauthorizedException('Yalnys email yada password')
        }
        const isMatch = await bcrypt.compare(data.password, user.password)
        if(!isMatch){
            throw new UnauthorizedException('Yalnys email yada password')
        }
        const { password, ...cleanUser} = user;
        return this.generateToken(cleanUser)
         };
}
