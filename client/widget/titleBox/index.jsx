import Avatar from '@/components/AppUi/User/Avatar'
import { baseUrl, sidebarLogoUrl } from '@/utils/helper'
import React from 'react'

const TitleBox = ({
  customer = {},
  uniquePatientIdList,
  status = '',
  onClick = () => false,
}) => {
  const isDisabled = status === 'in-progress'
  // const isDisabled = status === 'IN_SERVE' || uniquePatientIdList.includes(customer._id);

  // const allowedStatuses = ['WAITING','IN_SERVE']

  // const isDisabled =
  //   !allowedStatuses.includes(status) ||
  //   uniquePatientIdList.includes(customer._id)

  return (
    <div
      onClick={isDisabled ? () => {} : onClick}
      className={`cursor-pointer flex items-center ${
        isDisabled ? 'opacity-50 pointer-events-none' : ''
      }`}>
      <div>
        <Avatar
          imageUrl={customer.profile_image?.uri}
          userType={`Patient`}
          size={`h-10 w-10 object-cover`}
        />
      </div>
      <div className='ml-3'>
        <div className='flex items-center gap-2'>
          {customer.firstName + ' ' + customer.lastName}
          {customer.isActive && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5'
              viewBox='0 0 20 20'
              fill='#22C55E'>
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                clipRule='evenodd'></path>
            </svg>
          )}
        </div>
        {customer.alertTime && (
          <div className='bg-yellow-100 text-yellow-700 px-2 text-xs py-0.5 inline-block mt-1 rounded-full'>
            {customer.alertTime} min ago
          </div>
        )}
      </div>
    </div>
  )
}

export default TitleBox
