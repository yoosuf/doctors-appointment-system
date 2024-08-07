import RefferalInformation from '@/components/Customer/Onboard/Referralnformation'
import React from 'react'
import privateRouteForPatient from '@/utils/privateRouteForPatient'
import routes from '@/utils/routes'

const RefferalInformationIndex = ({ user }) => {
  return (
    <div>
      <RefferalInformation user={user} />
    </div>
  )
}

export default RefferalInformationIndex
export const getServerSideProps = privateRouteForPatient(
  routes.RefferalInformation
)
