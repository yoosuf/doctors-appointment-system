import React, { useEffect } from 'react'

export const RadioGroupField = ({
  id,
  label,
  options,
  required,
  formik,
  disabled,
  customClass,
}) => {
  const hasError = formik.touched[id] && formik.errors[id]

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
        className={`flex pt-0  pb-0 mb-0 space-x-4 rounded-md ${
          hasError ? 'border-2 border-red-700 ' : ' '
        }`}>
        {options.map(option => (
          <label key={option.value} className='flex items-center space-x-2'>
            <input
              type='radio'
              id={option.value}
              name={id}
              value={option.value}
              checked={formik.values[id] === option.value}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`text-gray-400 form-radio  ${
                hasError ? 'border-2 border-red-700 ' : ' '
              }`}
              disabled={disabled ?? false}
            />
            <span className='text-gray-400 text-md'>{option.label}</span>
          </label>
        ))}
      </div>

      {hasError && (
        <div className='pt-1 pl-1 text-xs text-red-600' role='alert'>
          {formik.errors[id]}
        </div>
      )}
    </div>
  )
}
