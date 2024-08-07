import React, { useState } from 'react'
import ManageOwnerLocationColumn from '@/widget/react-table/ManageOwnerLocationColumn'
import ReactTableList from '@/widget/react-table/ReactTableList'
import useLocation from '@/components/Admin/User/hooks/useLocation'
import AddLocation from './AddLocation'
import SearchIcon from '@/widget/image/SearchIcon'
import PlusIcon from '@/widget/image/PlusIcon'
import { USER_ROLE_TYPE } from '@/utils/constant'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Location = ({ locationIds, id, userData, getInitialSideBarData }) => {
  const [activeLocation, setActiveLocation] = useState(false)

  const { roleId = {} } = userData
  const { code } = roleId

  const openAddLocationModal = async e => {
    e.preventDefault()
    await setActiveLocation(true)
    const addLocation = document.getElementById('AddLocationNewModal')
    addLocation.classList.add('active')
  }

  const {
    loading,
    submitLoading,
    setSubmitLoading,
    locationData,
    onChangeActive,
    onClickDelete,
    open,
    openModal,
    closeModal,
    label,
    deleteID,
    getLocationData,
    onClickEdit,
    editData,
    setEditData,
  } = useLocation({
    locationIds,
    id,
  })

  return (
    <>
      <div className='flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center'>
        <div className=''>
          <h3 className='text-lg font-semibold'>Manage Location</h3>
          <p className='text-sm text-gray-500'>
            Current owner has {locationData?.length} locations
          </p>
        </div>

        <div className='grid items-center grid-cols-1 gap-3 sm:inline-flex'>
          <div className='relative flex items-center w-full'>
            <div className='absolute left-3'>
              <SearchIcon />
            </div>
            <input
              type='text'
              className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
              placeholder='Search'
            />
          </div>
          {/* 
           // removed 
          // {code !== USER_ROLE_TYPE.OWNER && locationData.length > 0  commented based on request
          */}
          {code === USER_ROLE_TYPE.OWNER ? (
            ''
          ) : (
            <button
              onClick={e => openAddLocationModal(e)}
              className='flex items-center justify-center w-full px-2 py-2 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg sm:px-4 hover:bg-yellow-400 '>
              <PlusIcon />
              <span className='ml-2 text-sm font-medium'>Add New</span>
            </button>
           )} 
        </div>
      </div>
      <div className='overflow-hidden rounded-lg products bg-primary'>
        {/* table */}
        <div>
          <ReactTableList
            columns={ManageOwnerLocationColumn(
              this,
              onChangeActive,
              onClickDelete,
              open,
              openModal,
              closeModal,
              onClickEdit,
              id,
              label,
              deleteID
            )}
            page={1}
            data={locationData}
            recordsFiltered={15}
            loading={loading}
          />
        </div>

        {/* /table */}
      </div>

      <AddLocation
        activeLocation={activeLocation}
        setActiveLocation={setActiveLocation}
        locationIds={locationIds}
        getLocationData={getLocationData}
        id={id}
        editData={editData}
        setEditData={setEditData}
        loading={submitLoading}
        setLoading={setSubmitLoading}
      />
    </>
  )
}

export default Location
