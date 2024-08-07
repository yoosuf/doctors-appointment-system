import React, { useState } from 'react'
import Link from 'next/link'
import routes from '@/utils/routes'
import SnapCrackButton from '@/widget/common-button'
import { TellField } from '@/components/AppUi/Form/TellField'
import AuthLayout from '@/components/Layout/AuthLayout'
import useMobileResetPassword from '@/components/Auth/hooks/password/useMobileResetPassword'

export default function ForgotPassword() {
  const { loading, formik } = useMobileResetPassword()

  return (
    <AuthLayout
      loading={loading}
      title={'Recover password'}
      subTitle={
        'Enter the phone number associated with your account and we will send you instructions to reset your password'
      }>
      <form
        onSubmit={formik.handleSubmit}
        className='mt-10 font-medium'
        autoComplete='none'>
        <TellField
          id='phone'
          label={'Phone Number'}
          placeholder={'Phone Number'}
          required={true}
          formik={formik}
          customClass='mt-4'
        />

        <div className='mt-6'>
          <SnapCrackButton
            type='submit'
            text='Submit'
            className='block w-full p-2 text-center text-black transition rounded-md bg-yellowBg hover:bg-yellow-400'
            renderLoader={loading}
          />

          <Link href={routes.sesson.phone}>
            <a className='block w-full p-2 mt-3 text-center transition border border-gray-700 rounded-md bg-transprent hover:border-yellowBg'>
              {`Remember the password ? Login`}
            </a>
          </Link>

          <div className='block mt-4 text-center relativ'>
            <Link href={routes.password.recover}>
              <a className='text-sm text-blue-500 text-medium'>
                {`Forgot password with email`}
              </a>
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  )
}
