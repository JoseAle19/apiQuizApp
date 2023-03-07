const jwt = require("jsonwebtoken");
const con = require("../config/database");
const validateJWT = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(400).json({
      status: false,
      msg: `Token no especificado`,
    });
  }
  try {
    const { id } = jwt.verify(token, process.env.TOKEN_SECRET);
    const sql = `select * from users where id = ${id}`;
    con.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: false,
          msg: `Error en la consulta`,
          error: err,
        });
      }
      if (result.length < 1) {
        return res.status(400).json({
          status: false,
          msg: `Token no valido, Usuario no existe en la base de datos`,
        });
      }
      req.userAuth = result[0]
      next()
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Token, no valido"
    });
  }
};

module.exports = {
  validateJWT,
};
