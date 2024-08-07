import React, { useState } from 'react'
import ToggleButton from '@/widget/ToggleButton'
import usePatientAccount from '@/components/Customer/Profile/hooks/usePatientAccount'
import SnapCrackButton from '@/widget/common-button'
import Loader from '@/widget/loader'
import { InputField } from '@/components/AppUi/Form/InputField'
import { PasswordField } from '../../AppUi/Form/PasswordField'

const PatientAccount = ({ userData }) => {
  const {
    loading,
    passwordChangeLoading,
    formik,
    active,
    setActive,
    // Password
    patient_password,
    sendEmailNotification,
    setSendEmailNotification,
  } = usePatientAccount({ userData })
  // const { data = [] } = userData.DATA
  //       const user = data?.[0]
  return (
    <>
      <div className='relative account noselect'>
        <form onSubmit={formik.handleSubmit}>
          <div className='relative grid gap-2 p-5 mt-5 account-changes md:grid-cols-12 bg-primary rounded-xl'>
            <div className='col-span-3'>
              <h4 className='font-medium'>Account</h4>
            </div>
            <div className='col-span-9'>
              <div className='pb-4 border-b border-gray-700 '>
                <div className='flex items-center justify-between'>
                  <div>
                    <h4 className='text-sm font-medium'>Account</h4>
                    <p className='text-sm text-gray-400'>
                      This user currently set active
                    </p>
                  </div>
                  <ToggleButton checked={active} setChecked={setActive} />
                </div>

                <div className='grid gap-3 sm:grid-cols-1'>
                  <InputField
                    id='email'
                    label={'Email Address'}
                    placeholder={'Email address'}
                    required={true}
                    formik={formik}
                  />
                </div>
              </div>

              <div className='flex items-center justify-end mt-5'>
                <SnapCrackButton
                  type='submit'
                  text='Save Changes'
                  className='px-2 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg sm:px-4 hover:bg-yellow-400'
                />
              </div>
            </div>
            {loading && <Loader customClass='absolute' />}
          </div>
        </form>

        <form onSubmit={patient_password.handleSubmit}>
          <div className='relative grid gap-2 p-5 mt-5 account-password md:grid-cols-12 bg-primary rounded-xl'>
            <div className='col-span-3'>
              <h4 className='font-medium'>Password</h4>
            </div>
            <div className='col-span-9'>
              <div className='pb-4 border-b border-gray-700 '>
                <PasswordField
                  id='password'
                  label={'Current Password'}
                  placeholder={'Current Password'}
                  required={true}
                  formik={patient_password}
                  customClass='mt-4'
                />

                <PasswordField
                  id='new_password'
                  label={'New password'}
                  placeholder={'New password'}
                  required={true}
                  formik={patient_password}
                  customClass='mt-4'
                />

                <PasswordField
                  id='confirm_new_password'
                  label={'Confirm new password'}
                  placeholder={'Confirm new password'}
                  required={true}
                  formik={patient_password}
                  customClass='mt-4'
                />

              
              </div>
              <div className='flex items-center justify-end mt-3 buttons'>
                <SnapCrackButton
                  type='submit'
                  text='Save Changes'
                  className='block px-2 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg sm:px-4 hover:bg-yellow-400'
                />
              </div>
            </div>
            {passwordChangeLoading && <Loader customClass='absolute' />}
          </div>
        </form>
      </div>
    </>
  )
}

export default PatientAccount
