
const validateRol = (req, res, next ) => {
if (!req.userAuth) {
    return res.status(400).json({
        statu: false, 
        msg:`Se quiere validar el rol antes del token`
    })
}
const { name, idrol }= req.userAuth;
if (idrol === 1) {
    return res.status(401).json({
        status: false,
        msg:`${name} no tienes acceso eres un estudiante`
    })
}
next()
};

module.exports ={
    validateRol
}