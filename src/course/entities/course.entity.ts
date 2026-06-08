import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Course{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column({
        type: 'decimal',
        scale: 2,
        default: 0,
    })
    price!: number;

   @ManyToOne(()=> User, (user) => user.courses)
   @JoinColumn({ name: 'instructor_id'})
   instructor!: User;

   @CreateDateColumn()
   createdAt!: Date;

   @UpdateDateColumn()
   updatedAt!: Date;

}