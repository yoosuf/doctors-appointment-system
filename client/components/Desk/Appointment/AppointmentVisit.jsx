import React from 'react';
import useAppointmentHistory from '@/components/Desk/Appointment/hooks/useAppointmentHistory';
import AppointmentItem from '@/components/Customer/Appointment/AppointmentItem';
import Loader from '@/widget/loader';

function AppointmentVisit({ id }) {

  const { loading, prevAppointmentList, nextAppointmentList } = useAppointmentHistory(id);

  const renderAppointmentList = (list, title, linkTo) => {
    return (
      <>
        <div className='latest-act-title flex-bet'>
          <h3 className='text-base font-medium'>{title}</h3>
          {/* <Link href={linkTo}>
            <a className='flex-ver text-blueBg'>
              View all
              <span>
                <ArrowIco />
              </span>
            </a>
          </Link> */}
        </div>
        {list?.length === 0 ? (
          <div className='flex items-center justify-center my-4'>
            {`No ${title} Found`}
          </div>
        ) : (
          list?.map((item = {}) => (
            <AppointmentItem key={item.id} appointment={item} />
          ))
        )}

        {(loading) && <Loader customClass='inherit' />}

      </>
    );
  };

  return (
    <div className='p-5 visit'>
      {renderAppointmentList(
        nextAppointmentList,
        'Upcoming Appointments',
        '#'
      )}
      {renderAppointmentList(
        prevAppointmentList,
        'Previous Visits',
        '#'
      )}
    </div>
  );
}

export default AppointmentVisit;