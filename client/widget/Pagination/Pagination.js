import React, { useEffect, useState } from 'react'
import DropdownButton from '@/widget/dropdown/dropdown'
import commonApi from '@/api/common'
import LeftArrow from '../image/LeftArrow'
import RightArrow from '../image/RightArrow'

const Pagination = ({
  populate = {},

  paginator = {},
  module,
  setPaginator = () => {},
  setTableData = () => {},
  setLoading = () => {},
  dataQueryOptions,
}) => {
  const pages = [
    { name: '10' },
    { name: '20' },
    { name: '50' },
    { name: '100' },
  ]

  const [pageNumber, setPageNumber] = useState(pages[0])
  const [pageName, setPageName] = useState(1)

  useEffect(() => {
    if (paginator.currentPage) {
      setPageName(paginator.currentPage)
    }
  }, [paginator.currentPage])

  const onInputPage = e => {
    const pageVal = e.target.value
    setPageName(pageVal)
    if (pageVal && /^[1-9][0-9]*$/.test(Number(pageVal))) {
      if (Number(pageVal) <= paginator.pageCount) {
        onPageChange(Number(pageVal))
      } else {
        onPageChange(Number(paginator.pageCount))
      }
    }
  }

  const onPageChange = async (pageValue, pageSize = pageNumber.name) => {
    setLoading(true)
    const selectPage = pageValue
    try {
      const data = {
        options: {
          page: selectPage,
          offset: (selectPage - 1) * Number(pageSize) || 0,
          // populate: populate || '',
          limit: Number(pageSize),
          pagination: true,
          sort: {
            createdAt: -1,
          },
        },
      }

      if (dataQueryOptions) {
        data.query = dataQueryOptions?.query || undefined
        data.options = {
          ...dataQueryOptions.options,
          ...data.options,
        }
      }

      await commonApi({
        action: module,
        data,
      }).then(({ DATA = {} }) => {
        setTableData(DATA.data)
        setPaginator(DATA.paginator)
        setPageName(DATA.paginator.currentPage)
      })
    } finally {
      setLoading(false)
    }
  }

  const onSelectCount = async e => {
    await setPageNumber(e)
    onPageChange(1, e.name)
  }

  return (
    <>
      {paginator.itemCount ? (
        <div className='flex flex-col flex-wrap justify-between gap-3 px-4 py-2 md:flex-row md:items-center bg-primary pagination-style'>
          <div className='flex items-center gap-2 text-sm text-white'>
            <p>Items per page :</p>
            <div>
              <DropdownButton
                value={pageNumber}
                MAP={pages}
                onChange={e => onSelectCount(e)}
              />
            </div>
          </div>

          <div className='flex flex-wrap items-center gap-4 text-sm text-white'>
            {paginator.itemCount && (
              <p>Total Records : {paginator.itemCount || 0}</p>
            )}
            <div className='flex items-center gap-4'>
              <div className='relative z-0 flex rounded-md shadow bg-primary footer-pagination-style'>
                <input
                  type='number'
                  id='page-input'
                  value={pageName}
                  onChange={e => onInputPage(e)}
                  className='w-10 h-10 p-2 text-center bg-transparent border border-gray-500 rounded-lg'></input>
              </div>
              <p className='flex items-center '>
                of {paginator.pageCount} pages
              </p>

              <div className='relative z-0 flex justify-center h-10 overflow-hidden border border-gray-500 rounded-md shadow items-cener bg-primary footer-pagination-style'>
                <div
                  className='flex items-center justify-center w-10 h-10 bg-transparent cursor-pointer'
                  onClick={() => onPageChange(paginator.currentPage - 1)}
                  style={
                    !paginator.hasPrevPage ? { pointerEvents: 'none' } : {}
                  }>
                  <LeftArrow />
                </div>

                <div
                  className='flex items-center justify-center w-10 h-10 bg-transparent border-l border-gray-500 cursor-pointer'
                  onClick={() => onPageChange(paginator.currentPage + 1)}
                  style={
                    !paginator.hasNextPage ? { pointerEvents: 'none' } : {}
                  }>
                  <RightArrow />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default React.memo(Pagination)
