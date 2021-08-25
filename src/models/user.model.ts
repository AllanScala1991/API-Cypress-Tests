import { STRING } from "sequelize";
import { connection } from "../database/connection";


export class UserModel {

    static userEntities () {
        const userConnection = connection.define("Users", {
            Name: {
                type: STRING,
                allowNull: false,
                validate: {
                    notNull: true,
                    notEmpty: true
                }
            },

            Email: {
                type: STRING,
                allowNull: false,
                validate: {
                    notNull: true,
                    notEmpty: true
                }
            },

            Username: {
                type: STRING,
                allowNull: false,
                validate: {
                    notNull: true,
                    notEmpty: true
                }
            },

            Password: {
                type: STRING,
                allowNull: false,
                validate: {
                    notNull: true,
                    notEmpty: true
                }
            }
        })

        userConnection.sync({ force: false });

        return userConnection;

    }

}

UserModel.userEntities();