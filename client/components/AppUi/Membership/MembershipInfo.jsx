import React from 'react'

const SubscriptionDetail = ({ activeSubscription }) => {
  if (
    !activeSubscription ||
    !activeSubscription.categories ||
    !activeSubscription.categories.length
  ) {
    return <div>No Subscription</div>
  }

  // Check if activeSubscription is empty and expireAt is older than today
  const isSubscriptionExpired =
    (!activeSubscription.startDate ||
      !activeSubscription.renewalDate ||
      new Date(activeSubscription.cancellationRequestedDate) < new Date()) &&
    activeSubscription.cancellationRequestedDate

  // Temprory porpose only
  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  if (isSubscriptionExpired) {
    return <div>No Active Subscriptions avilable</div>
  }

  return (
    <>
      <div className='grid grid-cols-2 gap-4 subscription-details'>
        <div>
          <h5 className='text-lg font-semibold'>{activeSubscription.name}</h5>
        </div>
        <div className='grid grid-cols-2 col-span-2 gap-4'>
          <p>
            <strong>Subscribed at:</strong>{' '}
            {formatDate(activeSubscription.startDate)}
          </p>
          <p>
            <strong>Renews at:</strong>{' '}
            {formatDate(activeSubscription.renewalDate)}
          </p>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-4'>
        {activeSubscription?.categories?.map((plan = {}) => {
          if (plan) {
            const TOTAL_CREDITS = plan.quota
            const USED_CREDITS = plan.remainingQuota
            const widthOfCredits =
            USED_CREDITS > 0
                ? (USED_CREDITS * 100) / TOTAL_CREDITS
                : 0

            return (
              <SubscriptionPlan
                key={plan._id}
                plan={plan}
                remainingCredits={plan?.remainingQuota}
                totalCredits={plan?.quota}
                widthOfCredits={widthOfCredits}
              />
            )
          }
        })}
      </div>
    </>
  )
}

const SubscriptionPlan = ({
  plan,
  remainingCredits,
  totalCredits,
  widthOfCredits,
}) => (
  <div className='mt-4 rate'>
    <h6 className='text-sm font-medium'>{plan.name}</h6>
    <p className='mt-1 text-sm text-gray-400'>
      <span
        className={
          remainingCredits === 0
            ? 'text-red-500'
            : remainingCredits < totalCredits
            ? 'text-greenBg'
            : 'text-blueBg'
        }>
        {remainingCredits} / {totalCredits}
      </span>{' '}
      remaining
    </p>
    <div className='w-full h-2 mt-3 rounded-full progress bg-grayMid'>
      <div
        style={{ width: `${widthOfCredits}%` }}
        className={`h-2 w-full rounded-full ${
          remainingCredits === 0
            ? 'bg-red-500'
            : remainingCredits < totalCredits
            ? 'bg-greenBg'
            : 'bg-blueBg'
        }`}></div>
    </div>
  </div>
)

export default SubscriptionDetail
