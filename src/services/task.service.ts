import { ITask } from "../interfaces/task.interface";
import { TasksModel } from "../models/task.model";


export class TaskService {

    async createTask (task: ITask): Promise<{status: boolean, message: string}> {

        if (!task.Name || !task.Date) {
            return {status: false, message: "Todos os campos devem ser preenchidos."}
        }

        const taskExists = await TasksModel.taskEntitie().findAll({
            raw: true,
            where: {
                Name: task.Name,
                Date: new Date(task.Date)
            }
        })

        if (taskExists.length > 0) {
            return {status: false, message: "Essa tarefa já foi cadastrada."}
        }

        const createTask = await TasksModel.taskEntitie().create({
            Name: task.Name,
            Date: task.Date
        })

        if (!createTask){
            return {status: false, message: "Erro ao cadastrar a tarefa, tente novamente."}
        }

        return {status: true, message: "Tarefa cadastrada com sucesso."}
        
    }

    async getTask (Name: string): Promise<{status: boolean, message?: string, data?: object}> {
        const searchTask = await TasksModel.taskEntitie().findAll({
            raw: true,
            where: {
                Name: Name
            }
        })

        if(searchTask.length <= 0) {
            return {status: false, message: "Nenhuma tarefa localizada."}
        }

        return {status: true, data: searchTask}
    }

    async updateTask (id: string, task: ITask): Promise<{status: boolean, message: string}> {
        console.log(id)
        if (!id) return {status: false, message: "ID inválido"}

        const taskExists = await TasksModel.taskEntitie().findAll({
            raw: true,
            where: {
                id: id
            }
        });

        if (taskExists.length <= 0) {
            return {status: false, message: "Tarefa não localizada."}
        }

        const taskUpdate = await TasksModel.taskEntitie().update({
            raw: true,
            Name: task.Name,
            Date: task.Date
        },{
            where: {
                id: id
            }
        })

        if(!taskUpdate) return {status: false, message: "Erro ao atualizar a tarefa."}

        return {status: true, message: "Tarefa editada com sucesso."}
    }

    async deleteTask(id: string): Promise<{status: boolean, message: string}>  {
        if (id == "all") await TasksModel.taskEntitie().destroy({where: {}, truncate: true})

        const taskDelete = await TasksModel.taskEntitie().destroy({
            where: {
                id : id
            }
        })

        if (!taskDelete) return {status: false, message: "Erro ao deletar a tarefa."}

        return {status: true, message: "Tarefa deletada com sucesso."}
    }
}