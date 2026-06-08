import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ){}

    async findAll(): Promise<Course[]>{
        return await this.courseRepository.find({ relations: { instructor: true}})
    }

    async findById(id: number): Promise<Course>{
        const course =  await this.courseRepository.findOne({ where: { id }, relations: { instructor: true}})
        if (!course){
            throw new NotFoundException('Gozlenyan id-ly course tapylmady')
        }
        return course;
    }

    async findMyCourses(instructorId: number): Promise<Course[]>{
        return await this.courseRepository.find({
            where: { instructor: { id: instructorId} }, 
            relations: { instructor: true}})
    }

    async createCourse(data: CreateCourseDto, instructorId: number): Promise<Course>{
        const course = this.courseRepository.create({
            ...data,
            instructor: { id: instructorId }
        })
        return await this.courseRepository.save(course)
    }

    async updateCourse(id: number, data: UpdateCourseDto, instructorId: number): Promise<Course>{
        const course  = await this.courseRepository.findOne({where: { id }, relations: { instructor: true }});
        if (!course) {
            throw new NotFoundException('course tapylmady');
        }
        if (course?.instructor.id !== instructorId){
            throw new ConflictException('Bu course size degisli dal')
        }
        Object.assign(course, data);
        return await this.courseRepository.save(course);
    }

    async deleteCourse(id: number, instructorId: number): Promise<{message: string}>{
        const course  = await this.courseRepository.findOne({where: { id }, relations: { instructor: true }});
        if (!course) {
            throw new NotFoundException('course tapylmady');
        }
        if (course?.instructor.id !== instructorId){
            throw new ConflictException('Bu course size degisli dal')
        }
        await this.courseRepository.delete(course.id);
        return { message: 'course delete edildi'};
}
}
