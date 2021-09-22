const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/basedatos', {
    useNewUrlparser: true
})

.then(db => console.log('Conectado a la base de datos'))