import React from 'react'
import ServiceHeader from './Header/ServiceHeader'

const BlankLayout = ({ userData, children }) => {
  return (
    <div className='flex'>
      <div className='w-full'>
        <ServiceHeader userData={userData} />

        {children}
      </div>
    </div>
  )
}

export default BlankLayout
