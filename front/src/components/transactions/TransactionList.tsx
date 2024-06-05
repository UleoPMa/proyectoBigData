import React, { useEffect, useState } from 'react';
import { Transaction } from "../../types/types";
import { API_URL } from '../../autenticacion/constantes';
import { useAuth } from '../../autenticacion/AuthProvider';
import "../../index.css"

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState([]);
  const usuario = useAuth().getUser()?.nombreUsuario;
  const auth = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      try{
        const response = await fetch(`${API_URL}/inicio`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
          body: JSON.stringify({ usuario }),
        });
        if(response.ok) {
          const transactionData = await response.json();
          setTransactions(transactionData);
        } else {
          throw new Error("Error al obtener las transacciones..")
        }
      } catch (error){
        console.error(error);
      }
    };

    const interval = setInterval(() => {
      fetchTransactions();
    }, 500);

    return () => clearInterval(interval);
  }, []); 

  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      const response = await fetch(`${API_URL}/eliminar`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: JSON.stringify({ transactionId }),
      });
      if (response.ok) {
        // Eliminar la transacción de la lista después de eliminarla del servidor
        setTransactions(transactions.filter((transaction: Transaction) => transaction.id !== transactionId));
      } else {
        throw new Error("Error al eliminar la transacción.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id='contenedorLista'>
      {transactions.map((transaction: Transaction, index:number) => (
        <div key={index} id='contenedorTransactionList'>
          <div id='transactionanddescription'>
            <p>{transaction.description}</p>
            <span>{transaction.amount}</span>
          </div>
          <div id='contenedorButton'>
            <button onClick={() => handleDeleteTransaction(transaction.id)}>Borrar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
