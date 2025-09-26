import Transaction from './components/transactions/Transaction';
import PlacesList from './components/places/PlacesList';
import { TRANSACTION_DATA } from './api/mock_data';

function App() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">
        Budget App
      </h1>
      {TRANSACTION_DATA.map((t) => (<Transaction {...t} key={t.id} />))}
      <PlacesList />
    </div>);
}

export default App;
