import express from "express";
import { getUsers, getUsersById, Createuser, upUser, delUser, Login, Logout } from "../controllers/Users.js";
import { getSimcard, addSimcard, upSimcard, delSimcard, getSimcardById, getSimcardadmin } from "../controllers/Simcards.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

//login
router.post("/users", verifyToken, Createuser);
router.get("/users/:id", verifyToken, getUsersById);
router.delete("/users/del/:id", verifyToken, delUser);
router.post("/users/edit/:id", verifyToken, upUser);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

//user
router.get("/getusers", verifyToken, getUsers);

//simcard
router.get("/simcard", verifyToken, getSimcard);
router.get("/simcardadmin", verifyToken, getSimcardadmin);
router.get("/simcard/:id", verifyToken, getSimcardById);
router.post("/simcard/add", verifyToken, addSimcard);
router.post("/simcard/up/:id", verifyToken, upSimcard);
router.delete("/simcard/del/:id", verifyToken, delSimcard);

export default router;
