const { Router } = require("express");
const { createTest , getTestForYear, getQuestionsByTest, getTestActive} = require("../controllers/test_controller");
const router = Router();
router.get("/", (req, res) => {
  res.json({
    msg: "Endpoit de los test",
  });
});


router.post("/new-test", createTest)


router.get('/testForYear/:year', getTestForYear )
// router para mostar las preeguntas del test
router.get('/questionsByTest/:idTest/:yearByUser', getQuestionsByTest)

// router para mostrar el test activo
router.get("/test-enable/:idTest", getTestActive);


module.exports = router;
