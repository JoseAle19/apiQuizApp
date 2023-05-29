const con = require("../config/database");
const { encryptPassword } = require("./encryptPassword");

const deleteAdviser = (id = "") => {
  const sql = `DELETE FROM adviser WHERE id = ?`;
  const value = [id];
  con.query(sql, value, (err, result) => {
    if (err) {
      return { status: false, msg: "Error eliminar el asesor", error: err };
    }
    return {
      status: true,
      msg: "Asesor eliminado correctamente",
      result: result,
    };
  });
};

const deleteStudents = (res, ids = []) => {
  for (let index = 0; index < ids.length; index++) {
    const sql = `DELETE FROM users WHERE id = ?`;
    const values = [ids[index]];
    con.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: false,
          msg: "Error en el servidor, no se pudieron  eliminar los estudiantes",
          error: err.sqlMessage,
        });
      }
      console.log("Estudiantes eliminadps correctamente");
      return {
        status: true,
        msg: "Estudiantes eliminados correctamente",
        result: result,
      };
    });
  }
};

// Agregar los estudiantes ala tabla usuarios
const addClassMatesForTeam = (res, classMates, idAdviser, nameTeam) => {
  const random = Math.floor(Math.random() * 1000);
  // Este metodo elimina todos los espacios en blanco //* replace(/\s+/g, "")
  let ids = [];
  for (let i = 0; i < classMates.length; i++) {
    const nameStudent = classMates[i].name;
    const emailStudent = classMates[i].name + `${random}` + `@gmail.com`;
    const passwordStudent = classMates[i].name + "123";
    const rolStudent = classMates[i].isLeader;
    const sql = `INSERT INTO users (name, email, password, idrol, year) VALUES(?,?,?,?,?)`;
    // Obtener el año actual
    const now = new Date();
    //
    const values = [
      nameStudent,
      emailStudent.toLowerCase().replace(/\s+/g, ""),
      encryptPassword(passwordStudent.toLowerCase().replace(/\s+/g, "")),
      rolStudent ? 5 : 1,
      now.getFullYear(),
    ];
    con.query(sql, values, (err, result) => {
      if (err) {
        // si existe un error al agregar el equipo, se elimina el asesor
        deleteStudents(res, ids);
        deleteAdviser(idAdviser);
        return res.status(500).json({
          status: false,
          msg: "Ocurrio un error",
          error: err,
        });
      }
      ids.push({
        id: result.insertId,
        isLeader: classMates[i].isLeader,
      });

      if (i === classMates.length - 1) {
        console.log("Estudiantes agregados correctamente");
        console.log(ids);
        addTeam(res, ids, idAdviser, nameTeam);
      }
    });
  }
};

const addTeam = (res, studentsIds = [], idAdviser, nameTeam) => {
  const pos1 = studentsIds[0].id;
  const pos2 = studentsIds[1].id;
  const pos3 = studentsIds[2].id;
  const sql = `insert into adviserTeam values(?,?,?,?,?,?)`;

  const values = [null, pos1, pos2, pos3, nameTeam, idAdviser];

  con.query(sql, values, (err, result) => {
    if (err) {
      deleteAdviser(idAdviser);
      deleteStudents(res, studentsIds);
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        error: err,
      });
    }

    return res.status(201).json({
      status: true,
      msg: "Equipo agregado correctamente",
    });
  });
};

// Obtener los estudiantes de un equipo con el id del asesor

const getTeamById = (req, res, id) => {
  const sql = `
  select 
  nameTeam,
  user1.name as 'student1', 
  user1.email as 'email1', 
  user1.idrol as 'r1',
  user2.name  as 'student2',
  user2.email as 'email2', 
  user2.idrol as 'r2',
  user3.name as 'student3',
  user3.email as 'email3',
  user3.idrol as 'r3'
  from adviserTeam a
  inner join users user1 on user1.id = a.id1
  inner join users user2 on user2.id = a.id2
  inner join users user3 on user3.id = a.idLeader
  inner join adviser adviserTeam on adviserTeam.id = a.idAdviser 
  WHERE idAdviser= ?;
  `;
  const value = [id];
  con.query(sql, value, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        error: err,
      });
    }
    if (result.length === 0) {
      return res.status(400).json({
        status: false,
        msg: "Equipo no existe",
      });
    }
    const {
      student1,
      student2,
      student3,
      email1,
      email2,
      email3,
      r1,
      r2,
      r3,
      nameTeam,
    } = result[0];
    const team = {
      nameTeam,
      students: [
        {
          name: student1,
          email: email1,
          idrol: r1,
        },
        {
          name: student2,
          email: email2,
          idrol: r2,
        },
        {
          name: student3,
          email: email3,
          idrol: r3,
        },
      ],
    };

    res.status(200).json({
      status: true,
      msg: "Equipo encontrado",
      team,
    });
  });
};

module.exports = {
  addClassMatesForTeam,
  getTeamById,
};
