import React, { useEffect } from 'react'
import SubMasterColumn from '@/widget/react-table/SubMasterColumn'
import ReactTableList from '@/widget/react-table/ReactTableList'
import useSubMaster from '@/components/Admin/Masterdata/hooks/useSubMaster'
import { componentAccess } from '@/utils/helper'
import { COMPONENT_ACCESS, ROUTE_ACCESS } from '@/utils/constant'
import SubMasterForm from './SubMasterForm'
import SubMasterSidebar from './SubMasterSidebar'
import { useDebouncedCallback } from 'use-debounce';
import Loader from '@/widget/loader'
import PlusIcon from '@/widget/image/PlusIcon'
import SearchIcon from '@/widget/image/SearchIcon'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SubMaster = () => {
  const [value ,setValue] =  React.useState()
  const {
    formik,
    loading,
    setSearchValue,
    searchValue,
    sidebarLoader,
    submitLoading,
    openSubMasterModal,
    closeBtn,
    subMasterTableData,
    masterData,
    parentId,
    setParentId,
    setParentCode,
    onChangeInputSearch,
    openEdit,
    editID,
    onChangeSearch,
    onChangeActive,
    openDeleteModal,
    openModal,
    closeModal,
    onClickDelete,
    label,
    deleteID,
    paginator,
    setPaginator,
    setSubMasterTableData,
    setLoading,
    dataQueryOptions,
  } = useSubMaster()

  const debounced = useDebouncedCallback(e => {
    onChangeSearch(e)
    document.getElementById('searchInput')?.addEventListener('input', (e) => {
      setValue(e.currentTarget.value)
    })
  }, 500)


  useEffect(() => {
    setValue('')
  },[parentId])

  return (
    <>
      <div className='grid grid-cols-12 gap-4 mt-5 submaster-main'>
        <div className='xl:col-span-4 col-span-0 submaster-sidebar'>
          <SubMasterSidebar
            masterData={masterData}
            parentId={parentId}
            setParentId={setParentId}
            setParentCode={setParentCode}
            onChangeInputSearch={onChangeInputSearch}
            sidebarLoader={sidebarLoader}
          />
        </div>
        <div className='col-span-12 overflow-y-auto xl:col-span-8 '>
          <div className='flex flex-col flex-wrap items-center justify-between gap-4 pb-4 sm:flex-row'>
              <div className='relative flex items-center w-full sm:w-auto'>
                <div className='absolute left-3'>
                  <SearchIcon />
                </div>
                <input
                  type='text'
                  className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
                  placeholder='Search'
                  onChange={debounced}
                  id="searchInput" 
                  value={value}
                />
              </div>
              {componentAccess(
                ROUTE_ACCESS.MASTER,
                COMPONENT_ACCESS.create
              ) && (
                <button
                  onClick={openSubMasterModal}
                  className='flex items-center justify-center w-full px-2 py-2 text-sm font-medium text-center text-black transition rounded-lg sm:w-auto bg-yellowBg sm:px-4 hover:bg-yellow-400 '>
                  <PlusIcon />
                  <span className='ml-2 text-sm font-medium'>
                    Add Sub Master
                  </span>
                </button>
              )}
            
          </div>
          <div className='overflow-y-auto submaster-right'>
            {/* table */}
            <div className=''>
              {componentAccess(
                ROUTE_ACCESS.MASTER,
                COMPONENT_ACCESS.findAll
              ) && (
                <ReactTableList
                  columns={SubMasterColumn(
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
                  data={subMasterTableData}
                  recordsFiltered={15}
                  loading={loading}
                  paginator={paginator}
                  module='findMaster'
                  setPaginator={setPaginator}
                  setTableData={setSubMasterTableData}
                  setLoading={setLoading}
                  dataQueryOptions={dataQueryOptions}
                />
              )}
            </div>
            {/* /table */}
          </div>
        </div>
      </div>
      <SubMasterForm
        formik={formik}
        closeBtn={closeBtn}
        loading={submitLoading}
        editID={editID}
      />
    </>
  )
}

export default SubMaster
