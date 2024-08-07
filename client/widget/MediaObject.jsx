import React, { useState } from 'react'
import Link from 'next/link'
import 'react-datepicker/dist/react-datepicker.css'

export const MediaObject = ({ img, name, mail, id, selectedCustomer = {} }) => {
  return (
    <>
      <div className='flex-ver gap-3'>
        <div>
          <img
            src={img}
            className='h-10 w-10 object-cover rounded-full'
            alt=''
          />
        </div>
        <div>
          <h3
            className={`text-sm font-medium ${
              selectedCustomer.id === id && 'text-black'
            }`}>
            {name}
          </h3>
          <p className='text-sm text-gray-400'>{mail}</p>
        </div>
      </div>
    </>
  )
}
