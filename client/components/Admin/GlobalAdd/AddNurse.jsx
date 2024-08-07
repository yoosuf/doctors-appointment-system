import useDropdown from '@/hooks/common/useDropdown'
import useAddChrio from '@/components/Admin/hooks/useAddChrio'
import useAddNurse from '@/components/Admin/hooks/useAddNurse'
import { REQUIRED_IMAGE_TYPE } from '@/utils/constant'

import { copy, customStyles, phoneValidation } from '@/utils/helper'
import SnapCrackButton from '@/widget/common-button'
import SnapCrackDateComponent from '@/widget/date'
import CalenderIcon from '@/widget/image/CalenderIcon'
import CloseIcon from '@/widget/image/CloseIcon'
import EmailIcon from '@/widget/image/EmailIcon'
import EyeClose from '@/widget/image/EyeClose'
import EyeOpen from '@/widget/image/EyeOpen'
import PhoneIcon from '@/widget/image/PhoneIcon'
import UserIcon from '@/widget/image/UserIcon'
import UploadComponent from '@/widget/ImageUpload/UploadComponent'
import Loader from '@/widget/loader'
import Select from '@/widget/select'
import subYears from 'date-fns/subYears'
import ImageLogo from 'icons/ImageLogo'
import Image from 'next/image'
import React, { useState } from 'react'
import AsyncSelect from 'react-select/async'
import ToggleButton from '@/widget/ToggleButton'

const AddNurse = props => {
  const [startDate, setStartDate] = useState(subYears(new Date(), 16))
  const closeBtn = async () => {
    const addNurseModal = document.getElementById('AddNurseModal')
    addNurseModal.classList.remove('active')
  }
  const {
    prefixOptionsData,
    prefixData,
    genderOptionsData,
    genderData,
    cityOptionsData,
    stateOptionsData,
    postalOptionsData,
    setCityOptionsData,
    setStateOptionsData,
    setPostalOptionsData,
    getAllMasterData,
    loadOptionsPrefix,
    loadOptionsGender,
    loadOptionsCity,
    loadOptionsState,
    loadOptionsPostal,
    selectedPrefixValue,
    selectedGenderValue,
    selectedCityValue,
    selectedStateValue,
    selectedPostalValue,
    setSelectedPrefixValue,
    setSelectedGenderValue,
    setSelectedCityValue,
    setSelectedStateValue,
    setSelectedPostalValue,
  } = useDropdown()

  const {
    subOwnerId,
    checked,
    setChecked,
    active,
    setActive,
    activeEmailNotification,
    setActiveEmailNotification,
    passwordEyeIcon,
    setPasswordEyeIcon,
    confirmPasswordEyeIcon,
    setConfirmPasswordEyeIcon,
    formik,
    image,
    setImage,
    loading,
    // Sub Owner Dropdown State
    subOwnerOptionsData,
    loadOptionsSubOwner,
    setSubOwnerOptionsData,
    setSubOwnerId,
    // Staff Dropdown State
    staffOptionsData,
    setStaffOptionsData,
    // Discipline Dropdown State
    disciplineOptionsData,
    setDisciplineOptionsData,
    loadOptionsDiscipline,
    // Location Dropdown State
    locationOptionsData,
    loadOptionsLocation,
    setLocationOptionsData,
    // Clear Dropdown Ref
    selectedSubOwnerValue,
    selectedStaffValue,
    selectedLocationValue,
    selectedDisciplineValue,
    setSelectedSubOwnerValue,
    setSelectedLocationValue,
    setSelectedStaffValue,
    setSelectedDisciplineValue,
    // Active Chrio State
    isActiveChrio,
    setIsActiveChrio,
  } = useAddNurse({
    props,
    prefixData,
    genderData,
    getAllMasterData,
    loadOptionsPrefix,
    loadOptionsGender,
    loadOptionsCity,
    loadOptionsState,
    loadOptionsPostal,
    setSelectedPrefixValue,
    setSelectedGenderValue,
    setSelectedCityValue,
    setSelectedStateValue,
    setSelectedPostalValue,
  })
  return (
    <>
      <form onSubmit={formik.handleSubmit} autoComplete='none'>
        <section
          id='AddNurseModal'
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
                        Add Nurse
                      </h2>
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
                    className='relative flex-1 p-4 modal-body'
                    id='top-div-chiro'>
                    <div className='grid gap-2 pb-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Image Profile</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className=''>
                          <div className='flex items-center image-profile'>
                            {image ? (
                              <div className='relative flex items-center justify-center overflow-hidden rounded-full img-select'>
                                <img
                                  src={image}
                                  className='object-cover object-center rounded-full h-14 w-14'
                                  alt='Snapcrack'
                                />
                                <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black delete-icon'>
                                  <button
                                    type='button'
                                    className='transition focus:outline-none'
                                    onClick={e => {
                                      e.preventDefault(),
                                        formik.setFieldValue(
                                          'profile_image',
                                          ''
                                        ),
                                        setImage()
                                    }}>
                                    <ImageLogo />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <Image
                                src='/images/Avatar.svg'
                                height={56}
                                width={56}
                                alt=''
                              />
                            )}

                            <div className='ml-3'>
                              <UploadComponent
                                formik={formik}
                                image={image}
                                setImage={setImage}
                                text='Upload a file'
                              />

                              <p className='mt-2 text-sm text-gray-400'>
                                {REQUIRED_IMAGE_TYPE}
                              </p>
                            </div>
                          </div>
                          {formik.touched.profile_image &&
                          formik.errors.profile_image ? (
                            <div className='pt-1 pl-1 text-xs text-redAlert'>
                              {formik.errors.profile_image}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Account</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid grid-cols-12 gap-4'>
                         
                          <div className='col-span-12 sm:col-span-6'>
                            <div className='relative flex items-center'>
                              <div className='absolute left-3'>
                                <EmailIcon />
                              </div>
                              <input
                                type='email'
                                className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                                placeholder='Enter email'
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
                                onKeyPress={e => phoneValidation(e)}
                                className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                                placeholder='Enter phone number'
                                maxLength='10'
                                id='phone'
                                {...formik.getFieldProps('phone')}
                              />
                            </div>
                            {formik.touched.phone && formik.errors.phone ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.phone}
                              </div>
                            ) : null}
                          </div>

                          <div className='col-span-12 form-group sm:col-span-6'>
                            <AsyncSelect
                              styles={customStyles}
                              value={
                                JSON.stringify(selectedStaffValue) === '{}'
                                  ? null
                                  : selectedStaffValue
                              }
                              isSearchable
                              cacheOptions
                              className='text-sm'
                              placeholder='Select staff/chiro'
                              id='staff'
                              defaultOptions={staffOptionsData}
                              filterOption={() => true}
                              onChange={data => {
                                formik.setFieldValue('staff', data?.value)
                                if (data?.label === 'Chiropractor') {
                                  setIsActiveChrio(true)
                                }
                                if (data?.label === 'Staff') {
                                  setIsActiveChrio(false)
                                }
                                if (data === null) {
                                  setSelectedStaffValue({})
                                } else {
                                  setSelectedStaffValue(data)
                                }
                              }}
                            />
                            {formik.touched.staff && formik.errors.staff ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.staff}
                              </div>
                            ) : null}
                          </div>

                          <div className='col-span-12 form-group sm:col-span-6'>
                            <AsyncSelect
                              styles={customStyles}
                              value={
                                JSON.stringify(selectedSubOwnerValue) === '{}'
                                  ? null
                                  : selectedSubOwnerValue
                              }
                              isSearchable
                              // cacheOptions
                              className='text-sm'
                              placeholder='Select sub owner'
                              id='staff'
                              defaultOptions={subOwnerOptionsData}
                              loadOptions={loadOptionsSubOwner}
                              // filterOption={() => true}
                              onInputChange={value => {
                                // if (
                                //   value === '' &&
                                //   subOwnerOptionsData.length === 0
                                // ) {
                                loadOptionsSubOwner()
                                // }
                              }}
                              isClearable
                              onChange={data => {
                                formik.setFieldValue('parentId', data?.value)

                                if (data === null) {
                                  setSelectedSubOwnerValue({})
                                  setSelectedLocationValue({})
                                  setLocationOptionsData([])
                                  formik.setFieldValue('locationIds', '')
                                } else {
                                  setSelectedSubOwnerValue(data)
                                  setLocationOptionsData([])
                                  setSelectedLocationValue({})
                                  setSubOwnerId(data?.value)
                                }
                              }}
                            />

                            {formik.touched.parentId &&
                            formik.errors.parentId ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.parentId}
                              </div>
                            ) : null}
                          </div>

                          {isActiveChrio && (
                            <>
                              <div className='col-span-12 form-group sm:col-span-6'>
                                <AsyncSelect
                                  styles={customStyles}
                                  value={
                                    JSON.stringify(selectedDisciplineValue) ===
                                    '[]'
                                      ? null
                                      : selectedDisciplineValue
                                  }
                                  isSearchable
                                  cacheOptions
                                  isMulti
                                  className='text-sm'
                                  placeholder='Search discipline'
                                  id='disciplineIds'
                                  defaultOptions={disciplineOptionsData}
                                  loadOptions={loadOptionsDiscipline}
                                  filterOption={() => true}
                                  onChange={data => {
                                    let arr = []
                                    if (data) {
                                      data?.map(d => {
                                        arr = [...arr, d?.value]
                                      })

                                      formik.setFieldValue('disciplineIds', arr)
                                    }
                                    if (data === null) {
                                      setSelectedDisciplineValue([])
                                    } else {
                                      setSelectedDisciplineValue(data)
                                    }
                                  }}
                                />
                                {formik.touched.staff && formik.errors.staff ? (
                                  <div className='pt-1 pl-1 text-xs text-redAlert'>
                                    {formik.errors.staff}
                                  </div>
                                ) : null}
                              </div>
                              <div className='col-span-12 form-group sm:col-span-6'>
                                <input
                                  type='text'
                                  className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                                  id='licenseNumber'
                                  placeholder='Enter license number'
                                  {...formik.getFieldProps('licenseNumber')}
                                />
                                {formik.touched.licenseNumber &&
                                formik.errors.licenseNumber ? (
                                  <div className='pt-1 pl-1 text-xs text-redAlert'>
                                    {formik.errors.licenseNumber}
                                  </div>
                                ) : null}
                              </div>
                            </>
                          )}

                          <div className='flex gap-1.5 justify-between items-center col-span-12'>
                            <div>
                              <h4 className='text-sm font-medium'>
                                Generate password
                              </h4>
                              <p className='text-sm text-gray-400'>
                                Auto generate password off, password will sent
                                to customer email
                              </p>
                            </div>
                            <div>
                              <ToggleButton
                                checked={checked}
                                setChecked={setChecked}
                              />
                            </div>
                          </div>

                          {!checked && (
                            <>
                              <div className='col-span-12 sm:col-span-6'>
                                <div className='relative flex items-center transition-all'>
                                  <div className='absolute right-3'>
                                    {!passwordEyeIcon ? (
                                      <div
                                        className='pl-2 hover:cursor-pointer'
                                        onClick={() =>
                                          setPasswordEyeIcon(true)
                                        }>
                                        <EyeClose />
                                      </div>
                                    ) : (
                                      <div
                                        className='pl-2 hover:cursor-pointer'
                                        onClick={() =>
                                          setPasswordEyeIcon(false)
                                        }>
                                        <EyeOpen />
                                      </div>
                                    )}
                                  </div>
                                  <input
                                    type={
                                      passwordEyeIcon === false
                                        ? 'password'
                                        : 'input'
                                    }
                                    className='w-full px-3 py-2 pr-10 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                                    placeholder='Enter password'
                                    // onPasteCapture={e => copy(e)}
                                    id='password'
                                    {...formik.getFieldProps('password')}
                                    maxLength='20'
                                  />
                                </div>
                                {formik.touched.password &&
                                formik.errors.password ? (
                                  <div className='pt-1 pl-1 text-xs text-redAlert'>
                                    {formik.errors.password}
                                  </div>
                                ) : null}
                              </div>
                              <div className='col-span-12 sm:col-span-6'>
                                <div className='relative flex items-center'>
                                  <div className='absolute right-3'>
                                    {!confirmPasswordEyeIcon ? (
                                      <div
                                        className='pl-2 hover:cursor-pointer bg-primary'
                                        onClick={() =>
                                          setConfirmPasswordEyeIcon(true)
                                        }>
                                        <EyeClose />
                                      </div>
                                    ) : (
                                      <div
                                        className='pl-2 hover:cursor-pointer bg-primary'
                                        onClick={() =>
                                          setConfirmPasswordEyeIcon(false)
                                        }>
                                        <EyeOpen />
                                      </div>
                                    )}
                                  </div>
                                  <input
                                    type={
                                      confirmPasswordEyeIcon === false
                                        ? 'password'
                                        : 'input'
                                    }
                                    className='w-full px-3 py-2 pr-10 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                                    placeholder='Confirm password'
                                    // onPasteCapture={e => copy(e)}
                                    id='confirm_password'
                                    {...formik.getFieldProps(
                                      'confirm_password'
                                    )}
                                    maxLength='20'
                                  />
                                </div>
                                {formik.touched.confirm_password &&
                                formik.errors.confirm_password ? (
                                  <div className='pt-1 pl-1 text-xs text-redAlert'>
                                    {formik.errors.confirm_password}
                                  </div>
                                ) : null}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Personal Information</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid grid-cols-12 gap-4'>
                          {/* <div className='col-span-12 form-group sm:col-span-4'>
                            <div className='w-full text-gray-500 bg-transparent rounded-lg'>
                              <Select
                                placeholder='Prefix'
                                name='prefixId'
                                defaultOptions={prefixOptionsData}
                                loadOptions={loadOptionsPrefix}
                                value={selectedPrefixValue}
                                setValue={setSelectedPrefixValue}
                                formik={formik}
                              />
                            </div>
                            {formik.touched.prefixId &&
                            formik.errors.prefixId ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.prefixId}
                              </div>
                            ) : null}
                          </div> */}
                          <div className='col-span-12 form-group sm:col-span-6'>
                            <input
                              type='text'
                              className='w-full p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                              placeholder='First name'
                              id='firstName'
                              {...formik.getFieldProps('firstName')}
                            />
                            {formik.touched.firstName &&
                            formik.errors.firstName ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.firstName}
                              </div>
                            ) : null}
                          </div>
                          <div className='col-span-12 form-group sm:col-span-6'>
                            <input
                              type='text'
                              className='w-full p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                              placeholder='Last name'
                              id='lastName'
                              {...formik.getFieldProps('lastName')}
                            />
                            {formik.touched.lastName &&
                            formik.errors.lastName ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.lastName}
                              </div>
                            ) : null}
                          </div>
                          <div className='col-span-12 form-group sm:col-span-4'>
                            <div className='w-full text-gray-500 bg-transparent rounded-lg'>
                              <Select
                                placeholder='Gender'
                                name='genderId'
                                defaultOptions={genderOptionsData}
                                loadOptions={loadOptionsGender}
                                value={selectedGenderValue}
                                setValue={setSelectedGenderValue}
                                formik={formik}
                              />
                              {formik.touched.genderId &&
                              formik.errors.genderId ? (
                                <div className='pt-1 pl-1 text-xs text-redAlert'>
                                  {formik.errors.genderId}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className='col-span-12 sm:col-span-8'>
                            <div className='relative flex items-center '>
                              <div className='absolute left-3'>
                                <CalenderIcon />
                              </div>
                              <SnapCrackDateComponent
                                date={startDate}
                                setDate={setStartDate}
                                formik={formik}
                              />
                            </div>
                            {formik.touched.dob && formik.errors.dob ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.dob}
                              </div>
                            ) : null}
                          </div>
                          {/* <div className='col-span-12 form-group'>
                            <input
                              type='text'
                              className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg '
                              placeholder='Address 1'
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
                          <div className='col-span-12 form-group'>
                            <input
                              type='text'
                              className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg '
                              placeholder='Address 2'
                              id='addressLine2'
                              {...formik.getFieldProps('addressLine2')}
                            />
                            {formik.touched.addressLine2 &&
                            formik.errors.addressLine2 ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.addressLine2}
                              </div>
                            ) : null}
                          </div>
                          <div className='col-span-12 form-group'>
                            <div className='w-full text-sm bg-transparent rounded-lg'>
                              <Select
                                placeholder='Search city'
                                name='cityId'
                                defaultOptions={cityOptionsData}
                                loadOptions={loadOptionsCity}
                                value={selectedCityValue}
                                setValue={setSelectedCityValue}
                                formik={formik}
                              />
                              {formik.touched.cityId && formik.errors.cityId ? (
                                <div className='pt-1 pl-1 text-xs text-redAlert'>
                                  {formik.errors.cityId}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className='col-span-12 form-group'>
                            <div className='w-full bg-transparent rounded-lg'>
                              <Select
                                placeholder='Search state'
                                name='provinceId'
                                defaultOptions={stateOptionsData}
                                loadOptions={loadOptionsState}
                                value={selectedStateValue}
                                setValue={setSelectedStateValue}
                                formik={formik}
                              />
                              {formik.touched.provinceId &&
                              formik.errors.provinceId ? (
                                <div className='pt-1 pl-1 text-xs text-redAlert'>
                                  {formik.errors.provinceId}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className='col-span-12 form-group'>
                            <div className='w-full bg-transparent rounded-lg'>
                              <Select
                                placeholder='Search zip code'
                                name='postalCodeId'
                                defaultOptions={postalOptionsData}
                                loadOptions={loadOptionsPostal}
                                value={selectedPostalValue}
                                setValue={setSelectedPostalValue}
                                formik={formik}
                              />
                              {formik.touched.postalCodeId &&
                              formik.errors.postalCodeId ? (
                                <div className='pt-1 pl-1 text-xs text-redAlert'>
                                  {formik.errors.postalCodeId}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className='col-span-12'>
                            <div className='relative flex items-center'>
                              <div className='absolute left-3'>
                                <PhoneIcon />
                              </div>
                              <input
                                type='number'
                                onKeyPress={e => phoneValidation(e)}
                                className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                                placeholder='Alternative phone number'
                                id='phone2'
                                maxLength='10'
                                {...formik.getFieldProps('phone2')}
                              />
                            </div>
                            {formik.touched.phone2 && formik.errors.phone2 ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.phone2}
                              </div>
                            ) : null}
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Assign Location</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid grid-cols-12 gap-4'>
                          <div className='col-span-12 form-group'>
                            <Select
                              placeholder='Search location'
                              name='locationIds'
                              defaultOptions={locationOptionsData}
                              loadOptions={loadOptionsLocation}
                              value={selectedLocationValue}
                              setValue={setSelectedLocationValue}
                              formik={formik}
                              isClearable={true}
                              isDisabled={subOwnerId ? false : true}
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
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Options</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid grid-cols-12 gap-4'>
                          <div className='flex gap-1.5 justify-between items-center  col-span-12'>
                            <div>
                              <h4 className='text-sm font-medium'>Active</h4>
                              <p className='text-sm text-gray-400'>
                                Activate user after registration
                              </p>
                            </div>
                            <div>
                              <ToggleButton
                                checked={active}
                                setChecked={setActive}
                              />
                            </div>
                          </div>
                          <div className='flex gap-1.5 justify-between items-center col-span-12'>
                            <div>
                              <h4 className='text-sm font-medium'>
                                Email Notifications
                              </h4>
                              <p className='text-sm text-gray-400'>
                                Get email notifications for new system messages
                                and upcoming events.
                              </p>
                            </div>
                            <div>
                              <ToggleButton
                                checked={activeEmailNotification}
                                setChecked={setActiveEmailNotification}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center justify-end col-span-12 mt-3 buttons'>
                      <button
                        type='button'
                        onClick={e => {
                          e.preventDefault(), closeBtn()
                        }}
                        className='block px-4 py-2 text-sm font-medium text-center text-gray-500 transition border border-gray-700 rounded-lg bg-transprent hover:border-yellowBg'>
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

export default React.memo(AddNurse)
