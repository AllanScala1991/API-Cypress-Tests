import { ILogin } from "../interfaces/login.interface";
import bcrypt from 'bcryptjs';
import { UserModel } from "../models/user.model";
import { sign } from "jsonwebtoken";


export class LoginService {

    async login (user: ILogin): Promise<{status: boolean, message?: string, token?: string}> {

        if (!user.Username || !user.Password) return {status: false, message: "Por favor, preencha todos os campos."}

        const userExists = await UserModel.userEntities().findOne({
            raw: true,
            where: {
                Username: user.Username
            }
        })
        
        if (userExists == null) return {status: false, message: "Usuário e/ou Senha incorretos."}

        const passwordEqual = await bcrypt.compare(user.Password, userExists['Password']);

        if (!passwordEqual) return {status: false, message: "Usuário e/ou Senha incorretos."}

        const token = sign({
            name: userExists['Name']
        }, process.env.TOKEN_KEY, {
            expiresIn: '1d'
        })

        return {status: true, token: token}
    }
}