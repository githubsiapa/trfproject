import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Simcard = db.define(
  "simcard",
  {
    tgl_masa_aktif: {
      type: DataTypes.DATE,
    },
    nomer_label: {
      type: DataTypes.STRING,
    },
    nomer: {
      type: DataTypes.STRING,
    },
    pass: {
      type: DataTypes.STRING,
    },
    nik: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    updatedby: {
      type: DataTypes.STRING,
    },
    label: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Simcard;
