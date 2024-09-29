import { Project } from "src/project/entities/project.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;
    
    @OneToMany(() => Task, task => task.user)
    tasks: Task[]; // Um usuário pode ter várias tarefas


    @OneToMany(() => Project, (project) => project.owner)
    projects: Project[]; 
}
