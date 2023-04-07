const { Router } = require("express");
const { createTest , getTestForYear} = require("../controllers/test_controller");
const router = Router();
router.get("/", (req, res) => {
  res.json({
    msg: "Endpoit de los test",
  });
});


router.post("/new-test", createTest)


router.get('/testForYear/:year', getTestForYear )

module.exports = router;
