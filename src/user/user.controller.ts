import { Controller, Get, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Ulanyjy oz profilini gormek ucin'})
    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getMyProfile(@Req() req: any){
        return await this.userService.getMyProfile(req.user.id)
    }

}
