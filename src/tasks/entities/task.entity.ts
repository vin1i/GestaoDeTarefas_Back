import { Category } from "src/categories/entities/category.entity";
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
    
    @ManyToOne(() => User, user => user.tasks, {onDelete: 'CASCADE'})
    user: User; // Importa o User da entidade do User no diretório Entities do User.
    
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
    
 



    // Criação da relação de categorias e tasks abaixo.


    @ManyToOne(() => Category, category => category.tasks)
    category: Category;
    

// Abaixo está o trecho da criação das tabelas created_at e update_at, está comentado, porque elas foram criadas no MySQL manualmente, pois no NestJs, os valores 'Default' estavam inválidos.



    // @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    // created_at: Date;

    // @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    // updated_at: Date;

}

