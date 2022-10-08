import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Button } from "antd";
import "antd/dist/antd.min.css";
import { Table } from "ant-table-extensions";
import moment from "moment";

const SimcardList = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [simcard, setSimcard] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSimcardadmin();
  }, []);

  const getSimcardadmin = async () => {
    setLoading(true);
    const response = await axiosJWT.get("http://localhost:5000/simcardadmin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setSimcard(response.data);
    setTotalPages(response.totalPages);
    setLoading(false);
  };

  const deleteSimcard = async (id) => {
    await axiosJWT.delete(`http://localhost:5000/simcard/del/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getSimcardadmin();
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
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
      title: "Type",
      dataIndex: "type",
      width: "40px",
    },
    {
      title: "Tanggal Masa Aktif",
      dataIndex: "tgl_masa_aktif",
      width: "150px",
    },
    {
      title: "Nomer Label",
      dataIndex: "nomer_label",
      width: "150px",
    },
    {
      title: "Nomer",
      dataIndex: "nomer",
      width: "150px",
    },
    {
      title: "Pass",
      dataIndex: "pass",
      width: "150px",
    },
    {
      title: "NIK",
      dataIndex: "nik",
      width: "150px",
    },
    {
      title: "Data",
      dataIndex: "data",
      width: "150px",
    },
    {
      title: "Update by",
      dataIndex: "updatedby",
      width: "150px",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      width: "150px",
      render: (dataIndex) => {
        return (
          <div>
            <p>{moment(dataIndex).format("YYYY-MM-DD, h:mm:ss a")}</p>
          </div>
        );
      },
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      width: "150px",
      render: (dataIndex) => {
        return (
          <div>
            <p>{moment(dataIndex).format("YYYY-MM-DD, h:mm:ss a")}</p>
          </div>
        );
      },
    },
    {
      title: "Note",
      dataIndex: "label",
      width: "150px",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (dataIndex) => (
        <>
          <Link to={`/simcards/edit/${dataIndex}`} className="button is-small is-info is-rounded">
            Edit
          </Link>
          <Button onClick={() => deleteSimcard(dataIndex)} className="button is-small is-danger is-rounded">
            Delete
          </Button>
        </>
      ),
    },
  ];
  return (
    <div>
      <h1 className="title">Simcards</h1>
      <h2 className="subtitle">List of Simcards</h2>
      <Link to="/simcards/add" className="button is-primary mb-2">
        Add New
      </Link>
      <Table
        className="table is-striped is-fullwidth"
        columns={columns}
        dataSource={simcard}
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

export default SimcardList;
