import { useForm, FormProvider } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import LabelInput from '../LabelInput';
import SelectList from '../SelectList';

const validationRules = {
  userId: {
    required: 'User is required',
    min: { value: 1, message: 'UserId must be minimum 1' },
    valueAsNumber:true,
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

  const methods = useForm( {
    mode: 'onBlur',
    defaultValues: {
      date: toDateInputString(transaction?.date),
      placeId: transaction?.place.id,
      amount: transaction?.amount,
      userId: transaction?.user.id,
    },
  });

  const {handleSubmit, formState:{isValid, isSubmitting}} = methods;
  
  const onSubmit = async (values) => {
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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelInput
          label='User Id'
          name='userId'
          placeholder='user id'
          type='number'
          validationRules={validationRules.userId}
        />

        <LabelInput
          label='Date'
          name='date'
          placeholder='date'
          type='date'
          validationRules={validationRules.date}
        />

        <SelectList  
          label='Place'
          name='placeId'
          placeholder='---select a place---'
          items={places}
          validationRules={validationRules.placeId} />

        <LabelInput
          label='Amount'
          name='amount'
          placeholder='amount'
          type='number'
          validationRules={validationRules.amount}
        />

        <div className='flex justify-end'>
          <button type='submit' className='primary'  disabled={isSubmitting}>
            {transaction?.id
              ? 'Save transaction'
              : 'Add transaction'}
          </button>
          <Link
            disabled={isSubmitting}
            className='secondary ml-2'
            to='/transactions'
          >
            Cancel
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}
