import React from 'react';

export const EmailField = ({ id, label, placeholder, required, formik, customClass }) => {
    const hasError = formik.touched[id] && formik.errors[id];

    return (
        <div className={`form-group ${hasError ? 'has-error' : ''} ${customClass || ''}`}>
            <label htmlFor={id} className='inline-block mb-1 text-sm text-gray-400'>
                {label}
                {required && <span className='pl-0.5 text-red-400'>*</span>}
            </label>
            <div className='relative flex items-center'>
                <input
                    type='text'
                    id={id}
                    className={`w-full p-2 placeholder-gray-500 bg-transparent border-2 border-gray-700 rounded-md  focus:ring-2 ${hasError ? 'border-red-500 focus:ring-red-400 ' : 'focus:ring-yellow-400 '}`}
                    placeholder={placeholder}
                    {...formik.getFieldProps(id)}
                    aria-describedby={`${id}-error`}
                />
            </div>
            {formik.touched[id] && formik.errors[id] && (
                <div
                    className='pt-1 pl-1 text-xs text-redAlert'
                    id={`${id}-error`}
                    role='alert'
                >
                    {formik.errors[id]}
                </div>
            )}
        </div>
    );
};
