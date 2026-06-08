import { Controller, Get, Post, Patch, Delete, Body, ParseIntPipe, Param, Req, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { UserRole } from 'src/user/enums/userRole-enum';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService){}

    @ApiOperation({ summary: 'Ahli kurslary gormek'})
    @Get()
    async findAll(){
        return this.courseService.findAll()
    }


    @ApiBearerAuth()
    @ApiOperation({ summary: 'Instructor oz ahli kurslaryny gormek ucin'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.INSTRUCTOR)
    @Get('my-courses')
    async findMyCourses(@Req() req: any){
        return this.courseService.findMyCourses(req.user.id);
    }

    @ApiOperation({ summary: 'Dine ID bilen kursy gormek'})
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number){
        return this.courseService.findById(id)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Taze kurs doretmek'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.INSTRUCTOR)
    @Post()
    async create(@Body() data: CreateCourseDto, @Req() req: any){
        return this.courseService.createCourse(data, req.user.id)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Instructor oz kursuny update etmegi ucin'})
    @UseGuards(JwtAuthGuard, UseGuards)
    @Roles(UserRole.INSTRUCTOR)
    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateCourseDto,
        @Req() req: any){
            return this.courseService.updateCourse(id, data, req.user.id)
        }
    
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Instructor oz kursyny delete etmegi ucin'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.INSTRUCTOR)
    @Delete(':id')
    async delete(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: any){
            return this.courseService.deleteCourse(id, req.user.id)
        }

        
}
