const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

const verificadordetoken = require('./verificartoken');

router.post('/signup', async(req, res, next) => { //router para acceder a las peticiones por la url
    const { username, email, password } = req.body;
    const user = new User({ // guardamos en un objeto lo que vamos a guardar en la base de datos
        username: username,
        email: email,
        password: password
    });

    user.password = await user.encriptarpassword(user.password); //para encriptar la contraseña
    await user.save(); // para guardar en la base de datos de mongo db
const token =  jwt.sign({id: user._id}, config.secret, {  // se genera el token que se le suministra al usuario
    expiresIn: 60 * 60 * 24
})

    console.log(user);
    res.json({ auth:true, token:token})
})

router.get('/me', verificadordetoken, async (req, res, next) => {
   const user = await User.findById(req.usuarioid, {password: 0 })
   if (!user){
       return res.status(404).send('Usuario no registrado');
   }

    res.json(user);
})

router.get('/dashboard', verificadordetoken, async (req, res) => {
     res.json('dashboard');
 })


router.post('/signin', async (req, res, next) => {
    const {email, password} = req.body
    const user = await User.findOne({email:email});
    if(!user){
        return res.status(404).send("El imail no existe")
    }

const passwordvalidada =  await user.validatepassword(password);
if (!passwordvalidada){
    return res.status(401).json({auth: false, token:null});
}

const token =  jwt.sign({id:user._id}, config.secret, {
    expiresIn: 60 * 60 * 24
});

    res.json({auth : true, token});
})


module.exports = router