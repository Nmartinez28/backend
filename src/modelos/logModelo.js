const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const logSchema = new Schema({
    user: {
        type: "string",
        unique: true,
        required: true,
    },
    password: {
        type: "string",
        required: true
    },
});

module.exports = mongoose.model("Usuarios", logSchema)