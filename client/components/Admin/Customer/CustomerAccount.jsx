import useCustomerAccount from '@/components/Admin/Customer/hooks/useCustomerAccount'
import { USER_ROLE_TYPE } from '@/utils/constant'
import { getUser } from '@/utils/localStorage'
import EmailIcon from '@/widget/image/EmailIcon'
import Loader from '@/widget/loader'
import Select from '@/widget/select'
import React from 'react'
import ToggleButton from '@/widget/ToggleButton'

const UserManagementAccount = ({ id }) => {
  const {
    loading,
    formik,
    onClickNotificationChange,
    isActive,
    setActive,
    activeEmailNotification,
    setActiveEmailNotification,
    // Location Dropdown State
    locationOptionsData,
    setLocationOptionsData,
    selectLocationValue,
    setSelectLocationValue,
    loadOptionsLocation,
  } = useCustomerAccount({ id })

  return (
    <>
      <div className='account'>
        <div className='relative grid gap-2 p-5 mt-5 account-changes md:grid-cols-12 bg-primary rounded-xl'>
          <div className='col-span-3'>
            <h4 className='font-medium'>Account</h4>
          </div>
          <div className='col-span-9'>
            <form onSubmit={formik.handleSubmit}>
              <div className='pb-4 border-b border-gray-500 '>
                <div className='flex items-center justify-between mb-2'>
                  <div>
                    <h4 className='text-sm font-medium'>Account</h4>
                    <p className='text-sm text-gray-400'>
                      This user currently set active
                    </p>
                  </div>
                  <ToggleButton checked={formik.values.isActive} setChecked={(e) => formik.setFieldValue("isActive", e)} />
                </div>

               

                <div className='grid gap-3 sm:grid-cols-2'>
                  <div className='mt-3 form-group'>
                    <label className='inline-block mb-2 text-sm text-gray-400'>
                      Registered Location
                    </label>
                    <Select
                      placeholder='Select location'
                      name='locationIds'
                      defaultOptions={locationOptionsData}
                      value={selectLocationValue}
                      setValue={setSelectLocationValue}
                      loadOptions={loadOptionsLocation}
                      formik={formik}
                      isDisabled={
                        getUser()?.roleId?.code ===
                          USER_ROLE_TYPE.SUPER_ADMIN ||
                          getUser()?.roleId?.code === USER_ROLE_TYPE.OWNER
                          ? false
                          : true
                      }
                    // setOptionsData={setLocationOptionsData}
                    />
                  </div>
                  <div className='mt-3 form-group'>
                    <label className='inline-block mb-2 text-sm text-gray-400'>
                      Email Address
                    </label>
                    <div className='relative flex items-center'>
                      <div className='absolute left-3'>
                        <EmailIcon />
                      </div>
                      <input
                        type='text'
                        className='w-full px-2 py-1.5 pl-10 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500'
                        placeholder='you@example.com'
                        id='email'
                        {...formik.getFieldProps('email')}
                        disabled
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <div>{formik.errors.email}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-end mt-3 buttons'>
                <button
                  type='submit'
                  className='block px-2 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg sm:px-4 hover:bg-yellow-400'>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
          {loading && <Loader customClass='absolute' />}
        </div>

        <div className='relative grid gap-2 p-5 mt-5 security-question md:grid-cols-12 bg-primary rounded-xl'>
          <div className='col-span-3'>
            <h4 className='font-medium'>Notification Setting</h4>
          </div>
          <div className='col-span-9'>
            <div className='pb-4 border-b border-gray-500 '>
              <form action=''>
                <div className='flex items-center justify-between mb-2'>
                  <div>
                    <p className='text-sm text-gray-400'>
                      Send Notification To
                    </p>
                  </div>
                  <ToggleButton
                    checked={activeEmailNotification}
                    setChecked={setActiveEmailNotification}
                  />
                </div>
                <div>
                  <div className='w-full mb-3 form-group'>
                    <div className='relative flex items-center'>
                      <div className='absolute left-3'>
                        <EmailIcon />
                      </div>
                      <input
                        type='text'
                        className='w-full px-2 py-1.5 pl-10 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500'
                        placeholder='you@example.com'
                        id='email'
                        {...formik.getFieldProps('email')}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className='flex items-center justify-end mt-3 buttons'>
              <button
                onClick={onClickNotificationChange}
                className='block px-2 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg sm:px-4 hover:bg-yellow-400'>
                Save Changes
              </button>
            </div>
          </div>
          {loading && <Loader customClass='absolute' />}
        </div>
      </div>
    </>
  )
}

export default UserManagementAccount
