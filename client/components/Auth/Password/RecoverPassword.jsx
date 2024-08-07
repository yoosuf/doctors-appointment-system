import React from 'react'
import useChangePassword from '@/components/Auth/hooks/password/useChangePassword'
import SnapCrackButton from '@/widget/common-button'
import { PasswordField } from '@/components/AppUi/Form/PasswordField'
import AuthLayout from '@/components/Layout/AuthLayout'

export default function RecoverPassword() {
  const { loading, formik } = useChangePassword()
  return (
    <AuthLayout
      loading={loading}
      title={'Recover password'}
      subTitle={
        'Enter the email associated with your account and we will send you instructions to reset your password'
      }>
      <form onSubmit={formik.handleSubmit} className='mt-10 font-medium'>
        <PasswordField
          id='password'
          label={'Password'}
          placeholder={'Pasword'}
          required={true}
          formik={formik}
          customClass='mt-4'
        />

        <PasswordField
          id='confirm_password'
          label={'Confirm password'}
          placeholder={'Confirm password'}
          required={true}
          formik={formik}
          customClass='mt-4'
        />

        <SnapCrackButton
          type='submit'
          text='Change Password'
          className='block w-full p-2 mt-8 text-center text-black transition rounded-md bg-yellowBg hover:bg-yellow-400'
          renderLoader={loading}
        />
      </form>
    </AuthLayout>
  )
}
