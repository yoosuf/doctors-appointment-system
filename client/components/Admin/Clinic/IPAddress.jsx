import React, { useState } from 'react'
import Link from 'next/link'
import { OutlineBtn, YellowBtn } from '@/widget/button/YellowBTN'
import AddIpDevices from './AddIpDevices'
import EditIcon from '@/widget/image/EditIcon'
import Pagination from '@/widget/Pagination/Pagination'
import useIPAddress from '@/components/Admin/Clinic/hooks/useIPAddress'
import useDropdown from '@/hooks/common/useDropdown'
import Loader from '@/widget/loader'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function IPAddress() {
  const { locationOptionsData, loadOptionsLocation } = useDropdown()

  const {
    loading,
    ipDevicesListData,
    submitLoading,
    paginator,
    setPaginator,
    setIPDevicesListData,
    setLoading,
    populate,
    editID,
    setEditID,
    formik,
    closeBtn,
    activeIPDevices,
    setActiveIPDevices,
    EditLocationModal,
    asyncSelectRefLocation,
    locationValue,
    setLocationValue,
    handleActiveChange,
  } = useIPAddress({
    loadOptionsLocation,
  })

  return (
    <>
      <div className='pb-5 border-b border-gray-700 flex-bet'>
        <div>
          <h3 className='text-lg font-semibold'>IP Devices</h3>
          <p className='text-sm text-gray-500'>
            Current owner has {paginator?.itemCount} IP Devices
          </p>
        </div>
        <div className='flex-wrap gap-3 flex-ver '>
          <YellowBtn btnText='Add IP Device' onClick={EditLocationModal} />
        </div>
      </div>
      <div className='relative grid gap-4 mt-6 location-main'>
        {ipDevicesListData?.length === 0 ? (
          <>
            <div className='flex items-center justify-center mt-20 text-xl'>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-24 h-24'
                  viewBox='0 0 20 20'
                  fill='currentColor'>
                  <path d='M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z' />
                </svg>
              </div>
            </div>
            <div className='flex items-center justify-center mb-16 text-2xl'>
              No IP Devices Found
            </div>
          </>
        ) : (
          <>
            {ipDevicesListData.map((ipData = {}, i) => (
              <div className='p-4 rounded-lg single-location flex-bet bg-primary'>
                <div className='flex gap-3'>
                  <div className='w-10 h-10 rounded-full bg-grayMid flex-cen'>
                    <p>
                      {(paginator?.currentPage - 1) * paginator?.perPage + i + 1}
                    </p>
                  </div>
                  <div>
                    <h3 className='text-base font-medium'>
                      {ipData.ipAddress}
                    </h3>
                    <p className='text-gray-400'>
                      {ipData?.locationIds?.[0]?.locationName}
                    </p>
                  </div>
                </div>
                <div className='gap-5 flex-cen'>
                  <label className='switch'>
                    <input
                      type='checkbox'
                      checked={ipData?.isActive}
                      onChange={() =>
                        handleActiveChange(ipData._id, ipData?.isActive)
                      }
                    />
                    <span className='slider round'></span>
                  </label>
                  <a
                    className='text-gray-400 cursor-pointer'
                    onClick={() => setEditID(ipData._id)}>
                    <EditIcon />
                  </a>
                </div>
              </div>
            ))}
          </>
        )}
        {loading && <Loader customClass='absolute' />}
      </div>

      {ipDevicesListData?.length > 0 && (
        <div className='mt-2'>
          <Pagination
            paginator={paginator}
            module='getAllIPDevices'
            setPaginator={setPaginator}
            setTableData={setIPDevicesListData}
            setLoading={setLoading}
            populate={populate}
          />
        </div>
      )}

      <AddIpDevices
        formik={formik}
        closeBtn={closeBtn}
        asyncSelectRefLocation={asyncSelectRefLocation}
        locationOptionsData={locationOptionsData}
        activeIPDevices={activeIPDevices}
        setActiveIPDevices={setActiveIPDevices}
        loading={submitLoading}
        editID={editID}
        setEditID={setEditID}
        loadOptionsLocation={loadOptionsLocation}
        locationValue={locationValue}
        setLocationValue={setLocationValue}
      />
    </>
  )
}
