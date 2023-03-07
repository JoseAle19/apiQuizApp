const con = require("../config/database");

const deleteAdviser = (id = "") => {
  const sql = `DELETE FROM adviser WHERE id = ${id}`;
  con.query(sql, (err, result) => {
    if (err) {
      return { status: false, msg: "Error eliminar el asesor", error: err };
    }
    console.log("Asesor eliminado correctamente");
    return {
      status: true,
      msg: "Asesor eliminado correctamente",
      result: result,
    };
  });
};

const addClassMatesForTeam = (res, classMates, idAdviser) => {
  const random = Math.floor(Math.random() * 1000);

  for (let i = 0; i < classMates.length; i++) {
    const sql = `INSERT INTO users (name, email, password, idrol) VALUES('${
      classMates[i].name
    }', '${classMates[i].name + `${random}` + `@gmail.com`}','${
      classMates[i].name + `123`
    }','${classMates[i].isLeader ? 5 : 1}')`;
    con.query(sql, (err, result) => {
      if (err) {
        // si existe un error al agregar el equipo, se elimina el asesor
        deleteAdviser(idAdviser);
        return res.status(500).json({
          status: false,
          msg: "Error en el servidor, no se pudo agregar el equipo",
          error: err.sqlMessage,
        });
      }
      console.log("Alumno agregado correctamente  " + classMates[i]);
    });
  }
};

const addTeam = (res, data) => {
  const { user, classMate1, classMate2, classMate3, idAdviser, nameTeam } =
    data;
  const sql = `insert into adviserTeam(nameTeam, classMate1, classMate2, classMate3, idAdviser)
  values('${nameTeam}','${classMate1}','${classMate2}','${classMate3}', '${idAdviser}')`;
  con.query(sql, (err, result) => {
    if (err) {
      // si existe un error al agregar el equipo, se elimina el asesor
      deleteAdviser(idAdviser);
      return res.status(500).json({
        status: false,
        msg: "Error en el servidor, no se pudo agregar el equipo",
        error: err.sqlMessage,
      });
    }
    return res.status(200).json({
      status: true,
      msg: "Asesor y equipo agregado correctamente",
      team: {
        id: result.insertId,
        nameTeam,
        classMate1,
        classMate2,
        classMate3,
        idAdviser,
      },
      adviser: user,
    });
  });
};

module.exports = {
  addTeam,
  addClassMatesForTeam,
};
