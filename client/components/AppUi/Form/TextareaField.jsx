import React from 'react'

export const TextareaField = ({
  id,
  label,
  placeholder,
  required,
  formik,
  customClass,
  disabled,
  rows,
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
      <textarea
        placeholder={placeholder}
        id={id}
        name={id}
        {...formik.getFieldProps(id)}
        rows={rows ?? `2`}
        className={`appearance-none block w-full mt-1 rounded-md shadow-sm focus:outline-none focus:ring-2 text-md leading-4 ${
          hasError
            ? 'border-red-500 focus:border-red-900 focus:ring-red-500 focus:ring-offset-red-200'
            : 'border-gray-700  focus:border-gray-900 focus:ring-gray-500 focus:ring-offset-gray-100'
        }`}
        disabled={disabled ?? false}
      />
      {formik.touched[id] && formik.errors[id] && (
        <div className='pt-1 pl-1 text-xs text-red-600'>
          {formik.errors[id]}
        </div>
      )}
    </div>
  )
}
