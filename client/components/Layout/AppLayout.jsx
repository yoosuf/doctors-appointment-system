import React from 'react'
import PatientHeader from '@/components/Layout/Header/PatientHeader'

const AppLayout = ({ userData, children }) => {
  return (
    <div className='flex'>
      <div className='w-full'>
        <PatientHeader container userData={userData} />

        {children}
      </div>
    </div>
  )
}

export default AppLayout
