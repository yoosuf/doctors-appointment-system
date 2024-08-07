import React from 'react'
import Sidebar from '@/components/Layout/sidebar/Sidebar'
import Header from '@/components/Layout/Header/Header'

const AdminLayout = ({ children }) => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full'>
        <Header />
        {children}
      </div>
    </div>
  )
}

export default AdminLayout
