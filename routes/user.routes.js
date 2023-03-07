const { Router } = require("express");
const { getUser, insertUser } = require("../controllers/user_controller");
const router = Router();
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/user.middlewares");

router.get("/", (req, res) => {
  res.send("Endpoints para los usuarios");
});
router.get("/getUsers", getUser);

router.post(
  "/newUser",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email debe de ser valido").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("idRol", "El rol es obligatorio").not().isEmpty(),
    validateFields
  ],
  insertUser
);
module.exports = router;
