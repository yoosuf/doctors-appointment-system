import React, { useEffect } from 'react'
import usePatientAlert from '@/components/Desk/Appointment/Alert/hooks/useAlert';
import AlertItem from '@/components/AppUi/Appointment/AlertItem';
import Loader from '@/widget/loader';

const AlertsTabPanel = ({ patientId }) => {

  const { loading, listAlertData } = usePatientAlert({ patientId });

  return (
    <div className='p-5 latest-activity'>
      <div className='latest-act-title flex-bet'>
        <h3 className='text-base font-medium'>Alerts</h3>

      </div>
      <div className='relative grid gap-4 mt-4'>

        {!loading ? (
          listAlertData?.length === 0 ? (
            <p>No alerts to display.</p>
          ) : (
            listAlertData.map((item, index) => (
              <AlertItem alertObj={item} key={index} />
            ))
          )
        ) : (
          <Loader customClass='inherit' />
        )
        }


      </div>
    </div>
  )
}

export default AlertsTabPanel
