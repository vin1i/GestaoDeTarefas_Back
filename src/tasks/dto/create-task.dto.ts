import { TaskPriority, TaskStatus} from "src/tasks/entities/task.entity";

export class CreateTaskDto {
    title: string;
    description?: string; // ? = Opcional
    priority?: TaskPriority; // ? = Opcional
    status?: TaskStatus; // ? = Opcional
    due_date?: Date; // ? = Opcional
    userId: number;
}
