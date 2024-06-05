import React from 'react';
import { useGlobalContext } from "../context/global_context";

const Balance: React.FC = () => {
  const { state } = useGlobalContext();
  const { transactions } = state;

  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0);

  return (
    <div>
      <h3>Tu balance:</h3>
      <h1>${total}</h1>
    </div>
  );
};

export default Balance;
