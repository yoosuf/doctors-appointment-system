import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Fragment } from 'react'
import AsyncSelect from 'react-select/async'
import { Menu, Transition } from '@headlessui/react'
import useAddFiles from '@/components/Admin/hooks/useAddFiles'
import { customStyles } from '@/utils/helper'
import MultiUploadComponent from '@/widget/multiImageUpload/MultiUploadComponent'
import ToggleButton from '@/widget/ToggleButton'
import SnapCrackButton from '@/widget/common-button'
import Select from '@/widget/select'
import CloseIcon from '@/widget/image/CloseIcon'
import Loader from '@/widget/loader'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const AddFiles = props => {
  const {
    loading,
    closeBtn,
    formik,
    image,
    setImage,
    notVisibleToPatient,
    setNotVisibleToPatient,
    fileCategoryOptionsData,
    fileCategoryValue,
    setFileCategoryValue,
    fileTypeOptionsData,
    fileTypeValue,
    setFileTypeValue,
  } = useAddFiles(props)

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <section
          id='AddFileModal'
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
                          Add Files
                        </h2>
                        <p className='text-sm text-gray-400'>
                          Get started by filling in the information below to add
                          note
                        </p>
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
                  <div
                    className='relative flex-1 p-4 modal-body'
                    id='top-div-file'>
                    <div className='grid gap-2 pb-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>File Info</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='form-group'>
                          <input
                            type='text'
                            className='w-full px-3 py-2 text-sm bg-transparent border border-gray-500 rounded-lg'
                            placeholder='Enter file title'
                            id='title'
                            {...formik.getFieldProps('title')}
                          />
                          {formik.touched.title && formik.errors.title && (
                            <div className='mt-1 text-sm text-redAlert'>
                              {formik.errors.title}
                            </div>
                          )}
                        </div>
                        <div className='grid grid-cols-1 gap-3 mt-3 sm:grid-cols-1'>
                          <div>
                            <Select
                              placeholder='Select File Category'
                              name='slug'
                              defaultOptions={fileCategoryOptionsData}
                              value={fileCategoryValue}
                              setValue={setFileCategoryValue}
                              formik={formik}
                            />

                            {formik.touched.slug && formik.errors.slug && (
                              <div className='mt-1 text-sm text-redAlert'>
                                {formik.errors.slug}
                              </div>
                            )}
                          </div>
{/* 
                          <div>
                            <Select
                              placeholder='Select File Type'
                              name='type'
                              defaultOptions={fileTypeOptionsData}
                              value={fileTypeValue}
                              setValue={setFileTypeValue}
                              formik={formik}
                              isClearable='true'
                            />
                            {formik.touched.type && formik.errors.type && (
                              <div className='mt-1 text-sm text-redAlert'>
                                {formik.errors.type}
                              </div>
                            )}
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>File</h4>
                      </div>
                      <div className='col-span-9'>
                        <MultiUploadComponent
                          formik={formik}
                          image={image}
                          setImage={setImage}
                          type={fileTypeValue}
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

                        {formik.touched.imageIds && formik.errors.imageIds && (
                          <div className='mt-1 text-sm text-redAlert'>
                            {formik.errors.imageIds}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-4 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>File Description</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid grid-cols-12 gap-4'>
                          <textarea
                            placeholder='write something.'
                            id='description'
                            {...formik.getFieldProps('description')}
                            className='w-full col-span-12 p-3 bg-transparent border border-gray-500 rounded-lg h-28'
                          />
                        </div>
                        {formik.touched.imageIds &&
                          formik.errors.description && (
                            <div className='mt-1 text-sm text-redAlert'>
                              {formik.errors.description}
                            </div>
                          )}

                        <div className='col-span-9 mt-3'>
                          <div className='grid grid-cols-12 gap-4 '>
                            <div className='flex items-center justify-between col-span-12 mt-2'>
                              <div>
                                <h4 className='text-sm font-medium'>
                                  Not Visible To Patient
                                </h4>
                              </div>
                              <div>
                                <ToggleButton
                                  checked={notVisibleToPatient}
                                  setChecked={setNotVisibleToPatient}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='mt-auto '>
                      <div className='flex items-center justify-end col-span-12 pt-4 mt-3 border-t border-gray-700 buttons'>
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

export default React.memo(AddFiles)
