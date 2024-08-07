import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'

export default function OrderOverview ({ orderObj }) {
  const closeBtn = () => {
    const filterModal = document?.getElementById('OrderOverviewModal')
    filterModal?.classList?.remove('active')
  }

  const { lineItems, amount, totalAmount, date, status } = orderObj || {}

  if (!lineItems || !Array.isArray(lineItems)) {
    return null // Render nothing if lineItems is not present or not an array
  }

  return (
    <>
      <section
        id='OrderOverviewModal'
        className='fixed inset-0 z-10 overflow-hidden text-sm activity-modal-main'
        aria-labelledby='slide-over-title'
        role='dialog'
        aria-modal='true'>
        <div className='absolute inset-0 overflow-hidden'>
          <div
            className='absolute inset-0 transition-opacity bg-black black-layer'
            aria-hidden='true'
            onClick={() => closeBtn()}></div>
          <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal'>
            <div className='w-screen max-w-xl'>
              <div className='flex flex-col h-full shadow-xl bg-primary'>
                <header className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-base font-medium' id='slide-over-title'>
                      Order overview
                    </h2>
                    <div className='flex items-center ml-3 h-7'>
                      <button
                        type='button'
                        onClick={e => {
                          e.preventDefault(), closeBtn()
                        }}
                        className='focus:outline-none '>
                        <span className='sr-only'>Close panel</span>
                        <XMarkIcon className='w-5 h-5' />
                      </button>
                    </div>
                  </div>
                </header>

                <main className='relative flex-1 p-4 modal-body'>
                  <div className='grid gap-4 pb-4 md:grid-cols-1'>
                    <div className='p-6 rounded-lg shadow-md'>
                      <h2 className='mb-4 text-xl font-semibold'>Invoice</h2>
                      <div className='flex justify-between mb-4'>
  <div className='flex items-center'>
    <p className='mr-2 font-semibold'>Date:</p>
    <p>{new Date(date).toLocaleDateString()}</p>
  </div>
  <div className='flex items-center'>
    <p className='mr-2 font-semibold'>Total Amount:</p>
    <p>${totalAmount.toFixed(2)}</p>
  </div>
</div>
                      <div className='my-4 border-t border-gray-800'></div>
                      <div>
                        {/* Row Header */}
                        <div className='flex justify-between mb-2 font-semibold'>
                          <div className='text-left'>Description</div>
                          <div className='text-right'>Quantity</div>
                          <div className='text-right'>Amount</div>
                        </div>
                        {/* Rows */}
                        {lineItems.map((item, index) => (
                          <div
                            key={item._id}
                            className={`flex justify-between mb-2 ${
                              index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'
                            }`}>
                            <div className='text-left'>{item.description}</div>
                            <div className='text-right'>{item.quantity}</div>
                            <div className='text-right'>
                              ${item.amount.toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className='mt-4 border-t border-gray-800'></div>
                      <div className='flex justify-between mt-4'>
                        <div>
                          <p className='font-semibold'>Total:</p>
                        </div>
                        <div>
                          <p>${amount.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
