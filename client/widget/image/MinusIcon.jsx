import React from 'react'

const MinusIcon = ({ color, className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className ? className : 'h-6 w-6'}
      fill='none'
      viewBox='0 0 24 24'
      stroke='#fff'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M18 12H6'
      />
    </svg>
  )
}

export default MinusIcon
