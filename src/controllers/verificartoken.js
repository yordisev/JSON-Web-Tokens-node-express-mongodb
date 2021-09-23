const jwt = require('jsonwebtoken');
const config = require('../config');

function verificartoken (req, res, next){
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            auth:false,
            message: "token no suministrado"
        });
    }

    const decodificar = jwt.verify(token, config.secret);
    req.usuarioid = decodificar.id;
    next();
}

module.exports = verificartoken;