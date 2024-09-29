import { Task } from "src/tasks/entities/task.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    description: string;

    @Column({type: 'date'})
    startDate:Date

    @Column({ type: 'date', nullable: true })
    endDate: Date;
  
    @Column({ default: 'active' })
    status: string;  // Pode ser "active", "completed", "archived", etc.
  
    @ManyToOne(() => User, (user) => user.projects)
    owner: User;  // O usuário que é o proprietário do projeto
  
    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[];  // As tarefas associadas a este projeto
  }