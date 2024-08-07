import React, { useState } from 'react'
import MultiUploadComponent from '@/widget/multiImageUpload/MultiUploadComponent'
import SnapCrackButton from '@/widget/common-button'
import AsyncSelect from 'react-select/async'
import useAddService from '@/components/Admin/hooks/useAddService'
import { customStyles } from '@/utils/helper'
import { OutlineBtn } from '@/widget/button/YellowBTN'
import {
  SERVICES_TYPE,
  TIME_DURATION_OPTIONS_DATA,
  IV_TIME_DURATION_OPTIONS_DATA,
} from '@/utils/constant'
import CloseIcon from '@/widget/image/CloseIcon'
import Loader from '@/widget/loader'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const AddService = props => {
  const {
    formik,
    loading,
    closeBtn,
    image,
    setImage,
    // Service Category Dropdown State
    loadOptionsServiceCategory,
    serviceCategoryOptionsData,
    // Service Location Dropdown State
    loadOptionsServiceLocation,
    serviceLocationOptionsData,
    // Ref State
    selectedCategoryValue,
    setSelectedCategoryValue,
    asyncSelectRefServiceLocation,
    setTimeDuration,
    timeDuration,
  } = useAddService(props)

  const [showDuration, setShowDuration] = useState(false)
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <section
          id='AddServiceModal'
          className='fixed inset-0 z-10 flex overflow-hidden text-sm activity-modal-main flex-column'
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
                          Add Service
                        </h2>
                      </div>
                      <div className='flex items-center ml-3 h-7'>
                        <button
                          type='button'
                          className='focus:outline-none '
                          onClick={e => {
                            e.preventDefault, closeBtn()
                          }}>
                          <span className='sr-only'>Close panel</span>
                          <CloseIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className='relative flex-1 p-4 modal-body'
                    id='top-div-service'>
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
                          defaultOptions={serviceLocationOptionsData}
                          loadOptions={loadOptionsServiceLocation}
                          filterOption={() => true}
                          value={formik.getFieldProps('locationId')?.value}
                          onChange={async value => {
                            if (
                              value?.find(x => x.value === 'all') &&
                              value[0]?.value !== 'all'
                            ) {
                              formik.setFieldValue(
                                'locationId',
                                value.filter(x => x.value === 'all')
                              )
                            } else {
                              if (
                                value?.find(x => x.value === 'all') &&
                                value?.length === 1
                              ) {
                                formik.setFieldValue(
                                  'locationId',
                                  value.filter(x => x.value === 'all')
                                )
                              } else {
                                formik.setFieldValue(
                                  'locationId',
                                  value.filter(x => x.value !== 'all')
                                )
                              }
                            }
                          }}
                        />

                        {formik.touched.locationId &&
                        formik.errors.locationId ? (
                          <div className='pt-1 pl-1 text-xs text-redAlert'>
                            {formik.errors.locationId}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-3 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Service Information</h4>
                      </div>
                      <div className='col-span-9'>
                        <input
                          type='text'
                          className='flex items-center justify-between w-full px-3 py-2 bg-transparent border border-gray-500 rounded-lg'
                          placeholder='Enter service name'
                          id='name'
                          onChange={(e)=>{      
                            let data = e                      
                            data.target.value = e.target.value.replaceAll(/[^A-Za-z ]/gi, '')
                            formik.handleChange(data)}}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className='pt-1 pl-1 text-xs text-redAlert'>
                            {formik.errors.name}
                          </div>
                        ) : null}

                        <div className='mt-3'>
                          <AsyncSelect
                            styles={customStyles}
                            value={
                              JSON.stringify(selectedCategoryValue) === '{}'
                                ? null
                                : selectedCategoryValue
                            }
                            isSearchable
                            cacheOptions
                            className='text-sm'
                            placeholder='Select service category'
                            id='categoryId'
                            defaultOptions={serviceCategoryOptionsData}
                            loadOptions={loadOptionsServiceCategory}
                            filterOption={() => true}
                            onChange={data => {
                              if (data?.label === SERVICES_TYPE.IV_THERAPHIES) {
                                setShowDuration(true)
                              } else {
                                setShowDuration(false)
                              }
                              formik.setFieldValue('categoryId', data?.value)
                              formik.setFieldValue('timeDuration', '')
                              setTimeDuration('')
                              if (data === null) {
                                setSelectedCategoryValue({})
                              } else {
                                setSelectedCategoryValue(data)
                              }
                            }}
                          />

                          {formik.touched.categoryId &&
                          formik.errors.categoryId ? (
                            <div className='pt-1 pl-1 text-xs text-redAlert'>
                              {formik.errors.categoryId}
                            </div>
                          ) : null}
                        </div>
                        <div className='mt-3'>
                          <input
                            type='text'
                            className='flex items-center justify-between w-full px-3 py-2 bg-transparent border border-gray-500 rounded-lg'
                            placeholder='Enter service description'
                            id='description'
                            {...formik.getFieldProps('description')}
                          />
                          {formik.touched.description &&
                          formik.errors.description ? (
                            <div className='pt-1 pl-1 text-xs text-redAlert'>
                              {formik.errors.description}
                            </div>
                          ) : null}
                        </div>
                        <div className='mt-3'>
                          <AsyncSelect
                            styles={customStyles}
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
                            value={
                              JSON.stringify(timeDuration) === '{}'
                                ? null
                                : timeDuration
                            }
                            onChange={data => {
                              if (data === null) {
                                setTimeDuration({})
                              } else {
                                setTimeDuration(data)
                              }

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
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Service Price</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='relative flex items-center'>
                          <p className='absolute text-gray-400 left-3'>$</p>
                          <input
                            type='number'
                            className='flex items-center justify-between w-full py-2 pl-8 pr-10 bg-transparent border border-gray-500 rounded-lg'
                            placeholder='Enter price'
                            id='price'
                            onKeyDown={(e)=>{
                              if(['e', '+'].includes(e.key)){
                                e.preventDefault();
                                  }
                                }
                              }
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
                    <div className='grid gap-2 pb-4 mt-4 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Service Images</h4>
                      </div>
                      <div className='col-span-9'>
                        <MultiUploadComponent
                          formik={formik}
                          image={image}
                          setImage={setImage}
                          multiple={true}
                          className='p-6 text-center border border-gray-500 border-dashed cursor-pointer dropzone selected-img rounded-xl'
                          svg={
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='38'
                              height='38'
                              viewBox='0 0 38 38'
                              fill='none'
                              className='mx-auto mb-2'>
                              <path
                                d='M21 5H5C3.93913 5 2.92172 5.42143 2.17157 6.17157C1.42143 6.92172 1 7.93913 1 9V29M1 29V33C1 34.0609 1.42143 35.0783 2.17157 35.8284C2.92172 36.5786 3.93913 37 5 37H29C30.0609 37 31.0783 36.5786 31.8284 35.8284C32.5786 35.0783 33 34.0609 33 33V25M1 29L10.172 19.828C10.9221 19.0781 11.9393 18.6569 13 18.6569C14.0607 18.6569 15.0779 19.0781 15.828 19.828L21 25M33 17V25M33 25L29.828 21.828C29.0779 21.0781 28.0607 20.6569 27 20.6569C25.9393 20.6569 24.9221 21.0781 24.172 21.828L21 25M21 25L25 29M29 5H37M33 1V9M21 13H21.02'
                                stroke='#9CA3AF'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                          }
                          text1='Upload one or more file'
                          text2='or drag and drop'
                          text3='PNG, JPG, PDF, DOC'
                        />
                        {formik.touched.imageIds && formik.errors.imageIds ? (
                          <div className='pt-1 pl-1 text-xs text-redAlert'>
                            {formik.errors.imageIds}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className='mt-auto '>
                      <div className='flex items-center justify-end col-span-12 pt-4 mt-3 border-t border-gray-700 buttons'>
                        <OutlineBtn
                          type='button'
                          btnText='Close'
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

export default React.memo(AddService)
