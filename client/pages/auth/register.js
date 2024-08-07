import React, { useState, useEffect } from 'react';
import Register from '@/components/Auth/Register/Register'
import withSession from '@/utils/session'
import routes from '@/utils/routes'
import { USER_ROLE_TYPE } from '@/utils/constant'
import AuthLayout from '@/components/Layout/AuthLayout'

const AuthRegisterPage = () => {

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenParam = queryParams.get('token');
    const emailParam = queryParams.get('email');

    if (tokenParam && emailParam) {
      const userData = { token: tokenParam, email: emailParam };
      localStorage.setItem('invData', JSON.stringify(userData));
    }
  }, []);


  return (
    <AuthLayout title={'Create an account'} subTitle={'We need a little more information to set up your profile account'}>
      <Register />
    </AuthLayout>
  )
}

export default AuthRegisterPage

export const getServerSideProps = withSession(async ctx => {
  try {
    const { req } = ctx

    const { data = {} } = req.session.get('user') || {}

    if (data?.token && data?.roleId?.code === USER_ROLE_TYPE.PATIENT) {
      return {
        redirect: {
          destination: routes.customerDashboard,
          permanent: false,
        },
      }
    } else if (data?.token && data?.roleId?.code !== USER_ROLE_TYPE.PATIENT) {
      return {
        redirect: {
          destination: routes.dashboard,
          permanent: false,
        },
      }
    }

    return {
      props: { user: data }, // just passing user data to use in components
    }

  } catch (error) {
    console.error('error:', error)

    return {
      props: { user: data }, // just passing user data to use in components
    }
  }
})
