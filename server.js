"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const crypto = require('crypto');
const app = express();
app.use(bodyParser.json());
app.use(cors())
const Login = require("./src/modelos/logModelo");
const Signup = require("./src/modelos/signModelo");
const Listado_orden = requiere("./src/modelos/listModelo")
const Registrar_orden = require("./src/modelos/regModelo");
// const Actualizar_orden = require("./src/modelos/actModelo");

app.post("/login", (req, res) => {
    // const passCifrado = crypto.createHash('sha256').update(password).digest('hex');
    // User.findOne({ usuario: username, password: passCifrado }, (error, dataUsu) => {
    const { username, password } = req.body
    console.log(req);
    Login.findOne( {username, password}, (error, dataUsu) => {
        if (error) {
            return res.send({ msg: "¡Error al loguearse!: Verifica que tu usuario o contraseña estén escritos correctamente", estado: "error" })
        } else {
            if (dataUsu !== null){
                console.log(dataUsu);
                return res.send({ url: "/listado-ordenes", estado: "ok" })
            }
        }
        return res.send({ msg: "¡Error al loguearse!: Verifica que tu usuario o contraseña estén escritos correctamente", estado: "error" })
    })
})

app.post("/signup", (req, res) => {
    const data = req.body
    console.log(data);
    const prod = new Signup(data);
    prod.save((error) => {
        if (error) {
            return res.send({ msg: "Error de registro", estado: "error" })
        }
        return res.send({ msg: "¡Registro guardado exitosamente!", estado: "ok" })
    })
})

app.post("/listado-ordenes", (req, res) => {
    Listado_orden.find({}, (error, lista) => {
        if (error) {
            console.log(error);
            return res.send({ msg: "Error en el listado", estado: "error" })
        } else {
            if (lista !== null) {
                console.log(lista);
                return res.send({ msg: "¡Lista cargada exitosamente!", estado: "ok" })
            } else {
                return res.send({ msg: "Sin listado de ordenes", estado: "error" })
            }
        }
    })
})

app.post("/registro-ordenes/guardar", (req, res) => {
    const data = req.body
    console.log(data);
    const orden = new Registrar_orden(data);
    orden.save((error) => {
        if (error) {
            console.log(error);
            return res.send({ msg: "Error al guardar el registro", estado: "error" })
        }
        return res.send({ msg: "¡Orden registrada con éxito!", url: "/listado-ordenes", estado: "ok" })
    });    
})

mongoose.connect("mongodb+srv://rperez:facil123456@cluster0.3nhnv.mongodb.net/tienda?retryWrites=true&w=majority")
    .then(res => console.log("Conectado a BD"))
    .catch(err => console.log(err))

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});