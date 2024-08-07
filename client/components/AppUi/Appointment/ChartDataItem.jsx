import React from 'react';
import moment from 'moment'
import Link from 'next/link'

const ChartItem = ({
    data,
    setModalChartData,
    openChartModal,
    openEditModal,
    logedInuser,
}) => {
    const clinician = data?.creatorId ;

    // const updateData = isSoap ? updateSoapData : updateIntakeData;
    // const openEditModal = isSoap
    //     ? openEditSOAPModal
    //     : isSoapNurse
    //         ? openNurseSOAPModal // Replace with the actual modal function for SOAP_NURSE
    //         : openEditDailyIntakeModal;


    const appointmentType = {
        SOAP: "SOAP",
        DAILY_INTAKE: "Daily intake",
        SOAP_NURSE: "Nurse SOAP"
    };

    return (
        <>

            <div className='p-3 mt-3 rounded-lg bg-grayMid' key={data.id}>
                <div className='grid items-center justify-between gap-2 sm:flex sm:grid-none'>
                    <div>
                        <p>
                            {moment(data.createdAt).format('MMM DD, yyyy')}
                            <span className='ml-4 mr-1 text-grey'>
                                {appointmentType[data.type]} by
                            </span>
                            <span className='ml-1 text-yellowBg'>
                                {`${clinician?.firstName} ${clinician?.lastName}`}
                            </span>
                        </p>
                    </div>
                    <div className='flex-ver'>
                        <a
                            href='#'
                            className='mr-4 ml- chart-profile' onClick={(e) => {
                                setModalChartData(data);
                                openChartModal();
                            }}>
                            View
                        </a>

                        {logedInuser?.id === clinician?._id && (
                            <a
                                href='#'
                                className='w-5 h-5 mr-2'
                                onClick={e => {
                                    e.stopPropagation(); // To prevent parent's click
                                    e.preventDefault(); // To prevent href jump
                                    openEditModal(e, data);
                                }}
                            >
                                Edit
                            </a>
                        )}

                        <a className='ml-4 chart-profile'>
                            <img
                                src={`${process.env.NEXT_PUBLIC_API_END_POINT}${clinician?.profile_image?.uri}`}
                                className='w-6 h-6 rounded-full'
                                alt=''
                            />
                        </a>
                    </div>
                </div>
                <p className='mt-2 text-gray-400'>
                    {/* the SOAP notes should be added as summery on data.desc in future */}
                    {/* data.subjective should be inside the chartData */}
                    {data.desc ?? data.subjective}
                </p>
            </div>
        </>
    );
}

export default ChartItem;
