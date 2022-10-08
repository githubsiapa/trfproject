import { Sequelize } from "sequelize";

const db = new Sequelize("data_simcard", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
