const express = require("express");
const router = express.Router();
const { Datos } = require("../schemas/datos");

// Ruta para recibir datos del formulario
router.post("/", async (req, res) => {
  try {
    const { id ,description, amount, user } = req.body;
    const newTransaction = {
      id,
      description,
      amount: parseFloat(amount),
      user,
    };

    await Datos.create(newTransaction);

    // Respuesta exitosa
    res.status(201).json({ message: "Transacción guardada correctamente" });
  } catch (error) {
    console.error("Error al procesar la transacción:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});



module.exports = router;
