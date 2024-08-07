import React from 'react'
import Loader from '../loader'

const SnapCrackButton = ({
  type,
  text,
  className,
  renderLoader,
  onClick,
  disabled,
}) => {
  return (
    <>
      {renderLoader && <Loader />}
      <button
        disabled={disabled}
        type={type}
        className={className}
        onClick={onClick}>
        {text}
      </button>
    </>
  )
}

export default React.memo(SnapCrackButton)
