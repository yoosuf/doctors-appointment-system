import React, { useEffect } from 'react'
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { SelectField } from '@/components/AppUi/Form/SelectField'
import { InputField } from '@/components/AppUi/Form/InputField'
import { Button } from '@/components/AppUi/Form/Button'
import useInvitation from '@/components/Customer/Membership/hooks/useInvitation'
import MembershipStatus from './MembershipStatus'

export default function InvitationModel ({ userData }) {
  const {
    loading,
    closeBtn,
    membershipPackages,
    handleAddInvitation,
    handleRemoveInvitation,
    remainingQuotas,
    setRemainingQuotas,
    handleEmailChange,
    invitations,
    formik,
  } = useInvitation({
    userData,
  })

  return (
    <>
      <section
        id='InvitationModel'
        className='fixed inset-0 z-10 overflow-hidden text-sm activity-modal-main'
        aria-labelledby='slide-over-title'
        role='dialog'
        aria-modal='true'>
        <div className='absolute inset-0 overflow-hidden'>
          <div
            className='absolute inset-0 transition-opacity bg-black black-layer'
            aria-hidden='true'
            onClick={e => {
              e.preventDefault()
              closeBtn()
            }}></div>
          <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal'>
            <div className='w-screen max-w-xl'>
              <form
                onSubmit={formik.handleSubmit}
                className='flex flex-col h-full shadow-xl bg-primary'>
                <header className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-base font-medium' id='slide-over-title'>
                      Invite your friend or family
                    </h2>
                    <div className='flex items-center ml-3 h-7'>
                      <button
                        type='button'
                        onClick={e => {
                          e.preventDefault()
                          closeBtn()
                        }}
                        className='focus:outline-none '>
                        <span className='sr-only'>Close panel</span>
                        <XMarkIcon className='w-5 h-5' />
                      </button>
                    </div>
                  </div>
                </header>

                <main className='relative flex-1 p-4 modal-body'>
                  <div className='grid gap-2 pb-4 md:grid-cols-12'>
                    {/* <div className='col-span-3'>
                      <h4 className='font-medium'>Profile Image</h4>
                    </div> */}
                    <div className='col-span-12'>
                      {/* <div className='flex flex-wrap'>
                        {membershipPackages?.map((member, index) => (
                          <MembershipStatus membershipItem={member} />
                        ))}
                      </div> */}

                      {/* {JSON.stringify(remainingQuotas)} */}
                      <div className='p-4 space-y-4'>
                        {formik?.values?.invitations &&
                          formik.values.invitations.map((invitation, index) => (
                            <div
                              key={index}
                              className='grid gap-3 mb-3 lg:grid-cols-2 d-flex align-items-center'>
                              <div>
                                <input
                                  type='text'
                                  name={`invitations.${index}.email`}
                                  value={invitation.email}
                                  placeholder='Email'
                                  // onChange={formik.handleChange}
                                  onChange={e =>
                                    handleEmailChange(index, e.target.value)
                                  } // Call handleEmailChange on onChange event
                                  // className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                                  className='block w-full mt-1 text-xs leading-4 border-gray-700 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:border-gray-900 focus:ring-gray-500 focus:ring-offset-gray-100'
                                  autoComplete='off'
                                  autoCapitalize='off'
                                />
                                {formik.touched.invitations &&
                                  formik.errors.invitations &&
                                  formik.errors.invitations[index] &&
                                  formik.errors.invitations[index].email && (
                                    <div className='text-red-500'>
                                      {formik.errors.invitations[index].email}
                                    </div>
                                  )}
                              </div>
                              <div className='gap-3'>
                                <div className='flex items-center'>
                                  <select
                                    name={`invitations.${index}.categoryId`}
                                    value={invitation.categoryId}
                                    className='block w-full mt-1 text-xs leading-4 border-gray-700 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:border-gray-900 focus:ring-gray-500 focus:ring-offset-gray-100'
                                    onChange={e => {
                                      formik.handleChange(e)
                                      const selectedCategoryId = e.target.value
                                      const previousCategoryId =
                                        invitation.categoryId
                                      if (
                                        previousCategoryId !==
                                        selectedCategoryId
                                      ) {
                                        setRemainingQuotas(prevQuotas => ({
                                          ...prevQuotas,
                                          [selectedCategoryId]:
                                            prevQuotas[selectedCategoryId] - 1,
                                          [previousCategoryId]:
                                            prevQuotas[previousCategoryId] + 1,
                                        }))
                                      }
                                    }}>
                                    <option value=''>Select one option</option>
                                    {membershipPackages?.map(membership => (
                                      <option
                                        key={membership._id}
                                        value={membership._id}
                                        disabled={
                                          remainingQuotas[membership._id] === 0
                                        }>
                                        {membership.name}
                                      </option>
                                    ))}
                                  </select>
                                  {formik.touched.invitations &&
                                    formik.errors.invitations &&
                                    formik.errors.invitations[index] &&
                                    formik.errors.invitations[index]
                                      .categoryId && (
                                      <div className='text-red-500'>
                                        {
                                          formik.errors.invitations[index]
                                            .categoryId
                                        }
                                      </div>
                                    )}

                                  <button
                                    type='button'
                                    onClick={() =>
                                      handleRemoveInvitation(index)
                                    }
                                    className='self-end px-3 py-2 ml-2 text-white bg-gray-500 rounded hover:bg-gray-600'>
                                    <TrashIcon className='w-4 h-4' />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        <button
                          type='button'
                          onClick={handleAddInvitation}
                          className='p-2 text-sm text-center text-black transition rounded-md btn focus:outline-none bg-yellowBg hover:bg-yellow-400'>
                          New invitation
                        </button>
                      </div>

                      {/*  */}
                    </div>
                  </div>
                </main>

                <footer className='flex items-center justify-end p-4 mt-3 border-t border-gray-700 col-spb-pan-12 buttons'>
                  <div className='grid grid-cols-2 gap-4'>
                    <Button
                      kind={'secondery'}
                      type='button'
                      text={'Close'}
                      onClick={e => {
                        e.preventDefault()
                        closeBtn()
                      }}
                    />

                    <Button
                      kind={'primary'}
                      type='submit'
                      text={
                        formik.isSubmitting
                          ? 'Please wait...'
                          : 'Send out the invitations'
                      }
                      isDisabled={formik.isSubmitting}
                      isLoading={formik.isSubmitting}
                    />
                  </div>
                </footer>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
