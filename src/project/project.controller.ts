import { Body, Controller, Get, Post, Patch, Param, Delete } from "@nestjs/common";
import { ProjectsService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { Project } from "./entities/project.entity";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Controller('projects')
export class ProjectController { 
    constructor( private readonly projectsService: ProjectsService) {}
        



    @Post()
    create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectsService.create(createProjectDto)
    }

    @Get()
    findAll(): Promise<Project[]>{
        return this.projectsService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Project> {
      return this.projectsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto): Promise<Project> {
    return this.projectsService.update(id, updateProjectDto);
  }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.projectsService.remove(id);
    }
    }
