// src/pages/Login.jsx
import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import LabelInput from '../components/LabelInput';
import { useAuth } from '../contexts/auth';
import Error from '../components/Error';

const validationRules = {
  email: {
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
  },
};

export default function Login() {
  const { error, loading, login } = useAuth(); 
  const navigate = useNavigate();
  const { search } = useLocation();

  const methods = useForm({
    defaultValues: {
      email: 'thomas.aelbrecht@hogent.be',
      password: '12345678',
    },
  });
  const { handleSubmit, reset } = methods; 

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleLogin = useCallback(
    async ({ email, password }) => {
      const loggedIn = await login(email, password);
      if (loggedIn) {
        const params = new URLSearchParams(search);
        navigate({
          pathname: params.get('redirect') || '/',
          replace: true,
        });
      }
    },
    [login, navigate, search], 
  );

  return (
    <FormProvider {...methods}>
      <div className='w-full max-w-md'>
        <form
          className='d-flex flex-column'
          onSubmit={handleSubmit(handleLogin)}
        >
          <h1>Sign in</h1>
          <Error error={error} /> 
          <LabelInput
            label='email'
            type='text'
            name='email'
            placeholder='your@email.com'
            validationRules={validationRules.email}
            data-cy='email_input'
          />
          <LabelInput
            label='password'
            type='password'
            placeholder='password'
            name='password'
            validationRules={validationRules.password}
            data-cy='password_input'
          />
          <div className='flex justify-end'>
            <button
              type='submit'
              className='primary'
              disabled={loading}
              data-cy='submit_btn'
            >
              Sign in
            </button>
            <button
              type='button'
              className='secondary ml-2'
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
