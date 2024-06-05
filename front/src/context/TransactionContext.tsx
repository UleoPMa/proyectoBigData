// TransactionContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definir las interfaces necesarias
interface Transaction {
  id: string;
  description: string;
  amount: number;
  user: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
}

interface TransactionProviderProps {
  children: ReactNode; // Tipar children como ReactNode
}

// Crear el contexto
const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Hook para consumir el contexto
export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactionContext must be used within a TransactionProvider');
  }
  return context;
};

// Proveedor de contexto
export const TransactionProvider: React.FC<TransactionProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
