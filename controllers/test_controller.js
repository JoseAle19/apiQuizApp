const con = require("../config/database");

const createTest = (req, res) => {
  const { name, questions } = req.body;
  const now = new Date();
  let time = 0;
  for (let i = 0; i < questions.length; i++) {
    time += questions[i].timeQ;
  }
  // Redondear la duracion del examen
  time = Math.round(time / 60);

  const sql = `INSERT INTO test(name, duration, start_test, end_test, status, year) VALUES(?,?,?,?,?,?)`;
  const yearMonthDay = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
  const hourMinuteSecond = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  // El metodo padStart es para que si el numero es menor a 2 digitos, se le agregue un 0 a la izquierda

  const values = [
    name,
    time,
    `${yearMonthDay} ${hourMinuteSecond}`,
    `${yearMonthDay} ${hourMinuteSecond}`,
    true,
    now.getFullYear(),
  ];

  con.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err,
      });
    }
    return addQuestion(res, questions, result.insertId);
  });
};

const addQuestion = (res, questions, id) => {
  const sql = `INSERT INTO test_questions(test_id, question_id) VALUES(?,?)`;
  for (let i = 0; i < questions.length; i++) {
    const values = [id, questions[i].id_Q];
    con.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: false,
          msg: "Ocurrio un error",
          err,
        });
      }

      if (i === questions.length - 1) {
        return res.status(201).json({
          status: true,
          msg: "Test creado correctamente",
        });
      }
    });
  }
};

const getTestForYear = (req, res) => {
  const { year } = req.params;
  // Obtener los examenes disponibles para el año actual
  // y con el status en 1 que es activo
  const sql = `SELECT * FROM test WHERE year = ? and status= 1`;
  const value = [year];
  con.query(sql, value, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        error: err,
      });
    }
    return res.status(200).json({
      status: true,
      msg: "Examenes disponibles",
      test: result,
    });
  });
};
// Servicio para mostrar preguntas de un test (id_test)
const getQuestionsByTest = (req, res) => {
  // Obtener el id del test y el year del usuario
  const { idTest, yearByUser } = req.params;
  const sql = `SELECT test.duration, test.year, questions.question, questions.answers FROM  
      test_questions
      INNER JOIN test ON test_questions.test_id = test.id
      INNER JOIN questions ON test_questions.question_id= questions.id 
      WHERE test.year = ? and test.id = ?
      `;
  const values = [yearByUser, idTest];
  con.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        error: err,
      });
    }
    return res.status(200).json({
      status: true,
      msg: "Preguntas del examen",
      questions: result,
    });
  });
};

const getTestActive = (req, res) => {
  const {idTest} = req.params
  const sql = `SELECT * FROM test_active WHERE testId = ?`;
  const value = [idTest];
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
        msg: "Test no activo",
      });
    }
    return res.status(200).json({
      status: true,
      msg: "Test activo",
      result,
    });
  });
};

const addTestActive = (test = 0) => {
  const sql = `INSERT INTO test_active(testId) VALUES (?)`;
  const value = [test];
  con.query(sql, value, (err, result) => {
    if (err) {
      console.log(err);
      return {
        status: false,
        msg: "Ocurrio un error",
        error: err,
      };
    }
    console.log("Test activo");
    return {
      status: true,
      msg: "Test activo",
      result,
    };
  });
};

// Exportar los modulos
module.exports = {
  createTest,
  getTestForYear,
  getQuestionsByTest,
  addTestActive,
  getTestActive,
};
