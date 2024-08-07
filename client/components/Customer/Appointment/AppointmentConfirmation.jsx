import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import AddPaymentMethod from '@/components/Customer/Billing/PaymentMethod'
import routes from '@/utils/routes'
import useAppointmentConfirm from './hooks/useAppointmentConfirm'
import moment from 'moment'
import DeletePopupModal from '@/widget/modal/DeletePopupModal'
import useCard from '@/components/Customer/Billing/hooks/useCard'
import { MINUTES } from '@/utils/constant'
import { getUser } from '@/utils/localStorage'
import Loader from '@/widget/loader'
import {
  MapPinIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/20/solid'
import { Button } from '@/components/AppUi/Form/Button'
import useBillingCalculator from '@/components/Customer/Billing/hooks/useBillingCalculator'

const AppointmentConfirmation = ({ user, services }) => {
  const AddPaymentMethodModalOpen = () => {
    const AddPaymentMethodModal = document.getElementById('AddPaymentMethod')
    AddPaymentMethodModal.classList.add('active')
  }

  const { locationIds } = getUser()
  const firstLocationName =
    locationIds && locationIds.length > 0
      ? locationIds[0].locationName
      : 'Location not specified'

  const {
    cardData = [],
    loading: loadingRender,
    CloseBtn,
    formik,
    focus,
    handleInputFocus,
    expiryMonthValidation,
    expiryYearValidation,
    cardNumberValidation,
  } = useCard()

  const {
    formikInit,
    tempAppointment,
    date,
    openModal,
    closeModal,
    openDeleteModal,
    deleteID,
    label,
    onClickDelete,
    timeDuration,
  } = useAppointmentConfirm({ user })

  const { loading, lineItems, totalAmount, totalAmountToPay } = useBillingCalculator({ 
    userObj: user, 
    serviceIds: tempAppointment.serviceIds,
    services
  })

  useEffect(() => {
    console.log(`services`, services)
  }, [services])

  return (
    <>
    
      <div>
        <div className='w-full max-w-3xl p-5 mx-auto sm:p-9 sm:pb-2'>
          <form onSubmit={formikInit.handleSubmit}>
            <div className='reg-form'>
              <div className='all-steps'>
                <div className='flex items-center justify-between gap-3'>
                  <h3 className='text-xl font-medium'>Confirm </h3>
                  <p className='text-sm text-gray-400'>STEP 2/2</p>
                </div>
                <div className='grid w-full h-1 grid-cols-4 mt-2 mb-6 rounded-full bg-grayMid'>
                  <div className='h-full col-span-4 rounded-full bg-yellowBg'></div>
                </div>
              </div>
              <p className='text-sm text-gray-400'>
                Please confirm your appointment details below
              </p>




              <div className='grid gap-3 mt-5'>
                <div className='p-4 rounded-lg bg-primary'>
                  <div className='flex items-center justify-between rounded-lg'>
                    <div>
                      <h3 className='text-base font-semibold'>
                        {moment(date).format('dddd, MMMM Do')}
                      </h3>
                      <div className='flex items-center gap-3 mt-4'>
                        <div className='flex items-center gap-1 text-gray-400'>
                          <MapPinIcon className='w-5 h-5' />
                          <p className='flex items-center gap-1'>
                            {firstLocationName}
                          </p>
                        </div>
                          {/* <div className='flex items-center gap-1 text-gray-400'>
                            <ClockIcon className='w-5 h-5' />
                            <p>
                              {timeDuration?.timeDuration} {MINUTES}
                            </p>
                          </div> */}
                      </div>
                    </div>
                    <div className='flex items-center gap-3 text-gray-400'>
                      <Link href={routes.customer.appointmentNew}>
                        <a className='cursor-pointer' title='Edit'>
                          <PencilIcon className='w-5 h-5' />
                        </a>
                      </Link>
                    </div>
                  </div>

                  {/* {JSON.stringify(lineItems)} */}

                  {lineItems?.length > 0 ? (
                    <>
                      {lineItems?.map((data = {}) => (
                        <div
                          key={data._id}
                          className='flex items-center justify-between gap-3 pt-3 mt-3 border-t border-gray-700'>
                          <div>
                            <p>{data.name?.toUpperCase()}</p>
                            <p className='text-sm text-gray-400'>
                              {data.description}
                            </p>

                            <p className='text-yellowBg'>
                          

                              {data.amount === 0 ? (
                                <>You saved $ {data.price.toFixed(2)}</>
                              ) : (
                                <>$ {data.price.toFixed(2)}</>
                              )}
                            </p>
                          </div>
                        </div>
                      ))}

                      <div className='mt-5'>
                        <div className='grid gap-3 p-4 rounded-lg bg-yellowBg'>
                          <div className='flex items-center justify-between text-primary'>
                            <p className='text-sm'>Total</p>

                            <p className='font-medium'>
                              $ {totalAmount.toFixed(2)}
                            </p>
                          </div>
                          <div className='flex items-center justify-between text-primary'>
                            <p className='text-sm'>Total due now</p>
                            <p className='font-medium'>
                              $ {totalAmountToPay.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {totalAmountToPay > 0 && (
                        <div className='mt-5'>
                          <div className='flex items-center justify-between'>
                            <p className='text-base'>Payment method</p>
                          </div>

                          {cardData.length === 0 ? (
                            <div className='flex items-center justify-center'>
                              No Card Found
                            </div>
                          ) : (
                            <>
                              {cardData.map((card = {}) => (
                                <div
                                  key={card._id}
                                  className='p-5 mt-2 rounded-lg bg-primary flex-bet'>
                                  <div className='flex gap-3'>
                                    <input
                                      type='radio'
                                      className='mt-1.5'
                                      checked={true}
                                    />
                                    <div>
                                      <p>{card.cardType}</p>
                                      <p className='text-gray-400'>
                                        {card.first6?.substring(0, 4) +
                                          ' **** **** ' +
                                          card.last4}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      )}

                      {totalAmountToPay > 0 && (
                        <>
                          <div className='mt-5 text-center'>
                            <button
                              type='button'
                              onClick={AddPaymentMethodModalOpen}
                              className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg focus:outline-none hover:bg-yellow-400 whitespace-nowrap'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='w-5 h-5'
                                viewBox='0 0 20 20'
                                fill='currentColor'>
                                <path
                                  fillRule='evenodd'
                                  d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                                  clipRule='evenodd'
                                />
                              </svg>
                              Add New Payment Method
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div>
                        <div className='flex items-center justify-center py-3 mb-4 border rounded-lg border-yellowBg'>
                          No Data Found
                        </div>
                        <Link href={routes.customer.appointmentNew}>
                          <a className='flex items-center justify-center w-full py-2 text-black rounded-lg bg-yellowBg hover:bg-darkYellow'>
                            Please Select Service
                          </a>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {!loading && (
              <div className='flex items-center gap-3 pt-5 mt-5'>
                <Link href={routes.customer.appointmentNew}>
                <span className='block w-full p-2 text-sm text-center text-gray-200 transition bg-transparent border border-gray-700 rounded-md cursor-pointer focus:outline-none hover:bg-gray-800 hover:border-gray-400'>
                    Back
                  </span>
                </Link>

                <Button
                  kind={`primary`}
                  type='submit'
                  text={
                    formikInit.isSubmitting
                      ? 'Checking In...'
                      : 'Complete and Check In'
                  }
                  disabled={formikInit.isSubmitting || loading}
                />
              </div>
            )}
          </form>
        </div>
      </div>

      <AddPaymentMethod
        loading={loadingRender}
        CloseBtn={CloseBtn}
        formik={formik}
        focus={focus}
        handleInputFocus={handleInputFocus}
        expiryMonthValidation={expiryMonthValidation}
        expiryYearValidation={expiryYearValidation}
        cardNumberValidation={cardNumberValidation}
      />

      {openDeleteModal && (
        <DeletePopupModal
          closeModal={closeModal}
          onClickDelete={onClickDelete}
          label={label}
          data={deleteID}
        />
      )}

      {loading && <Loader customClass='absolute' />}
    </>
  )
}

export default AppointmentConfirmation
