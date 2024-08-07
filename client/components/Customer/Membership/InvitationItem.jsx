import React from 'react'
import RealTimeTimeago from '../../AppUi/Miscellaneous/RealTimeTimeago'

import {
  CalendarIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline'

function InvitationItem ({ invitation }) {
  return (
    <div className='flex items-center gap-3 p-5 mt-4 rounded-lg single-visit patient-pref bg-grayMid'>
      <div className='flex items-center justify-center w-10 h-10'>
        <EnvelopeIcon className='w-6 h-8 text-gray-400' />
      </div>
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <h4>{invitation.email}</h4>
          <p className='text-sm text-gray-400'>{invitation.status}</p>
        </div>
        <p className='text-sm text-gray-400'>{invitation.categoryId.name}</p>
        <div className='flex items-center justify-between'>
          <span className='text-sm text-gray-400'>
            Invited sent <RealTimeTimeago timestamp={invitation?.createdAt} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default InvitationItem
