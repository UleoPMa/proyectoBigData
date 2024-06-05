// GlobalContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import AppReducer from "./AppReducer";
import { State, Action, Transaction } from "../types/types";

const initialState: State = {
  transactions: []
};

interface ContextProps {
  state: State;
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
}

const Context = createContext<ContextProps | undefined>(undefined);

export const useGlobalContext = (): ContextProps => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useGlobalContext debe ser usado dentro de un GlobalProvider");
  }
  return context;
};

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(AppReducer, initialState);

  const addTransaction = (transaction: Transaction) => {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  };

  const deleteTransaction = (id: string) => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  };

  return (
    <Context.Provider
      value={{
        state,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </Context.Provider>
  );
};

