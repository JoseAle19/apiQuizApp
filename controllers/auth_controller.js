const con = require("../config/database");
const bcrypt = require("bcryptjs");
const { generateJwt } = require("../helpers/generateJWT");
const login = (req, res) => {
  const { email, password } = req.body;
  const findByEmail = `SELECT * FROM users WHERE email = '${email}'`;
  con.query(findByEmail, async (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        msg: "Error en el servidor, verifique la base de datos",
        error: err,
      });
    }
    if (result.length <= 0) {
      return res.status(400).json({
        status: false,
        msg: "Correo o contraseñas incorrectos, correo",
      });
    }
    //password del usuario que se quiere loguear
    let userPassword = result[0].password;
    const validatePassBcryp = await bcrypt.compare(password, userPassword);
    if (!validatePassBcryp) {
      return res.status(400).json({
        status: false,
        msg: "Correo o contraseñas incorrectos, contraseña",
      });
    }
    const { password: _, ...user } = result[0];
    const userToken = await generateJwt(result[0].id);
    return res.status(200).json({
      status: true,
      msg: "Usuario logueado correctamente",
      user,
      userToken,
    });
  });
};

const loginTest = (req, res) => {
  const { nameTest, passwordTest } = req.body;
  const sql = `select * from test where name = '${nameTest}' and clave = '${passwordTest}' `;
  con.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        msg: "Error en el servidor",
        error: err,
      });
    }

    return res.status(200).json({
      status: true,
      msg: `Examen ${nameTest}`,
        data: result,
    });
  });
};

module.exports = {
  login,
  loginTest,
};
