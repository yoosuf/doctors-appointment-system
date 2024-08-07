import React from 'react'
import privateRouteForPatient from '@/utils/privateRouteForPatient'
import routes from '@/utils/routes'
import commonApi from '@/api/common'
import LocationStep from '@/components/Customer/Onboard/LocationStep'

const LocationPage = ({ user, locations }) => {
  return (
    <>
      <LocationStep user={user} locations={locations} />
    </>
  )
}

export default LocationPage

export const getServerSideProps = async context => {
  const authProps = await privateRouteForPatient(routes.aggravates)(context)
  if (!authProps.props) {
    return { redirect: { destination: routes.sesson.new, permanent: false } }
  }

  try {
    const response = await commonApi({
      action: 'findClientLocation',
      data: {
        query: {
          isDelete: false,
        },
        options: {
          select: [],
          populate: ['locationAddressId'],
          pagination: false,

        },
      },
      config: { tempToken: authProps.props.user.token },
    })

    const locations = response.DATA.data;
    return { props: { ...authProps.props, locations } };


  } catch (error) {
    console.error('Failed to fetch locations', error)
    return { props: { ...authProps.props, locations: [] } }
  }
}
