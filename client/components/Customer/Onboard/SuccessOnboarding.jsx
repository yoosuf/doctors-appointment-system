import React from 'react'
import SnapCrackButton from '@/widget/common-button'
import ServiceHeader from '@/components/Layout/Header/ServiceHeader'
import 'react-datepicker/dist/react-datepicker.css'
import routes from '@/utils/routes'
import Router, { useRouter } from 'next/router'

const SuccessOnboarding = () => {
  const onDashboard = () => {
    return(
      Router.push(routes.dashboard)
    )
  }
  return (
    <>
      <div>
        <div className='flex flex-col h-screen overflow-y-auto registration-form-main'>
          <ServiceHeader />
          <div className="flex items-center justify-center h-full">
            <div className='w-full max-w-3xl p-5 mx-auto sm:p-9 sm:pb-10'>
            <div className='text-center reg-form'>
              <img src="../images/successful.svg" className="mx-auto mb-6" alt="" />
              <h3 className='mb-2 text-2xl font-semibold text-white'>
               You’re all set!
              </h3>
              <p className='max-w-xl mx-auto mb-4 text-sm text-gray-400'>
                Thank you for completeing onboarding and medical history. Now you can enjoy all that Snap Crack has to offer.
              </p>
            </div>
            <div className='flex items-center gap-3 pt-5 mt-5'>
              <SnapCrackButton
                onClick={() => onDashboard()}
                type='button'
                text='Go to my dashboard'
                className='px-10 py-2 mx-auto font-semibold text-black rounded-lg cursor-pointer bg-yellowBg'
              />
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SuccessOnboarding
