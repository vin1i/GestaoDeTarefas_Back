import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {
    @IsOptional()
    @IsString()
    name?: string; 

    @IsOptional()
    @IsString()
    description?: string; 

    @IsOptional()
    @IsDateString()
    startDate?: Date;

    @IsOptional()
    @IsDateString()
    endDate?: Date;

    @IsOptional()
    @IsString()
    status?: string; // Por exemplo, 'active', 'completed', 'archived'


    @IsOptional()
    @IsInt()
    ownerId?: number;

    @IsOptional()
    @IsInt({ each: true })
    taskIds?: number[];
}