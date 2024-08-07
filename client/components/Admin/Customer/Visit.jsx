import React, { useEffect, useState } from 'react'
import ActivityModal from './ActivityModal'
import AppointmentItem from '@/components/Customer/Appointment/AppointmentItem'
import usePatientVisitHistory from '@/components/Customer/Appointment/hooks/useVisitHistory'

const UserManagementVisit = ({ id }) => {

    const { visitHistory } = usePatientVisitHistory(id);


    const renderAppointmentList = (list, title, linkTo) => {
        return (
            <>
                <div className='latest-act-title flex-bet'>
                    <h3 className='text-base font-medium'>{title}</h3>
                </div>
                {list?.length === 0 ? (
                    <div className='flex items-center justify-center my-4'>
                        {`No ${title} Found`}
                    </div>
                ) : (
                    list?.map((item = {}) => (
                        <>

                        <AppointmentItem key={item.id} appointment={item} />

                        </>
                    ))
                )}
            </>
        );
    };

    return (
        <>
            <div className='activity'>
                <div className='grid grid-cols-12 gap-2 mt-5'>
                    <div className='col-span-12 lg:col-span-4 2xl:col-span-6'>
                        <h3 className='font-medium'>Visits</h3>
                        <p className='text-sm text-gray-500'>Visits</p>
                    </div>
                </div>

                {/* table */}
                <div className='mt-8 '>
                    <div className='p-5 visit'>
                        {renderAppointmentList(
                            visitHistory,
                            'All Appointments',
                            '#'
                        )}
                    </div>
                </div>
                {/* /table */}

                <ActivityModal />
            </div>
        </>
    )
}

export default UserManagementVisit
