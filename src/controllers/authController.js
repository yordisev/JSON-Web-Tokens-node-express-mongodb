const { Router } = require('express');
const router = Router();
const User = require('../models/User');


router.post('/signup', async(req, res, next) => { //router para acceder a las peticiones por la url
    const { username, email, password } = req.body;
    // user.create({
    //     username: username,
    //     email: email,
    //     password: password
    // })

    const user = new User({ // guardamos en un objeto lo que vamos a guardar en la base de datos
        username: username,
        email: email,
        password: password
    });

    await user.save(); // para guardar en la base de datos de mongo db

    user.password = await user.encriptarpassword(user.password); //para encriptar la contraseña
    console.log(user);
    res.json({ message: 'datos insertados recibido' })


})
router.post('/signin', (req, res, next) => {
    res.json('signin');
})
router.get('/me', (req, res, next) => {
    res.json('me');
})


module.exports = router