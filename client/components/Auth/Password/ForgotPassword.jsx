import React from 'react'
import Link from 'next/link'
import routes from '@/utils/routes'
import useForgotPassword from '@/components/Auth/hooks/password/useForgotPassword'
import AuthLayout from '@/components/Layout/AuthLayout'
import { Button } from '@/components/AppUi/Form/Button'
import { InputField } from '@/components/AppUi/Form/InputField'

export default function ForgotPassword () {
  const {
    loading,
    formTitle,
    formDescription,
    formik,
    successState,
    countdown,
  } = useForgotPassword()

  return (
    <>
      <AuthLayout
        loading={loading}
        title={formTitle}
        subTitle={formDescription}>
        <form onSubmit={formik.handleSubmit} className='mt-10 font-medium'>
          {successState ? (
            <>
              <div className='mx-auto mt-6'>
                {countdown === 0 ? (
                  <Button
                    type='submit'
                    text={
                      formik.isSubmitting ? 'Please wait...' : 'Re try again'
                    }
                    className='block w-full p-2 mt-5 text-center text-black transition rounded-md focus:outline-none bg-yellowBg hover:bg-yellow-400'
                    isDisabled={formik.isSubmitting}
                    isLoading={formik.isSubmitting}
                  />
                ) : (
                  <Button
                    type='button'
                    text={`You can re try again in ${countdown} seconds`}
                    className='block w-full p-2 mt-5 text-center text-black transition rounded-md focus:outline-none bg-yellowBg hover:bg-yellow-400'
                  />
                )}

                <Link href={routes.sesson.new}>
                  <a className='block w-full p-2 mt-3 text-center transition border border-gray-700 rounded-md bg-transprent hover:border-yellowBg'>
                    {`Go back to Login`}
                  </a>
                </Link>
              </div>
            </>
          ) : (
            <>
              <InputField
                id='email'
                label={'Email Address'}
                placeholder={'Email address'}
                required={true}
                formik={formik}
              />

              <div className='mt-6 mb-4'>
                <Button
                  kind={`primary`}
                  type='submit'
                  text={
                    formik.isSubmitting
                      ? 'Please wait...'
                      : 'Request for password reset'
                  }
                  isDisabled={formik.isSubmitting || !formik.dirty}
                  isLoading={formik.isSubmitting}
                />
              </div>

              <Link href={routes.sesson.new}>
                <a className='block border border-gray-700 w-full p-2 text-sm text-center text-gray-200 transition rounded-md focus:outline-none bg-transparent hover:border-yellow-400 '>
                  {`Remember the password? Login`}
                </a>
              </Link>

              <div className='block text-center mt-4'>
                <Link href={routes.password.recoverPhone}>
                  <a className='text-sm text-blue-500 text-medium'>
                    {`Reset password with phone`}
                  </a>
                </Link>
              </div>
            </>
          )}
        </form>
      </AuthLayout>
    </>
  )
}
