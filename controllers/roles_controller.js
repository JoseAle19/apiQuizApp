const con = require("../config/database");
const { request } = require("express");
const getRoles = (req, res) => {
  const sql = "SELECT * FROM roles";
  con.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json({
        status: false,
        msg: "Error al obtener los datos",
        err,
      });
    }
    return res.json({ Roles: result });
  });
};

module.exports = {
  getRoles,
};
