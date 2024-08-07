import React from 'react'

// Define the Button component with props
export const Button = ({
  text,
  onClick,
  className,
  style,
  isLoading,
  isDisabled,
  ariaLabel,
  type,
  kind,
}) => {
  let buttonStyles = ''

  switch (kind) {
    case 'primary':
      buttonStyles =
        'block w-full p-2 text-sm text-center text-black transition rounded-md focus:outline-none bg-yellowBg hover:bg-yellow-400'
      break
    case 'secondery':
      buttonStyles =
        'block border border-gray-700 w-full p-2 text-sm text-center text-gray-200 transition rounded-md focus:outline-none bg-transparent hover:border-yellow-400'
      break
    case 'success':
      buttonStyles =
        'block w-full p-2 text-sm text-center text-gray-200 transition rounded-md focus:outline-none bg-green-600 hover:bg-green-700'
      break
    case 'danger':
      buttonStyles =
        'block w-full p-2 text-sm text-center text-gray-200 transition rounded-md focus:outline-none bg-red-500 hover:bg-red-600'
      break
    default:
      buttonStyles =
        'block border border-gray-700 w-full p-2 text-sm text-center text-gray-200 transition rounded-md focus:outline-none bg-transparent hover:bg-red-600 hover:border-yellow-500'
  }

  return (
    <button
      onClick={onClick}
      className={`btn ${className} ${
        isLoading ? 'loading' : ''
      } ${buttonStyles}`}
      style={style}
      disabled={isDisabled || isLoading}
      aria-label={ariaLabel || text}
      type={type} // Add the type attribute
    >
      {isLoading ? 'Loading...' : text}
    </button>
  )
}

// Default Props
Button.defaultProps = {
  className: '',
  style: {},
  isLoading: false,
  isDisabled: false,
  ariaLabel: '',
  type: 'button',
  kind: 'secondery',
}
