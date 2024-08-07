import React from 'react';
import RealTimeTimeago from '../../AppUi/Miscellaneous/RealTimeTimeago';

import {
  CalendarIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'

function AppointmentItem({ key, appointment }) {
  return (
    <div className='flex gap-3 p-5 mt-4 rounded-lg single-visit patient-pref bg-grayMid' key={key}>
      <div className='w-10 h-10 flex-cen'>
        <CalendarIcon className='w-6 h-8 text-gray-400' />
      </div>
      <div>
        <h4>{appointment.locationId?.locationName}</h4>
        {/* <div className='status flex-end'> */}
          {/* <p>{appointment.status}</p> */}
        {/* </div> */}
       
        <span className='text-sm text-gray-400'>
          Checked in  <RealTimeTimeago timestamp={appointment?.date} />
        </span>

        <ul>
          {appointment.services?.map((service = {}) => (
            <li className='pt-1 pb-1 text-sm' key={service._id}>
              {service._id.name} with  {service.servedBy} and {service.status}
            </li>
          ))}
        </ul>
        {appointment.remarks && (
          <p className='pt-1 mt-4 text-sm'>
            The Appointment was {appointment.status} due to {appointment.remarks}
          </p>
        )}
      </div>
    </div>
  );
}

export default AppointmentItem;
