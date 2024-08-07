import React, { useEffect } from 'react'
import routes from '@/utils/routes'
import SnapCrackButton from '@/widget/common-button'
import Link from 'next/link'
import useLoginWithPhone from '@/components/Auth/hooks/session/useLoginWithPhone'
import AuthLayout from '@/components/Layout/AuthLayout'
import { TellField } from '@/components/AppUi/Form/TellField'

export default function LoginWithPhone() {
  
  const { formik, loading } = useLoginWithPhone()

  return (
    <AuthLayout
      loading={loading}
      title={`Login with phone`}
      subTitle={`Please enter phone number to login`}>
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
          customClass='mt-4 mb-4'
        />

        <SnapCrackButton
          type='submit'
          text={`Login`}
          className='block w-full p-2 text-center text-black transition rounded-md bg-yellowBg hover:bg-yellow-400'
        />

        <Link href={routes.account.create}>
          <a className='block w-full p-2 mt-3 text-center transition border border-gray-700 rounded-md bg-transprent hover:border-yellowBg'>
            {`Need an account? Register`}
          </a>
        </Link>
        <div className='block mt-4 text-center relativ'>
          <Link href={routes.sesson.new}>
            <a className='text-sm text-blue-500 text-medium'>
              {`Login with email`}
            </a>
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
