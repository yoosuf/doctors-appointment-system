import commonApi from '@/api/common'
import { useEffect, useState } from 'react'

const useCustomerIdentity = ({ id }) => {
  const [loading, setLoading] = useState(false)
  const [identityList, setIdentityList] = useState([])

  useEffect(() => {
    if (id) {
      getCustomerData()
    }
  }, [id])
  

  const getCustomerData = async () => {
    setLoading(true)
    try {
      const data = {
        query: {
          _id: id,
        },
        options: {
          select: [
            'identityDocuments',
          ],
          populate: [{ path: 'identityDocuments' }],
        },
      }
      await commonApi({
        action: 'getPatientList',
        data,
      }).then(({ DATA = {} }) => {
        const data = DATA?.data?.[0]
        setIdentityList(data.identityDocuments)
        console.log(data.identityDocuments)
      })
    } finally {
      setLoading(false)
    }
  }


  return {
    loading,
    identityList
  }
}

export default useCustomerIdentity
