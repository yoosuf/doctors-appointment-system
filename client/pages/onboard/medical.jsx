import MedicalHistory from '@/components/Customer/Onboard/MedicalHistory'
import React from 'react'
import privateRouteForPatient from '@/utils/privateRouteForPatient'
import routes from '@/utils/routes'

const MedicalHistoryIndex = ({ user }) => {
  return (
    <div>
      <MedicalHistory user={user} />
    </div>
  )
}

export default MedicalHistoryIndex
export const getServerSideProps = privateRouteForPatient(routes.onbardMedicalHistory)
