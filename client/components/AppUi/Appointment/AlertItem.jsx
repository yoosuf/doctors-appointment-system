import React from 'react';
import RealTimeTimeago from '../Miscellaneous/RealTimeTimeago';

function AlertItem({ alertObj }) {
  return (
    <div className='flex gap-3 p-5 mt-1 rounded-lg single-visit patient-pref bg-grayMid'>
      <div className='w-10 h-10 flex-cen'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-5 h-5'
          viewBox='0 0 20 20'
          fill='#9CA3AF'>
          <path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z' />
        </svg>
      </div>
      <div>

        <RealTimeTimeago timestamp={alertObj.createdAt} />


        {alertObj.body && (
          <p className='pt-1 mt-4 text-sm'>
            {alertObj.body}
          </p>
        )}



        {alertObj.createdBy && (
          <p className='pt-1 mt-4 text-sm'>
            Created by: {(alertObj.createdBy.firstName || alertObj.createdBy.lastName)
              ? `${alertObj.createdBy.firstName} ${alertObj.createdBy.lastName}`
              : 'Chiropractor'}
          </p>
        )}

      </div>
    </div>
  );
}

export default AlertItem;
