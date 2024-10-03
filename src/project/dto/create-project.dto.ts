import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsDateString()
    startDate: Date;

    @IsOptional()
    @IsDateString()
    endDate?: Date;

    @IsOptional()
    @IsString()
    status: string; // 'active' or 'inactive', 'completed', 'archived'

    @IsOptional()
    @IsInt() // O ID do usuário proprietário do projeto
    ownerId?: number;

    @IsOptional()
    @IsInt({ each: true }) // Se quiser permitir múltiplas tarefas no momento da criação
    taskIds?: number[]; 
}