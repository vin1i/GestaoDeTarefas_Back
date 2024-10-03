import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository, In, ReturnDocument } from "typeorm";
import { Project } from "./entities/project.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { User } from "src/users/entities/user.entity";
import { Task } from "src/tasks/entities/task.entity";

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        const { ownerId, taskIds, ...projectData } = createProjectDto;

        // Criar uma nova instância de projeto
        const project = this.projectRepository.create(projectData);

        // Associar o proprietário ao projeto
        if (ownerId) {
            const user = await this.userRepository.findOne({where: { id: ownerId}});
            if (!user) {
                throw new NotFoundException(`Usuário com ID ${ownerId} não encontrado`);
            }
            project.owner = user;
        }

        // Salvar o projeto
        const savedProject = await this.projectRepository.save(project);

        // Associar as tarefas, se fornecido
        if (taskIds) {
            const tasks = await this.taskRepository.find({where: { id: In(taskIds) }});
            // Verifica se as tarefas foram encontradas
            if (!tasks || tasks.length === 0) {
                throw new NotFoundException(`Tarefas com IDs ${taskIds.join(', ')} não encontradas`);
            }
            savedProject.tasks = tasks;
            await this.projectRepository.save(savedProject);
        }

        return savedProject;
    }


    findAll(): Promise<Project[]> {
        return this.projectRepository.find({relations: ['owner', 'tasks']});
    }

    findOne(id: number): Promise<Project> {
        return this.projectRepository.findOne( {where: {id}});
    }

    async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
        const project = await this.projectRepository.findOne({ where: { id } });
        if (!project) {
            throw new NotFoundException(`Projeto com ID ${id} não encontrado`);
        }
    
        console.log('Dados antigos do projeto:', project);
        
        // Atualiza os dados do projeto com os dados do DTO
        Object.assign(project, updateProjectDto);
    
        if (updateProjectDto.ownerId) {
            const user = await this.userRepository.findOne({ where: { id: updateProjectDto.ownerId } });
            if (!user) {
                throw new NotFoundException(`Usuário com ID ${updateProjectDto.ownerId} não encontrado`);
            }
            project.owner = user;  // Atualiza a relação com o novo usuário
        }
    
        // Passo 4: Atualizar as tarefas se fornecido
        if (updateProjectDto.taskIds) {
            const tasks = await this.taskRepository.find({ where: { id: In(updateProjectDto.taskIds) } });
            if (!tasks || tasks.length === 0) {
                throw new NotFoundException(`Tarefas com IDs ${updateProjectDto.taskIds.join(', ')} não encontradas`);
            }
            project.tasks = tasks;  // Atualiza a relação com as novas tarefas
        }
    
        // Salvar as alterações e retornar o projeto atualizado
        const updatedProject = await this.projectRepository.save(project);
        console.log('Dados atualizados do projeto:', updatedProject);
        return updatedProject;
    }
    






        async remove(id: number): Promise<void> {
            await this.projectRepository.delete(id);
        }




}