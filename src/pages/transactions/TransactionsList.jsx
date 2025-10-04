// src/components/transactions/TransactionList.jsx
import { useState, useMemo } from 'react';
import TransactionTable from '../../components/transactions/TransactionTable';
import { TRANSACTION_DATA } from '../../api/mock_data';

export default function TransactionList() {
  const [text, setText]=useState('');
  const [search, setSearch] = useState('');

  const filteredTransactions = useMemo(()=> TRANSACTION_DATA.filter((t) => {
    return t.place.name.toLowerCase().includes(search.toLowerCase());
  }), [search]);

  return (
    <>
      <h1>Transactions</h1>
      <div className='flex mb-3 w-1/2 gap-2 mx-4'>
        <input
          type='search'
          id='search'
          className='rounded grow-1 bg-white p-1 text-gray-900 placeholder:text-gray-400 outline-1 outline-gray-300
          focus:outline-gray-600'
          placeholder='Search'
          value={text}
          onChange={(e)=> {
            setText(e.target.value);
          }}
        />
        <button type='button' className='py-2 px-2.5 rounded-md text-blue-600 border border-blue-600' onClick = {()=> {
          setSearch(text);
        }}>
          Search
        </button>
      </div>
      <TransactionTable transactions={filteredTransactions}/>
    </>
  );
}
