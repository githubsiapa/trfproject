import express from "express";
import db from "./config/Database.js";
import router from "./routes/index.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import Users from "./models/UserModel.js";
import Simcard from "./models/SimcardModel.js";

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected");
  //for create table otomatis
  //await Simcard.sync();
} catch (error) {
  console.error(error);
}

app.use(cors({ credentials: true, origin: "http://149.129.252.217:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, () => console.log("Server running at port 5000"));
