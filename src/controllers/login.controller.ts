import { Request, Response } from "express";
import { LoginService } from "../services/login.service";

export class LoginController {

    async login (request: Request, response: Response): Promise<object> {
        const {Username, Password} = request.body;

        const userLogin = await new LoginService().login({Username, Password});

        return response.json(userLogin);
    }
}