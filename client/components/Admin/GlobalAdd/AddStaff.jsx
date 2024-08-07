import useDropdown from '@/hooks/common/useDropdown'
import useAddStaff from '@/components/Admin/hooks/useAddStaff'
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
import Image from 'next/image'
import React, { useState } from 'react'
import AsyncSelect from 'react-select/async'
import ToggleButton from '@/widget/ToggleButton'
import { REQUIRED_IMAGE_TYPE } from '@/utils/constant'

const AddStaff = props => {
  const [startDate, setStartDate] = useState(subYears(new Date(), 16))

  const {
    prefixOptionsData,
    prefixData,
    genderOptionsData,
    genderData,
    cityOptionsData,
    stateOptionsData,
    postalOptionsData,
    // Set State
    setCityOptionsData,
    setStateOptionsData,
    setPostalOptionsData,
    // Dropdown Method
    getAllMasterData,
    loadOptionsPrefix,
    loadOptionsGender,
    loadOptionsCity,
    loadOptionsState,
    loadOptionsPostal,
    // Dropdown value
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
    closeBtn,
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
    // Location Dropdown State
    locationOptionsData,
    setLocationOptionsData,
    loadOptionsLocation,
    // Clear Dropdown Ref
    selectedSubOwnerValue,
    setSelectedSubOwnerValue,
    selectedLocationValue,
    setSelectedLocationValue,
    selectedStaffValue,
    setSelectedStaffValue,
  } = useAddStaff({
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
          id='AddStaffModal'
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
                        Add Staff
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
                    id='top-div-staff'>
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
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='16'
                                      height='16'
                                      viewBox='0 0 16 16'>
                                      <path
                                        id='delete'
                                        d='M14,5.2h4V6.8H16.4V17.2a.8.8,0,0,1-.8.8H4.4a.8.8,0,0,1-.8-.8V6.8H2V5.2H6V2.8A.8.8,0,0,1,6.8,2h6.4a.8.8,0,0,1,.8.8Zm.8,1.6H5.2v9.6h9.6ZM7.6,9.2H9.2V14H7.6Zm3.2,0h1.6V14H10.8ZM7.6,3.6V5.2h4.8V3.6Z'
                                        transform='translate(-2 -2)'
                                        fill='#dc143c'
                                      />
                                    </svg>
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
                              isClearable
                              className='text-sm'
                              placeholder='Select staff'
                              id='staff'
                              defaultOptions={staffOptionsData}
                              filterOption={() => true}
                              onChange={data => {
                                formik.setFieldValue('staff', data?.value)
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
                              placeholder='Search sub owner'
                              id='parentId'
                              isClearable
                              defaultOptions={subOwnerOptionsData}
                              loadOptions={loadOptionsSubOwner}
                              onInputChange={value => {
                                // if (
                                //   value === '' &&
                                //   subOwnerOptionsData.length === 0
                                // ) {
                                loadOptionsSubOwner()
                                // }
                              }}
                              // filterOption={() => true}
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
                          <div className='col-span-12 form-group sm:col-span-4'>
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
                          </div>
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
                          <div className='relative flex items-center col-span-12 sm:col-span-8'>
                            <div className='absolute left-3'>
                              <CalenderIcon />
                            </div>
                            <SnapCrackDateComponent
                              date={startDate}
                              setDate={setStartDate}
                              formik={formik}
                            />
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
                              placeholder='Address line 1'
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
                                placeholder='Alternative Phone Number'
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
                          </div>*/}
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
                        className='block px-4 py-2 text-sm font-medium text-center text-gray-500 transition border border-gray-700 rounded-lg bg-transprent hover:text-yellowBg hover:border-yellowBg'>
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

export default React.memo(AddStaff)
