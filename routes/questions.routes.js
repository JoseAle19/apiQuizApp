const { Router } = require("express");
const { check } = require("express-validator");
const {
  getQuestions,
  insertQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questions_controller");
const questions = require("../questions.json");
const { validateFields } = require("../middlewares/user.middlewares");
const router = Router();

router.get("/question", (req, res) => {
  res.status(200).json({ questions });
});

// router.get('/test', getTest);

router.get("/getQuestionByCategory/:idcategory/", getQuestions);

router.get("/getAllQuestion", getAllQuestions);

router.put("/updateQuestion", updateQuestion);

router.delete("/deleteQuestion/:idQuestion",deleteQuestion )

router.post(
  "/newQuestion",
  [
    check("idTeacher", "El id del profesor es obligatorio").not().isEmpty(),
    check("idCategory", "El id de la categoria es obligatorio").not().isEmpty(),
    check("timeQ", "El tiempo de la pregunta es obligatorio").not().isEmpty(),
    check("question", "La pregunta es obligatoria").not().isEmpty(),
    validateFields,
  ],
  insertQuestion
);

module.exports = router;
