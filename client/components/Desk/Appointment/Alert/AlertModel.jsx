import React, { useState, Fragment, useEffect } from 'react'
import CloseIcon from '@/widget/image/CloseIcon'
import Loader from '@/widget/loader'
import usePatientAlert from '@/components/Desk/Appointment/Alert/hooks/useAlert'
import AlertItem from '@/components/AppUi/Appointment/AlertItem';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const AlertModel = ({
    isOpen,
    closeModal,
    patientId,
}) => {

    const { loading, listAlertData } = usePatientAlert({ patientId });

    return (
        <>
            <section
                className={`text-sm activity-modal-main fixed inset-0 overflow-hidden z-10 flex flex-column ${isOpen ? 'active' : ''}`}
                aria-labelledby='slide-over-title'
                role='dialog'
                aria-modal='true'>
                <div className='absolute inset-0 overflow-hidden'>
                    <div className='absolute inset-0 transition-opacity bg-black black-layer' aria-hidden='true' onClick={closeModal}></div>
                    <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal sm:pl-10'>
                        <div className='w-screen max-w-2xl'>
                            <div className='flex flex-col h-full shadow-xl bg-primary'>
                                <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                                    <div className='flex items-center justify-between'>
                                        <h2 className='text-base font-medium' id='slide-over-title'>
                                            Alerts
                                        </h2>
                                        <div className='flex items-center ml-3 h-7'>
                                            <button className='focus:outline-none' onClick={closeModal}>
                                                <span className='sr-only'>Close panel</span>
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='relative flex flex-col p-4 modal-body' id='top-div-chartoverview'>





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
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}


export default React.memo(AlertModel);
