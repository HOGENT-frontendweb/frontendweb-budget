// src/pages/transactions/AddOrEditTransaction.jsx
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import TransactionForm from '../../components/transactions/TransactionForm'; // 
import AsyncData from '../../components/AsyncData';
import { useParams } from 'react-router'; 
import { getAll, save, getById } from '../../api';

export default function AddOrEditTransaction() {
  const { id } = useParams(); 

  const {
    data: places = [],
    error: placesError,
    isLoading: placesLoading,
  } = useSWR('places', getAll); 

  const { trigger: saveTransaction, error: saveError } = useSWRMutation(
    'transactions',
    save,
  );

  const {
    data: transaction,
    error: transactionError,
    isLoading: transactionLoading,
  } = useSWR(id ? `transactions/${id}` : null, getById); 

  return (

    <div className='w-full max-w-sm'>
      <h1>Add transaction</h1>
      <AsyncData
        error={transactionError || placesError || saveError}
        loading={transactionLoading || placesLoading}
      >
        <TransactionForm
          places={places}
          transaction={transaction}
          saveTransaction={saveTransaction}
        />
      </AsyncData>
    </div>
  
  );
}
