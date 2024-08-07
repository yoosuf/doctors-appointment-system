import ToggleButton from '@/widget/ToggleButton'
import React ,{useState}from 'react'
import SnapCrackButton from '@/widget/common-button'
import useNotification from '@/components/Customer/Notification/hooks/useNotification'
import Loader from '@/widget/loader'
import { TellField } from '@/components/AppUi/Form/TellField'
import { InputField } from '@/components/AppUi/Form/InputField'

const Notification = ({ userData}) => {
  const user = userData
  const {
    loading,
    formik,
    sendEmailNotification,
    sendPhoneNotification,
    setSendEmailNotification,
    setSendPhoneNotification,
    onSaveNotification,
  } = useNotification( { userData})


  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='relative p-8 rounded-lg bg-primary noselect'>
        <div className='flex items-center justify-between col-span-12'>
          <div>
            <h4 className='text-sm font-medium'>Send Notification To Email</h4>
            <p className='text-sm text-gray-400'>send notification to my email</p>
          </div>
          <div>
            <ToggleButton
              checked={sendEmailNotification}
              setChecked={setSendEmailNotification}
            />
          </div>
        </div>

        <InputField
            id="email"
            label={'Email Address'}
            placeholder={'Email address'}
            required={true}
            formik={formik}
            disabled={true}
          />


        <div className='my-8 border border-gray-700'></div>

        <div className='flex items-center justify-between col-span-12'>
          <div>
            <h4 className='text-sm font-medium'>Send Notification To My Phone</h4>
            <p className='text-sm text-gray-400'>send notification to my phone</p>
          </div>
          <div>
            <ToggleButton
              checked={sendPhoneNotification}
              setChecked={setSendPhoneNotification}
            />
          </div>
        </div>
        <TellField
            id="phone"
            label={'Phone Number'}
            placeholder={'Phone Number'}
            required={true}
            formik={formik}
            customClass="mt-0"
            disabled={true}
          />


        <div className='my-8 border border-gray-700'></div>

        <div className='flex items-center justify-end'>
          <SnapCrackButton
            type='button'
            text='Save Changes'
            className='block px-2 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg sm:px-4 hover:bg-yellow-400'
          />
        </div>
        {loading && <Loader customClass='absolute' />}
      </div>
    </form>
  )
}

export default Notification
