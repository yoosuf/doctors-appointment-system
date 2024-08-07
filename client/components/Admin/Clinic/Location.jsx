import useLocationList from '@/components/Admin/Clinic/hooks/useLocationList'
import { COMPONENT_ACCESS, ROUTE_ACCESS } from '@/utils/constant'
import { componentAccess } from '@/utils/helper'
import { YellowBtn } from '@/widget/button/YellowBTN'
import EditIcon from '@/widget/image/EditIcon'
import Loader from '@/widget/loader'
import Pagination from '@/widget/Pagination/Pagination'
import React, { useState } from 'react'
import AddLocation from './AddLocation'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ClinicLocation() {
  const [activeLocation, setActiveLocation] = useState(false)

  const {
    loading,
    locationListData,
    paginator,
    setPaginator,
    setLocationListData,
    setLoading,
    populate,
    editID,
    setEditID,
    getLocationData,
  } = useLocationList()

  const EditLocationModal = () => {
    setActiveLocation(true)
    const editLocation = document.getElementById('ProfileSettingLocationModal')
    editLocation.classList.add('active')
  }

  return (
    <>
      <div className='pb-5 border-b border-gray-700 flex-bet'>
        <div>
          <h3 className='text-lg font-semibold'>Locations</h3>
          <p className='text-sm text-gray-500'>
            Current owner has {paginator?.itemCount} locations
          </p>
        </div>
        {componentAccess(ROUTE_ACCESS.LOCATION, COMPONENT_ACCESS.create) && (
          <div className='flex-wrap gap-3 flex-ver '>
            <YellowBtn btnText='New Location' onClick={EditLocationModal} />
          </div>
        )}
      </div>
      <div className='relative grid gap-4 mt-6 location-main'>
        {locationListData?.length === 0 ? (
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
              No Location Found
            </div>
          </>
        ) : (
          <>
            {locationListData.map((location = {}, i) => (
              <div className='p-4 rounded-lg single-location flex-bet bg-primary'>
                <div className='flex gap-3'>
                  <div className='w-10 h-10 rounded-full bg-grayMid flex-cen'>
                    <p>
                      {(paginator?.currentPage - 1) * paginator?.perPage +
                        i +
                        1}
                    </p>
                  </div>
                  <div>
                    <h3 className='text-base font-medium'>
                      {location.locationName}
                    </h3>
                    <p className='text-gray-400'>
                    
                      {location.locationAddressId?.addressLine1 +
                        ', ' +
                        (location.locationAddressId?.addressLine2 ? location.locationAddressId?.addressLine2 +
                          ', ' : '') +
                        location.locationAddressId?.cityNm +
                        ', ' +
                        location.locationAddressId?.provinceNm +
                        ', ' +
                        location.locationAddressId?.postalCodeNm +
                       
                       ( location.locationAddressId?.countryId ?  ', ' +location.locationAddressId?.countryId?.name:"")}
                    </p>
                  </div>
                </div>
                <div className='gap-5 flex-cen'>
                  {componentAccess(
                    ROUTE_ACCESS.LOCATION,
                    COMPONENT_ACCESS.update
                  ) && (
                      <a
                        className='text-gray-400 cursor-pointer'
                        onClick={() => setEditID(location.id)}>
                        <EditIcon />
                      </a>
                    )}

                  {/* <Link href='#'>
                    <a className='text-gray-400'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='10'
                        height='16'
                        viewBox='0 0 10 16'
                        fill='none'>
                        <path
                          d='M4 14C4 15.1 3.1 16 2 16C0.9 16 0 15.1 0 14C0 12.9 0.9 12 2 12C3.1 12 4 12.9 4 14ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4ZM8 6C6.9 6 6 6.9 6 8C6 9.1 6.9 10 8 10C9.1 10 10 9.1 10 8C10 6.9 9.1 6 8 6ZM8 12C6.9 12 6 12.9 6 14C6 15.1 6.9 16 8 16C9.1 16 10 15.1 10 14C10 12.9 9.1 12 8 12Z'
                          fill='#9CA3AF'
                        />
                      </svg>
                    </a>
                  </Link> */}
                </div>
              </div>
            ))}
          </>
        )}
        {loading && <Loader customClass='absolute' />}
      </div>

      {locationListData?.length > 0 && (
        <div className='mt-2'>
          <Pagination
            paginator={paginator}
            module='findLocation'
            setPaginator={setPaginator}
            setTableData={setLocationListData}
            setLoading={setLoading}
            populate={populate}
          />
        </div>
      )}

      <AddLocation
        activeLocation={activeLocation}
        setActiveLocation={setActiveLocation}
        // loading={loading}
        editID={editID}
        setEditID={setEditID}
        getLocationData={getLocationData}
      />
    </>
  )
}
