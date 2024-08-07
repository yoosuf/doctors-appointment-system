import React, { useState } from 'react'
import Link from 'next/link'
import 'react-datepicker/dist/react-datepicker.css'

export const TickName = props => {
  return (
    <>
      <div className='flex items-center'>
        <Link href='#'>
          <a className='font-medium text-white mr-2'>{props.name}</a>
        </Link>
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='#22C55E'>
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
              clipRule='evenodd'></path>
          </svg>
        </div>
      </div>
    </>
  )
}
