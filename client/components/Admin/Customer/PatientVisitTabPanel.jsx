import AppointmentItem from '@/components/Customer/Appointment/AppointmentItem';
import useAppointmentHistory from '@/components/Desk/Appointment/hooks/useAppointmentHistory';
import React, { useEffect, useState } from 'react'


const PatientVisitTabPanel = (id) => {


    const { prevAppointmentList, nextAppointmentList } = useAppointmentHistory(id);


    useState(() => {
        console.log(prevAppointmentList)

        console.log(nextAppointmentList)
    }, [nextAppointmentList, prevAppointmentList])


    const renderAppointmentList = (list, title, linkTo) => {
        return (
            <>
                <div className='latest-act-title flex-bet'>
                    <h2 className='text-base font-medium'>{title}</h2>
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
            </>
        );
    };

    return (
        <div className='activity'>
            <div className='grid grid-cols-12 gap-2 mt-5'>
                <div className='col-span-12 lg:col-span-4 2xl:col-span-6'>
                    <h3 className='font-medium'>Visits</h3>
                    <p className='text-sm text-gray-500'>Patient vist history</p>
                </div>
            </div>

            <div className='p-0 visit'>
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

        </div>
    );


}

export default PatientVisitTabPanel
