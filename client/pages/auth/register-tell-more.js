import routes from '@/utils/routes'
import withSession from '@/utils/session'
import React, { useState } from 'react'
import ProfileInformation from '@/components/Auth/Register/ProfileInformation'
import { USER_ROLE_TYPE } from '@/utils/constant'
import AuthLayout from '@/components/Layout/AuthLayout'
import commonApi from '@/api/common'

import { getTempToken } from '@/utils/localStorage'

export default function RegistrationStepProfileInformationComponent ({userData}) {
  return (
    <AuthLayout
      title={'Create an account'}
      subTitle={
        'We need a little more information to set up your profile account'
      }>
      <ProfileInformation />
    </AuthLayout>
  )
}

export const getServerSideProps = withSession(async ctx => {
  const { req } = ctx

  const token = getTempToken() || {}

  try {

    const payload = {
      options: {
        populate: [
          'profile_image',
          {
            path: 'addressIds',
            populate: 'address',
          },
          {
            path: 'locationIds',
            populate: 'location',
          },
        ],
        sort: {
          createdAt: -1,
        },
      },
    }



    const userData = await commonApi({
      action: 'getPatientObject',
      config: { tempToken: token },
    })

    console.log(userData)

    // console.log(`user`, data)

    return {
      props: { userData: userData },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { userData: {} },
    }
  }
})
