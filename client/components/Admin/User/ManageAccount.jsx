import useUserAccount from '@/components/Admin/User/hooks/useUserAccount'
import SnapCrackButton from '@/widget/common-button'
import EmailIcon from '@/widget/image/EmailIcon'
import Loader from '@/widget/loader'
import ToggleButton from '@/widget/ToggleButton'
import React from 'react'
import AsyncSelect from 'react-select/async'

const ManageAccount = ({ id,
  setID,
  setUserData,
  setData, }) => {
  const {
    loading,
    formik,
    isActive,
    setActive,
    defaultRoleId,
    roleOptionsData,
    getUserData,
    edit,
    setEdit,
  } = useUserAccount({ id, setID, setUserData, setData })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className='relative account'>
          <div className='grid gap-2 p-5 mt-5 account-changes md:grid-cols-12 bg-primary rounded-xl'>
            <div className='col-span-3'>
              <h4 className='font-medium'>Account</h4>
            </div>
            <div className='col-span-9'>
              <div className='pb-4 border-b border-gray-500 '>
                <div className='flex items-center justify-between'>
                  <div>
                    <h4 className='text-sm font-medium'>Account</h4>
                    <p className='text-sm text-gray-400'>
                      This user currently set active
                    </p>
                  </div>
                  <ToggleButton
                    checked={isActive}
                    setChecked={setActive}
                    disabled={edit ? false : true}
                  />
                </div>

                <div className='mt-4'>
                  
                  <div className='grid gap-3 sm:grid-cols-2'>
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
                          className='w-full p-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                          placeholder='you@example.com'
                          disabled
                          id='email'
                          {...formik.getFieldProps('email')}
                        />
                      </div>
                      {formik.touched.email && formik.errors.email ? (
                        <div className='mt-1 text-sm text-redAlert'>
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                    <div className='form-group sm:mt-3'>
                      <label className='inline-block mb-2 text-sm text-gray-400'>
                        Role
                      </label>

                      <AsyncSelect
                        // isSearchable
                        cacheOptions
                        className='text-sm'
                        placeholder='Select Role'
                        id='roleId'
                        filterOption={() => true}
                        isDisabled
                        value={defaultRoleId}
                        defaultOptions={roleOptionsData}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-5 buttons'>
                {/* <div className='mb-3 sm:mb-0'>
                  <a
                    onClick={() => openModal()}
                    className='inline-block px-2 py-2 mr-3 text-sm text-center text-red-500 transition border border-red-600 rounded-lg cursor-pointer bg-transprent sm:px-4 '>
                    Delete User
                  </a>
                </div> */}
                <div className='flex items-center justify-end'>
                  {edit ? <a
                    onClick={() => {
                      getUserData(), setEdit(false)
                    }}
                    className='block px-2 py-2 text-sm font-medium text-center text-gray-500 transition border border-gray-700 rounded-lg cursor-pointer bg-transprent sm:px-4 hover:border-yellowBg'>
                    Reset To Default
                  </a> : <></>}

                  {edit ? (
                    <SnapCrackButton
                      type='submit'
                      text='Save Changes'
                      className='block px-2 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg sm:px-4 hover:bg-yellow-400'
                    />
                  ) : (
                    <SnapCrackButton
                      onClick={e => {
                        e.preventDefault()
                        setEdit(true)
                      }}
                      text='Edit'
                      className='block px-2 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg sm:px-4 hover:bg-yellow-400'
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {loading && <Loader customClass='absolute' />}
        </div>
      </form>
    </>
  )
}

export default ManageAccount
