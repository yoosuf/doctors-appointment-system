import EditIcon from '@/widget/image/EditIcon'
import Loader from '@/widget/loader'
import React, { useEffect, useState } from 'react'
import EditProfile from '@/components/Customer/Profile/EditProfile'
import MmebershipInfoCard from '@/components/Customer/Membership/MmebershipInfo'
import useSubscription from '../Membership/hooks/useSubscription'
import {
  formattedMembershipObj,
  transformMembershipData,
} from '@/utils/membership'

const PatientHome = ({ userData, setUser, location }) => {
  const [loading, setLoading] = useState(false)
  const { addressIds, locationIds, invitationReward } = userData
  const address = addressIds?.[0]?.address
  const locationName = locationIds?.[0]?.locationName
  const [profileActive, setProfileActive] = useState(false)

  const openProfileModal = async () => {
    await setProfileActive(true)
  }

  useEffect(() => {
    if (location === false) {
      openProfileModal()
    }
  }, [location])

  const { loading: membershipLoader, invitationData, subscriptionData } = useSubscription({ userData })

  return (
    <>
      <div className='relative grid gap-6 patientHome'>
        <MmebershipInfoCard
          subscriptionObj={subscriptionData}
          memberCreatedAt={userData?.createdAt}
          invitationObj={invitationData}
          loading={membershipLoader}
        />

        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-12'>
            <div className='p-5 overview bg-primary noselect rounded-xl'>
              <div className='flex items-center justify-between heading '>
                <h3 className='font-semibold'>Profile</h3>
                <a
                  className='flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer bg-grayMid'
                  onClick={openProfileModal}>
                  <EditIcon className='w-4 h-4' color='#9CA3AF' />
                </a>
              </div>
              <div className='grid mt-4 sm:grid-cols-2 gap-7'>
                <div>
                  <h4 className='text-sm font-medium'>Full Name</h4>
                  <p className='mt-1 text-sm text-gray-400'>
                    {userData.firstName + ' ' + userData.lastName}
                  </p>
                </div>
                <div>
                  <h4 className='text-sm font-medium'>Age/Gender</h4>
                  <p className='mt-1 text-sm text-gray-400'>
                    {new Date().getFullYear() -
                      new Date(userData.dob).getFullYear()}{' '}
                    yr / {userData.genderId}
                  </p>
                </div>
                <div>
                  <h4 className='text-sm font-medium'>Email</h4>
                  <div className='flex items-center mt-1'>
                    <p className='ml-0 text-sm text-gray-400'>
                      {userData.email}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className='text-sm font-medium'>Phone Number</h4>
                  <div className='flex items-center mt-1'>
                    <p className='ml-0 text-sm text-gray-400'>
                      {userData.phone?.slice(0, 2) +
                        '-' +
                        userData.phone?.slice(2, 5) +
                        '-' +
                        userData.phone?.slice(5, 8) +
                        '-' +
                        userData.phone?.slice(8, 11) +
                        '-' +
                        userData.phone?.slice(11, 15)}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className='text-sm font-medium'>Address</h4>
                  <div className='flex items-center mt-1'>
                    <p className='text-sm text-gray-400'>
                      {address?.addressLine1 +
                        ', ' +
                        (address?.addressLine2
                          ? address?.addressLine2 + ', '
                          : '') +
                        address?.cityId +
                        ', ' +
                        address?.provinceId +
                        ', ' +
                        address?.postalCodeId +
                        ', '}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className='text-sm font-medium'>Location</h4>
                  <div className='flex items-center mt-1'>
                    <p className='ml-0 text-sm text-gray-400'>
                      {locationName || '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading && <Loader customClass='absolute' />}
      </div>
      <EditProfile
        profileActive={profileActive}
        setProfileActive={setProfileActive}
        setUser={setUser}
        location={location}
      />
    </>
  )
}

export default PatientHome
