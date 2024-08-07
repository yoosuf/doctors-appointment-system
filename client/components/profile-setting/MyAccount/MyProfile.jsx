import DatePickerField from '@/components/AppUi/Form/DatePickerField'
import { InputField } from '@/components/AppUi/Form/InputField'
import { RadioGroupField } from '@/components/AppUi/Form/RadioGroup'
import useMyProfile from '@/components/Admin/hooks/useMyProfile'
import SnapCrackButton from '@/widget/common-button'
import UploadComponent from '@/widget/ImageUpload/UploadComponent'
import Image from 'next/image'
import React from 'react'
import { TextareaField } from '@/components/AppUi/Form/TextareaField'

const MyProfile = ({ id }) => {
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
    // Gender Dropdown State
    genderOptionsData,
    loadOptionsGender,
    defaultGenderValue,
    setDefaultGenderValue,
    onClickCancel,
  } = useMyProfile({ id })

  const sortData = genderOptionsData.sort((r1, r2) =>
    r1.label > r2.label ? 1 : -1
  )
  const genderArray = sortData.filter(item => item.label !== 'Other')

  return (
    <>
      <div className='relative p-5 image-profile bg-primary rounded-xl'>
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
                  {edit && (
                    <>
                      <UploadComponent
                        formik={formik}
                        image={image}
                        setImage={setImage}
                        text='Upload a file'
                      />

                      <p className='mt-2 text-sm text-gray-400'>
                        Acceptable format, jpg. png only
                      </p>
                    </>
                  )}
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
              className='grid grid-cols-12 gap-4 text-sm'>
              <div className='col-span-12 sm:col-span-12'>
                <div className='grid items-start grid-cols-1 gap-6 sm:grid-cols-2 '>
                  <InputField
                    id='firstName'
                    label={'First Name'}
                    placeholder={'First Name'}
                    required={true}
                    formik={formik}
                    customClass={`w-full`}
                    disabled={!edit ? true : false}
                  />

                  <InputField
                    id='lastName'
                    label={'Last Name'}
                    placeholder={'Last Name'}
                    required={true}
                    formik={formik}
                    customClass={`w-full`}
                    disabled={!edit ? true : false}
                  />
                </div>
              </div>

              <div className='w-full col-span-12 text-sm sm:col-span-12'>
                <RadioGroupField
                  id='gender'
                  label='Gender'
                  options={genderArray}
                  required={true}
                  formik={formik}
                  customClass={`mt-0 mb-0`}
                  disabled={!edit ? true : false}
                />
              </div>

              <div className='col-span-12 sm:col-span-6'>
                <DatePickerField
                  id='dob'
                  dateFormat='MM-dd-yyyy'
                  label={`Date of Birth`}
                  required={true}
                  date={startDate}
                  setDate={setStartDate}
                  formik={formik}
                  placeholder={`Date of birth mm-dd-yyyy`}
                  customClass={`mt-0`}
                  disabled={!edit ? true : false}
                />
              </div>
              <div className='w-full col-span-12 my-2 border-b border-gray-500 line'></div>

              <div className='relative flex items-start col-span-12 lg:col-span-6 sm:col-span-6'>
                <InputField
                  id='email'
                  label={'Email Address'}
                  placeholder={'Email Address'}
                  required={true}
                  formik={formik}
                  customClass={`w-full`}
                  disabled={!edit ? true : false}
                />
              </div>

              <div className='relative flex items-start col-span-12 lg:col-span-6 sm:col-span-6'>
                <InputField
                  id='phone'
                  label={'Phone Number'}
                  placeholder={'Phone Number'}
                  required={true}
                  formik={formik}
                  customClass={`w-full`}
                  disabled={!edit ? true : false}
                />
              </div>

              <div className='w-full col-span-12 my-2 border-b border-gray-500 line'></div>
              <div className='col-span-12 form-group'>
                <InputField
                  id='addressLine1'
                  label={'Address'}
                  placeholder={'Address'}
                  required={true}
                  formik={formik}
                  customClass={`w-full`}
                  disabled={!edit ? true : false}
                />
              </div>

              <div className='col-span-12 form-group lg:col-span-4 sm:col-span-6'>
                <InputField
                  id='cityId'
                  label={'City'}
                  placeholder={'City'}
                  required={true}
                  formik={formik}
                  customClass={`w-full`}
                  disabled={!edit ? true : false}
                />
              </div>
              <div className='col-span-12 form-group lg:col-span-4 sm:col-span-6'>
                <InputField
                  id='provinceId'
                  label={'State'}
                  placeholder={'State'}
                  required={true}
                  formik={formik}
                  customClass={`w-full`}
                  disabled={!edit ? true : false}
                />
              </div>
              <div className='col-span-12 form-group lg:col-span-4 sm:col-span-6'>
                <InputField
                  id='postalCodeId'
                  label={'Zip Code'}
                  placeholder={'Zip Code'}
                  required={true}
                  formik={formik}
                  customClass={`w-full`}
                  disabled={!edit ? true : false}
                />
              </div>
              <div className='w-full col-span-12 my-2 border-b border-gray-500 line'></div>
              <div className='col-span-12 form-group'>
                <TextareaField
                  id='description'
                  label='Description'
                  placeholder='Enter service description'
                  required={true}
                  formik={formik}
                  customClass={`mt-4`}
                  disabled={!edit ? true : false}
                />

                <p className='text-sm text-gray-500'>
                  Write a few sentences about yourself.
                </p>
              </div>
              <div className='w-full col-span-12 my-2 border-b border-gray-500 line'></div>
              <div className='flex items-center justify-end col-span-12 mt-3 buttons'>
                {edit && (
                  <a
                    onClick={() => onClickCancel()}
                    className='block px-4 py-2 text-sm font-medium text-center text-gray-500 transition border border-gray-700 rounded-lg cursor-pointer bg-transprent hover:border-yellowBg'>
                    Cancel
                  </a>
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
      </div>
    </>
  )
}

export default MyProfile
