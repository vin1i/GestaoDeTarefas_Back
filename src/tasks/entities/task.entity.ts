import { Category } from "src/categories/entities/category.entity";
import { Project } from "src/project/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum TaskPriority { 
    Low = 'low',
    Medium = 'medium',
    High = 'high',
}

export enum TaskStatus { 
    Pending = 'pending',
    InProgress = 'in_progress',
    Completed = 'completed',
}

@Entity({ name: 'tasks'})
export class Task {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({type: 'varchar', length: 255, default: 'Untitled', nullable: false})
    title: string;

    @Column({type:'varchar', default:'Untitled', nullable: false})
    description: string;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.InProgress,
        nullable: false})
    status: TaskStatus;

    @Column({
        type: 'enum',
        enum: TaskPriority,
        default: TaskPriority.Medium,
        nullable: false, 
    })
    priority: TaskPriority; 

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: false})
    due_date: Date;

      //Relações abaixo
    
    @ManyToOne(() => User, user => user.tasks, { onDelete: 'CASCADE' })
    user: User; // Associa uma tarefa a um usuário

    @ManyToOne(() => Category, category => category.tasks)
    category: Category; // Associa uma tarefa a uma categoria

    @ManyToOne(() => Project, project => project.tasks)
    project: Project; // O projeto ao qual esta tarefa pertence
}




 

// Abaixo está o trecho da criação das tabelas created_at e update_at, está comentado, porque elas foram criadas no MySQL manualmente, pois no NestJs, os valores 'Default' estavam inválidos.



    // @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    // created_at: Date;

    // @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    // updated_at: Date;



