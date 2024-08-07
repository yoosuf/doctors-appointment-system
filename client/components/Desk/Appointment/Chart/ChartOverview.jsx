import React, { useEffect } from 'react'
import CloseIcon from '@/widget/image/CloseIcon'
import useSOAP from '@/components/Desk/Appointment/hooks/useSOAP'
import Image from 'next/image'

const ChartOverview = ({ isOpen, closeModal, chartData }) => {
  const appointmentType = {
    SOAP: 'SOAP',
    DAILY_INTAKE: 'Daily intake',
    SOAP_NURSE: 'Nurse SOAP',
  }

  const { pointStyle, chartTemplateData } = useSOAP()

  const nurseSOAPFields = {
    blood_pressure: 'Blood Pressure',
    pervious_injection_iv: 'Previous Vitamin Injections/IVs',
    pervious_injection_iv_description: 'Description of Previous Injection',
    medication_allergy: 'Medication Allergy',
    medication_allergy_description: 'Description of Medication Allergy',
    other_allergy: 'Other Allergy',
    other_allergy_description: 'Description of Other Allergy',
    injection_type: 'Injection Type',
    injection_volume: 'Injection Volume',
    height: 'Height',
    weight: 'Weight',
    bmi: 'BMI',
    side_effects: 'Side Effects',
    iv_type: 'IV Injection',
    iv_injection_volume: 'IV Volume',
    recovery_injection_side: 'Injection Side',
    recovery_injection_side_text: 'Description of Injection Side',
  }

  const cleanValue = value => {
    return value.replace(/_/g, ' ').replace(/[^\w\s]/g, '')
  }

  useEffect(() => {}, [chartTemplateData])

  if (!isOpen) return null

  const renderDailyIntakeInfo = () => (
    <>
      <p>Patient name: {chartData?.name}</p>
      <p>
        Created by {chartData?.chiroId?.firstName}{' '}
        {chartData?.chiroId?.lastName}
      </p>
      <p>Note: {chartData?.desc}</p>
      <p>Blood pressure {chartData?.blood_pressure}</p>
      <p>Additional notes {chartData?.extra_note}</p>
    </>
  )

  const renderSoapInfo = () => (
    <>
      <p>Patient name: {chartData?.name}</p>
      <p>
        Created by: {chartData?.chiroId?.firstName}{' '}
        {chartData?.chiroId?.lastName}
      </p>
      <p>Subjective: {chartData?.subjective}</p>
      <p>Objective: {chartData?.objective}</p>
      <p>Assestment: {chartData?.assestment}</p>
      <p>Plans: {chartData?.plans}</p>

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
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[13]?.point}
              </a>
            </div>
            <div className='absolute bottom-6 right-12'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[14]?.point}
              </a>
            </div>
            <div className='absolute top-10 left-8'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[0]?.point}
              </a>
            </div>
            <div className='absolute top-8 left-13'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[1]?.point}
              </a>
            </div>
            <div className='absolute top-10 right-8'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[2]?.point}
              </a>
            </div>
            <div className='absolute top-14 left-13'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[3]?.point}
              </a>
            </div>
            <div className='absolute top-20 left-9'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[4]?.point}
              </a>
            </div>
            <div className='absolute top-20 left-13'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[5]?.point}
              </a>
            </div>
            <div className='absolute top-20 right-9'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[6]?.point}
              </a>
            </div>
            <div className='absolute top-26 left-13'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[7]?.point}
              </a>
            </div>
            <div className='absolute top-30 left-9'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[8]?.point}
              </a>
            </div>
            <div className='absolute top-30 left-13'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[9]?.point}
              </a>
            </div>
            <div className='absolute top-30 right-9'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[10]?.point}
              </a>
            </div>
            <div className='absolute top-36 right-2'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[12]?.point}
              </a>
            </div>
            <div className='absolute top-36 left-2'>
              <a href='#' className={pointStyle}>
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
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[19]?.point}
              </a>
            </div>
            <div className='absolute top-12 left-4'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[15]?.point}
              </a>
            </div>
            <div className='absolute top-16 left-10'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[16]?.point}
              </a>
            </div>
            <div className='absolute top-28 left-6'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[17]?.point}
              </a>
            </div>
            <div className='absolute left-0 top-32'>
              <a href='#' className={pointStyle}>
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
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[24]?.point}
              </a>
            </div>
            <div className='absolute top-16 left-4'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[21]?.point}
              </a>
            </div>
            <div className='absolute top-12 left-10'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[20]?.point}
              </a>
            </div>
            <div className='absolute top-28 right-6'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[22]?.point}
              </a>
            </div>
            <div className='absolute right-0 top-32'>
              <a href='#' className={pointStyle}>
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
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[32]?.point}
              </a>
            </div>
            <div className='absolute bottom-5 right-12'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[33]?.point}
              </a>
            </div>
            <div className='absolute top-13 left-6'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[25]?.point}
              </a>
            </div>
            <div className='absolute top-14 left-14'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[26]?.point}
              </a>
            </div>
            <div className='absolute top-13 right-6'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[27]?.point}
              </a>
            </div>
            <div className='absolute top-34 right-3'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[31]?.point}
              </a>
            </div>
            <div className='absolute top-34 left-3'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[30]?.point}
              </a>
            </div>
            <div className='absolute top-32 right-9'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[29]?.point}
              </a>
            </div>
            <div className='absolute top-32 left-9'>
              <a href='#' className={pointStyle}>
                {chartTemplateData?.[28]?.point}
              </a>
            </div>
          </div>
        </div>
      </div>

      <ul>
        {chartData?.chartData.map((item, index) => {
          const correspondingTemplateData = chartTemplateData.find(
            templateItem => {
              if (templateItem._id === item.pointId) {
                return true
              }
              return false
            }
          )

          return (
            <li key={index} className='mt-4'>
              <div className='flex items-center'>
                <div className='w-5 h-5 gap-3 text-xs font-semibold text-gray-900 rounded-full bg-yellowBg flex-cen'>
                  {correspondingTemplateData
                    ? correspondingTemplateData.point
                    : 'Not found'}
                </div>

                <div className='ml-2'>{item.desc}</div>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )

  return (
    <section
      id='chartOverviewModel'
      className='fixed inset-0 z-10 flex overflow-hidden text-sm activity-modal-main flex-column'
      aria-labelledby='slide-over-title'
      role='dialog'
      aria-modal='true'>
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className='absolute inset-0 transition-opacity bg-black black-layer'
          aria-hidden='true'
          onClick={closeModal}></div>
        <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal sm:pl-10'>
          <div className='w-screen max-w-2xl'>
            <div className='flex flex-col h-full shadow-xl bg-primary'>
              <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-base font-medium' id='slide-over-title'>
                    {appointmentType[chartData?.type]} Overview
                  </h2>
                  <div className='flex items-center ml-3 h-7'>
                    <button className='focus:outline-none' onClick={closeModal}>
                      <span className='sr-only'>Close panel</span>
                      <CloseIcon />
                    </button>
                  </div>
                </div>
              </div>
              <div
                className='relative flex flex-col p-4 modal-body'
                id='top-div-chartoverview'>
                {chartData?.type === 'DAILY_INTAKE' && renderDailyIntakeInfo()}
                {chartData?.type === 'SOAP' && renderSoapInfo()}
                {chartData?.type === 'SOAP_NURSE' && (
                  <>
                    <ul className='pl-5 list-disc'>
                      {chartData.chartData.map(item => {
                        const fieldName = nurseSOAPFields[item.key] || item.key
                        let renderedValue

                        if (Array.isArray(item.value)) {
                          renderedValue = (
                            <ul className='pl-10'>
                              {item.value.map((subItem, index) => (
                                <li key={index}>
                                  {subItem.key} :{subItem.value}
                                  {/* {Object.keys(subItem)[key]}: {subItem[Object.keys(subItem)[value]]} */}
                                </li>
                              ))}
                            </ul>
                          )
                        } else {
                          renderedValue = item.value
                        }

                        return (
                          <li key={item.key}>
                            <strong>{fieldName}: </strong> {renderedValue}
                          </li>
                        )
                      })}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default React.memo(ChartOverview)
