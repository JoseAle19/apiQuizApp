const con = require("../config/database");
const {
  addTeam,
  addClassMatesForTeam,
} = require("../helpers/insertTeamForAdviser");

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

  const sql = `INSERT INTO adviser(nameAdviser, email, pass, institution, phone, idrol) 
   VALUES ('${nameAdviser}', '${email}', '${pass}', '${institution}','${phone}','${idrol}')`;
  con.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        msg: "Error en el servidor",
        error: err.sqlMessage,
      });
    }
    const data = {
      user: {
        id: result.insertId,
        nameAdviser,
        email,
        pass,
        institution,
        phone,
        idrol,
      },
      // classMAtes: classMates,
      idAdviser: result.insertId,
      nameTeam,
    };
    // addTeam(res, data);
    addClassMatesForTeam(res, students, result.insertId);
  });
};

module.exports = {
  addAdviserAndTeam,
};
