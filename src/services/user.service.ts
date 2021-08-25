import { UserModel } from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import { Op } from 'sequelize';
import crypt from 'bcryptjs'


export class UserService {

    async createUser (user: IUser): Promise<{status: boolean, message: string}> {

        if (!user.Name || !user.Email || !user.Username || !user.Password){
            return {status: false, message: "Favor preencher todos os campos."}
        }
            
        if (user.Email.indexOf("@") == -1 || user.Email.indexOf(".com") == -1 || user.Email.indexOf(".com") < user.Email.indexOf("@")){
            return {status: false, message: "Preencha um email válido."}
        }

        const verifyUser = await UserModel.userEntities().findAll({
            raw: true,
            where: {
                [Op.or]: [
                    { Username: user.Username },
                    { Email: user.Email }
                ]
                
            }
        });

        if (verifyUser.length > 0) {
            return {status: false, message: "Já existe um usuário cadastrado com esse login/email."}
        }

        const passwordCrypt = await crypt.hash(user.Password, 8);

        const createNewUser = await UserModel.userEntities().create({
            Name: user.Name,
            Email: user.Email,
            Username: user.Username,
            Password: passwordCrypt
        });

        if (!createNewUser) {
            return {status: false, message: "Erro ao cadastrar novo usuário, tente novamente."}
        }

        return {status: true, message: "Usuário cadastrado com sucesso."}
    }

    async getUser (id: string): Promise<{status: boolean, data?: object, message?: string}> {

        if (!id) return {status: false, message: "ID inválido"}

        const getUserInfo = await UserModel.userEntities().findAll({
            raw: true,
            where: {
                id: id
            }
        });

        if (getUserInfo.length <= 0) return {status: false, message: "Usuário não localizado."}

        return {status: true, data: getUserInfo}
    }

    async updateUser (id: string, Name: string, Email: string): Promise<{status: boolean, message: string}> {

        if (!id || !Name || !Email) return {status: false, message: "Todos os campos devem ser preenchidos."}

        const userExists = await UserModel.userEntities().findAll({
            raw: true,
            where: {
                id: id
            }
        })

        if (userExists.length <= 0) return {status: false, message: "Não existe nenhum usuário com esse ID"}

        const updateUser = await UserModel.userEntities().update({
            Name: Name,
            Email: Email
        }, {
            where: {
                id: id
            }
        })

        if(!updateUser) return {status: false, message: "Erro ao atualizar o usuário, tente novamente."}

        return {status: true, message: "Usuário atualizado com sucesso."}
    }

    async deleteUser(id: string): Promise<{status: boolean, message: string}> {
        if (!id) return {status: false, message: "ID inválido"}

        const userExist = await UserModel.userEntities().findAll({
            raw: true,
            where: {
                id: id
            }
        })

        if (userExist.length <= 0) return {status: false, message: "Nenhum usuário localizado."}

        const userDelete = await UserModel.userEntities().destroy({
            where: {
                id: id
            }
        })

        if (!userDelete) return {status: false, message: "Erro ao deletar o usuário, tente novamente."}

        return {status: true, message: "Usuário deletado com sucesso."}
    }
}