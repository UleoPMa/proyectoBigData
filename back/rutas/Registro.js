const { jsonResponse } = require("../lib/jsonResponse");
const router = require("express").Router();
const user = require("../schemas/user");

router.post("/", async (req, res) => {
    const {nombre,aPaterno,aMaterno,nombreUsuario,correo,contrasenia,cContrasenia} = req.body;

    if(!!!nombre || !!!aPaterno || !!!aMaterno || !!!nombreUsuario || !!!correo || !!!contrasenia || !!!cContrasenia) {
        return res.status(400).json(
            jsonResponse(400, {
                error: "Fields are required",
            })
        );
    }

    try{

        const newUser = new user();
        const exists = await newUser.nombreUsuarioExist(nombreUsuario);

        if(exists){
            return res.status(400).json(
                jsonResponse(400, {
                    error: "Username already exist!!",
                })
            );
        }


        const newUser1 = new user({nombre,aPaterno,aMaterno,nombreUsuario,correo,contrasenia});

        await newUser1.save();

        res.status(200).json(jsonResponse(200, { message: "User created successfully!!" }));
    } catch(error){
        res.status(500).json(
            jsonResponse(500, {
                error: "Username already exist!!!",
            })
        );
    }

});

module.exports = router;
