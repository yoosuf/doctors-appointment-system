import React from 'react'
import Link from 'next/link'

const ToggleButton = ({ checked, setChecked = () => {}, disabled = false }) => {
  return (
    <>
      <label className='switch'>
        <input
          type='checkbox'
          checked={checked}
          onChange={() => setChecked(!checked)}
          disabled={disabled}
        />
        <span className='slider round'></span>
      </label>
    </>
  )
}

export default React.memo(ToggleButton)
