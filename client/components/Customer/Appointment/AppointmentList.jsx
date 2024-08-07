import React from 'react'
import AppointmentItem from '@/components/Customer/Appointment/AppointmentItem'
import Loader from '@/widget/loader'
import useVisitHistory from '@/components/Customer/Appointment/hooks/useVisitHistory'

const AppointmentList = ({ userData }) => {
  const { loading, visitHistory } = useVisitHistory(userData._id)

  const renderAppointmentList = (list, title) => {
    if (!loading && (!list || list.length === 0)) {
      return (
        <div className='flex items-center justify-center my-4'>
          {`No Appointments Found`}
        </div>
      )
    }

    return (
      <>
        <div className='latest-act-title flex-bet'>
          <h3 className='text-base font-medium'>{title}</h3>
        </div>
        {list.map((item, index) => (
          <AppointmentItem key={index} appointment={item} />
        ))}
      </>
    )
  }

  return (
    <div className="relative items-center activity">

      {!loading && (
        <div className='p-5 mt-8 visit'>
          {renderAppointmentList(visitHistory, 'All Appointments')}
        </div>
      )}
      {loading && <Loader customClass='absolute' />}
    </div>
  )
}

export default AppointmentList
