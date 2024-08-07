import Informed from '@/components/Customer/Onboard/InformedStep'
import React from 'react'
import privateRouteForPatient from '@/utils/privateRouteForPatient'
import routes from '@/utils/routes'

const InformedIndex = ({ user }) => {
  return (
    <div>
      <Informed user={user} />
    </div>
  )
}

export default InformedIndex
export const getServerSideProps = privateRouteForPatient(routes.onbardSign)
