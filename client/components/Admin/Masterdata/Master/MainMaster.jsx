import React from 'react'
import ReactTableList from '@/widget/react-table/ReactTableList'
import MainMasterColumn from '@/widget/react-table/MainMasterColumn'
import useMaster from '@/components/Admin/Masterdata/hooks/useMaster'
import { componentAccess } from '@/utils/helper'
import { COMPONENT_ACCESS, ROUTE_ACCESS } from '@/utils/constant'
import MasterForm from './MasterForm'
import { useDebouncedCallback } from 'use-debounce';
import PlusIcon from '@/widget/image/PlusIcon'
import SearchIcon from '@/widget/image/SearchIcon'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const MainMaster = () => {
  const {
    formik,
    closeBtn,
    openMasterModal,
    masterTableData,
    loading,
    submitLoading,
    onChangeSearch,
    openEdit,
    onChangeActive,
    editID,
    openDeleteModal,
    openModal,
    closeModal,
    onClickDelete,
    label,
    deleteID,
    paginator,
    setPaginator,
    setMasterTableData,
    setLoading,
    dataQueryOptions,
  } = useMaster()

  const debounced = useDebouncedCallback(e => {
    onChangeSearch(e)
  }, 500)

  return (
    <>
      <div className='flex flex-col justify-between gap-4 py-4 sm:items-center sm:flex-row'>
        <h3 className='text-lg font-semibold'>Master</h3>
        <div className='flex flex-col justify-between gap-4 sm:items-center sm:flex-row'>
          <div className='relative flex items-center w-full'>
            <div className='absolute left-3'>
              <SearchIcon />
            </div>
            <input
              type='text'
              className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
              placeholder='Search'
              onChange={debounced}
            />
          </div>
          {componentAccess(ROUTE_ACCESS.MASTER, COMPONENT_ACCESS.create) && (
            <button
              onClick={openMasterModal}
              className='flex items-center justify-center w-full px-2 py-2 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg sm:px-4 hover:bg-yellow-400 '>
              <PlusIcon />
              <span className='ml-2 text-sm font-medium'>Add Master</span>
            </button>
          )}
        </div>
      </div>
      <div className='overflow-hidden rounded-lg mt-3S bg-primary'>
        <div className=''>
          {componentAccess(ROUTE_ACCESS.MASTER, COMPONENT_ACCESS.findAll) && (
            <ReactTableList
              columns={MainMasterColumn(
                this,
                openEdit,
                onChangeActive,
                openDeleteModal,
                openModal,
                closeModal,
                onClickDelete,
                label,
                deleteID,
                paginator
              )}
              page={1}
              loading={loading}
              data={masterTableData}
              recordsFiltered={10}
              paginator={paginator}
              module='findMaster'
              setTableData={setMasterTableData}
              setPaginator={setPaginator}
              setLoading={setLoading}
              dataQueryOptions={dataQueryOptions}
            />
          )}
        </div>
      </div>
      <MasterForm
        closeBtn={closeBtn}
        formik={formik}
        loading={submitLoading}
        editID={editID}
      />
    </>
  )
}

export default MainMaster
