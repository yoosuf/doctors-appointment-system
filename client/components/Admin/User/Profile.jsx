import useProfile from '@/components/Admin/User/hooks/useProfile'
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
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Profile = ({ id, setID, setUserData, setData }) => {
  const {
    edit,
    setEdit,
    loading,
    formik,
    image,
    setImage,
    startDate,
    setStartDate,
    open,
    setOpen,
    onClickCancel,
  } = useProfile({ id, setID, setUserData, setData })

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

                {edit && (
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
                )}
              </div>
              {edit &&
              formik.touched.profile_image &&
              formik.errors.profile_image ? (
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
              className='grid grid-cols-12 gap-4 text-sm'>
    

              <div className='flex items-center col-span-12 gap-4'>
                <div className='w-full col-span-12 sm:col-span-6'>
                  <input
                    type='text'
                    className='w-full col-span-12 p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg sm:col-span-6'
                    placeholder='First Name'
                    id='firstName'
                    {...formik.getFieldProps('firstName')}
                    disabled={edit ? false : true}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className='mt-1 text-sm text-redAlert'>
                      {formik.errors.firstName}
                    </div>
                  ) : null}
                </div>
                <div className='w-full col-span-12 sm:col-span-6'>
                  <input
                    type='text'
                    className='w-full col-span-12 p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg sm:col-span-6'
                    placeholder='Last Name'
                    id='lastName'
                    {...formik.getFieldProps('lastName')}
                    disabled={edit ? false : true}
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
                  ref={asyncSelectRefGender}
                  placeholder='Gender'
                  name='genderId'
                  defaultOptions={genderOptionsData}
                  value={defaultGenderValue}
                  setValue={setDefaultGenderValue}
                  formik={formik}
                  loadOptions={loadOptionsGender}
                  isDisabled={edit ? false : true}
                />

                {formik.touched.genderId && formik.errors.genderId ? (
                  <div className='mt-1 text-sm text-redAlert'>
                    {formik.errors.genderId}
                  </div>
                ) : null}
              </div> */}
              <div className='relative flex items-center col-span-12 sm:col-span-6'>
                <div className='absolute left-3'>
                  <CalenderIcon fill='#9CA3AF' />
                </div>

                <DatePicker
                  dateFormat="MM-dd-yyyy"
                  selected={startDate}
                  onChange={date => {
                    setStartDate(date),
                      formik.setFieldValue('dob', date),
                      setOpen(false)
                  }}
                  maxDate={subYears(new Date(), 16)}
                  placeholder='Date of birth'
                  className='w-full px-3 py-2 pl-10 bg-transparent border border-gray-500 rounded-lg'
                  disabled={edit ? false : true}
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
                    disabled={edit ? false : true}
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
                    disabled={edit ? false : true}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className='mt-1 text-sm text-redAlert'>
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* <div className='relative flex items-center col-span-12 lg:col-span-4 sm:col-span-6'>
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
                    disabled={edit ? false : true}
                  />
                  {formik.touched.phone2 && formik.errors.phone2 ? (
                    <div className='mt-1 text-sm text-redAlert'>
                      {formik.errors.phone2}
                    </div>
                  ) : null}
                </div>
              </div> */}

              <div className='w-full col-span-12 my-2 border-b border-gray-500 line'></div>
              {/* <div className='col-span-12 form-group'>
                <div className='w-full'>
                  <input
                    type='text'
                    className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg '
                    placeholder='Address 1'
                    id='addressLine1'
                    {...formik.getFieldProps('addressLine1')}
                    disabled={edit ? false : true}
                  />
                  {formik.touched.addressLine1 && formik.errors.addressLine1 ? (
                    <div className='mt-1 text-sm text-redAlert'>
                      {formik.errors.addressLine1}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className='col-span-12 form-group'>
                <div className='w-full'>
                  <input
                    type='text'
                    className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg '
                    placeholder='Address 2'
                    id='addressLine2'
                    {...formik.getFieldProps('addressLine2')}
                    disabled={edit ? false : true}
                  />
                  {formik.touched.addressLine2 && formik.errors.addressLine2 ? (
                    <div className='mt-1 text-sm text-redAlert'>
                      {formik.errors.addressLine2}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className='col-span-12 form-group lg:col-span-4 sm:col-span-6'>
                <Select
                  ref={asyncSelectRefCity}
                  placeholder='Search City'
                  name='cityId'
                  defaultOptions={cityOptionsData}
                  loadOptions={loadOptionsState}
                  value={defaultCityValue}
                  setValue={setDefaultCityValue}
                  formik={formik}
                  isDisabled={edit ? false : true}
                />

                {formik.touched.cityId && formik.errors.cityId ? (
                  <div className='mt-1 text-sm text-redAlert'>
                    {formik.errors.cityId}
                  </div>
                ) : null}
              </div>
              <div className='col-span-12 form-group lg:col-span-4 sm:col-span-6'>
                <Select
                  ref={asyncSelectRefState}
                  placeholder='Search State'
                  name='provinceId'
                  defaultOptions={stateOptionsData}
                  loadOptions={loadOptionsState}
                  value={defaultStateValue}
                  setValue={setDefaultStateValue}
                  formik={formik}
                  isDisabled={edit ? false : true}
                />

                {formik.touched.provinceId && formik.errors.provinceId ? (
                  <div className='mt-1 text-sm text-redAlert'>
                    {formik.errors.provinceId}
                  </div>
                ) : null}
              </div>
              <div className='col-span-12 form-group lg:col-span-4 sm:col-span-6'>
                <Select
                  ref={asyncSelectRefPostal}
                  placeholder='Search Zip Code'
                  name='postalCodeId'
                  defaultOptions={postalOptionsData}
                  loadOptions={loadOptionsPostal}
                  value={defaultPostalValue}
                  setValue={setDefaultPostalValue}
                  formik={formik}
                  isDisabled={edit ? false : true}
                />

                {formik.touched.postalCodeId && formik.errors.postalCodeId ? (
                  <div className='mt-1 text-sm text-redAlert'>
                    {formik.errors.postalCodeId}
                  </div>
                ) : null}
              </div>
              <div className='w-full col-span-12 my-2 border-b border-gray-500 line'></div> */}
              <div className='col-span-12 form-group'>
                <textarea
                  className='w-full px-3 py-2 text-sm placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                  cols='30'
                  rows='5'
                  id='description'
                  {...formik.getFieldProps('description')}
                  disabled={edit ? false : true}
                />
                <p className='text-sm text-gray-500'>
                  Write a few sentences about yourself.
                </p>
              </div>
              <div className='w-full col-span-12 my-2 border-b border-gray-500 line'></div>
              <div className='flex items-center justify-end col-span-12 mt-3 buttons'>
                {edit ? (
                  <a
                    onClick={() => onClickCancel()}
                    className='block px-4 py-2 text-sm font-medium text-center text-gray-500 transition border border-gray-700 rounded-lg cursor-pointer bg-transprent hover:border-yellowBg'>
                    Cancel
                  </a>
                ) : (
                  <></>
                )}

                {edit ? (
                  <SnapCrackButton
                    type='submit'
                    text='Save Changes'
                    className='block px-4 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg hover:bg-yellow-400'
                  />
                ) : (
                  <SnapCrackButton
                    onClick={e => {
                      e.preventDefault()
                      setEdit(true)
                    }}
                    text='Edit'
                    className='block px-4 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg hover:bg-yellow-400'
                  />
                )}
              </div>
            </form>
          </div>
        </div>
        {loading && <Loader customClass='absolute' />}
      </div>
    </>
  )
}

export default Profile
