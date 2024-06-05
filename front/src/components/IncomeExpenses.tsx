import React, { useEffect, useState } from 'react';
import { Transaction } from "../types/types";
import { API_URL } from '../autenticacion/constantes';
import { useAuth } from '../autenticacion/AuthProvider';

const IncomeExpenses: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const auth = useAuth();
  const usuario = auth.getUser()?.nombreUsuario;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${API_URL}/inicio`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
          body: JSON.stringify({ usuario }),
        });
        if (response.ok) {
          const transactionData: Transaction[] = await response.json();
          setTransactions(transactionData);
        } else {
          throw new Error("Error al obtener las transacciones..")
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, [transactions]); 

  useEffect(() => {
    // Calcula ingresos, gastos y balance total
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((transaction: Transaction) => {
      if (transaction.amount > 0) {
        totalIncome += transaction.amount;
      } else {
        totalExpenses += transaction.amount;
      }
    });

    setIncome(totalIncome);
    setExpenses(totalExpenses);
    setBalance(totalIncome + totalExpenses);
  }, [transactions]);

  return (
    <div>
      <div>
        <h4>Ingresos:</h4>
        <h2>{income}</h2>
      </div>
      <div>
        <h4>Gastos:</h4>
        <h2>{expenses*-1}</h2>
      </div>
      <div>
        <h4>Balance:</h4>
        <h2>{balance}</h2>
      </div>
    </div>
  );
};

export default IncomeExpenses;
