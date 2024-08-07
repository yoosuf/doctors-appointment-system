import routes from '@/utils/routes'
import OnBoarding from '@/components/Customer/Onboard'
import React from 'react'
import privateRouteForPatient from '@/utils/privateRouteForPatient'

const OnBoardingIndex = ({ user }) => {
  return (
    <div>
      <OnBoarding user={user} />
    </div>
  )
}

export default OnBoardingIndex
export const getServerSideProps = privateRouteForPatient(routes.onBoarding)
