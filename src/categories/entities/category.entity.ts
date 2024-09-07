import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'categories'})
export class Category {

    @PrimaryGeneratedColumn('increment')
    id: number; 

    @Column({type: "varchar", length: 255, nullable: false})
    name: string;

    @Column({type: "varchar", length: 255, nullable: true})
    description: string;

    @OneToMany(() =>Task, task => task.category)
    tasks: Task[];
}
