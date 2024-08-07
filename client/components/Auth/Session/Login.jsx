import React from 'react'
import Link from 'next/link'
import useLogin from '@/components/Auth/hooks/session/useLogin'
import routes from '@/utils/routes'
import { PasswordField } from '@/components/AppUi/Form/PasswordField'
import { InputField } from '@/components/AppUi/Form/InputField'
import { Button } from '@/components/AppUi/Form/Button'

export default function Login () {
  const { formik } = useLogin()
  return (
    <form
      onSubmit={formik.handleSubmit}
      className='mt-10 font-medium'
      autoComplete='off'>
      <InputField
        id='email'
        label={'Email Address'}
        placeholder={'Email address'}
        required={true}
        formik={formik}
      />

      <PasswordField
        id='password'
        label={'Password'}
        placeholder={'Pasword'}
        required={true}
        formik={formik}
        customClass='mt-4'
      />

      <div className='flex items-center justify-between mt-5 mb-6 form-group'>
        <div className='flex items-center'>
          <input
            type='checkbox'
            id='remember'
            className='w-4 h-4 cursor-pointer'
            checked={formik.values.remember}
            onChange={e =>
              formik.setFieldValue('remember', e.target.checked)
            }
          />
          <label
            htmlFor='remember'
            className='ml-3 text-sm font-medium text-gray-500'>
            {'Remember me'}
          </label>
        </div>
        <Link href={routes.password.recover}>
          <a className='text-sm text-blue-500 text-medium'>
            {'Forgot password?'}
          </a>
        </Link>
      </div>

      <div className={`mb-4`}>
        <Button
          kind={'primary'}
          type='submit'
          text={formik.isSubmitting ? 'Please wait...' : 'Login'}
          isDisabled={formik.isSubmitting || !formik.dirty}
          isLoading={formik.isSubmitting}
        />
      </div>

      <Link href={routes.account.create}>
        <a className='block w-full p-2 text-sm text-center text-gray-200 transition bg-transparent border border-gray-700 rounded-md focus:outline-none hover:border-yellow-400 '>
          {'Need an account? Register'}
        </a>
      </Link>

      <div className='block mt-4 text-center relativ'>
        <Link href={routes.sesson.phone}>
          <a className='text-sm text-blue-500 text-medium'>
            {'Login with phone'}
          </a>
        </Link>
      </div>
    </form>
  )
}
