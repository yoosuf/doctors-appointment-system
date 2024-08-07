import React, { useEffect, useState } from 'react'
import moment from 'moment'
import SnapCrackButton from '@/widget/common-button'
import Loader from '@/widget/loader'
import Image from 'next/image'

const MembershipCard = ({
  userData, 
  currentMembership,
  onCancelMembership,
  openMembershipModal,
  loading,
}) => {
  const renewalDate = moment(currentMembership?.renewalDate).format(
    'MMMM DD, YYYY'
  )
  const cancellationRequestedDate = moment(
    currentMembership?.cancellationRequestedDate
  ).format('MMMM DD, YYYY')

  return (
    <div className="relative items-center">
      {loading && <Loader customClass='absolute' />}

      {!loading && (
        <>
          {currentMembership && Object.keys(currentMembership).length !== 0 ? (
            <div className='relative items-center justify-between p-6 mt-5 rounded-lg change-plan noselect bg-primary sm:flex'>
              <div className='w-full membership-text'>
                <div className='flex items-center justify-center sm:justify-start'>
                  <a
                    className={`active-tag px-3 text-xs rounded-full text-primary font-medium ${
                      currentMembership?.startDate ? 'bg-greenBg' : 'bg-redBg'
                    }`}>
                    {currentMembership?.status === 'active'
                      ? 'Active'
                      : 'In-Active'}
                  </a>

                  <p className='ml-2 text-sm'>
                    Started on{' '}
                    {moment(currentMembership?.startDate).format(
                      'MMMM DD, YYYY'
                    )}{' '}
                    {currentMembership?.cancellationRequestedDate
                      ? `Sceduled for cancelation on ${cancellationRequestedDate}`
                      : `renews on ${renewalDate}`}
                  </p>
                </div>
                <div className='mt-5 sm:text-left text-between '>
                  <div className='flex items-center justify-between'>
                    <div>
                      {currentMembership?.categories?.map(category => {
                        return (
                          <div key={category?._id}>
                            <p className='text-sm text-yellowBg'>
                              {category?.name} {category?.remainingQuota}/{' '}
                              {category.quota}
                            </p>
                          </div>
                        )
                      })}
                    </div>

                    <div>{currentMembership?.name}</div>
                  </div>

                  <div className='flex items-center justify-center gap-2 mt-2 sm:justify-start'>
                    {!currentMembership?.cancellationRequestedDate && (
                      <SnapCrackButton
                        type='button'
                        text='Cancel Membership'
                        className='inline-block px-4 py-2 mt-4 text-sm font-medium text-center text-gray-400 transition bg-transparent border border-gray-400 rounded-lg cursor-pointer'
                        onClick={onCancelMembership}
                      />
                    )}

                    {currentMembership?.cancellationRequestedDate ? (
                      <SnapCrackButton
                        type='button'
                        text='Re Subscribe'
                        className='inline-block px-4 py-2 mt-4 ml-3 text-sm font-medium text-center text-black transition border rounded-lg cursor-pointer bg-yellowBg border-yellowBg hover:bg-yellow-400 '
                        onClick={openMembershipModal}
                      />
                    ) : (
                      <SnapCrackButton
                        type='button'
                        text='Change Membership'
                        className='inline-block px-4 py-2 mt-4 ml-3 text-sm font-medium text-center text-black transition border rounded-lg cursor-pointer bg-yellowBg border-yellowBg hover:bg-yellow-400 '
                        onClick={openMembershipModal}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='relative p-6 mt-5 text-center rounded-lg bg-primary noselect'>
              <div className='mb-3'>
                <Image
                  src='/images/member.png'
                  width={137}
                  height={96}
                  placeholder='blur'
                  blurDataURL='/images/low_quality_member.png'
                />
              </div>
              <h3 className='font-bold'>Join SnapCrack Membership</h3>
              <p className='text-sm text-gray-400'>
                Get the best of SnapCrack to cater to your fast-paced lifestyle
                at an affordable cost.
              </p>
              <div>
                <SnapCrackButton
                  type='button'
                  text='Select Membership Package'
                  className='inline-block px-4 py-2 mt-4 ml-3 text-sm font-medium text-center text-black transition rounded-lg cursor-pointer bg-yellowBg hover:bg-yellow-400'
                  onClick={openMembershipModal}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default MembershipCard
