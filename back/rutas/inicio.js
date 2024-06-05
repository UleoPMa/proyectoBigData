const router = require("express").Router();
const { Datos } = require("../schemas/datos");

router.post("/", async (req,res) => {
    try{
        const { usuario } = req.body;

        const transactions = await Datos.find({user: usuario });

        res.json(transactions);
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Error al obtener las transacciones'})
    }
})

module.exports = router;