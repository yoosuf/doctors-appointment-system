import React, { useState } from 'react'
import SnapCrackButton from '@/widget/common-button'
import AsyncSelect from 'react-select/async'
import useAddService from '@/components/Admin/hooks/useAddService'
import { customStyles } from '@/utils/helper'
import CloseIcon from '@/widget/image/CloseIcon'
import Loader from '@/widget/loader'
import { RadioGroupField } from '@/components/AppUi/Form/RadioGroup'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AddCategory({
  loading,
  closeBtn,
  formik,
  serviceCategoryOptionsData,
  serviceCategoryValue,
  setServiceCategoryValue,
  editID,
}) {
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <section
          id='AddCategoryModal'
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
                          {editID ? 'Edit Category' : 'Add Category'}
                        </h2>
                      </div>
                      <div className='flex items-center ml-3 h-7'>
                        <button
                          type='button'
                          className='focus:outline-none '
                          onClick={e => {
                            e.preventDefault(), closeBtn()
                          }}>
                          <span className='sr-only'>Close panel</span>
                          <CloseIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='relative h-full p-4 modal-body'>
                    <div className='grid gap-2 mt-3 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>
                          Service Category Information
                        </h4>
                      </div>
                      <div className='col-span-9'>
                        <input
                          type='text'
                          className='flex items-center justify-between w-full px-3 py-2 bg-transparent border border-gray-500 rounded-lg'
                          placeholder='Enter category name'
                          id='name'
                          {...formik.getFieldProps('name')}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className='pt-1 pl-1 text-xs text-redAlert'>
                            {formik.errors.name}
                          </div>
                        ) : null}

                        <div className='mt-3'>
                          <textarea
                            type='text'
                            className='flex items-center justify-between w-full px-3 py-2 bg-transparent border border-gray-500 rounded-lg'
                            placeholder='Enter service category description'
                            id='description'
                            rows='4'
                            {...formik.getFieldProps('description')}
                          />
                        </div>
                        {formik.touched.description &&
                          formik.errors.description ? (
                          <div className='pt-1 pl-1 text-xs text-redAlert'>
                            {formik.errors.description}
                          </div>
                        ) : null}


                        <RadioGroupField
                          id='servedBy'
                          label='Served by'
                          options={[{ 'value': 'NURSE', 'label': 'Nurse' }, { 'value': 'CHIROPRACTOR', 'label': 'Chiropractor' }]}
                          required={true}
                          formik={formik}
                          customClass={`mt-4 mb-4`}
                        />


                        {/* <div className='mt-3'>
                          <AsyncSelect
                            styles={customStyles}
                            isSearchable={false}
                            cacheOptions
                            className='text-sm'
                            placeholder='Select service category'
                            id='type'
                            value={
                              JSON.stringify(serviceCategoryValue) === '{}'
                                ? null
                                : serviceCategoryValue
                            }
                            defaultOptions={serviceCategoryOptionsData}
                            filterOption={() => true}
                            onChange={data => {
                              formik.setFieldValue('type', data?.value)
                              setServiceCategoryValue({
                                label: data?.label,
                                value: data?.value,
                              })
                            }}
                          />
                        </div>
                        {formik.touched.type && formik.errors.type ? (
                          <div className='pt-1 pl-1 text-xs text-redAlert'>
                            {formik.errors.type}
                          </div>
                        ) : null} */}

                      </div>
                    </div>
                  </div>
                  <div className='mt-auto '>
                    <div className='flex items-center justify-end col-span-12 p-4 border-t border-gray-700 buttons'>
                      <button
                        onClick={e => {
                          e.preventDefault(), closeBtn()
                        }}
                        className='block px-4 py-2 text-sm font-medium text-center text-gray-500 transition border border-gray-700 rounded-lg cursor-pointer bg-transprent hover:border-yellowBg'>
                        Close
                      </button>

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
