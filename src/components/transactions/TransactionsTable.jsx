// src/components/transactions/TransactionsTable.jsx
import Transaction from './Transaction';

function TransactionsTable({ transactions }) {
  if (transactions.length === 0) {
    return (
      <div className='alert alert-info'>There are no transactions yet.</div>
    );
  }

  return (
    <table className='table-auto w-full border-collapse mb-4'>
      <thead>
        <tr className="border-b-2 border-gray-300">
          <th className="text-start py-2">Date</th>
          <th className="text-start py-2">User</th>
          <th className="text-start py-2">Place</th>
          <th className='text-end py-2'>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} {...transaction} />
        ))}
      </tbody>
    </table>
  );
}

export default TransactionsTable;
