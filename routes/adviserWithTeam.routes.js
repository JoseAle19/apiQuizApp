const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/user.middlewares");
const { addAdviserAndTeam } = require("../controllers/adviser_controller");

router.get("/", (req, res) => {
  res.json({
    msg: "Adviser with team",
  });
});



//TODO: Validar que el el enail,institucion, telefono,equipo ya existen

router.post(
  "/add-adviser-and-team",
  [ 
    check("nameAdviser", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email no es un correo valido").isEmail(),
    check("pass", "La contraseña es obligatoria").not().isEmpty(),
    check("institution", "La institución es obligatoria").not().isEmpty(),
    check("phone", "El teléfono es obligatorio").not().isEmpty(),
    check("idrol", "El rol es obligatorio").not().isEmpty(),
    validateFields,
  ],
  addAdviserAndTeam
);

module.exports = router;
