const jwt = require('jsonwebtoken');

class TokenController {

    verifyAuth (req, res, next) {
        //obtener token
        let token = this.getToken(req);
        //verificar token
        jwt.verify(token, process.env.NODE_PRIVATE_KEY,(error, decode) =>{
            if(error){
                res.status(401).json({info: "usuario no autenticado"});
            }else{
                next();
            }
        });
    }

    getToken (req)  {
        let token = null;
        //Capturar el bearer token de la cabecera
        let authorization = req.headers.authorization;
        if (authorization != null && authorization != undefined) {
            //Realizar split para eliminar los espacios (crea un arreglo)
            token = authorization.split(" ")[1];
        }
        return token;
    }
}

module.exports = TokenController;