// import React, { useState } from "react";
import React from 'react'
import Link from 'next/link'
import { useDebouncedCallback } from 'use-debounce';
import SearchIcon from '@/widget/image/SearchIcon'
import Loader from '@/widget/loader'

export default function SubMasterSidebar({
  masterData,
  parentId,
  setParentId,
  setParentCode,
  onChangeInputSearch,
  sidebarLoader,
}) {
  const debounced = useDebouncedCallback(e => {
    onChangeInputSearch(e)
  }, 500)

  return (
    <>
      <div className='relative hidden overflow-hidden border-b border-r border-gray-500 submaster-sidebar bg-primary xl:block'>
        <div className='p-6 chat-sidebar-header '>
          <h3 className='text-lg font-semibold'>Sub Master</h3>
          <div className='flex mt-5'>
            <div className='relative flex items-center w-full'>
              <div className='absolute left-3'>
                <SearchIcon />
              </div>
              <input
                type='text'
                className='w-full px-3 py-2.5 pl-10 bg-transparent border border-gray-700 rounded-lg placeholder-gray-500'
                placeholder='Search'
                onChange={debounced}
              />
            </div>
          </div>
        </div>
        <div className='relative overflow-y-auto submaster-list'>
          {masterData?.length === 0 ? (
            <div className='mt-4 text-center text-yellowBg'>No Data Found</div>
          ) : (
            masterData?.map(data => (
              <button
                className='w-full text-left cursor-pointer focus:outline-none'
                onClick={e => {
                  e.preventDefault(), setParentId(data?.id), setParentCode(data?.code)
                }}>
                <div
                  className={
                    parentId === data?.id
                      ? 'bg-grayLight px-5 py-4'
                      : 'single-person-list block px-5 py-4 border-b border-gray-500'
                  }>
                  <div className='flex items-center' key={data?.id}>
                    <div className='w-10 h-10'>
                      <div
                        className={
                          parentId === data?.id
                            ? 'bg-grayMid h-10 w-10 flex items-center justify-center rounded-lg'
                            : 'h-10 w-10 bg-grayLight flex items-center justify-center rounded-lg'
                        }>
                        <h4>{data?.name?.slice(0, 1)}</h4>
                      </div>
                    </div>
                    <div className='ml-3'>
                      <div className='flex items-center'>
                        <h3 className='mr-2 font-medium'>{data?.name}</h3>
                      </div>
                      <p className='text-sm text-gray-400'>{data?.code}</p>
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
          {sidebarLoader && <Loader customClass='absolute' />}
        </div>
      </div>
    </>
  )
}
