import { UserModel } from "../models/user.model";
import { Chance } from 'chance';
import bcrypt from 'bcryptjs';

export class RecoveryPasswordService {

    async recovery (Email: string): Promise<{status: boolean, message: string}> {

        if (!Email) return {status: false, message: "O campo email deve ser preenchido."}

        const emailExists = await UserModel.userEntities().findOne({
            raw: true,
            where: {
                Email: Email
            }
        })

        if (emailExists == null) return {status: false, message: "Nenhum usuário cadastrado com esse email."}

        const password = await this.generateNewPassword(Email);

        return password;

    }

    private async generateNewPassword(Email: string): Promise<{status: boolean, message: string}> {

        let newPassword = Chance().hash({ length: 5 })

        const password = await bcrypt.hash(newPassword, 8)

        await UserModel.userEntities().update({
            Password: password
        }, {
            where: {
                Email: Email
            }
        })

        return {status: true, message: `Sua nova senha temporaria é: ${newPassword}`}

    }

    
}