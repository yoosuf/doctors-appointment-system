import React, { useState } from 'react'
import Link from 'next/link'
import AsyncSelect from 'react-select/async'
import SnapCrackButton from '@/widget/common-button'
import useMyAccount from '@/components/Admin/hooks/useMyAccount'
import ToggleButton from '@/widget/ToggleButton'
import EmailIcon from '@/widget/image/EmailIcon'
import Loader from '@/widget/loader'
import DropdownButton from '@/widget/dropdown/dropdown'
import { InputField } from '@/components/AppUi/Form/InputField'
import { PasswordField } from '@/components/AppUi/Form/PasswordField'

const role = [{ name: 'Customer' }]
const Question1 = [{ name: 'Where you grow up ?' }]
const Question2 = [{ name: 'Where you born ?' }]
const Location = [{ name: 'The Village' }]
const Account = ({ id }) => {
  const [startDate, setStartDate] = useState(new Date())
  const [changeRole, setChangeRole] = useState(role[0])
  const [location, setLocation] = useState(Location[0])
  const [question1, setQuestion1] = useState(Question1[0])
  const [question2, setQuestion2] = useState(Question2[0])
  const {
    edit,
    setEdit,
    loading,
    formik,
    isActive,
    setActive,
    defaultRoleId,
    roleOptionsData,
    getUserData,
  } = useMyAccount({ id })
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className='relative account'>
          <div className='grid gap-2 p-5 account-changes md:grid-cols-12 bg-primary rounded-xl'>
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
                  <ToggleButton checked={isActive} setChecked={setActive} />
                </div>

                <div className='mt-4'>
                  <div className='grid gap-3 sm:grid-cols-2'>
                    <InputField
                      id='email'
                      label={'Email Address'}
                      placeholder={'Email Address'}
                      required={true}
                      formik={formik}
                      customClass={`w-full`}
                      disabled={!edit ? true : false}
                    />
                  </div>
                </div>
              </div>
              <div className='items-center justify-between mt-5 buttons sm:flex'>
                <div className='mb-3 sm:mb-0'>
                  {/* <Link href='#'>
                  <a className='inline-block px-2 py-2 mr-3 text-sm text-center text-red-500 transition border border-red-600 rounded-lg bg-transprent sm:px-4 '>
                    Delete User
                  </a>
                </Link> */}
                </div>
                <div className='flex justify-end'>
                  <a
                    onClick={() => {
                      getUserData(), setEdit(false)
                    }}
                    className='block px-2 py-2 text-sm font-medium text-center text-gray-500 transition border border-gray-700 rounded-lg cursor-pointer bg-transprent sm:px-4 hover:border-yellowBg'>
                    Reset To Default
                  </a>

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
          <div className='grid gap-2 p-5 mt-5 account-password md:grid-cols-12 bg-primary rounded-xl'>
            <div className='col-span-3'>
              <h4 className='font-medium'>Password</h4>
            </div>
            <div className='col-span-9'>
              <div className='pb-4  '>
                <form action=''>
                  <PasswordField
                    id='password'
                    label={'Current Password'}
                    placeholder={'Current Password'}
                    required={true}
                    formik={formik}
                    customClass='mt-4'
                  />

                  <PasswordField
                    id='new_password'
                    label={'New password'}
                    placeholder={'New password'}
                    required={true}
                    formik={formik}
                    customClass='mt-4'
                  />

                  <PasswordField
                    id='confirm_new_password'
                    label={'Confirm new password'}
                    placeholder={'Confirm new password'}
                    required={true}
                    formik={formik}
                    customClass='mt-4'
                  />

                  <div className='flex items-center justify-end mt-3 buttons border-t border-gray-500'>


                    
                    <Link href='#'>
                      <a className='block px-2 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg sm:px-4 hover:bg-yellow-400'>
                        Save Changes
                      </a>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className='grid gap-2 p-5 my-5 security-question md:grid-cols-12 bg-primary rounded-xl'>
            <div className='col-span-3'>
              <h4 className='font-medium'>Security Question</h4>
            </div>
            <div className='col-span-9'>
              <div className='pb-4 border-b border-gray-500 '>
                <form action=''>
                  <div className='grid gap-4 sm:grid-cols-2'>
                    <div className='form-group'>
                      <label className='inline-block mb-2 text-sm text-gray-400'>
                        Security question 1
                      </label>
                      <DropdownButton
                        MAP={Question1}
                        value={question1}
                        onChange={setQuestion1}
                      />
                    </div>
                    <div className='form-group'>
                      <label className='inline-block mb-2 text-sm text-gray-400'>
                        Answer
                      </label>
                      <div className='relative flex items-center'>
                        <input
                          type='text'
                          className='w-full p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                          placeholder='Miami'
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label className='inline-block mb-2 text-sm text-gray-400'>
                        Security question 2
                      </label>
                      <DropdownButton
                        MAP={Question2}
                        value={question2}
                        onChange={setQuestion2}
                      />
                    </div>
                    <div className='form-group'>
                      <label className='inline-block mb-2 text-sm text-gray-400'>
                        Answer
                      </label>
                      <div className='relative flex items-center'>
                        <input
                          type='text'
                          className='w-full p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                          placeholder='Kansas'
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className='flex items-center justify-end mt-3 buttons'>
                <Link href='#'>
                  <a className='block px-2 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg sm:px-4 hover:bg-yellow-400'>
                    Save Changes
                  </a>
                </Link>
              </div>
            </div>
          </div>
          {loading && <Loader customClass='absolute' />}
        </div>
      </form>
    </>
  )
}

export default Account
