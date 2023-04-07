const con = require("../config/database");

const createTest = (req, res) => {
  const { name, questions } = req.body;
  const now = new Date();
  let time = 0;
  for (let i = 0; i < questions.length; i++) {
    time += questions[i].timeQ;
  }

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
        console.log("Creado correctamnete ");
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
  const sql = `SELECT * FROM test WHERE year = ?`;
  const value = [year];
  con.query(sql, value, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        error: err,
      });
    }
    console.log(result)
    return res.status(200).json({
      status: true,
      msg: "Examenes disponibles",
      test: result,
    });
  });
};
module.exports = {
  createTest,
  getTestForYear,
};
