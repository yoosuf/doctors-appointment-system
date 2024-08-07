import SnapCrackButton from '@/widget/common-button'
import CalenderIcon from '@/widget/image/CalenderIcon'
import EmailIcon from '@/widget/image/EmailIcon'
import PhoneIcon from '@/widget/image/PhoneIcon'
import UploadComponent from '@/widget/ImageUpload/UploadComponent'
import Loader from '@/widget/loader'
import Select from '@/widget/select'
import subYears from 'date-fns/subYears'
import Image from 'next/image'
import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const UserManagementImageProfile = props => {
  const {
    loading,
    formik,
    image,
    setImage,
    startDate,
    setStartDate,
    setOpen,
    onClickCancel,
  } = props

  return (
    <>
      <div className='relative p-5 mt-5 image-profile bg-primary rounded-xl'>
        <div className='grid gap-2 pb-4 border-b border-gray-500 md:grid-cols-12'>
          <div className='col-span-3'>
            <h4 className='font-medium'>Image Profile</h4>
          </div>
          <div className='col-span-9'>
            <div className=''>
              <div className='flex items-center image-profile'>
                {image ? (
                  <div className='relative'>
                    <img
                      src={image}
                      className='object-cover object-center rounded-full h-14 w-14'
                      alt='Snapcrack'
                    />
                    <button
                      className='absolute transition delete-icon focus:outline-none top-5 left-5'
                      onClick={e => {
                        e.preventDefault(),
                          formik.setFieldValue('profile_image', ''),
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
                    Acceptable format, jpg. png only
                  </p>
                </div>
              </div>
              {formik.touched.profile_image && formik.errors.profile_image ? (
                <div className='mt-1 text-sm text-redAlert'>
                  {formik.errors.profile_image}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className='grid gap-2 mt-4 md:grid-cols-12'>
          <div className='col-span-3'>
            <h4 className='font-medium'>Personal Information</h4>
          </div>
          <div className='col-span-9 '>
            <form
              onSubmit={formik.handleSubmit}
              className='grid items-start grid-cols-12 gap-4 text-sm'>
  

              <div className='flex flex-col items-start col-span-12 gap-4 sm:flex-row md:col-span-6'>
                <div className='w-full'>
                  <input
                    type='text'
                    className='w-full col-span-12 p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg sm:col-span-6'
                    placeholder='First Name'
                    id='firstName'
                    {...formik.getFieldProps('firstName')}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className='mt-1 text-sm text-redAlert'>
                      {formik.errors.firstName}
                    </div>
                  ) : null}
                </div>
                <div className='w-full'>
                  <input
                    type='text'
                    className='w-full col-span-12 p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg sm:col-span-6'
                    placeholder='Last Name'
                    id='lastName'
                    {...formik.getFieldProps('lastName')}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className='mt-1 text-sm text-redAlert'>
                      {formik.errors.lastName}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* <div className='w-full col-span-12 text-sm sm:col-span-6'>
                <Select
                  placeholder='Select Gender'
                  name='genderId'
                  defaultOptions={genderOptionsData}
                  value={defaultGenderValue}
                  setValue={setDefaultGenderValue}
                  formik={formik}
                  // setOptionsData={setGenderOptionsData}
                  loadOptions={loadOptionsGender}
                />

                {formik.touched.genderId && formik.errors.genderId ? (
                  <div className='mt-1 text-sm text-redAlert'>
                    {formik.errors.genderId}
                  </div>
                ) : null}
              </div> */}
              <div className='relative flex items-center col-span-12 sm:col-span-6'>
                <div className='absolute left-3'>
                  <CalenderIcon />
                </div>

                <DatePicker
                  dateFormat="MM-dd-yyyy"
                  selected={startDate || subYears(new Date(), 16)}
                  onChange={date => {
                    setStartDate(date),
                      formik.setFieldValue('dob', date),
                      setOpen(false)
                  }}
                  maxDate={subYears(new Date(), 16)}
                  placeholder='Date of birth'
                  className='w-full px-3 py-2 pl-10 bg-transparent border border-gray-500 rounded-lg'
                />
              </div>
              <div className='w-full col-span-12 my-2 border-b border-gray-500 line'></div>

              <div className='relative flex items-center col-span-12 lg:col-span-4 sm:col-span-6'>
                <div className='w-full'>
                  <div className='absolute left-3 top-3.5'>
                    <EmailIcon />
                  </div>
                  <input
                    type='text'
                    className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                    placeholder='Email'
                    id='email'
                    {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className='mt-1 text-sm text-redAlert'>
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className='relative flex items-center col-span-12 lg:col-span-4 sm:col-span-6'>
                <div className='w-full'>
                  <div className='absolute left-3 top-2.5'>
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
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className='mt-1 text-sm text-redAlert'>
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className='relative flex items-center col-span-12 lg:col-span-4 sm:col-span-6'>
                <div className='w-full'>
                  <div className='absolute left-3 top-2.5'>
                    <PhoneIcon />
                  </div>
                  <input
                    type='tel'
                    className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                    placeholder='Alternative Phone Number'
                    id='phone2'
                    {...formik.getFieldProps('phone2')}
                    maxLength='10'
                  />
                  {formik.touched.phone2 && formik.errors.phone2 ? (
                    <div className='mt-1 text-sm text-redAlert'>
                      {formik.errors.phone2}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className='w-full col-span-12 my-2 border-b border-gray-500 line'></div>
              <div className='col-span-12 form-group'>
                <div className='w-full'>
                  <input
                      type='text'
                      className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg '
                      placeholder='Address'
                      id='addressLine1'
                      {...formik.getFieldProps('addressLine1')}
                    />
                    
                  {/* <AutoFillAddress
                    formik={formik}
                    type='text'
                    className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg '
                    placeholder='Address 1'
                    id='addressLine1'
                  /> */}
                  {formik.touched.addressLine1 && formik.errors.addressLine1 ? (
                    <div className='mt-1 text-sm text-redAlert'>
                      {formik.errors.addressLine1}
                    </div>
                  ) : null}
                </div>
              </div>


              <div className='col-span-12 form-group lg:col-span-4 sm:col-span-6'>
                <input
                  type='text'
                  className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg '
                  placeholder='City'
                  id='cityId'
                  {...formik.getFieldProps('cityId')}
                />
                {formik.touched.cityId && formik.errors.cityId ? (
                  <div className='mt-1 text-sm text-redAlert'>
                    {formik.errors.cityId}
                  </div>
                ) : null}
              </div>
              <div className='col-span-12 form-group lg:col-span-4 sm:col-span-6'>
                {/* <Select
                  placeholder='Search State'
                  name='provinceId'
                  defaultOptions={stateOptionsData}
                  loadOptions={loadOptionsState}
                  value={defaultStateValue}
                  setValue={setDefaultStateValue}
                  formik={formik}
                  setOptionsData={setStateOptionsData}
                /> */}
                <input
                  type='text'
                  className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg '
                  placeholder='State'
                  id='provinceId'
                  {...formik.getFieldProps('provinceId')}
                />
                {formik.touched.provinceId && formik.errors.provinceId ? (
                  <div className='mt-1 text-sm text-redAlert'>
                    {formik.errors.provinceId}
                  </div>
                ) : null}
              </div>
              <div className='col-span-12 form-group lg:col-span-4 sm:col-span-6'>
                <input
                  type='text'
                  className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg '
                  placeholder='Country'
                  id='countryId'
                  {...formik.getFieldProps('countryId')}
                />
                {formik.touched.countryId && formik.errors.countryId ? (
                  <div className='mt-1 text-sm text-redAlert'>
                    {formik.errors.countryId}
                  </div>
                ) : null}
              </div>
              <div className='col-span-12 form-group lg:col-span-4 sm:col-span-6'>
                {/* <Select
                  placeholder='Search Zip Code'
                  name='postalCodeId'
                  defaultOptions={postalOptionsData}
                  loadOptions={loadOptionsPostal}
                  value={defaultPostalValue}
                  setValue={setDefaultPostalValue}
                  formik={formik}
                  setOptionsData={setPostalOptionsData}
                /> */}
                <input
                  type='text'
                  className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg '
                  placeholder='Zip Code'
                  id='postalCodeId'
                  {...formik.getFieldProps('postalCodeId')}
                />
                {formik.touched.postalCodeId && formik.errors.postalCodeId ? (
                  <div className='mt-1 text-sm text-redAlert'>
                    {formik.errors.postalCodeId}
                  </div>
                ) : null}
              </div>
              <div className='w-full col-span-12 my-2 border-b border-gray-500 line'></div>
              <div className='col-span-12 form-group'>
                <textarea
                  className='w-full px-3 py-2 text-sm placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                  cols='30'
                  rows='5'
                  id='description'
                  {...formik.getFieldProps('description')}
                />
                <p className='text-sm text-gray-500'>
                  Write a few sentences about yourself.
                </p>
              </div>
              <div className='w-full col-span-12 my-2 border-b border-gray-500 line'></div>
              <div className='flex items-center justify-end col-span-12 mt-3 buttons'>
                <a
                  onClick={() => onClickCancel()}
                  className='block px-4 py-2 text-sm font-medium text-center text-gray-500 transition border border-gray-700 rounded-lg cursor-pointer bg-transprent hover:border-yellowBg'>
                  Cancel
                </a>

                <SnapCrackButton
                  type='submit'
                  text='Save Changes'
                  className='block px-4 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg hover:bg-yellow-400'
                />
              </div>
            </form>
          </div>
        </div>
        {loading && <Loader customClass='absolute' />}
      </div>
    </>
  )
}

export default UserManagementImageProfile
