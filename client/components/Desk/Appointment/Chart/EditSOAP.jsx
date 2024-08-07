import React, { useEffect } from 'react'
import Image from 'next/image'
import { OutlineBtn, YellowBtn } from '../../../../widget/button/YellowBTN'
import CloseIcon from '@/widget/image/CloseIcon'
import useEditSOAP from '@/components/Desk/Appointment/hooks/useEditSOAP'
import DeleteIcon from '@/widget/image/DeleteIcon'
import AsyncSelect from 'react-select/async'
import { baseUrl, customStyles, sidebarLogoUrl } from '@/utils/helper'
import Loader from '@/widget/loader'
import { TextareaField } from '../../../AppUi/Form/TextareaField'
import Avatar from '../../../AppUi/User/Avatar'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const EditSOAPSheet = ({
    openEditSOAPModal = () => { },
    closeEditSOAPModal = () => { },
    activeSOAPChart,
    appointmentDetail = {},
    listAllChart = () => { },
    editSOAP,
    setEditSOAP = () => { },
    patientId = {},
    identify,
    clearSoapData
}) => {
    const {
        loading,
        chartTemplateData,
        onAddPoint,
        selectedPoint,
        onDeletePoint,
        onChangeText,
        patientVisible,
        setPatientVisible,
        viewableOptions,
        formik,
        closeBtn,
        pointStyle,
        editID,
        selectedViewable,
        setSelectedViewable,
    } = useEditSOAP({
        activeSOAPChart,
        openEditSOAPModal,
        closeEditSOAPModal,
        editSOAP,
        setEditSOAP,
        appointmentDetail,
        listAllChart,
        patientId,
        identify,
        clearSoapData
    })



    return (
        <>
            <section
                id='editSoapChartSheet'
                className='fixed inset-0 z-10 overflow-hidden text-sm activity-modal-main'
                aria-labelledby='slide-over-title'
                role='dialog'
                aria-modal='true'>
                <div className='absolute inset-0 overflow-hidden'>
                    <div
                        className='absolute inset-0 transition-opacity bg-black black-layer'
                        aria-hidden='true'
                        onClick={() => closeBtn()}></div>
                    <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal sm:pl-10'>
                        <div className='w-screen max-w-4xl'>
                            <div className='flex flex-col h-full shadow-xl bg-primary'>
                                <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <h2
                                                className='text-base font-medium'
                                                id='slide-over-title'>
                                                {editID ? 'Edit' : 'Add'} SOAP chart
                                            </h2>

                                        </div>
                                        <div className='flex items-center ml-3 h-7'>
                                            <button
                                                type='button'
                                                onClick={e => {
                                                    e.preventDefault()
                                                    closeBtn()
                                                }}
                                                className='focus:outline-none '>
                                                <span className='sr-only'>Close panel</span>
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className='relative flex-1 p-4 modal-body'>
                                        <div className=''>
                                            <div className='text-sm border single-chart-detail rounded-xl border-grayMid sm:text-md'>

                                                <div className='flex-wrap items-center justify-between p-4 chart-detail-header rounded-t-xl bg-grayMid md:flex'>
                                                    <div className='flex items-center justify-center md:justify-end'>
                                                        <span className='flex items-center chart-profile'>



                                                            <Avatar
                                                                imageUrl={patientId.profile_image?.uri}
                                                                userType={`Patient`}
                                                                size={`h-6 w-6`}
                                                            />

                                                            <span className='ml-3'>
                                                                {`${patientId?.firstName} ${patientId?.lastName}`}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className='p-4 chart-text'>
                                                    <h3 className='mb-3 font-medium'>SOAP Template</h3>
                                                    <div className='grid gap-3'>
                                                        <TextareaField
                                                            id='subjective'
                                                            label='Subjective'
                                                            placeholder='Enter subjective'
                                                            formik={formik}
                                                        />

                                                        <TextareaField
                                                            id='objective'
                                                            label='Objective'
                                                            placeholder='Enter objective'
                                                            formik={formik}
                                                        />
                                                        <TextareaField
                                                            id='assestment'
                                                            label='Assessment'
                                                            placeholder='Enter assessment'
                                                            formik={formik}
                                                        />
                                                        <TextareaField
                                                            id='plans'
                                                            label='Plans'
                                                            placeholder='Enter plans'
                                                            formik={formik}
                                                        />
                                                        <div className='mt-5 mb-3'>
                                                            <h3 className='font-medium'>Body chart</h3>
                                                        </div>
                                                        <div className='gap-3 p-6 body-chart-pic bg-grayMid rounded-xl flex-ver'>

                                                            <div className='flex flex-wrap items-center justify-around w-full gap-3'>
                                                                <div className='relative body-pic'>
                                                                    <Image
                                                                        src='/images/chiro/body-chart1.svg'
                                                                        width={137}
                                                                        height={308}
                                                                        alt=''
                                                                    />
                                                                    {/**points first body */}
                                                                    <div className='absolute bottom-6 left-12'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[13])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[13]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute bottom-6 right-12'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[14])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[14]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-10 left-8'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[0])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[0]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-8 left-13'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[1])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[1]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-10 right-8'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[2])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[2]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-14 left-13'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[3])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[3]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-20 left-9'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[4])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[4]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-20 left-13'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[5])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[5]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-20 right-9'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[6])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[6]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-26 left-13'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[7])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[7]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-30 left-9'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[8])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[8]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-30 left-13'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[9])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[9]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-30 right-9'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[10])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[10]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-36 right-2'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[12])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[12]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-36 left-2'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[11])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[11]?.point}
                                                                        </a>
                                                                    </div>
                                                                </div>

                                                                <div className='relative body-pic'>
                                                                    <Image
                                                                        src='/images/chiro/body-chart2.svg'
                                                                        width={72}
                                                                        height={299}
                                                                        alt=''
                                                                    />
                                                                    <div className='absolute bottom-5 left-7'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[19])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[19]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-12 left-4'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[15])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[15]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-16 left-10'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[16])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[16]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-28 left-6'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[17])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[17]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute left-0 top-32'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[18])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[18]?.point}
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div className='relative body-pic'>
                                                                    <Image
                                                                        src='/images/chiro/body-chart3.svg'
                                                                        width={74}
                                                                        height={299}
                                                                        alt=''
                                                                    />
                                                                    <div className='absolute bottom-5 left-7'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[24])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[24]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-16 left-4'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[21])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[21]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-12 left-10'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[20])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[20]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-28 right-6'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[22])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[22]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute right-0 top-32'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[23])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[23]?.point}
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div className='relative body-pic'>
                                                                    <Image
                                                                        src='/images/chiro/body-chart4.svg'
                                                                        width={138}
                                                                        height={307}
                                                                        alt=''
                                                                    />
                                                                    <div className='absolute bottom-5 left-12'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[32])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[32]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute bottom-5 right-12'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[33])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[33]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-13 left-6'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[25])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[25]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-14 left-14'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[26])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[26]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-13 right-6'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[27])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[27]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-34 right-3'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[31])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[31]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-34 left-3'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[30])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[30]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-32 right-9'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[29])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[29]?.point}
                                                                        </a>
                                                                    </div>
                                                                    <div className='absolute top-32 left-9'>
                                                                        <a
                                                                            onClick={e =>
                                                                                onAddPoint(e, chartTemplateData?.[28])
                                                                            }
                                                                            className={pointStyle}>
                                                                            {chartTemplateData?.[28]?.point}
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        {selectedPoint?.map((selected = {}) => (
                                                            <div key={selected._id}>
                                                                <div className='flex gap-3'>
                                                                    <div className='w-5 h-5 gap-3 text-xs font-semibold text-gray-900 rounded-full bg-yellowBg flex-cen'>
                                                                        <p>{selected.point}</p>
                                                                    </div>
                                                                    <textarea
                                                                        id={selected._id}
                                                                        placeholder='Enter text'
                                                                        rows='2'
                                                                        value={selected.desc}
                                                                        onChange={onChangeText}
                                                                        className='w-full col-span-12 p-3 text-white placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'></textarea>
                                                                </div>
                                                                <div className='mt-2 text-right'>
                                                                    <a
                                                                        onClick={e =>
                                                                            onDeletePoint(e, selected._id)
                                                                        }
                                                                        className='inline-flex items-center gap-2 px-4 py-2 text-sm text-center text-gray-500 transition border border-gray-700 rounded-lg cursor-pointer noselect bg-transprent hover:border-yellowBg'>
                                                                        <span>Delete</span>
                                                                        <DeleteIcon className='w-5 h-5' />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className='flex-wrap gap-3 p-4 mt-4 border-t flex-bet border-grayMid'>
                                                    <div className='grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:w-auto'>
                                                        <div className='sm:w-48'>
                                                            <AsyncSelect
                                                                styles={customStyles}
                                                                isSearchable={false}
                                                                className='text-sm'
                                                                placeholder='Select Viewable'
                                                                id='viewableByEveryoneId'
                                                                defaultOptions={viewableOptions}
                                                                value={viewableOptions.find(el => el.value === selectedViewable)}
                                                                onChange={data => {
                                                                    formik.setFieldValue(
                                                                        'viewableByEveryoneId',
                                                                        data?.value
                                                                    )
                                                                    if (data === null) {
                                                                        setSelectedViewable({})
                                                                    } else {
                                                                        setSelectedViewable(data)
                                                                    }
                                                                }}
                                                            />
                                                            {formik.touched.viewableByEveryoneId &&
                                                                formik.errors.viewableByEveryoneId && (
                                                                    <div className='pt-1 pl-1 text-xs text-redAlert'>
                                                                        {formik.errors.viewableByEveryoneId}
                                                                    </div>
                                                                )}
                                                        </div>

                                                        {/* <div> */}
                                                        <button
                                                            type='button'
                                                            onClick={e => {
                                                                e.preventDefault()
                                                                setPatientVisible(!patientVisible)
                                                            }}
                                                            className={`py-2 px-3 Pain-num overflow-hidden cursor-pointer rounded-lg inline-block ${!patientVisible
                                                                ? 'border-grayLight text-gray-400 border'
                                                                : 'bg-yellowBg text-black'
                                                                }`}>
                                                            {patientVisible
                                                                ? 'Visible To Patient'
                                                                : 'Not Visible To Patient'}
                                                        </button>
                                                        {/* </div> */}
                                                    </div>

                                                    <div className='grid w-full grid-cols-2 gap-3 sm:w-auto'>
                                                        <OutlineBtn
                                                            btnText='Close'
                                                            customclassName='text-gray-400'
                                                            onClick={e => {
                                                                e.preventDefault(), closeBtn()
                                                            }}
                                                        />

                                                        <button
                                                            type='submit'
                                                            className='inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg sm:px-4 hover:bg-yellow-400'>
                                                            Sign
                                                            <span>
                                                                <svg
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    className='w-4 h-4 ml-1'
                                                                    viewBox='0 0 20 20'
                                                                    fill='currentColor'>
                                                                    <path
                                                                        fillRule='evenodd'
                                                                        d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                                                                        clipRule='evenodd'></path>
                                                                </svg>
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {loading && <Loader customClass='absolute' />}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EditSOAPSheet
