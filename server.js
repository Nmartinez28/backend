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
                return res.send({ msg: "Usuario logueado", url: "/listado-ordenes", estado: "ok" })
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
                return res.send({ msg: "¡Lista cargada exitosamente!", estado: "ok", data: lista })
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

app.post("/actualizar-ordenes/consultar", (req, res) => {
    const {id} = req.body
    console.log(id);
    Listado_orden.find({_id:id}, (error, orden) => {
        if (error) {
           console.log(error);
            return res.send({ msg: "¡Error en la consulta!", estado: "error" })
        } else {
            if (orden !== null) {
                console.log(orden);
                return res.send({ msg: "ok", estado: "ok", data: orden})
            } else {
                return res.send({ msg: "¡Producto no encontrado!", estado: "error" })
            }
        }
    })
})

app.post("/actualizar-ordenes/actualizar", (req, res) => {
    const { nombre, cédula, teléfono, fecha, tiempo, estado, largo, ancho, altura, peso, ciudad_recogida, dirección_recogida, ciudad_entrega, dirección_entrega } = req.body
    Registrar_orden.updateOne({ cédula }
        , {
            $set:
            {
                nombre: nombre,
                cédula: cédula,
                teléfono: teléfono,
                fecha: fecha,
                tiempo: tiempo,
                estado: estado,
                largo:largo,
                ancho: ancho,
                altura: altura,
                peso: peso,
                ciudad_recogida: ciudad_recogida,
                dirección_recogida: dirección_recogida,
                ciudad_entrega: ciudad_entrega,
                dirección_entrega: dirección_entrega,
            }
        })
        .exec(
            (error, res) => {
                if (!error) {
                    if (res.modifiedCount > 0)
                        return res.send({ msg: "¡Producto actualizado!", estado: "ok", url:"/listado-ordenes" });
                    return res.send({ msg: "¡Error!: Producto NO actualizado", estado: "error" });
                }
                return res.send({ msg: "¡Error al actualizar!", estado: "error" });
            }
        );
})

const DB = ""
mongoose.connect(DB)
.then (res => console.log ("Conectado a la base de datos"))
.catch(err => console.log(err))

mongoose.connection.on("open", _ => {
    console.log("Se ha conectado a la base de datos", DB);
})

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});