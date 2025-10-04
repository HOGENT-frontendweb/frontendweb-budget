import { useState, useMemo } from 'react';
import TransactionsTable from '../../components/transactions/TransactionsTable';
import AsyncData from '../../components/AsyncData';
import useSWR from 'swr'; 
import { getAll, deleteById } from '../../api';
import useSWRMutation from 'swr/mutation';

export default function TransactionList() {
 
  const [text, setText]=useState('');
  const [search, setSearch] = useState('');
  
  const {
    data: transactions = [],
    isLoading,
    error,
  } = useSWR('transactions', getAll); 

  const { trigger: deleteTransaction, error: deleteError } = useSWRMutation(
    'transactions',
    deleteById,
  );
  
  const filteredTransactions = useMemo(
    () =>
      transactions.filter((t) => {
        return t.place.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search, transactions],
  );

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
      <div className='mt-4'>
        <AsyncData loading={isLoading} error={error||deleteError}>
          <TransactionsTable transactions={filteredTransactions} onDelete={deleteTransaction} />
        </AsyncData>
      </div>
    </>
  );
}
