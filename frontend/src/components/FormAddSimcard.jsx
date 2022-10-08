import { React, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const FormAddSimcard = (props) => {
  const [tgl_masa_aktif, setTgl_masa_aktif] = useState("");
  const [nomer_label, setNomer_label] = useState("");
  const [nomer, setNomer] = useState("");
  const [pass, setPass] = useState("");
  const [nik, setNik] = useState("");
  const [data, setData] = useState("");
  const [status, setStatus] = useState("PUBLIC");
  const [type, setType] = useState("KONVENSIONAL");
  const [label, setLabel] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

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
        setExpire(decode.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  let updatedby = props.username;

  const saveSimcard = async (e) => {
    e.preventDefault();
    const formatTGL = moment(tgl_masa_aktif).format("YYYY-MM-DD");
    await axiosJWT.post("http://localhost:5000/simcard/add", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      tgl_masa_aktif: formatTGL,
      nomer_label: nomer_label,
      nomer: nomer,
      pass: pass,
      nik: nik,
      data: data,
      status: status,
      type: type,
      updatedby: updatedby,
      label: label,
    });
    navigate("/simcards", { replace: true });
  };

  return (
    <div>
      <h1 className="title">Simcards</h1>
      <h2 className="subtitle">Add New Simcard</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveSimcard}>
              <div className="field">
                <label className="label">Tanggal Masa Aktif</label>
                <input className="input" type="date" placeholder="" value={tgl_masa_aktif} onChange={(e) => setTgl_masa_aktif(e.target.value)} required />
              </div>

              <div className="field">
                <label className="label">Nomer Label</label>
                <input className="input" type="text" placeholder="Nomer Label" value={nomer_label} onChange={(e) => setNomer_label(e.target.value)} required />
              </div>

              <div className="field">
                <label className="label">Nomer</label>
                <input className="input" type="text" placeholder="Nomer" value={nomer} onChange={(e) => setNomer(e.target.value)} required />
              </div>

              <div className="field">
                <label className="label">Pass</label>
                <input className="input" type="text" placeholder="Pass" value={pass} onChange={(e) => setPass(e.target.value)} required />
              </div>

              <div className="field">
                <label className="label">NIK</label>
                <input className="input" type="text" placeholder="NIK" value={nik} onChange={(e) => setNik(e.target.value)} required />
              </div>

              <div className="field">
                <label className="label">Data</label>
                <input className="input" type="text" placeholder="Data" value={data} onChange={(e) => setData(e.target.value)} required />
              </div>

              {props.role === "admin" && (
                <div className="field">
                  <label className="label">Status</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value="PUBLIC">PUBLIC</option>
                        <option value="PRIVATE">PRIVATE</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              <div className="field">
                <label className="label">Type</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select value={type} onChange={(e) => setType(e.target.value)} required>
                      <option value="KONVENSIONAL">KONVENSIONAL</option>
                      <option value="SYARIAH">SYARIAH</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Note</label>
                <input className="input" type="text" placeholder="Label" value={label} onChange={(e) => setLabel(e.target.value)} />
              </div>

              <div className="field">
                <button className="button is-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddSimcard;
