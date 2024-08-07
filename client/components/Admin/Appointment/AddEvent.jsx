import React, { useState } from 'react'
import ToggleButton from '@/widget/ToggleButton'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { YellowBtn, OutlineBtn } from '@/widget/button/YellowBTN'
import useAddEvent from '@/components/Admin/Appointment/hooks/useAddEvent'
import CloseIcon from '@/widget/image/CloseIcon'
import Select from '@/widget/select/index'
import CalenderIcon from '@/widget/image/CalenderIcon'
import SnapCrackButton from '@/widget/common-button'

export default function AddEvent({
  activeEvent,
  setActiveEvent,
  getAllData,
  editData,
  setEditData,
}) {
  const {
    closeBtn,
    formik,
    editID,
    loading,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    emailNotification,
    setEmailNotification,
    // Event Dropdown
    eventTypeOptionsData,
    eventTypeValue,
    setEventTypeValue,
    // Location Dropdown
    locationOptionsData,
    loadOptionsLocation,
    locationValue,
    setLocationValue,
    // Chiro Dropdown
    chiroOptionsData,
    chiroValue,
    setChiroValue,
  } = useAddEvent({
    activeEvent,
    setActiveEvent,
    getAllData,
    editData,
    setEditData,
  })

  return (
    <>
      <section
        id='addEventModal'
        className='fixed inset-0 z-10 overflow-hidden text-sm activity-modal-main'
        aria-labelledby='slide-over-title'
        role='dialog'
        aria-modal='true'>
        <div className='absolute inset-0 overflow-hidden'>
          <div
            className='absolute inset-0 transition-opacity bg-black black-layer'
            aria-hidden='true'></div>
          <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal sm:pl-10'>
            <form onSubmit={formik.handleSubmit}>
              <div className='w-screen h-screen max-w-xl'>
                <div className='flex flex-col h-full shadow-xl bg-primary'>
                  <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                    <div className='flex items-center justify-between'>
                      <h2
                        className='text-base font-medium'
                        id='slide-over-title'>
                        {editID ? 'Edit' : 'Add'} Event
                      </h2>
                      <div className='flex items-center ml-3 h-7'>
                        <button
                          type='button'
                          onClick={e => {
                            e.preventDefault(), closeBtn()
                          }}
                          className='focus:outline-none '>
                          <span className='sr-only'>Close panel</span>
                          <CloseIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='relative h-full p-4 overflow-auto modal-body'>
                    <div className='grid gap-2 pb-4 border-b border-gray-700 md:grid-cols-12 '>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Event info</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid grid-cols-12 gap-4'>
                          <div className='col-span-12 form-group'>
                            <Select
                              placeholder='Select event type'
                              name='eventType'
                              defaultOptions={eventTypeOptionsData}
                              value={eventTypeValue}
                              setValue={setEventTypeValue}
                              formik={formik}
                            />
                            {formik.touched.eventType &&
                              formik.errors.eventType && (
                                <div className='text-sm text-redAlert'>
                                  {formik.errors.eventType}
                                </div>
                              )}
                          </div>
                          <div className='col-span-12 form-group'>
                            <Select
                              placeholder='Select location'
                              name='locationId'
                              defaultOptions={locationOptionsData}
                              value={locationValue}
                              setValue={setLocationValue}
                              formik={formik}
                              loadOptions={loadOptionsLocation}
                            />
                            {formik.touched.locationId &&
                              formik.errors.locationId && (
                                <div className='text-sm text-redAlert'>
                                  {formik.errors.locationId}
                                </div>
                              )}
                          </div>
                          <div className='col-span-12 form-group'>
                            <Select
                              placeholder='Select chiropractor'
                              name='chiroId'
                              defaultOptions={chiroOptionsData}
                              value={chiroValue}
                              setValue={setChiroValue}
                              formik={formik}
                              isDisabled={!locationValue.value ? true : false}
                            />
                            {formik.touched.chiroId &&
                              formik.errors.chiroId && (
                                <div className='text-sm text-redAlert'>
                                  {formik.errors.chiroId}
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Event Info</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid grid-cols-12 gap-4'>
                          <div className='col-span-12 form-group'>
                            <input
                              type='text'
                              className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg '
                              placeholder='Event name'
                              id='name'
                              {...formik.getFieldProps('name')}
                            />
                            {formik.touched.name && formik.errors.name && (
                              <div className='text-sm text-redAlert'>
                                {formik.errors.name}
                              </div>
                            )}
                          </div>
                          <div className='col-span-12 form-group'>
                            <textarea
                              className='w-full p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                              rows='5'
                              placeholder='Write event details/descriptions'
                              id='description'
                              {...formik.getFieldProps('description')}
                            />
                            {formik.touched.description &&
                              formik.errors.description && (
                                <div className='text-sm text-redAlert'>
                                  {formik.errors.description}
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Appointment Time & Info</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid grid-cols-12 gap-4'>
                          <div className='relative flex items-center col-span-12'>
                            <div className='absolute left-3'>
                              <CalenderIcon fill='#9CA3AF' />
                            </div>
                            <DatePicker
                              selected={startDate}
                              showTimeInput
                              timeFormat='HH:mm'
                              minDate={new Date()}
                              onChange={date => setStartDate(date)}
                              placeholder='Select the start date and time'
                              dateFormat='MMMM d, yyyy h:mm aa'
                              className='w-full px-3 py-2 pl-10 bg-transparent border border-gray-500 rounded-lg'
                            />
                          </div>
                          <div className='relative flex items-center col-span-12'>
                            <div className='absolute left-3'>
                              <CalenderIcon fill='#9CA3AF' />
                            </div>
                            <DatePicker
                              selected={endDate}
                              showTimeInput
                              timeFormat='HH:mm'
                              minDate={startDate}
                              minTime={startDate}
                              onChange={date => setEndDate(date)}
                              placeholder='Select the end date and time'
                              dateFormat='MMMM d, yyyy h:mm aa'
                              className='w-full px-3 py-2 pl-10 bg-transparent border border-gray-500 rounded-lg'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Event Pricing</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className=''>
                          <div className='relative mb-4'>
                            <div className='absolute left-3 top-2'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='w-5 h-5'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='#9CA3AF'>
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                />
                              </svg>
                            </div>
                            <input
                              type='number'
                              className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                              placeholder='Enter Event Cost'
                              id='eventCost'
                              {...formik.getFieldProps('eventCost')}
                            />
                            {formik.touched.eventCost &&
                              formik.errors.eventCost && (
                                <div className='text-sm text-redAlert'>
                                  {formik.errors.eventCost}
                                </div>
                              )}
                          </div>

                          {/* <div className='relative mb-4'>
                            <div className='absolute left-3 top-2'>
                                <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='14'
                                height='14'
                                viewBox='0 0 14 14'
                                fill='none'>
                                <path
                                  fillRule='evenodd'
                                  clipRule='evenodd'
                                  d='M2.9375 0.75C1.73633 0.75 0.75 1.73633 0.75 2.9375V4.8125C0.75 6.01367 1.73633 7 2.9375 7C4.13867 7 5.125 6.01367 5.125 4.8125V2.9375C5.125 1.73633 4.13867 0.75 2.9375 0.75ZM2.46875 13.25H4.03125L11.5312 0.75H9.96875L2.46875 13.25ZM3.875 2.9375C3.875 2.4126 3.4624 2 2.9375 2C2.4126 2 2 2.4126 2 2.9375V4.8125C2 5.3374 2.4126 5.75 2.9375 5.75C3.4624 5.75 3.875 5.3374 3.875 4.8125V2.9375ZM11.0625 7C9.86133 7 8.875 7.98633 8.875 9.1875V11.0625C8.875 12.2637 9.86133 13.25 11.0625 13.25C12.2637 13.25 13.25 12.2637 13.25 11.0625V9.1875C13.25 7.98633 12.2637 7 11.0625 7ZM12 9.1875C12 8.6626 11.5874 8.25 11.0625 8.25C10.5376 8.25 10.125 8.6626 10.125 9.1875V11.0625C10.125 11.5874 10.5376 12 11.0625 12C11.5874 12 12 11.5874 12 11.0625V9.1875Z'
                                  fill='#9CA3AF'
                                />
                              </svg>
                            </div>
                            <input
                              type='number'
                              className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                              placeholder='member discount'
                              id='memberDiscount'
                              {...formik.getFieldProps('memberDiscount')}
                            />
                            {formik.touched.memberDiscount &&
                              formik.errors.memberDiscount && (
                                <div className='text-sm text-redAlert'>
                                  {formik.errors.memberDiscount}
                                </div>
                              )}
                          </div> */}

                          <div className='relative mb-4'>
                            <div className='absolute left-3 top-3'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='w-5 h-5'
                                viewBox='0 0 20 20'
                                fill='#9CA3AF'>
                                <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z' />
                              </svg>
                           
                            </div>
                            <input
                              type='number'
                              className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                              placeholder='Registration Limit'
                              id='registrationLimit'
                              {...formik.getFieldProps('registrationLimit')}
                            />
                            {formik.touched.registrationLimit &&
                              formik.errors.registrationLimit && (
                                <div className='text-sm text-redAlert'>
                                  {formik.errors.registrationLimit}
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='grid gap-2 mt-4 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Notification</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid grid-cols-12 gap-4'>
                          <div className='flex items-center justify-between col-span-12'>
                            <div>
                              <h4 className='text-sm font-medium'>
                                Email Notifications
                              </h4>
                              <p className='text-sm text-gray-400'>
                                Get email notifications for new system messages
                                and upcoming events.
                              </p>
                            </div>
                            <div>
                              <ToggleButton
                                checked={emailNotification}
                                setChecked={setEmailNotification}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center justify-end col-span-12 p-4 border-t border-gray-700 buttons'>
                    <div className='flex items-center gap-3'>
                      <button
                        className='px-4 py-2 bg-transparent border border-gray-700 rounded-lg hover:border-yellowBg'
                        type='button'
                        onClick={e => {
                          e.preventDefault(), closeBtn()
                        }}>
                        Cancel
                      </button>

                      <SnapCrackButton
                        type='submit'
                        text='Save Changes'
                        className='p-2 text-black rounded-lg bg-yellowBg'
                        renderLoader={loading}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
