import Layout from "./Layout";
import FormEditUser from "../components/FormEditUser";

import { React, useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decode = jwt_decode(response.data.accessToken);
      setUsername(decode.username);
      setRole(decode.role);
      setExpire(decode.exp);
    } catch (error) {
      if (error.response) {
        navigate("/", { replace: true });
      }
    }
  };

  return (
    <Layout role={role}>
      <FormEditUser />
    </Layout>
  );
};

export default EditUser;
