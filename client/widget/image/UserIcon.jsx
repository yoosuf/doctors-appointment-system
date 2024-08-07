import React from 'react'

const UserIcon = ({ className, fill }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className ? className : 'h-5 w-5'}
      viewBox='0 0 20 20'
      fill={fill ? fill : '#9CA3AF'}>
      <path
        fillRule='evenodd'
        d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
        clipRule='evenodd'
      />
    </svg>
  )
}

export default React.memo(UserIcon)
