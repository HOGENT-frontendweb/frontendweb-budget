import { useState, useMemo, useCallback } from 'react';
import TransactionsTable from '../../components/transactions/TransactionsTable';
import AsyncData from '../../components/AsyncData';
import useSWR from 'swr';
import { getAll, deleteById } from '../../api';
import useSWRMutation from 'swr/mutation';
import { Link } from 'react-router';

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

  const handleDeleteTransaction = useCallback(
    async (id) => {
      await deleteTransaction(id);
      alert('Transaction is removed');
    },
    [deleteTransaction],
  );

  return (
    <>
      <h1>Transactions</h1>
      <div className='flex justify-between mb-3 gap-2'>
        <div className="w-1/2 flex gap-2">
          <input
            type='search'
            id='search'
            className='flex-1 rounded bg-white p-1 text-gray-900 placeholder:text-gray-400 outline-1 outline-gray-300
          focus:outline-blue-600'
            placeholder='Search'
            value={text}
            onChange={(e)=> {
              setText(e.target.value);
            }}
          />
          <button type='button' className='secondary' onClick = {()=> {
            setSearch(text);
          }}>
            Search
          </button>
        </div>
        <Link to='/transactions/add' className='primary'>
          Add transaction
        </Link>
      </div>
      <div className='mt-4'>
        <AsyncData loading={isLoading} error={error||deleteError}>
          <TransactionsTable transactions={filteredTransactions} onDelete={handleDeleteTransaction} />
        </AsyncData>
      </div>
    </>
  );
}
