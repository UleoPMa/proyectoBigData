const router = require("express").Router();
const { Datos } = require("../schemas/datos");

router.delete("/", async (req, res) => {
    try{
        const { transactionId } = req.body;
        await Datos.deleteOne({id: transactionId});

        res.status(200).json({message: "Transaccion, eliminada"})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Hubo un problema al eliminar la transaccion"})
    }
});

module.exports = router;