import { Sequelize } from "sequelize";


const connection = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/database.db'
});

export { connection };
