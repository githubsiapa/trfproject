import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Button } from "antd";
import "antd/dist/antd.min.css";
import { Table } from "ant-table-extensions";

const Userlist = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getusers();
  }, []);

  const getusers = async () => {
    setLoading(true);
    const response = await axiosJWT.get("http://149.129.252.217:5000/getusers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
    setTotalPages(response.totalPages);
    setLoading(false);
  };

  const deleteUser = async (id) => {
    await axiosJWT.delete(`http://149.129.252.217:5000/users/del/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getusers();
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://149.129.252.217:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decode = jwt_decode(response.data.accessToken);
        setUsername(decode.username);
        setRole(decode.role);
        setExpire(decode.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const columns = [
    {
      title: "No",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (dataIndex) => (
        <>
          <Link to={`/users/edit/${dataIndex}`} className="button is-small is-info is-rounded">
            Edit
          </Link>
          <Button onClick={() => deleteUser(dataIndex)} className="button is-small is-danger is-rounded">
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">List of Users</h2>
      <Link to="/users/add" className="button is-primary mb-2">
        Add New
      </Link>
      <Table
        className="table is-striped is-fullwidth"
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={{
          pageSize: 10,
          total: { totalPages },
        }}
        scroll={{ x: true }}
        exportable
        searchable
      ></Table>
    </div>
  );
};

export default Userlist;
