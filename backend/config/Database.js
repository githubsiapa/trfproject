import { Sequelize } from "sequelize";

const db = new Sequelize("data_simcard", "root", "kopihitam#1", {
  host: "149.129.252.217",
  dialect: "mysql",
});

export default db;
