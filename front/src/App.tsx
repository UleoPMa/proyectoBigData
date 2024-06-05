import { GlobalProvider } from "./context/global_context";
import TransactionForm from "./components/transactions/transactionForm";
import TransactionList from "./components/transactions/TransactionList";
import IncomeExpenses from "./components/IncomeExpenses";
import BalanceChart from "./components/balanceChart";
import PortalLayout from "./Vista/PortalLayout";
import "./index.css"
import "react"

function App() {
  return(
    <GlobalProvider>
      <PortalLayout>
        <div id="contenedorPrincipal">
          <div>
            <h1>Control de Gastos</h1>
          </div>
          <div>
            <IncomeExpenses/>
          </div>
          <div id="contenedorTransactions">
            <div id="contenedorFormularioTransactions">
              <TransactionForm/>
            </div>
            <div id="contenedorListaTransactions">
              <div id="contenedorChartIni">
                <BalanceChart/>
              </div>
              <div id="contenedorListaIni">
                <TransactionList/>
              </div>
            </div>
          </div>
        </div>
      </PortalLayout>
    </GlobalProvider>
  )
}

export default App