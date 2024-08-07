import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ToggleButton from '@/widget/ToggleButton'
import useCard from '@/components/Customer/Billing/hooks/useCard'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import SnapCrackButton from '@/widget/common-button'
import CloseIcon from '@/widget/image/CloseIcon'
import Loader from '@/widget/loader'
import { TextareaField } from '../../AppUi/Form/TextareaField'
import { InputField } from '../../AppUi/Form/InputField'
import { SelectField } from '../../AppUi/Form/SelectField'

import {
  relationshipOptions,
  heightFtOptions,
  heightInchOptions,
  weightOptions,
  countryOptions,
  genderOptions,
} from '@/components/Customer/types/types'

export default function AddPaymentMethod ({
  loading,
  CloseBtn,
  formik,
  focus,
  handleInputFocus,
  expiryMonthValidation,
  expiryYearValidation,
  cardNumberValidation,
}) {
  const expiry =
    formik.values.expiry_month.toString() +
    formik.values.expiry_year.toString().substring(2, 4)

  const allowNumber = e => {
    let { value: oldValue } = formik.getFieldProps('number')
    const { value } = e.target
    if (value && /^\d+$/.test(value)) {
      formik.setFieldValue('number', value)
    } else if (!value) {
      formik.setFieldValue('number', '')
    } else {
      formik.setFieldValue('number', oldValue)
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <section
        id='AddPaymentMethod'
        className='fixed inset-0 z-10 flex h-screen overflow-hidden text-sm activity-modal-main flex-column'
        aria-labelledby='slide-over-title'
        role='dialog'
        aria-modal='true'>
        <div className='absolute inset-0 overflow-hidden'>
          <div
            className='absolute inset-0 transition-opacity bg-black black-layer'
            aria-hidden='true'
            onClick={() => CloseBtn()}></div>
          <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal sm:pl-10'>
            <div className='w-screen max-w-md'>
              <div className='flex flex-col h-full shadow-xl bg-primary'>
                <header className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h2
                        className='text-base font-medium'
                        id='slide-over-title'>
                        Add New Payment Method
                      </h2>
                      <p className='text-sm text-gray-400'>
                        Get started by filling in the information below to add
                        note
                      </p>
                    </div>
                    <div className='flex items-center ml-3 h-7'>
                      <button
                        type='button'
                        onClick={() => CloseBtn()}
                        className='focus:outline-none '>
                        <span className='sr-only'>Close panel</span>
                        <CloseIcon />
                      </button>
                    </div>
                  </div>
                </header>

                <main className='relative flex-1 p-4 modal-body'>
                  <div className='w-full'>
                    <Cards
                      cvc={formik.values.cvc}
                      expiry={expiry}
                      focused={focus}
                      name={formik.values.name}
                      number={formik.values.number}
                    />
                  </div>
                  <div className=''>
                    <InputField
                      id='name'
                      label={'Card Holder Name'}
                      placeholder={'Jhon Doe'}
                      required={true}
                      formik={formik}
                      customClass={`mt-4`}
                    />

                    <InputField
                      id='number'
                      label={'Card Number'}
                      placeholder={'444444444444'}
                      required={true}
                      formik={formik}
                      customClass={`mt-4`}
                    />

                    <div className='grid grid-cols-3 gap-2 sm:grid-cols-3'>
                      <InputField
                        id='expiry_month'
                        label={'Exp. month'}
                        placeholder={'12'}
                        required={true}
                        formik={formik}
                        customClass={`mt-4`}
                      />

                      <InputField
                        id='expiry_year'
                        label={'Exp. year'}
                        placeholder={'2027'}
                        required={true}
                        formik={formik}
                        customClass={`mt-4`}
                      />

                      {/* <div>
                          <label className='inline-block mb-2 text-sm text-gray-400'>
                            Expiry Month
                            <span className='pl-0.5'>*</span>
                          </label>
                          <input
                            type='number'
                            id='expiry_month'
                            className='w-full px-3 py-2 text-sm placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
                            placeholder='12'
                            {...formik.getFieldProps('expiry_month')}
                            onFocus={handleInputFocus}
                            maxLength='2'
                            onKeyPress={e => expiryMonthValidation(e)}
                          />
                          {formik.touched.expiry_month &&
                          formik.errors.expiry_month ? (
                            <div className='pt-1 pl-1 text-xs text-redAlert'>
                              {formik.errors.expiry_month}
                            </div>
                          ) : null}
                        </div> */}
                      {/* <div>
                          <label className='inline-block mb-2 text-sm text-gray-400'>
                            Expiry Year
                            <span className='pl-0.5'>*</span>
                          </label>
                          <input
                            type='number'
                            id='expiry_year'
                            className='w-full px-3 py-2 text-sm placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
                            placeholder='2021'
                            {...formik.getFieldProps('expiry_year')}
                            onFocus={handleInputFocus}
                            maxLength='4'
                            onKeyPress={e => expiryYearValidation(e)}
                            disabled={!formik.values.expiry_month}
                          />
                          {formik.touched.expiry_year &&
                          formik.errors.expiry_year ? (
                            <div className='pt-1 pl-1 text-xs text-redAlert'>
                              {formik.errors.expiry_year}
                            </div>
                          ) : null}
                        </div> */}

                      <InputField
                        id='cvc'
                        label={'cvc'}
                        placeholder={''}
                        required={true}
                        formik={formik}
                        customClass={`mt-4`}
                      />
                      {/* <div>



                          <label className='inline-block mb-2 text-sm text-gray-400'>
                            Security Number(CVV)
                            <span className='pl-0.5'>*</span>
                          </label>
                          <input
                            type='text'
                            className='w-full px-3 py-2 text-sm placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
                            placeholder='***'
                            id='cvc'
                            {...formik.getFieldProps('cvc')}
                            onFocus={handleInputFocus}
                            maxLength='4'
                          />
                          {formik.touched.cvc && formik.errors.cvc ? (
                            <div className='pt-1 pl-1 text-xs text-redAlert'>
                              {formik.errors.cvc}
                            </div>
                          ) : null}
                        </div> */}
                    </div>

                    <div className='grid grid-cols-2 gap-2 mt-3 sm:grid-cols-2'>
                      <div className='col-span-2'>
                        <TextareaField
                          id='addressLine1'
                          label='Address'
                          placeholder={`Address`}
                          required={true}
                          formik={formik}
                          customClass={`mt-0`}
                          type='text'
                        />
                      </div>

                      <InputField
                        id='cityId'
                        label='City'
                        placeholder={`City`}
                        required={true}
                        formik={formik}
                        customClass={`mt-0 mb-3`}
                        type='text'
                      />

                      <InputField
                        id='provinceId'
                        label='State'
                        placeholder={`State`}
                        required={true}
                        formik={formik}
                        customClass={`mt-0 mb-3`}
                        type='text'
                      />

                      <InputField
                        id='postalCodeId'
                        label='Zip Code'
                        placeholder={`Zip Code`}
                        required={true}
                        formik={formik}
                        customClass={`mt-0 mb-3`}
                        type='text'
                      />

                      <div className='col-span-2'>
                        <SelectField
                          id='countryId'
                          label='Country'
                          required={true}
                          options={countryOptions}
                          value={countryOptions.find(
                            option => option.value === formik.values.countryId
                          )}
                          isClearable={true}
                          onChange={selectedOption => {
                            formik.setFieldValue(
                              'countryId',
                              selectedOption?.label
                            )
                          }}
                          formik={formik}
                        />
                      </div>
                    </div>
                  </div>

                  {/* <div className='flex items-center justify-between col-span-12 mt-4'>
                      <div>
                        <h4 className='text-sm font-medium'>Set as default</h4>
                        <p className='text-sm text-gray-400'>
                          set this billing as default payment for all future
                          purchase product and services
                        </p>
                      </div>
                      <div>
                        <ToggleButton />
                      </div>
                    </div> */}
                  {/* </div> */}
                </main>

                <footer className='mt-auto '>
                  <div className='flex items-center justify-end col-span-12 pt-4 pr-4 mt-3 mb-4 border-t border-gray-700 buttons'>
                    <a
                      onClick={() => CloseBtn()}
                      className='block px-4 py-2 text-sm font-medium text-center text-gray-500 transition border border-gray-700 rounded-lg bg-transprent hover:border-yellowBg'>
                      Cancel
                    </a>

                    <SnapCrackButton
                      type='submit'
                      text='Save & Add Payment Method'
                      className='block px-4 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg hover:bg-yellow-400'
                    />
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  )
}
