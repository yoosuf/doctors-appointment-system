import React, { useState } from 'react'
import CloseIcon from '@/widget/image/CloseIcon'
import SnapCrackButton from '@/widget/common-button'
import PlusIcon from '@/widget/image/PlusIcon'
import Loader from '@/widget/loader'
import useSubscription from '@/components/Customer/Membership/hooks/useSubscription'
import AddPaymentMethod from '@/components/Customer/Billing/PaymentMethod'
import useCard from '@/components/Customer/Billing/hooks/useCard'

import { getUser } from '@/utils/localStorage'


export default function CheckoutEventModal ({
  userData, 
  closeCheckoutModal,
  selectMembershipData,
  cardDetails,
}) {

  
  const { onBuyMembership, loading } = useSubscription({userData})

  const AddPaymentMethodModalOpen = () => {
    const AddPaymentMethodModal = document.getElementById('AddPaymentMethod')
    AddPaymentMethodModal.classList.add('active')
  }

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
  } = useCard({ cardDetails })

  return (
    <>
      <section
        id='checkoutEventModal'
        className='relative inset-0 z-10 overflow-hidden text-sm active activity-modal-main'
        aria-labelledby='slide-over-title'
        role='dialog'
        aria-modal='true'>
        <div className='absolute inset-0 overflow-hidden'>
          <div
            className='absolute inset-0 transition-opacity bg-black black-layer'
            aria-hidden='true'></div>
          <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal'>
            <div className='w-screen max-w-lg'>
              <div className='flex flex-col h-full shadow-xl bg-primary'>
                <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-base font-medium' id='slide-over-title'>
                      Checkout
                    </h2>
                    <div className='flex items-center ml-3 h-7'>
                      <button
                        type='button'
                        className='focus:outline-none'
                        onClick={closeCheckoutModal}>
                        <span className='sr-only'>Close panel</span>
                        <CloseIcon />
                      </button>
                    </div>
                  </div>
                </div>
                <div className='relative flex-1 p-4 modal-body'>
                  <h5>Order Summary</h5>
                  <div className='flex justify-between mt-3 text-gray-400'>
                    <p>Service</p>
                    <p>Price</p>
                  </div>
                  <div className='flex justify-between gap-3 mt-3'>
                    <p>{selectMembershipData?.name}</p>
                    <p>${selectMembershipData?.price?.toFixed(2)}</p>
                  </div>
                  <div className='pt-5 mt-5 border-t border-grayLight'>
                    <div className='flex justify-between mt-2'>
                      <p className='text-gray-400'>Grand total</p>
                      <p className='text-yellowBg'>
                        ${selectMembershipData?.price?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className='pt-5 mt-5 border-t border-grayLight'>
                    <div className='flex items-center justify-between'>
                      <p className='text-base'>Payment method</p>
                      {cardData.length > 0 ? (
                        <a
                          onClick={AddPaymentMethodModalOpen}
                          className='p-2 font-semibold text-black rounded-lg cursor-pointer bg-yellowBg'>
                          Add New Card
                        </a>
                      ) : (
                        <a
                          className='flex items-center justify-center w-10 h-10 transition rounded-lg bg-yellowBg hover:bg-yellow-400'
                          onClick={AddPaymentMethodModalOpen}>
                          <PlusIcon />
                        </a>
                      )}
                    </div>

                    {cardData.length === 0 ? (
                      <div className='flex items-center justify-center py-2 mt-4 text-xl border rounded-lg border-yellowBg'>
                        No Card Found
                      </div>
                    ) : (
                      <>
                        {cardData.map((card = {}) => (
                          <div
                            key={card._id}
                            className='p-5 mt-4 rounded-lg flex-bet bg-grayMid'>
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
                </div>
                {loading && <Loader customClass='absolute' />}
                <div className='flex items-center justify-end gap-2 p-5 text-right border-t modal-footer border-grayLight'>
                  <div>
                    <SnapCrackButton
                      type='button'
                      text='Place order'
                      className='p-2 font-medium text-center text-black transition rounded-lg bg-yellowBg hover:bg-yellow-400 '
                      onClick={e =>
                        onBuyMembership(e, selectMembershipData.id, cardData)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
    </>
  )
}
