/* eslint-disable jsx-a11y/no-redundant-roles */
import React from 'react';

function Checkbox({ id, desc, value, checked, onChange }) {
  return (
    <label htmlFor={id} className='flex items-center gap-2 text-sm text-gray-400'>
      <div className='relative flex items-center gap-2'>
        <input
          id={id}
          type='checkbox'
          name={desc}
          value={value}
          checked={checked}
          onChange={onChange}
          aria-labelledby={`${id}-label`}
          aria-checked={checked}
          role="checkbox"
        />
        <div className='checkmark'></div>
        <div className='label' id={`${id}-label`}>
          {desc}
        </div>
      </div>
    </label>
  );
}

export default Checkbox;
