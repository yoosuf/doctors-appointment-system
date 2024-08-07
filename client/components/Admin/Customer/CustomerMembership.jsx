import useCustomerMembership from '@/components/Admin/Customer/hooks/useCustomerMembership'
import Loader from '@/widget/loader'
import moment from 'moment'
import React from 'react'
import ToggleButton from '@/widget/ToggleButton'
import { USER_ROLE_TYPE } from '@/utils/constant'
import { formattedMembershipObj } from '@/utils/membership'

const UserManagementMembership = ({ id, userData, userRole }) => {
  const {
    loading,
    memberShipData,
    allMemberShip,
    selectedMemberShipID,
    onSelectMemberShip,
    onCancelMembership,
    updateMemberShip,
  } = useCustomerMembership({
    id,
  })

  const membershipData = formattedMembershipObj(userData?.membership)

  return (
    <>

      <div className='relative membership'>
        {membershipData?.status !== "active" ? (
          <>
            <div className='flex items-center justify-center my-4 text-2xl'>
              Customer doesn't have membership
            </div>
          </>
        ) : (
          <>
            <div className='items-center justify-between p-6 mt-5 rounded-lg change-plan bg-primary sm:flex'>
              <div className='membership-text'>
                <h2 className='text-2xl'>{membershipData?.name}</h2>

                <div className='flex items-center justify-center sm:justify-left'>
                  <a className='px-3 text-xs font-medium rounded-full active-tag text-primary bg-greenBg'>
                    Active
                  </a>

                  <p className='ml-2 text-sm'>
                    renews on {moment(membershipData?.renewalDate).format('MMMM YYYY')}
                  </p>
                </div>

                <div className='mt-5 text-center sm:text-left'>
                  {membershipData?.categories?.map((plan = {}) => (
                    <div className='flex items-center'>
                      <div className='text-sm text-yellowBg'>
                        {plan?.name} Redeemed:
                      </div>
                      <p className='ml-2 text-sm text-blueBg'>
                        {plan?.remainingQuota} / {plan?.quota}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* {(userRole === USER_ROLE_TYPE.ADMIN ||
                userRole === USER_ROLE_TYPE.SUPER_ADMIN ||
                userRole === USER_ROLE_TYPE.SUPER_ADMIN) && (
                <>
                  <div className='mt-3 text-center sm-text-left sm:mt-0'>
                    <button
                      onClick={onCancelMembership}
                      className='block px-4 py-2 text-sm font-medium text-center text-red-500 transition border border-red-500 rounded-lg bg-transprent'>
                      Cancel Subscription
                    </button>
                  </div>
                </>
              )} */}
            </div>
          </>
        )}

        {/* {(userRole === USER_ROLE_TYPE.ADMIN ||
          userRole === USER_ROLE_TYPE.SUPER_ADMIN ||
          userRole === USER_ROLE_TYPE.SUPER_ADMIN) && (
          <>
            <div className='px-6 py-4 mt-5 rounded-lg manage-subscription bg-primary'>
              <h3 className='text-lg font-medium'>Manage subscription</h3>
              {allMemberShip.map((membership = {}) => (
                <a
                  onClick={() => onSelectMemberShip(membership.id)}
                  className='text-left cursor-pointer'
                  key={membership.id}>
                  <a
                    className={`${
                      membership.id === selectedMemberShipID
                        ? 'bg-grayMid border-yellowBg'
                        : ''
                    } single-subscription my-4 py-3 px-6 rounded-lg  border border-gray-500 flex justify-between transition hover:border-yellowBg hover:bg-grayMid`}>
                    <div className=''>
                      <p className='text-sm'>{membership.name}</p>
                      <div className='items-center sm:flex'>
                        {membership.categories?.map((plan = {}) => (
                          <>
                            <div className='hidden w-1 h-1 mx-1 rounded-full dot bg-blueBg sm:block'></div>
                            <p className='text-sm text-gray-500'>
                              {plan.quota} {plan._id?.name}
                            </p>
                          </>
                        ))}
                      </div>
                    </div>
                    <div className='ml-3'>
                      <p className='text-sm'>${membership.price}</p>
                      <div className='flex items-center'>
                        <p className='text-sm text-gray-500'>/mo</p>
                      </div>
                    </div>
                  </a>
                </a>
              ))}

              <div className='items-center justify-between mt-8 renew sm:flex '>
                <div>
                  <h3 className='text-lg font-medium'>
                    Renew subscription automatically
                  </h3>
                  <p className='text-sm text-gray-500'>
                    Inform customer that failed billed cycles are subject to
                    additional charges and fees
                  </p>
                </div>
                <div className='mt-4 sm:mt-0'>
                  <ToggleButton />
                </div>
              </div>
              <div className='flex items-center justify-end mt-6 buttons'>
                <a
                  onClick={updateMemberShip}
                  className='block px-4 py-2 ml-3 text-sm font-medium text-center text-black transition border rounded-lg bg-yellowBg border-yellowBg hover:bg-yellow-400'>
                  Save Changes
                </a>
              </div>
            </div>
          </>
        )} */}
        {loading && <Loader customClass='absolute' />}
      </div>
    </>
  )
}

export default UserManagementMembership
