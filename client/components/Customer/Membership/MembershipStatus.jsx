import React, { useMemo } from 'react'

const MembershipStatus = ({ membershipItem }) => {
  const { _id, name, remainingQuota, quota } = membershipItem

  console.log(`${_id} ${name} ${remainingQuota} ${quota}`)

  const { widthOfQuota } = useMemo(() => {
    const widthOfQuota = remainingQuota > 0 ? (remainingQuota * 100) / quota : 0
    return { widthOfQuota }
  }, [remainingQuota, quota])

  return (
    <div key={_id} className='w-full p-4 sm:w-1/3 md:w-1/3 lg:w-1/3'>
      <div className='p-0 rounded-lg shadow-lg'>
        <h3 className='mb-4 text-gray-400 uppercase font-xs semibold'>
          {name}
        </h3>

        <p className='mt-1 text-sm text-gray-400'>
          <span
            className={
              remainingQuota === 0
                ? 'text-red-500'
                : remainingQuota < quota
                ? 'text-greenBg'
                : 'text-blueBg'
            }>
            {remainingQuota} / {quota}{' '}
          </span>
          remaining
        </p>
        <div
          className='w-full h-2 mt-3 rounded-full bg-grayMid'
          role='progressbar'
          aria-valuemin='0'
          aria-valuemax={quota}
          aria-valuenow={remainingQuota}
          aria-valuetext={`${remainingQuota} out of ${quota} credits remaining`}>
          <div
            style={{ width: `${widthOfQuota}%` }}
            className={`h-full rounded-full ${
              remainingQuota === 0
                ? 'bg-red-500'
                : remainingQuota < quota
                ? 'bg-greenBg'
                : 'bg-blueBg'
            }`}></div>
        </div>
      </div>
    </div>
  )
}

export default MembershipStatus
