import { subYears } from 'date-fns'
import moment from 'moment'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const SnapCrackDateComponent = ({ date, setDate, formik }) => {
  const onChangeDate = date => {
    setDate(date)
    formik.setFieldValue('dob', date)
  }

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
      <DatePicker
        selected={date}
        onChange={date => onChangeDate(date)}
        showMonthDropdown
        showYearDropdown
        dateFormat="yyyy-MM-dd"
        placeholderText='Date format shold be YYYY-MM-DD'
        className='w-full px-2 py-2 pl-10 bg-transparent border border-gray-500 rounded-md'
      />
    </>
  )
}

export default React.memo(SnapCrackDateComponent)
