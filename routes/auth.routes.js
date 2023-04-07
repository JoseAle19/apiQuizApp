const { Router } = require("express");
const router = Router();
const { login, loginTest } = require("../controllers/auth_controller");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/user.middlewares");

router.get("/", (req, res) => {
  res.send("Endpoints autenticaciónes");
});
router.post(
  "/login",
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email debe de ser valido").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validateFields,
  ],
  login
);




module.exports = router;
