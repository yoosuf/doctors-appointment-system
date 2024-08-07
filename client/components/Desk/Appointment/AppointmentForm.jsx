import useAddAppointment from '@/components/Admin/Appointment/hooks/useAddAppointment'
import { REQUIRED_FIELD, USER_ROLE_TYPE } from '@/utils/constant'
import { customStyles } from '@/utils/helper'
import { getUser } from '@/utils/localStorage'
import SnapCrackButton from '@/widget/common-button'
import CalenderIcon from '@/widget/image/CalenderIcon'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import AsyncSelect from 'react-select/async'
import { YellowBtn } from '@/widget/button/YellowBTN'
import ToggleButton from '@/widget/ToggleButton'
import AddCustomer from '@/components/Admin/GlobalAdd/AddCustomer'
import { TextareaField } from '../../AppUi/Form/TextareaField'

export default function AddAppointment (props) {
  const {
    formik,
    closeBtn,
    loading,
    loadOptionsCustomer,
    customerOptionsData,
    serviceCategoryOptionsData,
    categoryValue,
    serviceSubCategoryOptionsData,
    chiroOptionsData,
    loadOptionsChiro,
    setStartDate,
    startDate,
    setChecked,
    checked,
    onChangeChiro,
    nextAvailableSlot,
    payWithCard,
    setPayWithCard,
    payWithCash,
    setPayWithCash,
    chiroValue,
    setChiroValue,
    nextAvailableSlotEnd,
    setNextAvailableSlot,
    setNextAvailableSlotEnd,
    asyncSelectRefCustomer,
    asyncSelectRefChiro,
    clearServiceInfo,
    setChiroOptionsData,
    selectedLocationValue,
    locationOptionsData,
    loadOptionsLocation,
    onChangeLocation,
  } = useAddAppointment(props)

  const [addMoreServices, showAddMoreServices] = useState(true)
  const [activeCustomer, setActiveCustomer] = useState(false)

  const openCustomerModal = async () => {
    await setActiveCustomer(true)
    const openAddCustomer = document.getElementById('AddCustomerModal2')
    openAddCustomer.classList.add('active')
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <section
          id='AddAppointmentModal'
          className='fixed inset-0 z-10 overflow-hidden text-sm activity-modal-main'
          role='dialog'
          aria-modal='true'>
          <div className='absolute inset-0 overflow-hidden'>
            <div
              className='absolute inset-0 transition-opacity bg-black black-layer'
              aria-hidden='true'
              onClick={() => closeBtn(handleReset(formik.resetForm))}></div>
            <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal sm:pl-10'>
              <div className='w-screen max-w-2xl'>
                <div className='flex flex-col h-full shadow-xl bg-primary'>
                  <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                    <div className='flex items-center justify-between'>
                      <h2
                        className='text-base font-medium'
                        id='slide-over-title'>
                        Add Appointment
                      </h2>
                      <div className='flex items-center ml-3 h-7'>
                        <button
                          className='focus:outline-none '
                          onClick={e => {
                            e.preventDefault(),
                              closeBtn(handleReset(formik.resetForm))
                          }}>
                          <span className='sr-only'>Close panel</span>

                          <svg
                            className='w-6 h-6'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='#fff'
                            aria-hidden='true'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M6 18L18 6M6 6l12 12'
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className='relative flex flex-col p-4 modal-body'
                    id='top-div-appointment'>
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Customer</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid grid-cols-12 gap-4'>
                          <div className='col-span-12'>
                            <div className='flex flex-wrap items-start gap-3 sm:flex-nowrap'>
                              <div className='relative flex items-center w-full'>
                                <div className='w-full text-gray-500 bg-transparent rounded-lg'>
                                  <AsyncSelect
                                    styles={customStyles}
                                    ref={asyncSelectRefCustomer}
                                    isSearchable
                                    className='text-sm'
                                    placeholder='Select Customer'
                                    id='patientId'
                                    defaultOptions={customerOptionsData}
                                    loadOptions={loadOptionsCustomer}
                                    onChange={data => {
                                      formik.setFieldValue(
                                        'patientId',
                                        data?.value
                                      )
                                    }}
                                  />
                                  {formik.errors &&
                                    formik.errors.patientId &&
                                    formik.touched &&
                                    formik.touched.patientId && (
                                      <div className='mt-1 text-sm field-error text-redAlert'>
                                        {formik.errors.patientId}
                                      </div>
                                    )}
                                </div>
                              </div>
                              <YellowBtn
                                type='button'
                                onClick={openCustomerModal}
                                btnText='New Customer'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Location Info</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid grid-cols-2 gap-4'>
                          <div className='col-span-2 form-group'>
                            <AsyncSelect
                              name='locationIds'
                              id='locationIds'
                              styles={customStyles}
                              isSearchable={
                                getUser()?.roleId?.code ===
                                USER_ROLE_TYPE.SUPER_ADMIN
                                  ? true
                                  : false
                              }
                              cacheOptions
                              className='text-sm'
                              placeholder='Please select location'
                              value={
                                JSON.stringify(selectedLocationValue) === '{}'
                                  ? null
                                  : selectedLocationValue
                              }
                              defaultOptions={locationOptionsData}
                              loadOptions={loadOptionsLocation}
                              filterOption={() => true}
                              onChange={(data = {}) => {
                                onChangeLocation(data, setFieldValue)
                              }}
                            />
                            {formik.errors &&
                              formik.errors.locationIds &&
                              formik.touched &&
                              formik.touched.locationIds && (
                                <div className='mt-1 text-sm field-error text-redAlert'>
                                  {formik.errors.locationIds}
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Services</h4>
                      </div>

                      {/* ADD SERVICES FROM INSTANT APPOINTMENrt */}
                    </div>
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Appointment Info</h4>
                      </div>
                      <div className='grid col-span-9 gap-3'>
                        <div className='relative flex items-center col-span-1'>
                          <div className='absolute left-3'>
                            <CalenderIcon />
                          </div>
                          <DatePicker
                            dateFormat='MMMM d, yyyy h:mm aa'
                            selected={startDate}
                            onChange={date => {
                              setStartDate(date),
                                setChiroValue(''),
                                setNextAvailableSlot(''),
                                setNextAvailableSlotEnd('')
                            }}
                            placeholder='Date of birth'
                            className='w-full px-3 py-2 pl-10 bg-transparent border border-gray-500 rounded-lg'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Note</h4>
                      </div>
                      <div className='col-span-9'>
                        <TextareaField
                          id='notes'
                          placeholder='Enter appointment notes'
                          required={true}
                          formik={formik}
                          customClass={`mt-4`}
                        />
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Payment Method</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='relative grid items-center grid-cols-2 gap-3 form-group'>
                          <a
                            href='#'
                            onClick={e => {
                              e.preventDefault()
                              setPayWithCard(1)
                            }}
                            className={`flex-cen gap-2 text-gray-400 border border-gray-700 p-2.5 rounded-lg transition hover:border-yellowBg sm:text-base text-sm ${
                              payWithCard ? 'border-yellowBg' : ''
                            }`}>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='w-5 h-5'
                              viewBox='0 0 20 20'
                              fill='currentColor'>
                              <path d='M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z' />
                              <path
                                fillRule='evenodd'
                                d='M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z'
                                clipRule='evenodd'
                              />
                            </svg>
                            Pay with card
                          </a>

                          <a
                            href='#'
                            onClick={e => {
                              e.preventDefault()
                              setPayWithCard(0)
                            }}
                            className={`flex-cen gap-2 text-gray-400 border border-gray-700 p-2.5 rounded-lg transition hover:border-yellowBg sm:text-base text-sm ${
                              !payWithCard ? 'border-yellowBg' : ''
                            }`}>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='w-5 h-5'
                              viewBox='0 0 20 20'
                              fill='currentColor'>
                              <path d='M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z' />
                              <path
                                fillRule='evenodd'
                                d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z'
                                clipRule='evenodd'
                              />
                            </svg>
                            Pay with cash
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-4 md:grid-cols-12'>
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
                                Send email notification about this appointment
                              </p>
                            </div>
                            <div>
                              <ToggleButton
                                checked={checked}
                                setChecked={setChecked}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='mt-auto '>
                      <div className='flex items-center justify-end col-span-12 pt-4 mt-3 border-t border-gray-700 buttons'>
                        <button
                          onClick={e => {
                            e.preventDefault(),
                              closeBtn(handleReset(formik.resetForm))
                          }}
                          className='block px-4 py-2 text-sm font-medium text-center text-gray-500 transition border border-gray-700 rounded-lg cursor-pointer bg-transprent hover:border-yellowBg'>
                          Close
                        </button>

                        <SnapCrackButton
                          type='submit'
                          text='Save'
                          className='block px-4 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg hover:bg-yellow-400'
                          renderLoader={loading}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>

      <AddCustomer
        activeCustomer={activeCustomer}
        setActiveCustomer={setActiveCustomer}
      />
    </>
  )
}
