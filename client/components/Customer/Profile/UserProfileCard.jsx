import React from 'react'

import {
  CheckCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapIcon,
  HeartIcon,
  PencilAltIcon,
  TrashIcon,
  UserAddIcon,
} from '@heroicons/react/24/solid'

const UserProfileCard = ({ userObj }) => {
  const { addressIds = {} } = userObj
  const address = addressIds?.[0]?.address

  return (
    <div className='flex flex-wrap items-center justify-between gap-3 p-6 mb-3 text-gray-900 rounded-lg profile-heading word-wrap bg-darkYellow'>
      <div className='flex items-center w-full gap-5'>
        <img
          src={
            userObj.profile_image
              ? userObj.profile_image
              : '/images/sidebar/sidebar-logo.svg'
          }
          className='object-cover w-16 h-16 rounded-full profilePic'
          alt={userObj.profile_image.name}
        />
        <div className='w-full'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center main-per-name'>
              <h3 className='mr-3 text-xl font-semibold'>
                {userObj.firstName + ' ' + userObj.lastName}
              </h3>
              {userObj.isActive && (
                <CheckCircleIcon className='w-5 h-5 text-blue-500' />
              )}
            </div>
          </div>
          <div className='flex-wrap items-center mt-2 main-per-detail lg:flex gap-x-5 gap-y-2'>
            <div className='flex items-center call'>
              <PhoneIcon className='w-5 h-5' />

              <a className='ml-2'>
                {userObj.phone?.slice(0, 3) +
                  '-' +
                  userObj.phone?.slice(3, 6) +
                  '-' +
                  userObj.phone?.slice(6, 10)}
              </a>
            </div>
            <div className='flex items-center mail'>
              <EnvelopeIcon className='w-5 h-5' />

              <a className='ml-2'>{userObj.email}</a>
            </div>
            <div className='flex items-center mail'>
              <MapIcon className='w-5 h-5' />

              <p className='ml-2'>
                {address?.addressLine1 ? address.addressLine1 : ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileCard
