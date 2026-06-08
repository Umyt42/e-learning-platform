import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { UserRole } from "../enums/userRole-enum";
import { Course } from "src/course/entities/course.entity";

@Entity()
export class User{
   
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string

    @Column({ nullable: true })
    name?: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role!: UserRole;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(()=> Course, (course) => course.instructor)
    courses!: Course[];
} 