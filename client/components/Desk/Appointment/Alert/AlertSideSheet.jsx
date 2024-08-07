import React, { useEffect } from 'react';
import CloseIcon from '@/widget/image/CloseIcon';
import { TextareaField } from '@/components/AppUi/Form/TextareaField';
import usePatientAlert from '@/components/Desk/Appointment/Alert/hooks/useAlert';

const AlertSideSheet = ({ isOpen, closeModal, closeParentModel,  patientId  }) => {

    const { formik } = usePatientAlert({closeModal, patientId, closeParentModel});

    return (
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
                                        Add an alert
                                    </h2>
                                    <div className='flex items-center ml-3 h-7'>
                                        <button className='focus:outline-none' onClick={closeModal}>
                                            <span className='sr-only'>Close panel</span>
                                            <CloseIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='relative flex flex-col p-4 modal-body' id='top-div-chartoverview'>


                                    <TextareaField
                                        id="body"
                                        label="Alert"
                                        placeholder={`Add an alert`}
                                        required={true}
                                        formik={formik}
                                        rows={`5`}
                                        customClass={`mt-4 mb-4`}
                                        type="text"
                                    />



                                </div>

                                <div className='flex-wrap gap-1 p-5 border-t modal-footer border-grayLight flex-bet'>
                                    <div></div>
                                    <div className='flex-wrap gap-2 flex-ver'>
                                        <button
                                            type='button'
                                            className='block px-4 py-2 text-sm font-medium text-center transition border border-gray-700 rounded-lg bg-transprent hover:border-yellowBg undefined'
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type='submit'
                                            className='inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg sm:px-4 hover:bg-yellow-400'
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(AlertSideSheet);
