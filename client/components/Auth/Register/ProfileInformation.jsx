import React, { useEffect, useState } from 'react'
import useSignupProfileInfo from '@/components/Auth/hooks/register/useSignupProfileInfo'
import { InputField } from '@/components/AppUi/Form/InputField'
import DatePickerField from '@/components/AppUi/Form/DatePickerField'
import { TextareaField } from '@/components/AppUi/Form/TextareaField'
import { RadioGroupField } from '@/components/AppUi/Form/RadioGroup'
import { SelectField } from '@/components/AppUi/Form/SelectField'
import { Button } from '@/components/AppUi/Form/Button'
import {
  countryOptions,
  genderOptions,
} from '@/components/Customer/types/types'

export default function ProfileInformation () {
  const { loading, formik } = useSignupProfileInfo()

  return (
    <form onSubmit={formik.handleSubmit} className='mt-10' autoComplete='none'>
      {/* {JSON.stringify(profile)} */}

      <div className='grid gap-4 mt-4 sm:grid-cols-2'>
        <InputField
          id='firstName'
          label='First name'
          placeholder={`John`}
          required={true}
          formik={formik}
          customClass='custom-input-class'
          type='text'
        />

        <InputField
          id='lastName'
          label='Last name'
          placeholder={`Doe`}
          required={true}
          formik={formik}
          customClass='custom-input-class'
          type='text'
        />
      </div>

      <DatePickerField
        id='dob'
        dateFormat='MM-dd-yyyy'
        label={`Date of Birth`}
        required={true}
        date={formik.values.dob} 
        setDate={(date) => formik.setFieldValue('dob', date)} 
        formik={formik}
        placeholder={`Date of birth mm-dd-yyyy`}
        customClass={`mt-4`}
      />

      <RadioGroupField
        id='genderId'
        label='Gender'
        options={genderOptions}
        required={true}
        formik={formik}
        customClass={`mt-4 mb-4`}
      />

      <TextareaField
        id='addressLine1'
        label='Address'
        placeholder={`Address`}
        required={true}
        formik={formik}
        customClass={`mt-4`}
        type='text'
      />

      <InputField
        id='cityId'
        label='City'
        placeholder={`City`}
        required={true}
        formik={formik}
        customClass={`mt-4 mb-3`}
        type='text'
      />

      <InputField
        id='provinceId'
        label='State'
        placeholder={`State`}
        required={true}
        formik={formik}
        customClass={`mt-4 mb-3`}
        type='text'
      />

      <InputField
        id='postalCodeId'
        label='Zip code'
        placeholder={`Zip Code`}
        required={true}
        formik={formik}
        customClass={`mt-4 mb-3`}
        type='text'
      />

      <SelectField
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
          formik.setFieldValue('countryId', selectedOption?.label)
        }}
        formik={formik}
      />

      <div className={`mb-4 mt-6`}>
        <Button
          kind={'primary'}
          type='submit'
          text={formik.isSubmitting ? 'Please wait...' : 'Next'}
          isDisabled={formik.isSubmitting || !formik.dirty}
          isLoading={formik.isSubmitting}
        />
      </div>
    </form>
  )
}
