import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export const TellField = ({
  id,
  label,
  placeholder,
  required,
  formik,
  customClass,
  disabled,
  onKeyDown,
}) => {
  const hasError = formik.touched[id] && formik.errors[id]
  const [isDropdownActive, setIsDropdownActive] = useState(false)
  const [isButtonActive, setIsButtonActive] = useState(false)

  const handlePhoneChange = value => {
    formik.setFieldValue(id, value) // Update Formik state when the phone number changes
  }

  return (
    <>
      <style>
        {`
          .react-tel-input .flag-dropdown .selected-flag {
            border: 1px solid #2d3748;
          }

          .react-tel-input .flag-dropdown.open .selected-flag {
            background: #0f0f0f;
            border: 1px solid #2d3748;
          }
          .react-tel-input .country-list .country.highlight {
            background-color: #0f0f0f;
          }
          .react-tel-input .selected-flag:hover, .react-tel-input .selected-flag:focus {
            background-color: #0f0f0f;
          }

          .react-tel-input .country-list .country:hover {
            background-color: #0f0f0f;
          }
        `}
      </style>

      <div
        className={`form-group ${hasError ? 'text-red-500' : 'text-white'} ${
          customClass || ''
        }`}>
        {label && (
          <label
            htmlFor={id}
            className='inline-block mb-1 text-xs text-gray-400'>
            {label}
            {required && <span className='pl-0.5 text-red-400'>*</span>}
          </label>
        )}
        <div className='relative flex items-center'>
          <PhoneInput
            name={id}
            id={id}
            placeholder={placeholder}
            value={formik.values[id]} // Use formik.values[id] for the input value
            onChange={handlePhoneChange}
            country={'us'}
            inputStyle={{
              width: '100%',
              border: '1px solid #2d3748', // Dark border color
              lineHeight: 'normal',
              backgroundColor: 'initial', // Dark background color
              color: 'white', // Text color
            }}
            dropdownStyle={{
              backgroundColor: '#2d3748', // Dark background for dropdown
              borderColor: '#2d3748', // Border color for dropdown
            }}
            buttonStyle={{
              backgroundColor: '#2d3748', // Dark background for dropdown
              border: '0',
            }}
            containerClass={`w-full bg-transparent border-gray-700 rounded-md  focus:ring-1 ${
              isDropdownActive ? 'phone-input-dropdown-active' : ''
            } ${
              hasError
                ? 'border-red-500 focus:ring-red-400 '
                : 'focus:ring-gray-500 '
            }`}
            inputClass={`bg-transparent  text-sm  border-gray-700 p-3 w-full text-white placeholder-gray-300 rounded focus:ring-2 ${
              hasError
                ? 'border-red-500 focus:ring-red-400 '
                : 'focus:ring-gray-500 '
            }`}
            buttonClass={`text-white bg-gray-700 hover:bg-gray-800 ${
              isButtonActive ? 'phone-input-button-active' : ''
            }`}
            dropdownClass='bg-gray-800 border border-gray-600 text-white' // Dark dropdown container
            searchClass='text-sm bg-gray-700 text-white placeholder-gray-300' // Dark search field
            disabled={disabled}
            onKeyDown={onKeyDown}
          />
        </div>
        {hasError && (
          <div
            className='pt-1 pl-1 text-xs text-red-500'
            id={`${id}-error`}
            role='alert'>
            {formik.errors[id]}
          </div>
        )}
      </div>
    </>
  )
}
