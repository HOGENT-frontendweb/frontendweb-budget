import { IoTrashOutline, IoPencilOutline } from 'react-icons/io5';
import { Link } from 'react-router';
import { memo } from 'react';

const dateFormat = new Intl.DateTimeFormat('nl-BE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const amountFormat = new Intl.NumberFormat('nl-BE', {
  currency: 'EUR',
  style: 'currency',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const TransactionMemoized = memo(function Transaction({ id, date, amount, user, place, onDelete }) {
  const handleDelete = () => {
    onDelete(id);
  };
  return (
    <tr className="border-b border-gray-200">
      <td className="py-2">{dateFormat.format(new Date(date))}</td>
      <td className="py-2">{user.name}</td>
      <td className="py-2">{place.name}</td>
      <td className='text-end py-2'>{amountFormat.format(amount)}</td>
      <td className="py-2 flex justify-end"> 
        {onDelete ?
          <>
            <button className='py-2 px-2.5 rounded-md bg-blue-600' onClick={handleDelete}>
              <IoTrashOutline />
            </button>
            <Link to={`/transactions/edit/${id}`} className='mx-2 py-2 px-2.5 rounded-md bg-blue-600'>
              <IoPencilOutline />
            </Link>
          </>:''}
      </td>
    </tr>
  );
});

export default TransactionMemoized;
