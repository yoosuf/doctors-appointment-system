// import React, { useState } from "react";
import { baseUrl, sidebarLogoUrl } from '@/utils/helper'
import LeftArrow from '@/widget/image/LeftArrow'
import RightArrow from '@/widget/image/RightArrow'
import SearchIcon from '@/widget/image/SearchIcon'
import Loader from '@/widget/loader'
import React from 'react'
import ReactPaginate from 'react-paginate'
import FilterModal from './FilterModal'
import SingleUser from './SingleUser'

export default function Sidebar(props) {
  const { userData } = props
  const filter = () => {
    const filterModal = document.getElementById('filter_modal')
    filterModal.classList.add('active')
  }

  return (
    <>
      <div className='relative hidden border-b border-r border-gray-500 chat-sidebar bg-primary xl:block'>
        <div className='p-8 chat-sidebar-header '>
          <h3 className='text-lg font-semibold'>{props.name}</h3>
          <p className='text-gray-400'>Manage team in one place</p>
          <div className='flex mt-5'>
            <div className='relative flex items-center w-full'>
              <div className='absolute left-3'>
                <SearchIcon />
              </div>
              <input
                type='text'
                className='w-full px-3 py-2.5 pl-10 bg-transparent border border-gray-700 rounded-lg placeholder-gray-500'
                placeholder='Search'
                onChange={e => props.onChangeSearch(e)}
              />
            </div>

            <a
              onClick={() => filter()}
              className='cursor-pointer btn p-2.5 ml-3 border border-gray-700 rounded-lg transition hover:border-yellowBg'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='#9CA3AF'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
                />
              </svg>
            </a>
          </div>
        </div>
        <div className='relative overflow-y-auto person-list'>
          <>
            {props.paginator.itemCount > props.paginator.perPage && (
              <div className='flex justify-start pt-1 pb-1 m-1 text-xs cursor-pointer sub-pagination'>
                <ReactPaginate
                  pageCount={props.paginator.pageCount}
                  forcePage={props.paginator.currentPage - 1}
                  initialPage={props.paginator.currentPage - 1}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={3}
                  onPageChange={({ selected }) => {
                    props.changePaginator(selected)
                  }}
                  disableInitialCallback={true}
                  pageClassName='page-button'
                  disabledClassName='disable-pagination-button'
                  containerClassName='flex flex-row tab-pagination'
                  activeClassName='active-tab active-page-button'
                  previousLabel={<LeftArrow />}
                  nextLabel={<RightArrow />}
                />
              </div>
            )}
          </>
          {JSON.stringify(props.data) === '{}' ? (
            <div className='mt-4 text-xl text-center'>No Data Found</div>
          ) : (
            <>
              {Object?.entries(props?.data)?.map(([key, value]) => (
                <>
                  <div className='px-4 py-2 border-b border-gray-500 alphabet'>
                    <p className='text-gray-500'>{key}</p>
                  </div>
                  {value?.map(item => {
                    return (
                      <SingleUser
                        perImg={
                          item.id === userData?.id
                            ? baseUrl + userData.profile_image?.uri
                            : item.profile_image?.uri
                            ? baseUrl + item.profile_image?.uri
                            : sidebarLogoUrl
                        }
                        perName={item?.firstName + ' ' + item?.lastName}
                        perRole={item?.roleId?.name}
                        isActive={
                          item.id === userData?.id
                            ? userData?.isActive
                            : props.isActive
                        }
                        itemId={item?.id}
                        item={item}
                        id={props?.id}
                        setID={props?.setID}
                        setUserData={props?.setUserData}
                      />
                    )
                  })}
                </>
              ))}
            </>
          )}
          {props.loading && <Loader customClass='absolute' />}
        </div>
        <FilterModal
          filterData={props.filterData}
          onChangeFilter={props.onChangeFilter}
          allChecked={props.allChecked}
          setAllChecked={props.setAllChecked}
          filterRemove={props.filterRemove}
          onClickApplyFilter={props.onClickApplyFilter}
          sendFilterData={props.sendFilterData}
          showOnlyActive={props.showOnlyActive}
          setShowOnlyActive={props.setShowOnlyActive}
          verifyData={props.verifyData}
          onChangeVerifyFilter={props.onChangeVerifyFilter}
          allCheckedVerify={props.allCheckedVerify}
          setAllCheckedVerify={props.setAllCheckedVerify}
        />
      </div>
    </>
  )
}
