import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const validationRules = {
  userId: {
    required: 'User is required',
    min: { value: 1, message: 'UserId must be minimum 1' },
  },
  date: {
    required: 'Date is required',
    valueAsDate: true,
    validate: (value) => {
      if (value >new Date()) return 'Date cannot be in the future';
      return null;
    },
  },
  placeId: {
    valueAsNumber: true,
    required: 'Place is required',
  },
  amount: {
    required: 'Amount is required',
    valueAsNumber: true,
    validate: (value) => {
      if (value === 0) return '0 is not a valid amount';
      return null;
    },
  },
};

const EMPTY_TRANSACTION = {
  id: undefined,
  amount: undefined,
  date: new Date(),
  user: {
    id: '',
    name: '',
  },
  place: {
    id: '',
    name: '',
  },
};

const toDateInputString = (date) => {
  // ISO String without the trailing 'Z' is fine 🙄
  // (toISOString returns something like 2020-12-05T14:15:74Z,
  // datetime-local HTML5 input elements expect 2020-12-05T14:15:74, without the (timezone) Z)
  //
  // the best thing about standards is that we have so many to chose from!
  if (!date) return null;
  if (typeof date !== Object) {
    date = new Date(date);
  }
  let asString = date.toISOString();
  return asString.substring(0, asString.indexOf('T'));
};

export default function TransactionForm({places = [], transaction = EMPTY_TRANSACTION, saveTransaction}) { 
  const navigate = useNavigate(); 

  const { register, handleSubmit, formState: { errors, isValid } } = useForm( {
    mode: 'onBlur',
    defaultValues: {
      date: toDateInputString(transaction?.date),
      placeId: transaction?.place.id,
      amount: transaction?.amount,
      userId: transaction?.user.id,
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
    if (!isValid) return;

    await saveTransaction({
      id: transaction?.id,
      ...values,
    }, {
      throwOnError: false,
      onSuccess: () => navigate('/transactions'),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-3'>
        <label htmlFor='userId' className="block text-sm/6 font-medium text-gray-900">
          User id
        </label>
        <input
          {...register('userId', validationRules.userId)}
          id='userId'
          name='userId'
          type='number'
          className='rounded bg-white p-1 text-gray-900 placeholder:text-gray-400 outline-1 outline-gray-300
          focus:outline-blue-600 w-full'
          placeholder='userid'
          required
        />
        {errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId.message}</p> }
      </div>
      <div className='mb-3'>
        <label htmlFor='date' className="block text-sm/6 font-medium text-gray-900">
          Date
        </label>
        <input
          {...register('date', validationRules.date)}
          id='date'
          name='date'
          type='date'
          className='rounded grow-1 bg-white p-1 text-gray-900 placeholder:text-gray-400 outline-1 outline-gray-300
          focus:outline-blue-600 w-full'
          placeholder='date'
        />
        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p> }
      </div>

      <div className='mb-3'>
        <label htmlFor='places' className="block text-sm/6 font-medium text-gray-900">
          Place
        </label>
        <select 
          {...register('placeId', validationRules.placeId)} 
          id='placeId' 
          name='placeId' 
          className="w-full appearance-none          
           rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 
           outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 
           focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" 
          required>
          <option value='' disabled>
            -- Select a place --
          </option>
          {places.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        {errors.placeId && <p className="text-red-500 text-sm mt-1">{errors.placeId.message}</p> }
      </div>

      <div className='mb-3'>
        <label htmlFor='amount' className="block text-sm/6 font-medium text-gray-900">
          Amount
        </label>
        <input
          {...register('amount', validationRules.amount)}
          id='amount'
          name='amount'
          type='number'
          className='rounded grow-1 bg-white p-1 text-gray-900 placeholder:text-gray-400 outline-1 outline-gray-300
          focus:outline-blue-600 w-full'
          required
        />
        {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p> }
      </div>

      <div className='flex justify-end'>
        <button type='submit' className='py-2 px-2.5 rounded-md text-white bg-blue-600'>
          {transaction?.id
            ? 'Save transaction'
            : 'Add transaction'}
        </button>
      </div>
    </form>
  );
}
