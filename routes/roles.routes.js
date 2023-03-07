const { Router } = require("express");
const router = Router();
const { getRoles } = require("../controllers/roles_controller");


router.get("/", (req, res ) =>{
    res.send("Endpoints para los roles")
} )

router.get("/getRoles", getRoles)

module.exports = router;