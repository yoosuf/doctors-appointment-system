import React from 'react'
import useSignupResendVerfiyLink from '@/components/Auth/hooks/register/useSignupResendVerfiyLink'
import AuthLayout from '@/components/Layout/AuthLayout'
import Link from 'next/link'
import routes from '@/utils/routes'

export default function VerifyRegistration () {
  const { onClickResendLink, email, seconds, loading, redirectLogin } =
    useSignupResendVerfiyLink()
  return (
    <AuthLayout
      title={'Verify your registration'}
      subTitle={`We already sent link to confirm your registration to your email
    address`}>
      <form>
        <div className='max-w-xs mx-auto mt-6'>
          {seconds === 0 ? (
            <a
              onClick={onClickResendLink}
              className='block p-3 mt-3 text-center transition border border-gray-700 rounded-lg bg-transprent mx-14'>
              Reset link
            </a>
          ) : (
            <a
              onClick={onClickResendLink}
              className='block p-3 mt-3 text-center transition border border-gray-700 rounded-lg bg-transprent mx-14'>
              {`${seconds} sec`}
            </a>
          )}
        </div>

        <div className='block mt-4 text-center relativ'>
          <Link href={routes.sesson.new}>
            <a className='text-sm text-blue-500 text-medium'>{'Login'}</a>
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
