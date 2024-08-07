import React, { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

export const PasswordField = ({
  id,
  label,
  placeholder,
  required,
  formik,
  customClass,
}) => {
  const hasError = formik.touched[id] && formik.errors[id]
  const [passwordShow, setPasswordShow] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordShow(!passwordShow)
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
      <div className='relative flex items-center'>
        <div className='absolute transform -translate-y-1/2 right-3 top-1/2'>
          {formik.values[id] ? (
            <div
              className='flex items-center justify-center w-5 h-5 cursor-pointer'
              onClick={togglePasswordVisibility}
              aria-label={passwordShow ? 'Hide password' : 'Show password'}
              role='button'
              tabIndex='0'>
              {passwordShow ? (
                <EyeIcon className='w-4 h-4' />
              ) : (
                <EyeSlashIcon className='w-4 h-4' />
              )}
            </div>
          ) : null}
        </div>
        <input
          type={passwordShow ? 'text' : 'password'}
          id={id}
          className={`appearance-none block w-full mt-1 rounded-md shadow-sm focus:outline-none focus:ring-2 text-md leading-4 ${
            hasError
              ? 'border-red-500 focus:border-red-900 focus:ring-red-500 focus:ring-offset-red-200'
              : 'border-gray-700  focus:border-gray-900 focus:ring-gray-500 focus:ring-offset-gray-100'
          }`}
          placeholder={placeholder}
          autoComplete='off'
          value={formik.values[id]}
          {...formik.getFieldProps(id)}
          aria-describedby={`${id}-error`}
        />
      </div>
      {formik.touched[id] && formik.errors[id] && (
        <div
        className='pt-1 pl-1 text-xs text-red-600'
        id={`${id}-error`}
          role='alert'>
          {formik.errors[id]}
        </div>
      )}
    </div>
  )
}
