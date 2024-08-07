import React from 'react'
import useSignup from '@/components/Auth/hooks/register/useSignup'
import routes from '@/utils/routes'
import Link from 'next/link'
import { InputField } from '@/components/AppUi/Form/InputField'
import { PasswordField } from '@/components/AppUi/Form/PasswordField'
import { TellField } from '@/components/AppUi/Form/TellField'
import { Button } from '@/components/AppUi/Form/Button'
import SnapCrackContext from '@/utils/context'
import Checkbox from '@/components/AppUi/Form/Checbbox'

export default function Register () {
  const { formik } = useSignup()

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='mt-4 font-medium'
      autoComplete='none'>
      <InputField
        id='email'
        label={'Email Address'}
        placeholder={'Email address'}
        required={true}
        formik={formik}
      />

      <TellField
        id='phone'
        label={'Phone Number'}
        placeholder={'Phone Number'}
        required={true}
        formik={formik}
        customClass='mt-4'
      />

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
        label={'Confirm Password'}
        placeholder={'Confirm password'}
        required={true}
        formik={formik}
        customClass='mt-4'
      />

      <div className='flex items-center justify-between mt-5 mb-5 form-group'>
        <div className='flex items-center'>
          <input
            type='checkbox'
            id='remember'
            className='w-4 h-4 cursor-pointer'
            checked={formik.values.acceptTerms}
            onChange={e =>
              formik.setFieldValue('acceptTerms', e.target.checked)
            }
          />
          <label
            htmlFor='remember'
            className='ml-3 text-sm font-medium text-gray-500'>
            I agree to the
            <a
              href='https://snapcrack.com/terms-and-conditions'
              target='_blank'
              className='ml-1 text-sm text-blue-500 text-medium'>
              Terms & Conditions
            </a>
          </label>
        </div>
      </div>
      {formik.errors.acceptTerms && formik.touched.acceptTerms ? (
        <div className='relative pt-1 pl-1 text-xs text-redAlert'>
          {formik.errors.acceptTerms}
        </div>
      ) : null}

      <div className={`mb-4`}>
        <Button
          kind={'primary'}
          type='submit'
          text={formik.isSubmitting ? 'Please wait...' : 'Register'}
          isDisabled={formik.isSubmitting || !formik.dirty}
          isLoading={formik.isSubmitting}
        />
      </div>

      <Link href={routes.sesson.new}>
        <a className='block w-full p-2 mt-3 text-center transition border border-gray-700 rounded-md bg-transprent hover:border-yellowBg'>
          {`Have an account?  Login`}
        </a>
      </Link>
    </form>
  )
}
