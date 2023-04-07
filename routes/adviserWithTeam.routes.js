const { Router } = require("express");
const router = Router();
const { check, body } = require("express-validator");
const { validateFields } = require("../middlewares/user.middlewares");
const { addAdviserAndTeam, getUserAdviser} = require("../controllers/adviser_controller");
const { validateField } = require("../helpers/dbValidations");

router.get("/", (req, res) => {
  res.json({
    msg: "Adviser with team",
  });
});


router.post(
  "/add-adviser-and-team",
  [
    check("nameAdviser", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email no es un correo valido").isEmail(),
    check("email").custom((email) => {
      const sql = `SELECT * FROM users where email = '${email}' and idrol = '${5}'`;
      return validateField(sql).then((email) => {
        
        if (email) {
          throw new Error("Correo ya registrado");
        }
      });
    }),
    check("pass", "La contraseña es obligatoria").not().isEmpty(),
    check("institution", "La institución es obligatoria").not().isEmpty(),
    check("institution").custom((institution) => {
      const sql = `SELECT * FROM adviser where institution= '${institution}'`;

      return validateField(sql).then((inst) => {
        if (inst) {
          throw new Error("Institución ya esta registrada");
        }
      });
    }),
    check("phone", "El teléfono es obligatorio").not().isEmpty(),
    check("phone").custom(phone => {
      const sql = `SELECT * FROM adviser WHERE phone = '${phone}'`;
      return validateField(sql).then((phone) => {
        if (phone) {
          throw new Error("Numero de telefono registrado");
        }
      });
    }),
    check("phone", "Numero de telefono solo numeros").isNumeric(),
    check("idrol", "El rol es obligatorio").not().isEmpty(),
    check("nameTeam", "Agrega nombre para tu equipo").not().isEmpty(),
    check("nameTeam").custom((nameTeam) => {
      const sql = `SELECT * FROM adviserTeam WHERE nameTeam = '${nameTeam}'`;
      return validateField(sql).then((nameTeam) => {
        if (nameTeam) {
          throw new Error("Nombre de equipo no valido");
        }
      });
    }),
    check("students", "Agrega la lista de estudiantes al equipo").not().isEmpty(),
    check("students", "Agrega la lista de estudiantes al equipo").isArray(),
    validateFields,
  ],
  addAdviserAndTeam
);


router.get('/getTeamById/:idUser', getUserAdviser)

module.exports = router;
