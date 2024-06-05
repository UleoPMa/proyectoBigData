import { State, Action } from "../types/types";

const AppReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload),
      };
    default:
      return state;
  }
};

export default AppReducer;
