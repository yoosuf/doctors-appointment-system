import React from 'react'
import Login from '@/components/Auth/Session/Login'
import AuthLayout from '@/components/Layout/AuthLayout'

export default function AuthLoginPage (props) {
  return (
    <AuthLayout
      title={'Login with email'}
      subTitle={'Please enter correct email and password to login'}>
      <Login />
    </AuthLayout>
  )
}
