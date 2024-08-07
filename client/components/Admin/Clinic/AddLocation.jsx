import useDropdown from '@/hooks/common/useDropdown'
import useLocation from '@/components/Admin/Clinic/hooks/useLocation'
import { phoneValidation } from '@/utils/helper'
import { OutlineBtn } from '@/widget/button/YellowBTN'
import SnapCrackButton from '@/widget/common-button'
import CloseIcon from '@/widget/image/CloseIcon'
import EmailIcon from '@/widget/image/EmailIcon'
import PhoneIcon from '@/widget/image/PhoneIcon'
import Loader from '@/widget/loader'
import Select from '@/widget/select'
import React from 'react'

export default function AddLocation(props) {
  const {
    cityOptionsData,
    stateOptionsData,
    postalOptionsData,
    setCityOptionsData,
    setStateOptionsData,
    setPostalOptionsData,
    loadOptionsCity,
    loadOptionsState,
    loadOptionsPostal,
  } = useDropdown()

  const {
    formik,
    loading,
    closeBtn,
    subOwnerOptionsData,
    loadOptionsSubOwner,
    subOwnerValue,
    setSubOwnerValue,
  } = useLocation({
    props,
    cityOptionsData,
    stateOptionsData,
    postalOptionsData,
    setCityOptionsData,
    setStateOptionsData,
    setPostalOptionsData,
    loadOptionsCity,
    loadOptionsState,
    loadOptionsPostal,
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <section
          id='ProfileSettingLocationModal'
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
                          {props.editID ? 'Edit Location' : 'Add Location'}
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
                    className='relative p-4 modal-body'
                    id='top-div-location'>
                    <div className='grid gap-2 pb-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Location Info</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='form-group'>
                          <Select
                            placeholder='Search Sub Owner'
                            name='subOwnerId'
                            defaultOptions={subOwnerOptionsData}
                            loadOptions={loadOptionsSubOwner}
                            value={subOwnerValue}
                            setValue={setSubOwnerValue}
                            formik={formik}
                            isClearable={true}
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
                                className='w-full px-2 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-md '
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
                            placeholder='Address line 2'
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
                            <input
                              type='text'
                              className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg '
                              placeholder='City'
                              id='cityId'
                              {...formik.getFieldProps('cityId')}
                            />
                            {formik.touched.cityId && formik.errors.cityId ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.cityId}
                              </div>
                            ) : null}
                          </div>
                          <div className='col-span-12 form-group'>
                            <input
                              type='text'
                              className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg '
                              placeholder='State'
                              id='provinceId'
                              {...formik.getFieldProps('provinceId')}
                            />
                            {formik.touched.provinceId &&
                            formik.errors.provinceId ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.provinceId}
                              </div>
                            ) : null}
                          </div>
                          <div className='col-span-12 form-group'>
                            <input
                              type='text'
                              className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg '
                              placeholder='Zip Code'
                              id='postalCodeId'
                              {...formik.getFieldProps('postalCodeId')}
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
                                type='number'
                                className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                                placeholder='Phone Number'
                                onKeyPress={e => phoneValidation(e)}
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
                                className='w-full px-2 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-md '
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
                            placeholder='Address line 2'
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
                            <input
                              type='text'
                              className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg '
                              placeholder='City'
                              id='billingCityId'
                              {...formik.getFieldProps('billingCityId')}
                            />
                            {formik.touched.billingCityId &&
                            formik.errors.billingCityId ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.billingCityId}
                              </div>
                            ) : null}
                          </div>
                          <div className='col-span-12 form-group'>
                            <input
                              type='text'
                              className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg '
                              placeholder='State'
                              id='billingProvinceId'
                              {...formik.getFieldProps('billingProvinceId')}
                            />
                            {formik.touched.billingProvinceId &&
                            formik.errors.billingProvinceId ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.billingProvinceId}
                              </div>
                            ) : null}
                          </div>
                          <div className='col-span-12 form-group'>
                            <input
                              type='text'
                              className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg '
                              placeholder='Zip Code'
                              id='billingPostalCodeId'
                              {...formik.getFieldProps('billingPostalCodeId')}
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
                              type='number'
                              className='w-full px-3 py-2 text-sm placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                              placeholder='Business/Tax number'
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
                        className='block px-4 py-2 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg hover:bg-yellow-400'
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
