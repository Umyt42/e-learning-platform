import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository,  } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async create(data: CreateUserDto): Promise<User>{
        const user = await this.userRepository.create(data);
        return await this.userRepository.save(user)
    } 

    async findByEmail(email: string): Promise<User | null>{
        return await this.userRepository.findOne({where: { email }})
    }

    async getMyProfile(id: number){
        const user = await this.userRepository.findOne({where: {id}})
        if(!user){
            throw new NotFoundException('Bu id tapymady')        
        }
        const { password, ...cleanUser } = user;
        return cleanUser;
    }
}
