import React, { useEffect, useState } from 'react';
import { Transaction } from "../types/types";
import { API_URL } from '../autenticacion/constantes';
import { useAuth } from '../autenticacion/AuthProvider';
import { VictoryPie, VictoryLabel } from 'victory';
import "../index.css"

const BalanceChart: React.FC = () => {
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
    <div id='contenedorChart'>
        <VictoryPie
        colorScale={["#e74c3c","#2ecc71"]}
        data={[
            {x: "Gastos",y: expenses*-1},
            {x: "Ganancias", y: income}
        ]}
        labelComponent={<VictoryLabel
        style={{fill:"white"}}
        />}
        />
    </div>
  );
};

export default BalanceChart;
