import PlacesList from './components/places/PlacesList';
import TransactionList from './components/transactions/TransactionsList';

function App() {
  return (
    <div className="bg-white text-gray-900">
      <TransactionList />
      <PlacesList />
    </div>);
}

export default App;
