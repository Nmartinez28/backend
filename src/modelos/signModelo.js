const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const signModelo = new Schema ({
    nombre: {
        type: String,
        required: true,
    },  
    user: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },    
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Usuarios registrados", signModelo)