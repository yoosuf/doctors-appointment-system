import React, { useState } from 'react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Collapse from 'react-collapse'
import Image from 'next/image'
import useAppointment from './hooks/useAppointment'
import Link from 'next/link'
import routes from '@/utils/routes'
import { Button } from '@/components/AppUi/Form/Button'

const AppointmentForm = ({ user, appointment, services }) => {
  const {
    loading,
    formik,
    openCategories,
    focusedIndex,
    handleToggleCategory,
    handleServiceSelection,
    handleCloseCollapse,
    handleKeyDown,
    handleClearAllServices,
  } = useAppointment({ user, services })

  return (
    <>
      <div className='w-full max-w-3xl p-5 mx-auto sm:p-9 sm:pb-2'>
        <div className='all-steps'>
          <div className='flex items-center justify-between gap-3'>
            <h3 className='text-xl font-medium'>Select Services </h3>
            <p className='text-sm text-gray-400'>STEP 1/2</p>
          </div>
          <div className='grid w-full h-1 grid-cols-2 mt-2 mb-6 rounded-full bg-grayMid'>
            <div className='h-full col-span-1 rounded-full bg-yellowBg'></div>
          </div>
        </div>

        <div>
          <h3 className='mb-2 text-xl font-semibold text-white'>
            What brings you in?
          </h3>
          <p className='max-w-xl mb-4 text-sm text-gray-400'>
            Feel free to choose more than one service!
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} aria-labelledby='form-heading'>
          <div className='grid gap-5 pt-5'>


            {services.map((category, index) => (
              <div
                key={category._id}
                className={`focus:outline-none focus:ring text-sm border border-gray-700  rounded-lg ${
                  focusedIndex === index ? 'focus:ring-blue-300' : ''
                }
              ${openCategories[category._id] ? '' : ''} bg-grayMid`}
                tabIndex={index}
                onKeyDown={e => handleKeyDown(index, e)}>
                <button
                  type='button'
                  className='flex items-center justify-between w-full px-4 py-3 cursor-pointer'
                  onClick={() => handleToggleCategory(category._id)}>
                  <div className={`relative flex items-center gap-3`}>
                    <Image
                      src={'/images/Order4.svg'}
                      alt='SnapCrack'
                      className='relative'
                      width={48}
                      height={48}
                    />

                    <div className='text-left'>
                      <h4 className='text-base font-medium'>{category.name}</h4>
                      <p className='text-xs text-gray-400'>
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <span className={`flex items-center ml-auto text-gray-400`}>
                    {
                      formik.values.serviceIds.filter(id =>
                        category.data.some(service => service._id === id)
                      ).length
                    }{' '}
                    Selected
                    <ChevronUpIcon
                      className={`${
                        openCategories[category._id]
                          ? 'rotate-180 '
                          : 'rotate-90'
                      } h-8 w-8 text-gray-400 transform ml-2`}
                    />
                  </span>
                </button>

                <Collapse isOpened={openCategories[category._id]}>
                  <div className={`bg-grayMid`}>
                    {category.data.map((service, serviceIndex) => (
                      <div
                        key={service._id}
                        className={`flex items-center p-4 mb-0 cursor-pointer focus:outline-none focus:ring ${
                          focusedIndex === index &&
                          focusedIndex === serviceIndex
                            ? 'focus:ring-blue-300'
                            : ''
                        }`}
                        onClick={e =>
                          handleServiceSelection(category, service, e)
                        }
                        onKeyDown={e => handleKeyDown(serviceIndex, e)}
                        tabIndex={serviceIndex}>
                        <div className='flex-grow'>
                          <h3
                            id={`label-${service._id}`}
                            className='text-semibold'>
                            {service.name}
                          </h3>
                          <p className='text-sm text-gray-400'>
                            {service.description}
                          </p>
                          <p className='text-sm text-gray-400'>
                            This service cost ${service.price} and the duration
                            is {service.duration} minutes
                          </p>
                        </div>
                        <div className='ml-auto'>
                          <button
                            type='button'
                            onClick={() =>
                              handleServiceSelection(category, service)
                            }
                            role='checkbox'
                            aria-checked={formik.values.serviceIds.includes(
                              service._id
                            )}
                            aria-labelledby={`label-${service._id}`}
                            className={`${
                              formik.values.serviceIds.includes(service._id)
                                ? 'bg-yellow-400'
                                : 'bg-gray-200'
                            } relative inline-flex items-center h-6 w-11 rounded-full pr-1 focus:outline-none`}>
                            <span
                              className={`${
                                formik.values.serviceIds.includes(service._id)
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              } inline-block w-4 h-4 transform bg-black rounded-full`}
                            />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div
                      className={`grid grid-cols-1 gap-4 mt-3 sm:grid-cols-2 
                             ${
                               focusedIndex === index ? '' : 'pb-4 pl-4 pr-4'
                             }`}>
                      <button
                        type='button'
                        onClick={() => handleClearAllServices(category)}
                        className='order-2 block px-4 py-2 text-sm font-medium text-center transition border border-gray-700 rounded-lg cursor-pointer bg-transprent hover:border-yellowBg sm:order-1'>
                        Clear All
                      </button>
                      <button
                        type='button'
                        onClick={() => handleCloseCollapse(category._id)}
                        className='order-1 inline-block px-4 py-2 text-sm font-medium text-center text-black transition rounded-lg cursor-pointer sm:order-2 bg-yellowBg focus:outline-none hover:bg-yellow-400 whitespace-nowrap'>
                        Close
                      </button>
                    </div>
                  </div>
                </Collapse>
              </div>
            ))}
          </div>

          <div className='flex items-center gap-3 pt-5 mt-5'>
            <Link href={routes.customerDashboard}>
            <span className='block w-full p-2 text-sm text-center text-gray-200 transition bg-transparent border border-gray-700 rounded-md cursor-pointer focus:outline-none hover:bg-gray-800 hover:border-gray-400'>
                Back
              </span>
            </Link>
            <Button
              kind={`primary`}
              type='submit'
              text={formik.isSubmitting ? 'Please wait...' : 'Continue'}
              isDisabled={formik.isSubmitting || !formik.dirty}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default AppointmentForm
