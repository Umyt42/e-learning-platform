import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCourseDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price!: number;

}