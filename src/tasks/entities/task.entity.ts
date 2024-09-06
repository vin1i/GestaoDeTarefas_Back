import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    
    @ManyToOne(() => User, user => user.tasks, {onDelete: 'CASCADE'})
    user: User; // Importar o User da entidade do User no diretório Entities do User.
    
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
    
 


    

// Abaixo está o trecho da criação das tabelas created_at e update_at, está comentado, porque elas foram criadas no MySQL manualmente, pois no NestJs, os valores 'Default' estavam inválidos.



    // @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    // created_at: Date;

    // @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    // updated_at: Date;

}

