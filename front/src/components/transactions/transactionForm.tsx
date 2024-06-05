import React, { useState } from "react";
import { Transaction } from "../../types/types";
import { useAuth } from "../../autenticacion/AuthProvider";
import { API_URL } from "../../autenticacion/constantes";
import "../../index.css"

const TransactionForm: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const auth = useAuth();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTransaction: Transaction = {
      id: window.crypto.randomUUID(),
      description,
      amount: +amount,
      user: auth.getUser()?.nombreUsuario ?? ""
    };
    try {
      const response = await fetch(`${API_URL}/principal`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTransaction)
      });

      if (response.ok){
        console.log("Transaccion exitosa")
      } else{
        console.log("Error al enviar la transaccion")
      }
    }
    catch (error){
      console.error("Error de red:" , error)
    }
  };

  return (
    <div id="formulario">
      <div>
        <h2>Ingresa una transaccion:</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Ingresa una descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            step="0.01"
            placeholder="00.00"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
          <button type="submit">Añadir transacción</button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;

