import React, { useState } from 'react';



const DOBPicker = ({ selected, onChange }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedDOB = { ...selected, [name]: value };
    onChange(updatedDOB);
  };

// const DOBPicker = () => {
  // const [dob, setDOB] = useState({
  //   day: '',
  //   month: '',
  //   year: ''
  // });

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setDOB((prevDOB) => ({
  //     ...prevDOB,
  //     [name]: value,
  //   }));
  // };

  // Generating options for days (1 to 31)
  const daysOptions = Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
    <option key={day} value={day}>
      {day}
    </option>
  ));

  // Generating options for months (January to December)
  const monthsOptions = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ].map((month, index) => (
    <option key={index} value={index + 1}>
      {month}
    </option>
  ));

  // Generating options for years (from 1900 to the current year)
  const currentYear = new Date().getFullYear();
  const yearsOptions = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i).map((year) => (
    <option 
      key={year} 
      value={year}>
      {year}
    </option>
  ));

  return (
    <div className="grid gap-4 mt-1 sm:grid-cols-3">
      <select 
        name="day" 
        value={selected.day} 
        onChange={handleInputChange}
        className="block w-full px-3 py-2 mt-1 placeholder-gray-500 bg-transparent border border-gray-300 border-gray-500 rounded-lg shadow-sm appearance-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <option value="" disabled>Day</option>
        {daysOptions}
      </select>
      <select 
        name="month" 
        value={selected.month} 
        onChange={handleInputChange}
        className="block w-full px-3 py-2 mt-1 placeholder-gray-500 bg-transparent border border-gray-300 border-gray-500 rounded-lg shadow-sm appearance-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <option value="" 
        isabled>Month</option>
        {monthsOptions}
      </select>
      <select 
        name="year" value={selected.year} 
        onChange={handleInputChange}
        className="block w-full px-3 py-2 mt-1 placeholder-gray-500 bg-transparent border border-gray-300 border-gray-500 rounded-lg shadow-sm appearance-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <option value="" disabled>Year</option>
        {yearsOptions}
      </select>
    </div>
  );
};

export default DOBPicker;
