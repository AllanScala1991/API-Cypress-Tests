import { Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

export class UserController {

    async createUser (request: Request, response: Response): Promise<object>{
        const {Name, Email, Username, Password} = request.body;

        const userCreate = await new UserService().createUser({Name, Email, Username, Password});

        return response.json(userCreate);
    }

    async getUser (request: Request, response: Response): Promise<object> {
        const id = request.params.id;

        const userGet = await new UserService().getUser(id);

        return response.json(userGet);
    }

    async updateUser (request: Request, response: Response): Promise<object> {
        const {id, Name, Email} = request.body;

        const userUpdate = await new UserService().updateUser(id, Name, Email);

        return response.json(userUpdate);
    }

    async deleteUser (request: Request, response: Response): Promise<object> {
        const id = request.params.id;

        const userDelete = await new UserService().deleteUser(id);

        return response.json(userDelete);
    }
}