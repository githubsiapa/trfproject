import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "username", "role"],
    });
    res.json(users);
  } catch (error) {
    res.json({ msg: "Data Not Found" });
  }
};

export const getUsersById = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "username", "role"],
      where: {
        id: req.params.id,
      },
    });
    res.json(users);
  } catch (error) {
    res.json({ msg: "Data Not Found" });
  }
};

export const Createuser = async (req, res) => {
  const { username, role, password, confpassword } = req.body;
  if (password !== confpassword) return res.status(400).json({ msg: "Password Not Match" });
  const salt = await bcrypt.genSalt();
  const hasPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      username: username,
      role: role,
      password: hasPassword,
    });
    res.json({ msg: "Create User Success" });
  } catch (error) {
    res.json({ msg: "Create User Not Success" });
  }
};

export const upUser = async (req, res) => {
  const { role, password, confpassword } = req.body;
  if (password !== confpassword) return res.status(400).json({ msg: "Password Not Match" });
  const salt = await bcrypt.genSalt();
  const hasPassword = await bcrypt.hash(password, salt);
  const cekId = await Users.findAll({
    where: {
      id: req.params.id,
    },
  });
  if (!cekId[0]) {
    return res.status(404).json({ message: "Data Not Found" });
  } else {
    try {
      await Users.update(
        {
          role: role,
          password: hasPassword,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.json({ msg: "Update Data Success" });
    } catch (error) {
      res.json({ msg: "Update Data Not Success" });
    }
  }
};

export const delUser = async (req, res) => {
  const cekId = await Users.findAll({
    where: {
      id: req.params.id,
    },
  });
  if (!cekId[0]) {
    return res.status(404).json({ message: "Data Not Found" });
  } else {
    try {
      await Users.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.json({ msg: "Deleted Data Success" });
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        username: req.body.username,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    const userId = user[0].id;
    const username = user[0].username;
    const role = user[0].role;
    const accessToken = jwt.sign({ userId, username, role }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "20s",
    });
    const refreshToken = jwt.sign({ userId, username, role }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      //maxAge: 24 * 60 * 60 * 20000,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Wrong Username" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
