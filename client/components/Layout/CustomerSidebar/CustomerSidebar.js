import React, { useState, useEffect } from 'react'
import { baseUrl, sidebarLogoUrl } from '@/utils/helper'
import LeftArrow from '@/widget/image/LeftArrow'
import RightArrow from '@/widget/image/RightArrow'
import SearchIcon from '@/widget/image/SearchIcon'

import Loader from '@/widget/loader'
import ReactPaginate from 'react-paginate'
import { useDebouncedCallback } from 'use-debounce'
import FilterModal from '../../Admin/Customer/FilterModal'
import SingleCustomerData from './SingleCustomerData'

export default function CustomerSidebar(props) {

  const { paginator = {}, changePaginator = () => {}, userData } = props
  
  const filter = () => {
    props.setFilterModal(true)
  }

  const debounced = useDebouncedCallback(e => {
    props.onChangeSearch(e)
  }, 500)


  return (
    <>
      <div className='relative hidden chat-sidebar bg-primary xl:block'>
        <div className='p-8 border-b border-r border-gray-500 chat-sidebar-header'>


            <h3 className='text-lg font-semibold'>{props.name}</h3>
            <p className='text-gray-400'>Search customers</p>


            <>
              <div className='flex mt-5'>
                <div className='relative flex items-center w-full'>
                  <div className='absolute left-3'>
                    <SearchIcon />
                  </div>
                  <input
                    type='text'
                    className='w-full px-3 py-2.5 pl-10 bg-transparent border border-gray-700 rounded-md placeholder-gray-500'
                    placeholder='Search'
                    value={props.searchValue}
                    onChange={e => {
                      debounced(e)
                      props.setSearchValue(e.target.value)
                    }}
                  />
                </div>

                <a
                  onClick={() => filter()}
                  className='cursor-pointer btn p-2.5 ml-3 border border-gray-700 rounded-md transition hover:border-yellowBg'>
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
          </>

        </div>
        <div className='relative overflow-y-auto person-list'>
          {props.paginator.itemCount > props.paginator.perPage && (
            <div className='flex justify-start pt-1 pb-1 m-1 text-xs cursor-pointer sub-pagination'>
              <ReactPaginate
                pageCount={paginator.pageCount}
                initialPage={paginator.currentPage - 1}
                forcePage={paginator.currentPage - 1}
                pageRangeDisplayed={3}
                marginPagesDisplayed={3}
                onPageChange={({ selected }) => {
                  changePaginator(selected)
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

          {JSON.stringify(props?.customerData) === '{}' ? (
            <div className='mt-4 text-xl text-center'>No Data Found</div>
          ) : (
            <>
              {props?.customerData &&
                Object?.entries(props?.customerData)?.map(([key, value]) => (
                  <>
                    <div className='px-4 py-2 border-b border-gray-500 alphabet'>
                      <p className='text-gray-500'>{key}</p>
                    </div>
                    {value?.map((item = {}, key) => (
                      <SingleCustomerData
                        perImg={
                          item.id === userData?.id
                            ? baseUrl + userData.profile_image?.uri
                            : item.profile_image?.uri
                            ? baseUrl + item.profile_image?.uri
                            : sidebarLogoUrl
                        }
                        perName={item.firstName + ' ' + item.lastName}
                        perNum={item.phone}
                        perLocation={item.locationIds}
                        isActive={item.purchasedPlans?.orderId?.planAccess}
                        item={item}
                        onClickCustomer={props.onClickCustomer}
                        id={props.id}
                        key={key}
                      />
                    ))}
                  </>
                ))}
            </>
          )}
          {props.loading && <Loader customClass='absolute' />}
        </div>
        {props.filterModal && (
          <FilterModal
            filterData={props.filterData}
            filterRemove={props.filterRemove}
            onClickApplyFilter={props.onClickApplyFilter}
          />
        )}
      </div>
    </>
  )
}
