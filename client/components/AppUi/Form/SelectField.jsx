import { color } from 'highcharts'
import React from 'react'
import Select, { createFilter } from 'react-select'

export const SelectField = ({
  id,
  label,
  options,
  value,
  onChange,
  formik,
  required,
  customClass,
  isClearable,
}) => {
  const hasError = formik?.touched[id] && formik?.errors[id]

  const handleValueChange = value => {
    onChange(value)
  }

  const filterConfig = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: true,
  }

  const selectboxStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      '@apply appearance-none bg-transparent border border-gray-300 rounded-md': null,
      borderColor: hasError ? 'red-900' : 'gray-900',
      background: 'transparent',
      border: '1px solid #4b5563',
      borderWidth: '1px',
      borderStyle: 'solid',
      focusBorderColor: 'gray-900',
      focusRingColor: 'unset', // Reset focus ring color
      focusRingOffset: 'unset', // Reset focus ring offset
      focusRingWidth: 'unset', // Reset focus ring width
      focusRingStyle: 'unset', // Reset focus ring style
      borderRadius: '6px',
      boxShadow: 'none', // Remove box shadow
      '&:hover': {
        color: '#ffffff', // Text color on hover
      },
    }),

    indicatorContainer: (baseStyles, state) => ({
      ...baseStyles,
    }),
    container: (baseStyles, state) => ({
      ...baseStyles,
    }),
    placeholder: (baseStyles, state) => ({
      ...baseStyles,
    }),
    valueContainer: (baseStyles, state) => ({
      ...baseStyles,
      // color: '#ffffff',
      '@apply': 'none', // Apply no styles

    }),
    option: (provided, state) => ({
      ...provided,
      color:
        state.isSelected && state.isDisabled
          ? 'black'
          : state.isDisabled
          ? 'gray'
          : state.isSelected
          ? 'black'
          : 'white',
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      backgroundColor: state.isSelected ? '#FBD63c' : 'transparent',
      '&:hover': {
        // Overwrites the different states of border
        backgroundColor: state.isDisabled
          ? 'black'
          : state.isFocused && '#aea2211f',
        color: state.isDisabled ? 'gray' : state.isFocused && '#FBD63c',
      },
    }),
    menu: base => ({
      ...base,
      backgroundColor: 'transparent',
    }),
    multiValue: (base, state) => ({
      ...base,
      backgroundColor: '#27272a',
      div: {
        color: 'white',
      },
      svg: {
        color: 'white',
      },
      ' div:hover:nth-of-type(2)': {
        backgroundColor: '#FBD63c',
        color: 'black',
      },
    }),
    multiValueRemove: (base, state) => ({
      ...base,
      cursor: 'pointer',
      '&hover': {
        backgroundColor: '#FBD63c',
        color: 'black',
      },
    }),
    menuList: base => ({
      ...base,
      backgroundColor: '#010101',
      borderRadius: '3px',
      '::-webkit-scrollbar': {
        width: '3px',
        background: '#313131',
      },

      '::-webkit-scrollbar-thumb': {
        background: '#3f3f46',
        borderRadius: '3px',
        maxWidth: '2px',
      },
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: '#ffffff',
    }),
    input: (styles, state) => ({
      ...styles,

      outline: 'none',
      '--tw-ring-color': 'unset',
    
      '&:focus': {
        backgroundColor: 'transparent',
        borderColor: 'none',
        boxShadow: 'none',
        outline: 'none',
        appearance: 'none',
      },
    
      '&::before, &::after': {
        '--tw-ring-color': 'unset !important'
      },
    }),
  }

  return (
    <div
      className={`form-group ${hasError ? 'has-error' : ''} ${
        customClass || ''
      }`}>
      <label htmlFor={id} className='inline-block mb-0 text-xs text-gray-400'>
        {label}
        {required && <span className='pl-0.5 text-red-400'>*</span>}
      </label>
      <div
        className={`rounded-md ${hasError ? 'border-0 border-red-700 ' : ' '}`}>
        <Select
          styles={selectboxStyles}
          id={`${id}`} // Use the consistent id
          options={options}
          value={value} // Set the selected value
          onChange={handleValueChange} // Handle the onChange event
          isClearable={isClearable}
          isSearchable={true}
          filterOption={createFilter(filterConfig)}
          className='react-select-container'
          classNamePrefix='react-select'
        />
      </div>
      {formik?.touched[id] && formik?.errors[id] && (
        <div
          className='pt-1 pl-1 text-xs text-redAlert'
          id={`${id}-error`}
          role='alert'>
          {formik.errors[id]}
        </div>
      )}
    </div>
  )
}
