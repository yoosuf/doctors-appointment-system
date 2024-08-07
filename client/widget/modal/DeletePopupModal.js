import React from 'react'
import { OutlineBtn } from '../button/YellowBTN'
import SnapCrackButton from '../common-button'

const DeletePopupModal = ({
  closeModal,
  onClickDelete,
  data,
  userId,
  label,
}) => {
  return (
    <div
      className='fixed inset-0 overflow-y-auto activity-modal-main active'
      aria-labelledby='modal-title'
      id='deleteModal1'
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

        <div className='inline-block px-2 py-3 overflow-hidden text-left align-bottom transition-all transform rounded-lg shadow-xl bg-0f0f0f sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
          <div className='mb-3 text-right'>
            <a className='cursor-pointer' onClick={closeModal}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5 ml-auto'
                viewBox='0 0 20 20'
                fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
          </div>
          <div>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='52'
                height='46'
                viewBox='0 0 52 46'
                fill='none'
                className='mx-auto'>
                <path
                  d='M26.0001 18V23.3333M26.0001 34H26.0268M7.52488 44.6667H44.4753C48.5809 44.6667 51.1469 40.2222 49.0941 36.6667L30.6189 4.66667C28.5661 1.11111 23.4341 1.11111 21.3813 4.66667L2.90608 36.6667C0.853281 40.2222 3.41928 44.6667 7.52488 44.6667Z'
                  stroke='#EF4444'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <div className='mt-5 text-center'>
              <h3 className='text-lg font-semibold leading-6' id='modal-title'>
                Are you sure you want to delete {label && label} ?
              </h3>
              <div className='mt-2'>
                <p className='text-sm text-gray-400'>
                  Do you really want to delete ? this operation cannot be undone
                </p>
              </div>
            </div>
          </div>
          <div className='mt-5'>
            <div className='gap-3 flex-cen'>
              <button
                type='button'
                className='px-6 py-2 border border-gray-700 rounded-lg hover:border-yellowBg'
                onClick={closeModal}>
                Close
              </button>

              <SnapCrackButton
                type='button'
                text='Yes, Delete'
                onClick={e => {
                  e.preventDefault(), onClickDelete(data, userId)
                }}
                className='p-2 bg-red-600 border border-red-600 rounded-lg hover:bg-transparent hover:text-red-600'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(DeletePopupModal)
