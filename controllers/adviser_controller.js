const con = require("../config/database");
const { encryptPassword } = require("../helpers/encryptPassword");
const { addClassMatesForTeam, getTeamById} = require("../helpers/insertTeamForAdviser");

// consultar el usuario con el tipo de rol asesor

const getUserAdviser= (req, res) => {
  const { idUser } = req.params;
const sql = `SELECT id FROM adviser where iduser = ?`
const value = [idUser]
  con.query(sql, value, (err, result)=>{
    if(err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        error: err,
      });
    }
    if (result.length === 0) {
      return res.status(400).json({
        status: false,
        msg: "Asesor no existe",
      });
    }
    const { id } = result[0]
    return getTeamById(req, res, id)
    
  })
}





const addAdviserAndTeam = (req, res) => {
  const {
    nameAdviser,
    email,
    pass,
    institution,
    phone,
    idrol,
    // Datos del equipo
    nameTeam,
    students,
  } = req.body;

  const sql = `INSERT INTO users (name, email, password, idrol, year) VALUES(?,?,?,?,?)`;
    const now = new Date();
  const values = [
    nameAdviser,
    email, 
    encryptPassword(pass),
    idrol,
    now.getFullYear(),
  ]
  con.query(sql,values, (err, result) => {
    if (err) {
      
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        error: err,
      });
    }

    const data = {
      institution,
      phone,
      nameTeam,
      students,
    };
    addUserAdviser(res, result.insertId, data);
  });
};

const addUserAdviser = (res, idAdviser, data) => {
  const { institution, phone, nameTeam, students } = data;
  const sql = `INSERT INTO adviser(institution, phone,iduser)
   VALUES (?,?,?)`;
  const values = [institution, phone, idAdviser];
  con.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        error: err,
      });
    }
    addClassMatesForTeam(res, students, result.insertId, nameTeam);
  });
};

module.exports = {
  addAdviserAndTeam,
  getUserAdviser
};
