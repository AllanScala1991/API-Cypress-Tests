import { STRING, DATE } from "sequelize";
import { connection } from "../database/connection";


export class TasksModel {

    static taskEntitie () {
        const taskConnection = connection.define("Tasks", {
            Name: {
                type: STRING,
                allowNull: false,
                validate: {
                    notNull: true,
                    notEmpty: true
                }
            },

            Date: {
                type: DATE,
                allowNull: false,
                validate: {
                    notNull: true,
                    notEmpty: true
                }
            }
        })
        
        taskConnection.sync({ force: false });

        return taskConnection;
    }
}

TasksModel.taskEntitie();