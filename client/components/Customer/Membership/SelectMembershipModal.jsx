import React, { Fragment, useState } from 'react'
import SnapCrackButton from '@/widget/common-button'
import TickIcon from '@/widget/image/TickIcon'
import CheckoutEventModal from '@/components/Customer/Membership/CheckoutEvent'
import CloseIcon from '@/widget/image/CloseIcon'

const SelectMembershipModal = ({
  userData, 
  cardDetails,
  closeBtn,
  membershipData,
  currentMembership,
}) => {
  const [selectMembershipData, setSelectMembershipData] = useState({})

  const openCheckoutModal = () => {
    const checkoutEventModal = document.getElementById('checkoutEventModal')
    checkoutEventModal?.classList?.add('active')
  }

  const closeSelectMemberShipModal = () => {
    const checkoutEventModal = document.getElementById('selectMembershipModal')
    checkoutEventModal.classList.remove('active')
  }


  const closeCheckoutModal = () => {
    const checkoutEventModal = document.getElementById('checkoutEventModal')
    checkoutEventModal.classList.remove('active')
  }

  

  const onSelectPackage = async (e, membership) => {
    e.preventDefault()
    setSelectMembershipData(membership)
    closeSelectMemberShipModal()
    openCheckoutModal()
  }

  const curserActive = (currentMembership, membership) => {
    return (
      currentMembership?._id === membership.id &&
      (currentMembership?.cancellationRequestedDate === null &&
        currentMembership?.cancellationRequestedDate === undefined &&
        currentMembership?.cancellationRequestedDate === '')
    )
  }

  return (
    <>
      <div
        className='fixed inset-0 overflow-y-auto activity-modal-main'
        aria-labelledby='modal-title'
        id='selectMembershipModal'
        role='dialog'
        aria-modal='true'
        style={{ zIndex: '111' }}>
        <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
          <div
            className='fixed inset-0 transition-opacity bg-black black-layer'
            aria-hidden='true'></div>

          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'>
            &#8203;
          </span>

          <div className='inline-block px-2 py-3 overflow-hidden text-left align-bottom transition-all transform rounded-lg shadow-xl bg-0f0f0f sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full sm:p-6'>
            <div className='mb-3 text-right'>
              <a className='cursor-pointer' onClick={() => closeBtn()}>
                <CloseIcon className='w-5 h-5 ml-auto' />
              </a>
            </div>
            <div className='flex flex-col p-5 registration-form-main sm:p-9'>
              <div className='reg-form'>
                <div className='mb-4 all-steps'>
                  <div className='gap-3 text-center'>
                    <h3 className='mb-2 text-2xl font-semibold text-white'>
                      Membership Packages
                    </h3>
                    <p className='text-sm text-gray-400'>
                      Get the best of SnapCrack to cater to your fast-paced
                      lifestyle at an affordable cost.
                    </p>
                  </div>
                </div>
                <div className='grid max-w-6xl grid-cols-1 gap-5 mx-auto mt-5 lg:grid-cols-3'>
                  {membershipData.map((membership, index) => (
                    <div
                      key={index}
                      className='px-4 py-8 text-center rounded-lg bg-grayMid'>
                      <h3 className={`text-3xl font-bold`}>
                        {membership.name.toUpperCase()}
                      </h3>

                      <div className='flex items-end justify-center'>
                        <h3 className='text-2xl font-bold'>
                          ${membership.price}
                        </h3>
                        <p className='text-sm text-gray-400'>/month</p>
                      </div>
                      <div className='p-4 mt-5 text-sm text-left text-white rounded-lg'>
                        {membership.categories?.map(plan => (
                          <div
                            className='flex items-center gap-3'
                            key={plan._id}>
                            <TickIcon />
                            <p>
                              {plan.quota} {plan._id?.name}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className='mt-4'>
                        <SnapCrackButton
                          type='button'
                          text='Select This Package'
                          className={`${
                            curserActive(currentMembership, membership)
                              ? 'cursor-not-allowed'
                              : 'cursor-pointer'
                          } w-full rounded-lg bg-yellowBg font-medium text-black block p-3 text-center hover:bg-yellow-400 transition`}
                          onClick={e => onSelectPackage(e, membership)}
                          disabled={
                            curserActive(currentMembership, membership)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {Object.keys(selectMembershipData).length !== 0 && (
        <CheckoutEventModal
        userData={userData}
          selectMembershipData={selectMembershipData}
          cardDetails={cardDetails}
          closeCheckoutModal={closeCheckoutModal}
        />
      )}
    </>
  )
}

export default SelectMembershipModal
