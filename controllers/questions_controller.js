const { response, request } = require("express");
const con = require("../config/database");

const getQuestions = (req, res) => {
  const { idcategory } = req.params;
  const sql = `select * from questions inner join category on category.id = questions.id_category where id_category = ${idcategory}`;

  con.query(sql, (err, resultQ) => {
    if (err) {
      return res.status(400).json({
        status: false,
        msg: "Error al obtener las preguntas ",
        err: err,
      });
    }
    if (resultQ.length < 1) {
      return res.status(400).json({
        status: false,
        msg: `Id de categoria no existe id:${idcategory}`,
        data: 0,
      });
    }
    for (let i = 0; i < resultQ.length; i++) {
      const aQ = JSON.parse(resultQ[i].answers);
      resultQ[i].answers = aQ.answers;
    }

    return res.status(200).json({
      status: true,
      msg: "Todas las preguntas",
      questions: resultQ,
    });
  });
};

const getAllQuestions = (req , res ) => {
  // const sql = `select * from questions`;
  const sql = `select questions.id, questions.question, questions.timeQ, questions.answers, questions.id_category, questions.id_teacher, category.id, category.description from questions inner join category on category.id = questions.id_category`

  con.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        msg: "Error al obtener las preguntas",
        err,
      });
    }
    if (result.length < 1) {
      return res.status(400).json({
        status: false,
        msg: "No Hay preguntas",
        data: 0,
      });
    }
    return res.status(200).json({
      status: true,
      msg: "Todas las preguntas",
      data: result,
    });
  });
};

const insertQuestion = (req, res) => {
  const {
    idTeacher,
    idCategory,
    timeQ = 1,
    question = "Sin pregunta",
    r1 = "Sin respuesta",
    r2 = "Sin respuesta",
    r3 = "Sin respuesta",
    r4 = "Sin respuesta",
    s1 = false,
    s2 = false,
    s3 = false,
    s4 = false,
  } = req.body;
  const sql = `
  insert into questions(question, timeQ, answers, id_teacher, id_category) 
  values( '${question}',${timeQ},'{
      "answers": [ {
      "answer": "${r1}",
      "correct": ${s1}
      },{
      "answer": "${r2}",
      "correct": ${s2}
      },{
      "answer": "${r3}",
      "correct": ${s3}
      },
      {
        "answer": "${r4}",
        "correct": ${s4}
        }
      ]
      }', ${idTeacher}, ${idCategory}
      )`;
  con.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json({
        status: false,
        msg: "Error al insertar pregunta",
        err: err,
      });
    }
    return res.status(200).json({
      status: true,
      msg: "Pregunta agregada",
      data: result,
    });
  });
};



module.exports = {
  getQuestions,
  insertQuestion,
  getAllQuestions
};
