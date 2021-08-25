import { Request, Response } from "express";
import { RecoveryPasswordService } from "../services/recoveyPassword.service";

export class recoveryPasswordController {

    async recoveryPassword (request: Request, response: Response): Promise<object> {
        const {Email} = request.body;

        const updateEmail = await new RecoveryPasswordService().recovery(Email);

        return response.json(updateEmail);
    }
}