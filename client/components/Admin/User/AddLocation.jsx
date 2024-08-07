import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'

import { OutlineBtn } from '@/widget/button/YellowBTN'
import SnapCrackButton from '@/widget/common-button'
import AsyncSelect from 'react-select/async'
import useAddLocation from '@/components/Admin/User/hooks/useAddLocation'
import { customStyles } from '@/utils/helper'
import CloseIcon from '@/widget/image/CloseIcon'
import EmailIcon from '@/widget/image/EmailIcon'
import PhoneIcon from '@/widget/image/PhoneIcon'
import Loader from '@/widget/loader'

export default function AddLocation(props) {
  
  const {
    formik,
    closeBtn,
    // City Dropdown State
    cityOptionsData,
    loadOptionsCity,
    setCityOptionsData,
    cityValue,
    setCityValue,
    // State Dropdown State
    stateOptionsData,
    loadOptionsState,
    setStateOptionsData,
    stateValue,
    setStateValue,
    // Postal Code Dropdown State
    postalOptionsData,
    loadOptionsPostal,
    setPostalOptionsData,
    postalCodeValue,
    setPostalCodeValue,
    // Billing City Dropdown State
    cityBillingOptionsData,
    loadOptionsBillingCity,
    setCityBillingOptionsData,
    cityBillingValue,
    setCityBillingValue,
    // Billing State Dropdown State
    stateBillingOptionsData,
    loadOptionsBillingState,
    setStateBillingOptionsData,
    stateBillingValue,
    setStateBillingValue,
    // Billing Postal Code Dropdown State
    postalBillingOptionsData,
    loadOptionsBillingPostal,
    setPostalBillingOptionsData,
    postalCodeBillingValue,
    setPostalCodeBillingValue,
    // Sub Owner Dropdown State
    subOwnerOptionsData,
    loadOptionsSubOwner,
    setSubOwnerOptionsData,
    subOwnerValue,
    setSubOwnerValue,
    // Clear Dropdown Ref
    asyncSelectRefSubOwner,
    asyncSelectRefCity,
    asyncSelectRefState,
    asyncSelectRefPostal,
    asyncSelectRefBillingCity,
    asyncSelectRefBillingState,
    asyncSelectRefBillingPostal,
  } = useAddLocation(props)

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <section
          id='AddLocationNewModal'
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
                          {props?.editData ? 'Edit Location' : 'Add Location'}
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
                  <div className='relative flex-1 p-4 modal-body'>
                    <div className='grid gap-2 pb-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Location Info</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='form-group'>
                          <AsyncSelect
                            styles={customStyles}
                            ref={asyncSelectRefSubOwner}
                            isSearchable
                            cacheOptions
                            className='text-sm'
                            placeholder='Search Sub Owner'
                            id='subOwnerId'
                            value={subOwnerValue}
                            defaultOptions={subOwnerOptionsData}
                            loadOptions={loadOptionsSubOwner}
                            filterOption={() => true}
                            onChange={data => {
                              formik.setFieldValue('subOwnerId', data?.value)
                              const dataSubOwner = Array.isArray(data)
                                ? data
                                : [data]
                              const subOwner = dataSubOwner?.map(data => ({
                                value: data?.value,
                                label: data?.label,
                              }))
                              setSubOwnerOptionsData(subOwner)
                              setSubOwnerValue({
                                value: data?.value,
                                label: data?.label,
                              })
                            }}
                          />

                          {formik.touched.subOwnerId &&
                          formik.errors.subOwnerId ? (
                            <div className='pt-1 pl-1 text-xs text-redAlert'>
                              {formik.errors.subOwnerId}
                            </div>
                          ) : null}
                        </div>
                        <div className='mt-3 form-group'>
                          <input
                            type='text'
                            className='w-full p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                            placeholder='Location name'
                            id='locationName'
                            {...formik.getFieldProps('locationName')}
                          />
                          {formik.touched.locationName &&
                          formik.errors.locationName ? (
                            <div className='pt-1 pl-1 text-xs text-redAlert'>
                              {formik.errors.locationName}
                            </div>
                          ) : null}
                        </div>
                        <div className='mt-3 form-group'>
                          <textarea
                            placeholder='write something.'
                            className='w-full col-span-12 p-3 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg h-28'
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
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-500 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Location Address</h4>
                      </div>
                      <div className='grid col-span-9 gap-3'>
                        <div className='form-group'>
                          <input
                            type='text'
                            className='w-full p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                            placeholder='Address'
                            id='addressLine1'
                            {...formik.getFieldProps('addressLine1')}
                          />
                          {formik.touched.addressLine1 &&
                          formik.errors.addressLine1 ? (
                            <div className='pt-1 pl-1 text-xs text-redAlert'>
                              {formik.errors.addressLine1}
                            </div>
                          ) : null}
                        </div>
                        {/* <div className='form-group'>
                          <input
                            type='text'
                            className='w-full p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                            placeholder='2’nd line address'
                            id='addressLine2'
                            {...formik.getFieldProps('addressLine2')}
                          />
                          {formik.touched.addressLine2 &&
                          formik.errors.addressLine2 ? (
                            <div className='pt-1 pl-1 text-xs text-redAlert'>
                              {formik.errors.addressLine2}
                            </div>
                          ) : null}
                        </div> */}
                        <div className='grid grid-cols-12 gap-3'>
                          <div className='col-span-12 form-group'>
                            <AsyncSelect
                              styles={customStyles}
                              ref={asyncSelectRefCity}
                              isSearchable
                              cacheOptions
                              className='text-sm'
                              placeholder='Search City'
                              id='cityId'
                              value={cityValue}
                              defaultOptions={cityOptionsData}
                              loadOptions={loadOptionsCity}
                              filterOption={() => true}
                              onChange={data => {
                                formik.setFieldValue('cityId', data?.value)
                                const dataCity = Array.isArray(data)
                                  ? data
                                  : [data]
                                const city = dataCity?.map(data => ({
                                  value: data?.value,
                                  label: data?.label,
                                }))
                                setCityOptionsData(city)
                                setCityValue({
                                  value: data?.value,
                                  label: data?.label,
                                })
                              }}
                            />
                            {formik.touched.cityId && formik.errors.cityId ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.cityId}
                              </div>
                            ) : null}
                          </div>
                          <div className='col-span-12 form-group'>
                            <AsyncSelect
                              styles={customStyles}
                              ref={asyncSelectRefState}
                              isSearchable
                              cacheOptions
                              className='text-sm'
                              placeholder='Search State'
                              id='provinceId'
                              value={stateValue}
                              defaultOptions={stateOptionsData}
                              loadOptions={loadOptionsState}
                              filterOption={() => true}
                              onChange={data => {
                                formik.setFieldValue('provinceId', data?.value)
                                const dataState = Array.isArray(data)
                                  ? data
                                  : [data]
                                const state = dataState?.map(data => ({
                                  value: data?.value,
                                  label: data?.label,
                                }))
                                setStateOptionsData(state)
                                setStateValue({
                                  value: data?.value,
                                  label: data?.label,
                                })
                              }}
                            />
                            {formik.touched.provinceId &&
                            formik.errors.provinceId ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.provinceId}
                              </div>
                            ) : null}
                          </div>
                          <div className='col-span-12 form-group'>
                            <AsyncSelect
                              styles={customStyles}
                              ref={asyncSelectRefPostal}
                              isSearchable
                              cacheOptions
                              className='text-sm'
                              placeholder='Search Zip Code'
                              id='postalCodeId'
                              value={postalCodeValue}
                              defaultOptions={postalOptionsData}
                              loadOptions={loadOptionsPostal}
                              filterOption={() => true}
                              onChange={data => {
                                formik.setFieldValue(
                                  'postalCodeId',
                                  data?.value
                                )
                                const dataPostal = Array.isArray(data)
                                  ? data
                                  : [data]
                                const postal = dataPostal?.map(data => ({
                                  value: data?.value,
                                  label: data?.label,
                                }))
                                setPostalOptionsData(postal)
                                setPostalCodeValue({
                                  value: data?.value,
                                  label: data?.label,
                                })
                              }}
                            />
                            {formik.touched.postalCodeId &&
                            formik.errors.postalCodeId ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.postalCodeId}
                              </div>
                            ) : null}
                          </div>
                          <div className='col-span-12 sm:col-span-6'>
                            <div className='relative flex items-center'>
                              <div className='absolute left-3'>
                                <EmailIcon />
                              </div>
                              <input
                                type='text'
                                className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                                placeholder='Email'
                                id='email'
                                {...formik.getFieldProps('email')}
                              />
                            </div>
                            {formik.touched.email && formik.errors.email ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.email}
                              </div>
                            ) : null}
                          </div>

                          <div className='col-span-12 sm:col-span-6'>
                            <div className='relative flex items-center'>
                              <div className='absolute left-3'>
                                <PhoneIcon />
                              </div>
                              <input
                                type='tel'
                                className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                                placeholder='Phone Number'
                                id='phone'
                                {...formik.getFieldProps('phone')}
                                maxLength='10'
                              />
                            </div>
                            {formik.touched.phone && formik.errors.phone ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.phone}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-4 border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Billing Address</h4>
                      </div>
                      <div className='grid col-span-9 gap-3'>
                        <div className='form-group'>
                          <input
                            type='text'
                            className='w-full p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                            placeholder='Legal name'
                            id='legalName'
                            {...formik.getFieldProps('legalName')}
                          />
                          {formik.touched.legalName &&
                          formik.errors.legalName ? (
                            <div className='pt-1 pl-1 text-xs text-redAlert'>
                              {formik.errors.legalName}
                            </div>
                          ) : null}
                        </div>
                        <div className='form-group'>
                          <input
                            type='text'
                            className='w-full p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                            placeholder='Address'
                            id='billingAddressLine1'
                            {...formik.getFieldProps('billingAddressLine1')}
                          />
                          {formik.touched.billingAddressLine1 &&
                          formik.errors.billingAddressLine1 ? (
                            <div className='pt-1 pl-1 text-xs text-redAlert'>
                              {formik.errors.billingAddressLine1}
                            </div>
                          ) : null}
                        </div>
                        {/* <div className='form-group'>
                          <input
                            type='text'
                            className='w-full p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                            placeholder='2’nd line address'
                            id='billingAddressLine2'
                            {...formik.getFieldProps('billingAddressLine2')}
                          />
                          {formik.touched.billingAddressLine2 &&
                          formik.errors.billingAddressLine2 ? (
                            <div className='pt-1 pl-1 text-xs text-redAlert'>
                              {formik.errors.billingAddressLine2}
                            </div>
                          ) : null}
                        </div> */}
                        <div className='grid grid-cols-12 gap-3'>
                          <div className='col-span-12 form-group'>
                            <AsyncSelect
                              styles={customStyles}
                              ref={asyncSelectRefBillingCity}
                              isSearchable
                              cacheOptions
                              className='text-sm'
                              placeholder='Search City'
                              id='billingCityId'
                              value={cityBillingValue}
                              defaultOptions={cityBillingOptionsData}
                              loadOptions={loadOptionsBillingCity}
                              filterOption={() => true}
                              onChange={data => {
                                formik.setFieldValue(
                                  'billingCityId',
                                  data?.value
                                )
                                const dataCity = Array.isArray(data)
                                  ? data
                                  : [data]
                                const city = dataCity?.map(data => ({
                                  value: data?.value,
                                  label: data?.label,
                                }))
                                setCityBillingOptionsData(city)
                                setCityBillingValue({
                                  value: data?.value,
                                  label: data?.label,
                                })
                              }}
                            />
                            {formik.touched.billingCityId &&
                            formik.errors.billingCityId ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.billingCityId}
                              </div>
                            ) : null}
                          </div>
                          <div className='col-span-12 form-group'>
                            <AsyncSelect
                              styles={customStyles}
                              ref={asyncSelectRefBillingState}
                              isSearchable
                              cacheOptions
                              className='text-sm'
                              placeholder='Search State'
                              id='billingProvinceId'
                              value={stateBillingValue}
                              defaultOptions={stateBillingOptionsData}
                              loadOptions={loadOptionsBillingState}
                              filterOption={() => true}
                              onChange={data => {
                                formik.setFieldValue(
                                  'billingProvinceId',
                                  data?.value
                                )
                                const dataState = Array.isArray(data)
                                  ? data
                                  : [data]
                                const state = dataState?.map(data => ({
                                  value: data?.value,
                                  label: data?.label,
                                }))
                                setStateBillingOptionsData(state)
                                setStateBillingValue({
                                  value: data?.value,
                                  label: data?.label,
                                })
                              }}
                            />
                            {formik.touched.billingProvinceId &&
                            formik.errors.billingProvinceId ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.billingProvinceId}
                              </div>
                            ) : null}
                          </div>
                          <div className='col-span-12 form-group'>
                            <AsyncSelect
                              styles={customStyles}
                              ref={asyncSelectRefBillingPostal}
                              isSearchable
                              cacheOptions
                              className='text-sm'
                              placeholder='Search Zip Code'
                              id='billingPostalCodeId'
                              value={postalCodeBillingValue}
                              defaultOptions={postalBillingOptionsData}
                              loadOptions={loadOptionsBillingPostal}
                              filterOption={() => true}
                              onChange={data => {
                                formik.setFieldValue(
                                  'billingPostalCodeId',
                                  data?.value
                                )
                                const dataPostal = Array.isArray(data)
                                  ? data
                                  : [data]
                                const postal = dataPostal?.map(data => ({
                                  value: data?.value,
                                  label: data?.label,
                                }))
                                setPostalBillingOptionsData(postal)
                                setPostalCodeBillingValue({
                                  value: data?.value,
                                  label: data?.label,
                                })
                              }}
                            />
                            {formik.touched.billingPostalCodeId &&
                            formik.errors.billingPostalCodeId ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.billingPostalCodeId}
                              </div>
                            ) : null}
                          </div>

                          <div className='col-span-12 form-group'>
                            <input
                              type='text'
                              className='w-full px-3 py-2 text-sm placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                              placeholder='Business Number / Tax Number'
                              id='businessNumber'
                              {...formik.getFieldProps('businessNumber')}
                            />
                            {formik.touched.businessNumber &&
                            formik.errors.businessNumber ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.businessNumber}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mt-auto '>
                    <div className='flex items-center justify-end col-span-12 gap-3 p-4 border-t border-gray-700 buttons'>
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
                  {props.loading && <Loader customClass='absolute' />}
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  )
}
