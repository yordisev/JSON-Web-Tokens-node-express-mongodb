const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const useresquema = new Schema({
    username: String,
    email: String,
    password: String
});

useresquema.methods.encriptarpassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

useresquema.methods.validatepassword = function (password) {
    return bcrypt.compare(password, this.password);
}

module.exports = model('user', useresquema);