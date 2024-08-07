import useProfile from '@/components/Customer/Profile/hooks/useProfile'
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/solid'
import SignupUploadComponent from '@/widget/ImageUpload/SignupUploadComponent'
import React from 'react'
import { SelectField } from '@/components/AppUi/Form/SelectField'
import DatePickerField from '@/components/AppUi/Form/DatePickerField'
import { RadioGroupField } from '@/components/AppUi/Form/RadioGroup'
import { TextareaField } from '@/components/AppUi/Form/TextareaField'
import { InputField } from '@/components/AppUi/Form/InputField'
import { TellField } from '@/components/AppUi/Form/TellField'
import { Button } from '../../AppUi/Form/Button'
import {
  relationshipOptions,
  heightFtOptions,
  heightInchOptions,
  weightOptions,
  countryOptions,
  genderOptions,
} from '@/components/Customer/types/types'

export default function EditProfile (props) {
  const {
    loading,
    image,
    setImage,
    formik,
    closeBtn,
    date,
    setDate,
    locationOptionsData,
  } = useProfile({
    props,
  })

  

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <section
          id='EditProfileModal'
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
                  <header className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                    <div className='flex items-center justify-between'>
                      <h2
                        className='text-base font-medium'
                        id='slide-over-title'>
                        Edit Profile
                      </h2>
                      <div className='flex items-center ml-3 h-7'>
                        <button
                          type='button'
                          onClick={e => {
                            e.preventDefault(), closeBtn()
                          }}
                          className='focus:outline-none '>
                          <span className='sr-only'>Close panel</span>
                          <XMarkIcon className='w-5 h-5' />
                        </button>
                      </div>
                    </div>
                  </header>

                  <main className='relative flex-1 p-4 modal-body'>
                    <div className='grid gap-2 pb-4 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Profile Image</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='text-center reg-form'>
                          {image && (
                            <div className='flex items-center justify-center mx-auto bg-transprent'>
                              <SignupUploadComponent
                                image={image}
                                setImage={setImage}
                                formik={formik}
                                className='p-3 mt-6 border rounded-lg cursor-pointer border-yellowBg text-yellowBg'
                              />
                            </div>
                          )}

                          {formik.touched.profile_image &&
                            formik.errors.profile_image && (
                              <div className='text-sm text-redAlert'>
                                {formik.errors.profile_image}
                              </div>
                            )}
                          {/* 
                          <h3 className='mb-3 text-xl font-semibold text-white'>
                            Capture your profile image
                          </h3> */}
                        </div>
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>


                      <div className='col-span-3'>
                        <h4 className='font-medium'>Account</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid grid-cols-12 gap-4'>
                          <InputField
                            id='email'
                            label='Email address'
                            placeholder={`Email address`}
                            required={true}
                            formik={formik}
                            customClass={`sm:col-span-12 col-span-12`}
                            type='email'
                          />

                          <TellField
                            id='phone'
                            placeholder={'Phone Number'}
                            required={true}
                            formik={formik}
                            customClass={`sm:col-span-12 col-span-12`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className='grid gap-2 pb-4 mt-4 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Personal Information</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid grid-cols-12 gap-4'>
                          <InputField
                            id='firstName'
                            label='First name'
                            placeholder={`First name`}
                            required={true}
                            formik={formik}
                            customClass={`sm:col-span-6 col-span-12`}
                            type='text'
                          />

                          <InputField
                            id='lastName'
                            label='Last name'
                            placeholder={`Last name`}
                            required={true}
                            formik={formik}
                            customClass={`sm:col-span-6 col-span-12`}
                            type='text'
                          />

                          <RadioGroupField
                            id='genderId'
                            label='Gender'
                            options={genderOptions}
                            required={true}
                            formik={formik}
                            customClass={`mt-1 sm:col-span-12 col-span-12`}
                          />

                          <DatePickerField
                            id='dob'
                            dateFormat='MM-dd-yyyy'
                            label={`Date of Birth`}
                            required={true}
                            date={date}
                            setDate={setDate}
                            formik={formik}
                            placeholder={`Enter your date of birth mm-dd-yyyy`}
                            customClass={`mt-1 sm:col-span-12 col-span-12`}
                          />

                          <TextareaField
                            id='addressLine1'
                            label='Address'
                            placeholder={`Address`}
                            required={true}
                            formik={formik}
                            customClass={`mt-1 col-span-12`}
                          />

                          <InputField
                            id='cityId'
                            label='City'
                            placeholder={`City`}
                            required={true}
                            formik={formik}
                            customClass={`col-span-12`}
                            type='text'
                          />

                          <InputField
                            id='provinceId'
                            label='State'
                            placeholder={`State`}
                            required={true}
                            formik={formik}
                            customClass={`col-span-12`}
                            type='text'
                          />

                          <InputField
                            id='postalCodeId'
                            label='Zip code'
                            placeholder={`Zip code`}
                            required={true}
                            formik={formik}
                            customClass={`col-span-12`}
                            type='text'
                          />

                          {/* <SelectField
                            id='countryId'
                            label='Country'
                            required={true}
                            options={countryOptions}
                            value={countryOptions.find(
                              option => option.value === formik.values.countryId
                            )}
                            onChang
                            isClearable={true}
                            isSearchable={true}
                            onChange={selectedOption => {
                              formik.setFieldValue(
                                'countryId',
                                selectedOption?.label
                              )
                            }}
                            formik={formik}
                            customClass={` col-span-12`}
                          /> */}

                          <SelectField
                            id='locationIds'
                            label='Preffered Location'
                            required={true}
                            options={locationOptionsData}
                            value={locationOptionsData.find(
                              option =>
                                option.value === formik.values.locationIds
                            )}
                            isClearable={true}
                            onChange={selectedOption => {
                              formik.setFieldValue(
                                'locationIds',
                                selectedOption?.value
                              )
                            }}
                            formik={formik}
                            customClass={` col-span-12`}
                          />
                        </div>
                      </div>
                    </div>
                  </main>

                  <footer className='flex items-center justify-end p-4 mt-3 border-t border-gray-700 col-spb-pan-12 buttons'>
                    <div className='grid grid-cols-2 gap-4'>
                      <Button
                        kind={'secondery'}
                        type='button'
                        text={'Close'}
                        onClick={e => {
                          e.preventDefault(), closeBtn()
                        }}
                      />

                      <Button
                        kind={'primary'}
                        type='submit'
                        text={
                          formik.isSubmitting
                            ? 'Please wait...'
                            : 'Save Changes'
                        }
                        isDisabled={formik.isSubmitting || !formik.dirty}
                        isLoading={formik.isSubmitting}
                      />
                    </div>
                    {/* <button
                        
                        className='block px-4 py-2 text-sm font-medium text-center text-gray-500 transition border border-gray-700 rounded-lg bg-transprent hover:text-yellowBg hover:border-yellowBg'>
                        Close
                      </button> */}

                    {/* <SnapCrackButton
                      type='submit'
                      text='Save Changes'
                      className='block px-4 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg hover:bg-yellow-400'
                    /> */}
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  )
}
