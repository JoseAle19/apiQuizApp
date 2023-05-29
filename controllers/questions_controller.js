const { response, request, json } = require("express");
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

const getAllQuestions = (req, res) => {
  // const sql = `select * from questions`;
  const sql = `select questions.id as 'id_Q', questions.question, questions.timeQ, questions.answers, questions.id_category, questions.id_teacher, category.id, category.description from questions inner join category on category.id = questions.id_category`;

  con.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
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
      "answer": "${r1.toString()}",
      "correct": ${s1}
      },{
      "answer": "${r2.toString()}",
      "correct": ${s2}
      },{
      "answer": "${r3.toString()}",
      "correct": ${s3}
      },
      {
        "answer": "${r4.toString()}",
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

const updateQuestion = (req, res) => {
  // Obtener los valores que se actualizarán desde el cuerpo de la solicitud
  const { questionId, question, timeQ, answers } = req.body;
  // Construir la consulta de actualización
  let updateQuery = "UPDATE questions SET ";
  let updateValues = [];

  if (question) {
    updateQuery += "question = ?, ";
    updateValues.push(question);
  }

  if (timeQ) {
    updateQuery += "timeQ = ?, ";
    updateValues.push(timeQ);
  }

  if (answers) {
    updateQuery += "answers = ?, ";
    updateValues.push(answers);
  }

  // Eliminar la coma y el espacio adicionales al final de la consulta de actualización
  updateQuery = updateQuery.slice(0, -2);

  // Agregar la cláusula WHERE para actualizar solo la pregunta especificada
  updateQuery += " WHERE id = ?";
  updateValues.push(questionId);

  con.query(updateQuery, updateValues, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err,
      });
    }
    if (result.affectedRows < 1) {
      return res.status(400).json({
        status: false,
        msg: "No se actualizo la pregunta",
        data: 0,
      });
    }
    return res.status(200).json({
      status: true,
      msg: "Pregunta actualizada",
      data: result,
    });
  });
};

const deleteQuestion = (req, res) => {
  const { idQuestion } = req.params;

  const sql = `delete from questions where id = ?`;
  const values = [idQuestion];
  con.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err,
      });
    }
    if (result.affectedRows < 1) {
      return res.status(400).json({
        status: false,
        msg: "No se elimino la pregunta",
        data: 0,
      });
    }
    return res.status(200).json({
      status: true,
      msg: "Pregunta eliminada",
      data: result,
    });
  });
};

module.exports = {
  getQuestions,
  insertQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
};
