const mysql = require("mysql2");
const dataBase = "railway";
require("dotenv").config();
const { HOST_MYSQL, USER_MYSQL, PASSWORD_MYSQL, DATABASE_MYSQL, PORT_MYSQL } =
  process.env;
let dB_con = mysql.createConnection({
  host: HOST_MYSQL || "localhost",
  port: PORT_MYSQL || 3306,
  user: USER_MYSQL|| "root",
  password: PASSWORD_MYSQL|| "",
  database: DATABASE_MYSQL|| "sockserjos",
});
// esta es la conexion ala base de datos
dB_con.connect((err) => {
  if (err) {
    console.log(`Error al conectar la base de datos ${err}`);
    return;
  }
  console.log(`Conectado a la base de datos ${dataBase}`);
});

module.exports = dB_con;
