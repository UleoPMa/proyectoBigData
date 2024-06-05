const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const authenticate = require("./auth/authenticate");
const { jsonResponse } = require('./lib/jsonResponse');
const { Datos } = require('./schemas/datos');

 require("dotenv").config();

 const port = process.env.PORT || 5000;

 app.use(cors()); 
 app.use(express.json());

 async function main(){
   await mongoose.connect(process.env.URL_CONEXION_BD);
   console.log("Connected to MongoDB");
 }


 main().catch(console.error);

 
 app.use("/api/inicio",authenticate, require("./rutas/inicio"));
 app.use("/api/inicioSesion", require("./rutas/inicioSesion"));
 app.use("/api/registro", require("./rutas/Registro"));
 app.use("/api/cerrarSesion", require("./rutas/cerrarSesion"));
 app.use("/api/refrescarToken", require("./rutas/refrescarToken"));
 app.use("/api/principal", require("./rutas/principal"));
 app.use("/api/usuario", authenticate, require("./rutas/usario"));
 app.use("/api/eliminar", authenticate, require("./rutas/deleteTransaction"));
 app.use("/api/balance", authenticate, require("./rutas/balance"));

 app.get("/",(req, res) => {
    res.send("Hello world!");
 });

 app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
 });