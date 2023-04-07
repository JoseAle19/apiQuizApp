const con = require("../config/database");
const { request } = require("express");
const bcrypt = require("bcryptjs");
const { encryptPassword } = require("../helpers/encryptPassword");
const getUser = (req, res) => {
  const sql = `SELECT users.name, users.email, roles.des as rol FROM users inner join roles on users.idrol = roles.id`;

  con.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json({
        status: false,
        msg: "Error al obtener los datos",
        err,
      });
    }
    return res.json({ Usuarios: result });
  });
};

const insertUser = (req = request, res = response) => {
  let { name, email, password, idRol } = req.body;
  const sql = `INSERT INTO users (name, email, password, idrol, year) VALUES(?,?,?,?,?)`;
  // Obtener la fecha actual
const now = new Date();
  const values = [name, email, encryptPassword(password), idRol, now.getFullYear()];

  con.query(sql, values,(err, result) => {
    if (err) {
      return res.status(400).json({
        status: false,
        msg: "Error al registrar el usuario",
        error: err.sqlMessage,
      });
    }
    const datauser = {
      name,
      email,
      password,
      idRol,
    };
    return res.status(201).json({
      message: "Usuario creado correctamente",
      "Datos del usuario": datauser,
    });
  });
};

module.exports = {
  getUser,
  insertUser,
};
