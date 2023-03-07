const { response } = require("express");
const con = require("../config/database");

const getAllCategories = (req, res = response) => {
  const sql = `select * from category`;
  con.query(sql, (err, result) => {
    if (err) {
       return res.status(500).json({
        status: false,
        msg: "Error en el servidor, codigo de error 500",
        error: err,
      });
    }
    if (result.length < 1) {
      return res.status(400).json({
        status: false,
        msg: "No hay categorias",
        result,
      });
    }
    return res.status(200).json({
      status: true,
      msg: `Todas las categorias ${result.length}`,
      result,
    });
  });
};
 module.exports = {
    getAllCategoires: getAllCategories
 }