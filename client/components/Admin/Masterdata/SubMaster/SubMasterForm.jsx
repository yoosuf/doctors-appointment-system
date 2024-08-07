import React, { useState } from 'react'
import SnapCrackButton from '@/widget/common-button'
import CloseIcon from '@/widget/image/CloseIcon'
import Loader from '@/widget/loader'
import { OutlineBtn } from '@/widget/button/YellowBTN'

export default function SubMasterForm({ formik, closeBtn, loading, editID }) {
  const checkCode = e => {
    if (e.target.value) {
      formik.setFieldValue('code', e.target.value.toUpperCase())
    } else {
      formik.setFieldValue('code', '')
    }
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <section
          id='AddSubMasterFormModal'
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
                  <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                    <div className='flex items-center justify-between'>
                      <h2
                        className='text-base font-medium'
                        id='slide-over-title'>
                        {editID ? 'Edit Sub Master' : 'Add Sub Master'}
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
                  <div className='relative h-full p-4 modal-body'>
                    <div className='gap-2 pb-4 mt-4 border-gray-700'>
                      <label className='block mb-2 text-sm'>Name</label>
                      <input
                        type='text'
                        id='name'
                        className='w-full p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                        placeholder='Please Enter Name'
                        {...formik.getFieldProps('name')}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className='mt-1 text-sm text-redAlert'>
                          {formik.errors.name}
                        </div>
                      ) : null}
                    </div>

                    <div className='gap-2 pb-4 mt-2 border-gray-700'>
                      <label className='block mb-2 text-sm'>Code</label>
                      <input
                        type='text'
                        id='code'
                        className='w-full p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                        placeholder='Please Enter Code'
                        {...formik.getFieldProps('code')}
                        onChange={e => checkCode(e)}
                        disabled={editID}
                      />
                      {formik.touched.code && formik.errors.code ? (
                        <div className='mt-1 text-sm text-redAlert'>
                          {formik.errors.code}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className='flex items-center justify-end col-span-12 p-4 mt-auto border-t buttons border-grayMid'>
                    <OutlineBtn
                      btnText='Cancel'
                      onClick={e => {
                        e.preventDefault(), closeBtn()
                      }}
                    />
                    <SnapCrackButton
                      type='submit'
                      text='Save'
                      className='block px-6 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg focus:outline-none bg-yellowBg hover:bg-yellow-400'
                    />
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
