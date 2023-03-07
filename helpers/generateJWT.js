const jwt = require('jsonwebtoken')


const generateJwt =(id)=>{
    return new Promise((resolve, reject)=>{
        const payload = {
            id
        }
        jwt.sign(payload, process.env.TOKEN_SECRET, (err, token)=>{
            if (err) {
                console.log(`No se pudo generar el token ${err}`)
                reject(`Error al generar el token del usuario`)
            }
            else{
                resolve(token)
            }

        })
    })
}

module.exports={
    generateJwt
}