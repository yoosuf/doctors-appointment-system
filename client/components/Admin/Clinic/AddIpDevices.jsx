import React from 'react'
import { OutlineBtn } from '@/widget/button/YellowBTN'
import SnapCrackButton from '@/widget/common-button'
import CloseIcon from '@/widget/image/CloseIcon'
import AsyncSelect from 'react-select/async'
import { customStyles } from '@/utils/helper'
import Loader from '@/widget/loader'

export default function AddIpDevices(props) {
  const {
    formik,
    closeBtn,
    loading,
    asyncSelectRefLocation,
    locationOptionsData,
    loadOptionsLocation,
    locationValue,
    setLocationValue,
  } = props

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <section
          id='ProfileSettingIPDevicesModal'
          className='fixed inset-0 z-10 flex h-screen overflow-hidden text-sm activity-modal-main flex-column'
          aria-labelledby='slide-over-title'
          role='dialog'
          aria-modal='true'>
          <div className='absolute inset-0 overflow-hidden'>
            <div
              className='absolute inset-0 transition-opacity bg-black black-layer'
              aria-hidden='true'
              onClick={() => closeBtn()}></div>
            <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal sm:pl-10'>
              <div className='w-screen max-w-xl'>
                <div className='flex flex-col h-full shadow-xl bg-primary'>
                  <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <h2
                          className='text-base font-medium'
                          id='slide-over-title'>
                          {props.editID ? 'Edit IP Devices' : 'Add IP Devices'}
                        </h2>
                        <p className='text-sm text-gray-400'>
                          Get started by filling in the information below to add
                          note
                        </p>
                      </div>
                      <div className='flex items-center ml-3 h-7'>
                        <button
                          type='button'
                          onClick={e => {
                            e.preventDefault, closeBtn()
                          }}
                          className='focus:outline-none '>
                          <span className='sr-only'>Close panel</span>
                          <CloseIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className='relative h-full p-4 modal-body'
                    id='top-div-location'>
                    <div className='grid gap-2 pb-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>IP Device Info</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid grid-cols-12 gap-4'>
                          <div className='col-span-12 form-group'>
                            <input
                              type='text'
                              className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg '
                              placeholder='Enter your IP'
                              id='ipAddress'
                              {...formik.getFieldProps('ipAddress')}
                            />
                            {formik.touched.ipAddress &&
                            formik.errors.ipAddress ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.ipAddress}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Location Info</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid grid-cols-12 gap-4'>
                          <div className='col-span-12 form-group'>
                            <AsyncSelect
                              styles={customStyles}
                              ref={asyncSelectRefLocation}
                              isSearchable
                              cacheOptions
                              className='text-sm'
                              placeholder='Select or Search Location'
                              id='locationIds'
                              defaultOptions={locationOptionsData}
                              loadOptions={loadOptionsLocation}
                              filterOption={() => true}
                              value={
                                JSON.stringify(locationValue) === '{}'
                                  ? null
                                  : locationValue
                              }
                              onChange={data => {
                                setLocationValue({
                                  value: data?.value,
                                  label: data?.label,
                                })
                                formik.setFieldValue('locationIds', data?.value)
                              }}
                            />
                            {formik.touched.locationIds &&
                            formik.errors.locationIds ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.locationIds}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mt-auto '>
                      <div className='flex items-center justify-end col-span-12 gap-3 p-4 mt-3 border-t border-gray-700 buttons'>
                        <OutlineBtn
                          btnText='Cancel'
                          onClick={e => {
                            e.preventDefault, closeBtn()
                          }}
                        />
                        <SnapCrackButton
                          type='submit'
                          text='Save Changes'
                          className='block px-4 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg hover:bg-yellow-400'
                        />
                      </div>
                    </div>
                  {loading && <Loader customClass='absolute' />}
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  )
}
