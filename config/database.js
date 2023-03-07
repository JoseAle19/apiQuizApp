const mysql = require("mysql");
const dataBase = "sockSerJos";
let dB_con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: dataBase,
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
