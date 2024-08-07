import React from 'react'
import Link from 'next/link'
import useUserActivity from '@/components/Desk/Appointment/hooks/useUserActivity'
import moment from 'moment'

const UserActivity = ({ id }) => {
  const {
    activityList,
    getAllUserActivity,
    paginator = {},
  } = useUserActivity({
    id,
  })
  return (
    <div className='p-5 latest-activity'>
      <div className='latest-act-title flex-bet'>
        <h3 className='text-base font-medium'>Latest Activity</h3>
        {paginator?.hasNextPage && (
          <a
            className='cursor-pointer flex-ver text-blueBg'
            onClick={() => getAllUserActivity()}>
            View all
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-4 h-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='#0EA5E9'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </span>
          </a>
        )}
      </div>
      <div className='relative grid gap-4 mt-4 latest-activity-content'>
        {activityList.length === 0 ? (
          <div className='flex items-center justify-center mt-5 text-xl'>
            No Activity Found
          </div>
        ) : (
          <>
            {activityList.map((activity = {}) => (
              <div
                className='gap-3 single latest-act flex-ver'
                key={activity.id}>
                <div className='w-2 h-2 rounded-full activity-round bg-greenBg'></div>
                <div className=''>
                  <div className='flex-ver'>
                    <a className='mr-1 font-medium'>
                      {activity.userId?.firstName +
                        ' ' +
                        activity.userId?.lastName}
                    </a>
                    <p>
                      <span className='mx-1 text-blueBg'>
                        {activity.activityName}
                      </span>
                    </p>
                  </div>
                  <p className='text-sm text-gray-400'>
                    {moment(activity.updatedAt).format(
                      'dddd, MMMM DD, YYYY h:mm a'
                    )}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default UserActivity
