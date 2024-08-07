import React, { useEffect, useState } from 'react'
import useAlert from '@/components/Desk/Appointment/Alert/hooks/useAlert';


const PatientAlertTabPanel = ({ id }) => {


  
  const { listAlertData } = useAlert({ patientId: id });


  return (
    <>
      <div className='activity'>
        <div className='grid grid-cols-12 gap-2 mt-5'>
          <div className='col-span-12 lg:col-span-4 2xl:col-span-6'>
            <h3 className='font-medium'>Alerts</h3>
            <p className='text-sm text-gray-500'>Patiant alert history</p>
          </div>

        </div>



        <div className='relative grid gap-4 mt-4'>

          {listAlertData.length === 0 ? (
            <p>No alerts to display.</p>
          ) : (
            listAlertData.map((item, index) => (
              <AlertItem alertObj={item} key={index} />
            ))
          )}

        </div>



      </div>
    </>
  )
}

export default PatientAlertTabPanel
