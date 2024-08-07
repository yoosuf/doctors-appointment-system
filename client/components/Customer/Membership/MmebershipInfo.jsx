import React, { useState } from 'react'
import moment from 'moment'
import { formattedMembershipObj } from '@/utils/membership'

import { TicketIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

const MmebershipInfoCard = ({ subscriptionObj, memberCreatedAt,  invitationObj }) => {

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>


      

      {invitationObj && invitationObj?.status === 'active' && (
        <a
          className='px-4 py-6 transition rounded-lg bg-primary hover:bg-grayLight noselect'
          key={invitationObj?._id}>
          <span className='mb-6'>
            <TicketIcon className='w-8 h-8 text-yellow-300' />
          </span>
          <h4 className='text-2xl font-semibold text-white'>
            {`1`}
          </h4>
          <p className='text-sm text-gray-500'>Remaining {invitationObj?.categoryId_name}</p>
        </a>
      )}

      {subscriptionObj?.categories?.map((plan = {}) => (
        <a
          className='px-4 py-6 transition rounded-lg bg-primary hover:bg-grayLight noselect'
          key={plan._id}>
          <span className='mb-6'>
            <TicketIcon className='w-8 h-8 text-yellow-300' />
          </span>
          <h4 className='text-2xl font-semibold text-white'>
            {plan?.remainingQuota}
          </h4>
          <p className='text-sm text-gray-500'>Remaining {plan.name}</p>
        </a>
      ))}

      {memberCreatedAt && (
        <a className='px-4 py-6 transition rounded-lg bg-primary hover:bg-grayLight noselect'>
          <span className='mb-6'>
            <ShieldCheckIcon className='w-8 h-8 text-yellow-300' />
          </span>
          <h4 className='text-2xl font-semibold text-white'>
            {moment(memberCreatedAt).format('YYYY')}
          </h4>
          <p className='text-sm text-gray-500'>Member Since</p>
        </a>
      )}
    </div>
  )
}

export default MmebershipInfoCard
