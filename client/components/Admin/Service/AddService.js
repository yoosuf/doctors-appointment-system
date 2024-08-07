import React, { useState } from 'react'
import SnapCrackButton from '@/widget/common-button'
import AsyncSelect from 'react-select/async'
import useAddService from '@/components/Admin/Service/hooks/useAddService'
import { customStyles } from '@/utils/helper'
import { OutlineBtn } from '@/widget/button/YellowBTN'
import {
  SERVICES_TYPE,
  TIME_DURATION_OPTIONS_DATA,
  IV_TIME_DURATION_OPTIONS_DATA,
} from '@/utils/constant'
import CloseIcon from '@/widget/image/CloseIcon'
import Loader from '@/widget/loader'
import { InputField } from '@/components/AppUi/Form/InputField'
import { TextareaField } from '@/components/AppUi/Form/TextareaField'
import ArrayField from '@/components/AppUi/Form/ArrayField'
import DeleteIcon from '@/widget/image/DeleteIcon'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AddService(props) {
  const {
    formik,
    loading,
    closeBtn,
    // Service Category Dropdown State
    loadOptionsServiceCategory,
    serviceCategoryOptionsData,
    categoryValue,
    setCategoryValue,
    // Service Location Dropdown State
    loadOptionsServiceLocation,
    serviceLocationOptionsData,
    locationValue,
    setLocationValue,
    // Ref State
    asyncSelectRefServiceCategory,
    asyncSelectRefServiceLocation,
    onChangeLocation,
    onChangeServiceCategory,
    asyncTimeDurationRef,
    setTimeDuration,
    timeDuration,
    showDuration,
    setShowDuration,
    // Items
    addItem,
    removeItem,
    isLastItemFilled,
  } = useAddService(props)

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <section
          id='AddServicesModal'
          className='fixed inset-0 z-10 flex h-screen overflow-hidden text-sm activity-modal-main flex-column'
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
                  <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <h2
                          className='text-base font-medium'
                          id='slide-over-title'>
                          {props.editData ? 'Edit Service' : 'Add Service'}
                        </h2>
                      </div>
                      <div className='flex items-center ml-3 h-7'>
                        <button
                          type='button'
                          className='focus:outline-none '
                          onClick={e => {
                            e.preventDefault()
                            closeBtn()
                          }}>
                          <span className='sr-only'>Close panel</span>
                          <CloseIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='relative h-full p-4 modal-body'>
                    <div className='grid gap-2 pb-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Location</h4>
                      </div>
                      <div className='col-span-9'>
                        <AsyncSelect
                          styles={customStyles}
                          ref={asyncSelectRefServiceLocation}
                          isMulti
                          isSearchable
                          cacheOptions
                          className='text-sm'
                          placeholder='Select location'
                          id='locationId'
                          value={
                            locationValue.length > 0 ? locationValue : undefined
                          }
                          defaultOptions={serviceLocationOptionsData}
                          loadOptions={loadOptionsServiceLocation}
                          filterOption={() => true}
                          onChange={data => onChangeLocation(data)}
                        />

                        {formik.touched.locationIds &&
                        formik.errors.locationIds ? (
                          <div className='pt-1 pl-1 text-xs text-redAlert'>
                            {formik.errors.locationIds}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-3 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Service Information</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='mt-0'>
                          <AsyncSelect
                            styles={customStyles}
                            ref={asyncSelectRefServiceCategory}
                            isSearchable
                            cacheOptions
                            className='text-sm'
                            placeholder='Select service category'
                            id='categoryId'
                            defaultOptions={serviceCategoryOptionsData}
                            loadOptions={loadOptionsServiceCategory}
                            value={
                              categoryValue.length > 0
                                ? categoryValue
                                : undefined
                            }
                            filterOption={() => true}
                            onChange={data => {
                              if (data?.label === SERVICES_TYPE.IV_THERAPHIES) {
                                setShowDuration(true)
                              } else {
                                setShowDuration(false)
                              }
                              onChangeServiceCategory(data)
                            }}
                          />

                          {formik.touched.categoryId &&
                          formik.errors.categoryId ? (
                            <div className='pt-1 pl-1 text-xs text-redAlert'>
                              {formik.errors.categoryId}
                            </div>
                          ) : null}
                        </div>

                        <InputField
                          id='name'
                          label={'Service name'}
                          placeholder={'Enter service name'}
                          required={true}
                          formik={formik}
                          customClass={`mt-4`}
                        />

                        <TextareaField
                          id='description'
                          label='Description'
                          placeholder='Enter service description'
                          required={true}
                          formik={formik}
                          customClass={`mt-4`}
                        />
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Service Items</h4>
                      </div>
                      <div className='col-span-9'>
                        {/* Start of ityems section  */}
                        {/* {formik.values.items.length > 0 && (
                            <div className='flex w-full mb-0 text-sm text-gray-400'>
                              <span className='w-1/3 px-0 py-2'>Item Name</span>
                              <span className='w-1/3 px-0 py-2 ml-12'>
                                Price
                              </span>
                              <span className='w-1/3 px-3 py-2'></span>
                            </div>
                          )} */}

                        {formik.values.items.map((item, index) => (
                          <div
                            key={index}
                            className='grid grid-cols-2 gap-3 mb-3 d-flex align-items-center'>
                            <div>
                              <ArrayField
                                name={`items[${index}].name`}
                                placeholder='Item Name'
                                formik={formik}
                              />
                            </div>
                            <div className='gap-3'>
                              <div className='flex items-center'>
                                <ArrayField
                                  name={`items[${index}].price`}
                                  placeholder='Price'
                                  formik={formik}
                                />

                                <button
                                  type='button'
                                  className='self-end px-3 py-3 ml-2 text-white bg-gray-500 rounded hover:bg-gray-600'
                                  onClick={() => removeItem(item.id)}>
                                  <DeleteIcon />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <p
                          className={`inline-block mb-1 text-sm text-gray-400 mt-0`}>
                          P.S. If no services items asosated with this servcie, please
                          remove the service item by clicking on the trach icon.
                        </p>

                        <button
                          type='button'
                          className='self-end px-3 py-3 text-white bg-gray-500 rounded hover:bg-gray-600'
                          onClick={addItem}>
                          Add Item
                        </button>
                        {/* End of Items section  */}
                      </div>
                    </div>

                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Service duration</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='mt-0'>
                          <AsyncSelect
                            styles={customStyles}
                            ref={asyncTimeDurationRef}
                            cacheOptions
                            className='text-sm'
                            placeholder='Select time duration'
                            id='timeDuration'
                            defaultOptions={
                              showDuration
                                ? IV_TIME_DURATION_OPTIONS_DATA
                                : TIME_DURATION_OPTIONS_DATA
                            }
                            filterOption={() => true}
                            value={timeDuration}
                            onChange={data => {
                              setTimeDuration({
                                label: data?.label,
                                value: data?.value,
                              })
                              formik.setFieldValue('timeDuration', data?.value)
                            }}
                          />

                          {formik.touched.timeDuration &&
                          formik.errors.timeDuration ? (
                            <div className='pt-1 pl-1 text-xs text-redAlert'>
                              {formik.errors.timeDuration}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className='grid gap-2 pb-4 mt-4 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Service Price</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='relative flex items-center'>
                          <p className='absolute text-gray-400 left-3'>$</p>
                          <input
                            type='number'
                            className='flex items-center justify-between w-full py-2 pl-8 pr-10 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                            placeholder='Enter price'
                            id='price'
                            {...formik.getFieldProps('price')}
                          />
                          <p className='absolute text-gray-400 right-3'>USD</p>
                        </div>
                        {formik.touched.price && formik.errors.price ? (
                          <div className='pt-1 pl-1 text-xs text-redAlert'>
                            {formik.errors.price}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className='mt-auto '>
                    <div className='flex items-center justify-end col-span-12 p-4 border-t border-gray-700 buttons'>
                      <OutlineBtn
                        btnText='Close'
                        onClick={e => {
                          e.preventDefault()
                          closeBtn()
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
