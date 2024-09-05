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
    
    @Column({type: 'varchar', length: 255,  nullable: false})
    title: string;

    @Column({type:'varchar', nullable: false})
    description: string;


    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.Pending,
        nullable: false})
    status: TaskStatus;


    @Column({
        type: 'enum',
        enum: TaskPriority,
        default: TaskPriority.Medium,
        nullable: false, 
    })
    priority: TaskPriority; 


    @Column({ type: 'datetime', nullable: false})
    due_date: Date;
    
  @CreateDateColumn({ type: 'timestamp', nullable: false })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: false })
    updated_at: Date;






    

// Abaixo está o trecho da criação das tabelas created_at e update_at, está comentado, porque elas foram criadas no MySQL manualmente, pois no NestJs, os valores 'Default' estavam inválidos.



    // @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    // created_at: Date;

    // @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    // updated_at: Date;

}

