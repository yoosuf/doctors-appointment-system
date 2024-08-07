import React from 'react'

const EventAction = () => {
  return (
    <div>
      <Menu as='div' className='relative inline-block w-full text-left'>
        {({ open }) => (
          <>
            <div>
              <Menu.Button className='bg-transparent'>
                <div className='text-gray-400'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='rgba(156, 163, 175,1)'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
                    />
                  </svg>
                </div>
              </Menu.Button>
            </div>

            <Transition
              show={open}
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'>
              <Menu.Items
                static
                className='absolute right-0 w-56 mt-2 text-white origin-top-right divide-y divide-gray-100 rounded-md shadow-lg bg-grayMid ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='px-3 py-2'>
                  <div className='form-check flex items-center gap-3 mr-3 py-1.5 px-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5'
                      viewBox='0 0 20 20'
                      fill='rgba(156, 163, 175,1)'>
                      <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                    </svg>
                    <label className='ml-2 text-sm form-check-label' htmlFor='display2'>
                      Edit Event
                    </label>
                  </div>
                  <div className='form-check flex items-center gap-3 mr-3 py-1.5 px-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5'
                      viewBox='0 0 20 20'
                      fill='rgba(156, 163, 175,1)'>
                      <path d='M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z' />
                      <path d='M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z' />
                    </svg>
                    <label className='ml-2 text-sm form-check-label' htmlFor='display2'>
                      Duplicate Event
                    </label>
                  </div>
                  <div className='form-check flex items-center gap-3 mr-3 py-1.5 px-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5'
                      viewBox='0 0 20 20'
                      fill='rgba(156, 163, 175,1)'>
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <label className='ml-2 text-sm form-check-label' htmlFor='display2'>
                      Complete Event
                    </label>
                  </div>
                  <div className='form-check flex items-center gap-3 mr-3 py-1.5 px-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5'
                      viewBox='0 0 20 20'
                      fill='rgba(156, 163, 175,1)'>
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <label className='ml-2 text-sm form-check-label' htmlFor='display2'>
                      Cancel Event
                    </label>
                  </div>
                  <div className='form-check flex items-center gap-3 mr-3 py-1.5 px-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5'
                      viewBox='0 0 20 20'
                      fill='rgba(156, 163, 175,1)'>
                      <path
                        fillRule='evenodd'
                        d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <label className='ml-2 text-sm form-check-label' htmlFor='display2'>
                      Delete Event
                    </label>
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}

export default EventAction
