import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { subDays } from 'date-fns'

const DatePickerField = ({
  id,
  label,
  placeholder,
  required,
  formik,
  setDate,
  date,
  disabled,
  customClass,
}) => {
  const onChangeDate = selectedDate => {
    if (selectedDate) {
      const utcDate = new Date(
        Date.UTC(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate()
        )
      )

      setDate(utcDate)
      formik.setFieldValue(id, utcDate)
    } else {
      setDate(null)
      formik.setFieldValue(id, null)
    }
  }

  const [isSnapCrackMobile, setIsSnapCrackMobile] = useState(false)

  useEffect(() => {
    // Check if user agent is SnapCrack Mobile
    const userAgent = navigator.userAgent.toLowerCase()
    setIsSnapCrackMobile(userAgent.includes('snapcrack_mobile'))
  }, [])

  const hasError = formik.touched[id] && formik.errors[id]

  return (
    <>
      <style>
        {`
          .react-datepicker {
            font-family: Arial, sans-serif;
            background-color: #333; /* Set the background color to dark */
            color: #fff; /* Set the text color to white */
          }


          .react-datepicker__triangle {
            border-bottom-color: #333333 !important;
            right: -20px  !important;

          }

          .react-datepicker-popper {
            z-index: 9999;
          }

          .react-datepicker__header {
            background-color: #333; /* Set the header background color to dark */
            color: #fff; /* Set the header text color to white */
          }

          .react-datepicker__current-month {
            color: #fff; /* Set the current month text color to white */
          }

          .react-datepicker__day-names {
            background-color: #444; /* Set the day names background color to slightly lighter */
          }

          .react-datepicker__day-name {
            color: #fff; /* Set the day names text color to white */
          }

          .react-datepicker__day {
            color: #ddd; /* Set the default day text color to dark gray */
          }


          .react-datepicker__month-dropdown , .react-datepicker__year-dropdown {
            background-color: #555;
          }
          .react-datepicker__day--keyboard-selected,
          .react-datepicker__day--selected,
          .react-datepicker__day:hover,
          .react-datepicker__day--keyboard-selected:hover,
          .react-datepicker__day--selected:hover {
            background-color: #555; /* Set the selected day background color to a slightly lighter dark color */
            color: #fff; /* Set the selected day text color to white */
          }
        `}
      </style>

      <div
        className={`form-group ${hasError ? 'has-error' : ''} ${
          customClass || ''
        }`}>
        <label htmlFor={id} className='inline-block mb-0 text-xs text-gray-400'>
          {label}
          {required && <span className='pl-0.5 text-red-400'>*</span>}
        </label>
        <div className='flex items-center'>
          {isSnapCrackMobile ? (
            <input
              type='date'
              id={id}
              value={date ? date.toISOString().split('T')[0] : ''}
              onChange={event => onChangeDate(new Date(event.target.value))}
              placeholder={placeholder}
              className={`appearance-none block w-full mt-1 rounded-md shadow-sm focus:outline-none focus:ring-2 text-xs leading-4 ${
                hasError
                  ? 'border-red-500 focus:border-red-900 focus:ring-red-500 focus:ring-offset-red-200'
                  : 'border-gray-700  focus:border-gray-900 focus:ring-gray-500 focus:ring-offset-gray-100'
              }`}
              disabled={disabled ?? false}
            />
          ) : (
            <DatePicker
              selected={date}
              onChange={date => onChangeDate(date)}
              showMonthDropdown
              showYearDropdown
              dateFormat='MM-dd-yyyy'
              placeholderText={placeholder}
              shouldCloseOnSelect={true}
              className={`appearance-none block w-full mt-1 rounded-md shadow-sm focus:outline-none focus:ring-2 text-xs leading-4 ${
                hasError
                  ? 'border-red-500 focus:border-red-900 focus:ring-red-500 focus:ring-offset-red-200'
                  : 'border-gray-700  focus:border-gray-900 focus:ring-gray-500 focus:ring-offset-gray-100'
              }`}
              disabled={disabled ?? false}
            />
          )}

          <input type='hidden' id={id} value={date ? date.toISOString() : ''} />
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
    </>
  )
}

export default DatePickerField
