const {Schema, model} = require('mongoose');

const useresquema =  new Schema({
    username: String,
    email: String,
    password: String
});

module.exports = model('user', useresquema);