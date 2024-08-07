import React from 'react'
import ServiceHeader from '@/components/Layout/Header/ServiceHeader'
import Link from 'next/link'
import routes from '@/utils/routes'
import useRefferalInfo from '@/components/Customer/Onboard/hooks/useReferralInfo'
import { InputField } from '@/components/AppUi/Form/InputField'
import { Button } from '@/components/AppUi/Form/Button'

const RefferalInformation = user => {
  const { formik, aboutUs, refferalInfo, handleChange } = useRefferalInfo({
    userData: user,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='relative'>
        <div className='flex flex-col h-screen overflow-y-auto registration-form-main'>
          <ServiceHeader />
          <div className='w-full max-w-3xl p-5 mx-auto sm:p-9 sm:pb-10'>
            <div className='reg-form'>
              <div className='all-steps'>
                <div className='flex items-center justify-between gap-3'>
                  <h3 className='text-xl font-medium'>Onboarding</h3>
                  <p className='text-sm text-gray-400'>STEP 2/5</p>
                </div>
                <div className='grid w-full h-1 grid-cols-8 mt-2 mb-6 rounded-full bg-grayMid'>
                  <div className='h-full col-span-2 rounded-full bg-yellowBg'></div>
                </div>
              </div>
              <h3 className='mb-2 text-2xl font-semibold text-white'>
                Referral information
              </h3>
              <p className='max-w-xl mb-4 text-sm text-gray-400'>
                How did you hear about us?
              </p>
              <div className='pb-5 mt-5 mb-5 border-b border-gray-600'>
                <InputField
                  id='refferalName'
                  label={'Referral Information'}
                  placeholder={'Who referred you (name)?'}
                  required={false}
                  formik={formik}
                />
              </div>
              <div className='pb-5 mb-5 border-b border-gray-600'>
                <p className='inline-block mb-5 text-sm text-gray-400'>
                  Did you see one of the following media marketing?
                </p>
                <div className='grid gap-5'>
                  {Array.from(refferalInfo).map(
                    (data, index) => (
                    <label
                    key={index}
                      htmlFor={data.value}
                      className='flex flex-row-reverse items-center justify-between round-checkbox '>
                      <input
                        id={data.value}
                        type='checkbox'
                        name='aboutUs'
                        value={data.value}
                        onChange={e => handleChange(e)}
                        checked={aboutUs?.includes(data.value)}
                      />
                      <span className='checkmark'></span>
                      <div className='inline-block text-sm text-gray-400 label'>
                        {data.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className='flex items-center gap-6 pt-5 mt-5'>

              <Link href={routes.onBoarding}>
                <span className='block w-full p-2 text-sm text-center text-gray-200 transition bg-transparent border border-gray-700 rounded-md cursor-pointer focus:outline-none hover:bg-gray-800 hover:border-gray-400'>

                  {/* flex items-center justify-center w-full py-2 border border-gray-400 rounded-lg cursor-pointer */}


                  
                  Back
                </span>
              </Link>

              <Button
                kind={'primary'}
                type='submit'
                text={formik.isSubmitting ? 'Please wait...' : 'Next'}
                isDisabled={formik.isSubmitting}
                isLoading={formik.isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default RefferalInformation
