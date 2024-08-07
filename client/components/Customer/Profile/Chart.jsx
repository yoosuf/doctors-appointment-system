import usePatientChart from '@/components/Customer/Profile/hooks/usePatientChart'
import SearchIcon from '@/widget/image/SearchIcon'
import Loader from '@/widget/loader'
import Pagination from '@/widget/Pagination/Pagination'
import NoData from 'icons/NoData'
import React from 'react'
import ChartCollapse from './ChartCollapse'

const ChartHome = ({ userData, templateChartData, listChartData }) => {
  const {
    loading,
    chartList,
    paginator,
    setPaginator,
    setChartList,
    setLoading,
    dataQueryOptions,
    chartTemplateData,
    selectedChart,
    onExportChart,
  } = usePatientChart({ templateChartData, listChartData })
  return (
    <>
      <div className='chartHome'>
        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-12 sm:col-span-7'>
            <h3 className='font-medium'>Chart</h3>
            <p className='text-sm text-gray-500'>Browse all your chart</p>
          </div>

          <div className='col-span-12 sm:col-span-5'>
            <div className='gap-3 flex-ver'>
              {selectedChart && selectedChart.length ? (
                <div className='relative flex items-center w-full'>
                  <div className='absolute left-3'>
                    <SearchIcon />
                  </div>
                  <input
                    type='text'
                    className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
                    placeholder='Search'
                    autoComplete='off'
                    autoCapitalize='off'
                  />
                </div>
              ) : (
                <></>
              )}
              {/* <Link href='#'>
                <a className='w-10 h-10 rounded-lg bg-yellowBg flex-cen'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='16'
                    viewBox='0 0 18 16'
                    fill='none'>
                    <path
                      d='M13.1667 14.6663L16.5 11.333M1.5 1.33301H12.3333H1.5ZM1.5 4.66634H9H1.5ZM1.5 7.99967H9H1.5ZM13.1667 4.66634V14.6663V4.66634ZM13.1667 14.6663L9.83333 11.333L13.1667 14.6663Z'
                      stroke='#3F3F46'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </a>
              </Link> */}
            </div>
          </div>
        </div>
        <div className='mt-8'>
          {/* <Link href='#'>
            <a className='flex items-center px-4 py-3 text-sm font-semibold text-yellow-700 bg-yellow-100 rounded-lg note1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-7 w-7'
                viewBox='0 0 20 20'
                fill='#EFB100'>
                <path
                  fillRule='evenodd'
                  d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                  clipRule='evenodd'></path>
              </svg>
              <span className='ml-3'>
                Nothing major today. More preventitive. Had some pain in mid
                back, but it has resolved, no HA right now either. Jaw has "been
                ok"
              </span>
            </a>
          </Link>
          <Link href='#'>
            <a className='flex items-center px-4 py-3 mt-4 text-sm font-semibold text-green-700 bg-green-100 rounded-lg note1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-7 w-7'
                viewBox='0 0 20 20'
                fill='#15803D'>
                <path d='M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z'></path>
                <path d='M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z'></path>
              </svg>
              <span className='ml-3'>
                NOTE : major today. More preventitive. Had some pain in mid
                back, but it has resolved, no HA right now either. Jaw has "been
                ok"
              </span>
            </a>
          </Link> */}

          <div className='relative mt-5 charts'>
            {selectedChart && selectedChart.length ? (
              <>
                {selectedChart.map((chart = {}) => (
                  <ChartCollapse
                    chart={chart}
                    chartTemplateData={chartTemplateData}
                    onExportChart={onExportChart}
                  />
                ))}
                <div className='mt-3'>
                  <Pagination
                    paginator={paginator}
                    setPaginator={setPaginator}
                    module='findPatientAppointmentChart'
                    setTableData={setChartList}
                    setLoading={setLoading}
                    dataQueryOptions={dataQueryOptions}
                  />
                </div>
              </>
            ) : (
              <div className='py-20'>
                <div className='flex items-center justify-center text-xl'>
                  <div>
                    <NoData />
                  </div>
                </div>
                <div className='flex items-center justify-center text-2xl'>
                  No Chart Found
                </div>
              </div>
            )}
            {loading && <Loader customClass='absolute' />}
          </div>
        </div>
      </div>
    </>
  )
}

export default ChartHome
