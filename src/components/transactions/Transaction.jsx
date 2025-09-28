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

export default function Transaction({ id, date, amount, user, place }) {
  return (
    <tr className="border-b border-gray-200">
      <td className="py-2">{dateFormat.format(new Date(date))}</td>
      <td className="py-2">{user.name}</td>
      <td className="py-2">{place.name}</td>
      <td className='text-end py-2'>{amountFormat.format(amount)}</td>
    </tr>
  );
}
