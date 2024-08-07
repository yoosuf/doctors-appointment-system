import React, { Fragment, useEffect, useState } from 'react'
import CloseIcon from '@/widget/image/CloseIcon'
import RedAlert from 'icons/RedAlert'

const DeletePageModel = ({ productId, action }) => {
  const [loading, setLoading] = useState(false)

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const closeBtn = () => {
    const deleteItem = document.getElementById('DeletePage')
    deleteItem.classList.remove('active')
  }

  return (
    <>
      <div
        className='fixed inset-0 overflow-y-auto activity-modal-main'
        aria-labelledby='modal-title'
        id='DeletePage'
        role='dialog'
        aria-modal='true'
        style={{ zIndex: '111' }}>
        <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
          <div
            className='absolute inset-0 transition-opacity bg-black black-layer'
            aria-hidden='true'></div>

          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'>
            &#8203;
          </span>

          <div className='inline-block px-2 py-3 overflow-hidden text-left align-bottom transition-all transform rounded-lg shadow-xl bg-grayMid sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
            <div className='mb-3 text-right'>
              <a href='#' onClick={closeBtn}>
                <CloseIcon />
              </a>
            </div>
            <div>
              <div>
                <RedAlert />
              </div>
              <div className='mt-5 text-center'>
                <h3
                  className='text-lg font-semibold leading-6'
                  id='modal-title'>
                  Are you sure you want to delete this entry ?
                </h3>
              </div>
            </div>
            <div className='mt-10 mb-5'>
              <div className='gap-3 flex-cen'>
                <button
                  className='block px-4 py-2 text-sm font-medium text-center transition border border-gray-700 rounded-lg bg-transprent hover:border-red-600'
                  type='button'
                  onClick={closeBtn}>
                  Cancel
                </button>
                <button
                  className='inline-block px-4 py-2 text-sm font-medium text-center text-black transition bg-red-600 border-red-600 rounded-lg hover:bg-transparent bordr hover:text-red-600 focus:outline-none whitespace-nowrap'
                  type='button'
                  onClick={e => action(e, productId)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(DeletePageModel)
