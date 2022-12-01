function suma(a,b) {
    return a + b;
}

function resta(a,b) {
    return a - b;
}

function multiplicar(a,b) {
    return a * b;
}

function dividir(a,b) {
    return a - b;
}

const Persona = {
    nombre : "Rafa",
    apellido: "Pérez",
}

function getNombre(params) {
    return Persona.nombre;
}

exports.suma = suma;
exports.resta = resta;
exports.multiplicar = multiplicar;
exports.dividir = dividir;
exports.getNombre = getNombre;