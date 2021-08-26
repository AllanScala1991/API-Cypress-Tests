import { Request, Response } from "express";
import { ITask } from "../interfaces/task.interface";
import { TaskService } from "../services/task.service";

export class TaskController {

    async createTask (request: Request, response: Response): Promise<object> {
        const {Name, Date}: ITask = request.body;

        const taskCreate = await new TaskService().createTask({Name, Date});

        return response.json(taskCreate);
    }

    async getTask (request: Request, response: Response): Promise<object> {
        const Name = request.params.Name;

        const taskGet = await new TaskService().getTask(Name);

        return response.json(taskGet)
    }

    async updateTask (request: Request, response: Response): Promise<object> {
        const {id, Name, Date} = request.body;

        const taskUpdate = await new TaskService().updateTask(id, {Name, Date});

        return response.json(taskUpdate);
    }

    async deleteTask (request: Request, response: Response): Promise<object> {
        const id = request.params.id;

        const taskDelete = await new TaskService().deleteTask(id);

        return response.json(taskDelete);
    }
}