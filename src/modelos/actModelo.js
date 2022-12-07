const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const actSchema = new Schema({
    nombre: {
        type: "string",
        unique: true,
        required: true
    },
    cédula: {
        type: "number",
        required: true
    },
    teléfono: {
        type: "number",
        required: true
    },
    fecha: {
        type: "string",
        required: true
    },
    tiempo: {
        type: "string",
        required: true
    },
    estado: {
        type: "string",
        required: true
    },
    largo: {
        type: "number",
        required: true
    },
    ancho: {
        type: "number",
        required: true
    },
    altura: {
        type: "number",
        required: true
    },
    peso: {
        type: "number",
        required: true
    },
    ciudad_recogida: {
        type: "string",
        required: true
    },
    direccion_recogida: {
        type: "string",
        required: true
    },
    ciudad_entrega: {
        type: "string",
        required: true
    },
    direccion_entrega: {
        type: "string",
        required: true
    },
});

module.exports = mongoose.model("Ordenes actualizadas", actSchema)