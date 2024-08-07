import React from 'react';

const ArrayField = ({ name, placeholder, formik }) => {
  // Check if 'name' prop includes array index and split accordingly
  const isIndexed = name.includes('[');
  const fieldName = isIndexed ? name.split('[')[0] : name;
  const index = isIndexed ? parseInt(name.split('[')[1].split(']')[0], 10) : null;

  const fieldTouched = isIndexed ? formik.touched[fieldName]?.[index] : formik.touched[fieldName];
  const fieldError = isIndexed ? formik.errors[fieldName]?.[index] : formik.errors[fieldName];
  const isError = fieldTouched && fieldError;

  // Correctly accessing the field value
  const fieldValue = isIndexed 
    ? (formik.values[fieldName] && formik.values[fieldName][index] ? formik.values[fieldName][index][name.split('.')[1]] : '')
    : formik.values[fieldName] || '';

  return (
    <>
      <input
        type='text'
        name={name}
        onChange={formik.handleChange}
        value={fieldValue} // Ensures controlled input
        className={`px-3 py-2 placeholder-gray-500 bg-transparent border-2 border-gray-700 rounded-md focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 ${isError ? 'border-red-500' : ''}`}
        placeholder={placeholder}
      />
      {isError && (
        <div className='mt-1 text-xs text-red-500'>
          {/* {fieldError} */}

          {/* {JSON.stringify(.)} */}
        </div>
      )}
      </>
  );
};

export default ArrayField;
