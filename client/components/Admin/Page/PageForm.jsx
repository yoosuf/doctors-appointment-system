import { OutlineBtn } from '@/widget/button/YellowBTN'
import SnapCrackButton from '@/widget/common-button'
import CloseIcon from '@/widget/image/CloseIcon'
import Loader from '@/widget/loader'
import Select from '@/widget/select'
import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const PageForm = ({
  formik = {},
  editID,
  closeBtn = () => {},
  loading,
  loadOptionsProductLocation,
  productLocationOptionsData,
  locationValue,
  setLocationValue,
}) => {
  return (
    <form onSubmit={formik.handleSubmit} autoComplete='none'>
      <section
        id='PageModal'
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
                        {editID ? 'Edit' : 'Add'} Page
                      </h2>
                    </div>
                    <div className='flex items-center ml-3 h-7'>
                      <button
                        className='focus:outline-none '
                        type='button'
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
                  className='relative h-full p-4 modal-body'
                  id='top-div-product'>
                  <div className='grid gap-2 pb-4 border-b border-gray-700 md:grid-cols-12'>
                    <div className='col-span-3'>
                      <h4 className='font-medium'>
                        Location 
                      </h4>
                    </div>
                    <div className='col-span-9'>
                      <Select
                        isSearchable={true}
                        placeholder='Select page for the location'
                        name='locationId'
                        defaultOptions={productLocationOptionsData}
                        loadOptions={loadOptionsProductLocation}
                        value={locationValue}
                        setValue={value => {
                          console.log(value)
                          setLocationValue(value)
                        }}
                        formik={formik}
                        isDisabled={false}
                      />

                      {formik.touched.locationId && formik.errors.locationId ? (
                        <div className='pt-1 pl-1 text-xs text-redAlert'>
                          {formik.errors.locationId}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className='grid gap-2 pb-4 mt-3 border-b border-gray-700 md:grid-cols-12'>
                    <div className='col-span-3'>
                      <h4 className='font-medium'>Content</h4>
                    </div>
                    <div className='col-span-9'>
                      <ReactQuill
                        theme={`snow`}
                        value={formik.values.body}
                        onChange={newValue =>
                          formik.setFieldValue('body', newValue)
                        }
                      />

                      {formik.touched.body && formik.errors.body ? (
                        <div className='pt-1 pl-1 text-xs text-redAlert'>
                          {formik.errors.body}
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
  )
}

export default PageForm
