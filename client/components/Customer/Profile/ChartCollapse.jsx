import { baseUrl } from '@/utils/helper'
import DownArrow from '@/widget/image/DownArrow'
import RightArrow from '@/widget/image/RightArrow'
import React, { useState } from 'react'
import { Collapse } from 'react-collapse'
import moment from 'moment'
import { APPOINTMENT_CHART_TYPE } from '@/utils/constant'
import CalenderIcon from '@/widget/image/CalenderIcon'
import Image from 'next/image'

const ChartCollapse = ({
  chart = {},
  chartTemplateData = [],
  onExportChart = () => {},
}) => {
  const [isOpened, setIsOpened] = useState(false)
  const pointStyle =
    'cursor-pointer no-select relative body-num flex-cen bg-yellowBg rounded-full h-5 w-5 text-gray-900 z-10 font-medium'

  return (
    <>
      {chart.patientVisible && (
        <div
          key={chart.id}
          className='mt-4 overflow-hidden text-sm border single-chart-detail noselect rounded-xl border-grayMid sm:text-md'>
          <div className='flex flex-col justify-between p-5 cursor-pointer sm:flex-row sm:items-center chart-detail-header gap-y-3 bg-grayMid'>
            <div className='flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5'
                viewBox='0 0 20 20'
                fill={chart.pinned ? '#EFB100' : 'currentColor'}>
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
              <h4 className='ml-3'>
                {moment(chart.updatedAt).format('MMM DD, YYYY')}{' '}
                {chart.patientId?.fullName}
              </h4>
            </div>

            <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5'>
              {/* <Link href='#'>
                <a className='ml-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-5 h-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='#9CA3AF'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'></path>
                  </svg>
                </a>
              </Link> */}

              <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5'>
                <a className='flex items-centerchart-profile'>
                  <img
                    src={baseUrl + chart.creatorId?.profile_image?.uri}
                    className='w-6 h-6 rounded-full'
                    alt='Snapcrack'
                  />
                  <span className='ml-3'>
                    {chart.creatorId?.fullName }
                  </span>
                </a>

                <div className='flex items-center justify-between gap-5 sm:justify-center collpse-arrow sm:gap-3'>
                  <button
                    onClick={e => onExportChart(e, chart.id, chart.type)}
                    className='w-full px-2 py-1 text-black border rounded-lg cursor-pointer border-yellowBg bg-yellowBg'>
                    Export
                  </button>
                  <a onClick={() => setIsOpened(prev => !prev)}>
                    {isOpened ? <DownArrow /> : <RightArrow />}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Collapse
            isOpened={isOpened}
            initialStyle={{ height: 0, overflow: 'hidden' }}>
            {/* <div style={{height}} className="blob" /> */}
            <div className='chart-text'>
              <p className='p-4 text-sm text-gray-400'>
                {chart.type === APPOINTMENT_CHART_TYPE.SOAP ? (
                  <>
                    <h1 className='mb-1 text-white'>Body Chart</h1>
                    <div className='flex flex-wrap items-center justify-around w-full gap-3 py-3 rounded-lg bg-grayMid'>
                      <div className='relative body-pic'>
                        <Image
                          src='/images/chiro/body-chart1.svg'
                          width={137}
                          height={308}
                          alt=''
                        />
                        {/**points first body */}
                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[13]?._id
                        ) && (
                          <div className='absolute bottom-6 left-12'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[13]?.point}
                            </a>
                          </div>
                        )}

                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[14]?._id
                        ) && (
                          <div className='absolute bottom-6 right-12'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[14]?.point}
                            </a>
                          </div>
                        )}

                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[0]?._id
                        ) && (
                          <div className='absolute top-10 left-8'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[0]?.point}
                            </a>
                          </div>
                        )}

                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[1]?._id
                        ) && (
                          <div className='absolute top-8 left-13'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[1]?.point}
                            </a>
                          </div>
                        )}

                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[2]?._id
                        ) && (
                          <div className='absolute top-10 right-8'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[2]?.point}
                            </a>
                          </div>
                        )}
                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[3]?._id
                        ) && (
                          <div className='absolute top-14 left-13'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[3]?.point}
                            </a>
                          </div>
                        )}

                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[4]?._id
                        ) && (
                          <div className='absolute top-20 left-9'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[4]?.point}
                            </a>
                          </div>
                        )}

                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[5]?._id
                        ) && (
                          <div className='absolute top-20 left-13'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[5]?.point}
                            </a>
                          </div>
                        )}

                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[6]?._id
                        ) && (
                          <div className='absolute top-20 right-9'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[6]?.point}
                            </a>
                          </div>
                        )}

                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[7]?._id
                        ) && (
                          <div className='absolute top-26 left-13'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[7]?.point}
                            </a>
                          </div>
                        )}

                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[8]?._id
                        ) && (
                          <div className='absolute top-30 left-9'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[8]?.point}
                            </a>
                          </div>
                        )}

                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[9]?._id
                        ) && (
                          <div className='absolute top-30 left-13'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[9]?.point}
                            </a>
                          </div>
                        )}

                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[10]?._id
                        ) && (
                          <div className='absolute top-30 right-9'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[10]?.point}
                            </a>
                          </div>
                        )}
                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[12]?._id
                        ) && (
                          <div className='absolute top-36 right-2'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[12]?.point}
                            </a>
                          </div>
                        )}
                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[11]?._id
                        ) && (
                          <div className='absolute top-36 left-2'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[11]?.point}
                            </a>
                          </div>
                        )}
                      </div>

                      <div className='relative body-pic'>
                        <Image
                          src='/images/chiro/body-chart2.svg'
                          width={72}
                          height={299}
                          alt=''
                        />
                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[19]?._id
                        ) && (
                          <div className='absolute bottom-5 left-7'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[19]?.point}
                            </a>
                          </div>
                        )}
                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[15]?._id
                        ) && (
                          <div className='absolute top-12 left-4'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[15]?.point}
                            </a>
                          </div>
                        )}
                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[16]?._id
                        ) && (
                          <div className='absolute top-16 left-10'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[16]?.point}
                            </a>
                          </div>
                        )}
                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[17]?._id
                        ) && (
                          <div className='absolute top-28 left-6'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[17]?.point}
                            </a>
                          </div>
                        )}
                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[18]?._id
                        ) && (
                          <div className='absolute left-0 top-32'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[18]?.point}
                            </a>
                          </div>
                        )}
                      </div>
                      <div className='relative body-pic'>
                        <Image
                          src='/images/chiro/body-chart3.svg'
                          width={74}
                          height={299}
                          alt=''
                        />
                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[24]?._id
                        ) && (
                          <div className='absolute bottom-5 left-7'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[24]?.point}
                            </a>
                          </div>
                        )}
                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[21]?._id
                        ) && (
                          <div className='absolute top-16 left-4'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[21]?.point}
                            </a>
                          </div>
                        )}
                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[20]?._id
                        ) && (
                          <div className='absolute top-12 left-10'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[20]?.point}
                            </a>
                          </div>
                        )}
                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[22]?._id
                        ) && (
                          <div className='absolute top-28 right-6'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[22]?.point}
                            </a>
                          </div>
                        )}
                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[23]?._id
                        ) && (
                          <div className='absolute right-0 top-32'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[23]?.point}
                            </a>
                          </div>
                        )}
                      </div>
                      <div className='relative body-pic'>
                        <Image
                          src='/images/chiro/body-chart4.svg'
                          width={138}
                          height={307}
                          alt=''
                        />
                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[32]?._id
                        ) && (
                          <div className='absolute bottom-5 left-12'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[32]?.point}
                            </a>
                          </div>
                        )}

                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[33]?._id
                        ) && (
                          <div className='absolute bottom-5 right-12'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[33]?.point}
                            </a>
                          </div>
                        )}

                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[25]?._id
                        ) && (
                          <div className='absolute top-13 left-6'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[25]?.point}
                            </a>
                          </div>
                        )}

                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[26]?._id
                        ) && (
                          <div className='absolute top-14 left-14'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[26]?.point}
                            </a>
                          </div>
                        )}

                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[27]?._id
                        ) && (
                          <div className='absolute top-13 right-6'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[27]?.point}
                            </a>
                          </div>
                        )}
                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[31]?._id
                        ) && (
                          <div className='absolute top-34 right-3'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[31]?.point}
                            </a>
                          </div>
                        )}
                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[30]?._id
                        ) && (
                          <div className='absolute top-34 left-3'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[30]?.point}
                            </a>
                          </div>
                        )}

                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[29]?._id
                        ) && (
                          <div className='absolute top-32 right-9'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[29]?.point}
                            </a>
                          </div>
                        )}

                        {chart.chartData?.find(
                          (c = {}) => c._id === chartTemplateData?.[28]?._id
                        ) && (
                          <div className='absolute top-32 left-9'>
                            <a className={pointStyle}>
                              {chartTemplateData?.[28]?.point}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    <>
                      {chart.chartData?.map((c = {}) => (
                        <div className='flex items-center justify-start gap-2 py-2 border-b-2 border-grayMid'>
                          <div>
                            <h1 className='flex items-center justify-center w-6 h-6 text-black rounded-full bg-yellowBg'>
                              {c.point}
                            </h1>
                          </div>
                          <div>{c.desc}</div>
                        </div>
                      ))}
                      <div className='flex items-center justify-start gap-2 mt-2'>
                        <div className='flex items-center gap-2'>
                          <CalenderIcon fill='white' />{' '}
                          <h1 className='font-bold text-white'>Appointment</h1>
                        </div>
                        {moment(chart.appointmentId?.appointmentDate).format(
                          'MMM DD, YYYY h:mm a'
                        )}
                      </div>
                    </>
                  </>
                ) : (
                  chart.desc
                )}
              </p>
            </div>
          </Collapse>
        </div>
      )}
    </>
  )
}

export default React.memo(ChartCollapse)
