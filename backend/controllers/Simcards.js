import Simcard from "../models/SimcardModel.js";

export const getSimcard = async (req, res) => {
  try {
    const simcard = await Simcard.findAll({
      attributes: ["id", "tgl_masa_aktif", "nomer_label", "nomer", "pass", "nik", "data", "status", "type", "updatedby", "createdAt", "updatedAt", "label"],
      where: {
        status: "PUBLIC",
      },
    });
    res.json(simcard);
  } catch (error) {
    res.sendStatus(404).json({ message: "Data Error" });
  }
};

export const getSimcardadmin = async (req, res) => {
  try {
    const simcard = await Simcard.findAll({
      attributes: ["id", "tgl_masa_aktif", "nomer_label", "nomer", "pass", "nik", "data", "status", "type", "updatedby", "createdAt", "updatedAt", "label"],
    });
    res.json(simcard);
  } catch (error) {
    res.sendStatus(404).json({ message: "Data Error" });
  }
};

export const getSimcardById = async (req, res) => {
  const simcard = await Simcard.findAll({
    attributes: ["id", "tgl_masa_aktif", "nomer_label", "nomer", "pass", "nik", "data", "status", "type", "updatedby", "createdAt", "updatedAt", "label"],
    where: {
      id: req.params.id,
    },
  });
  if (!simcard[0]) {
    return res.status(404).json({ message: "Data Not Found" });
  } else {
    try {
      res.status(200).json(simcard);
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  }
};

export const addSimcard = async (req, res) => {
  const { tgl_masa_aktif, nomer_label, nomer, pass, nik, data, status, type, updatedby, label } = req.body;
  if (nomer_label == "") return res.status(404).json({ msg: "Cannot Empty Field" });
  if (nomer == "") return res.status(404).json({ msg: "Cannot Empty Field" });
  if (pass == "") return res.status(404).json({ msg: "Cannot Empty Field" });
  if (nik == "") return res.status(404).json({ msg: "Cannot Empty Field" });
  if (data == "") return res.status(404).json({ msg: "Cannot Empty Field" });
  if (type == "") return res.status(404).json({ msg: "Cannot Empty Field" });
  try {
    await Simcard.create({
      tgl_masa_aktif: tgl_masa_aktif,
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
    res.json({ msg: "Input Data Success" });
  } catch (error) {
    res.json({ msg: "Input Data Not Success" });
  }
};

export const upSimcard = async (req, res) => {
  const { tgl_masa_aktif, nomer_label, nomer, pass, nik, data, status, type, updatedby, label } = req.body;
  const cekId = await Simcard.findAll({
    where: {
      id: req.params.id,
    },
  });
  if (!cekId[0]) {
    return res.status(404).json({ message: "Data Not Found" });
  } else {
    try {
      await Simcard.update(
        {
          tgl_masa_aktif: tgl_masa_aktif,
          nomer_label: nomer_label,
          nomer: nomer,
          pass: pass,
          nik: nik,
          data: data,
          status: status,
          type: type,
          updatedby: updatedby,
          label: label,
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

export const delSimcard = async (req, res) => {
  const cekId = await Simcard.findAll({
    where: {
      id: req.params.id,
    },
  });
  if (!cekId[0]) {
    return res.status(404).json({ message: "Data Not Found" });
  } else {
    try {
      await Simcard.destroy({
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
