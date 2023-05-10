import './App.css';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeBudget } from './components/IncomeBudget';
import { TransList } from './components/TransList';
import { AddTrans } from './components/AddTrans';

import {GlobalProvider} from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <IncomeBudget />
        <TransList />
        <AddTrans />
      </div>
    </GlobalProvider>
  );
}

export default App;
