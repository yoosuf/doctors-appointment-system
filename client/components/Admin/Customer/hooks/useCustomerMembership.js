import commonApi from '@/api/common'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useCustomerMembership = ({ id }) => {
  const [loading, setLoading] = useState(false)
  const [memberShipData, setMembershipData] = useState({})
  const [allMemberShip, setAllMemberShip] = useState([])

  const [selectedMemberShipID, setSelectedMemberShipID] = useState()

  useEffect(() => {
    if (id) {
      getMembershipData()
    } else {
      setMembershipData({})
    }
    memberShipList()
  }, [id])

  const getMembershipData = () => {
    setLoading(true)
    try {
      const data = {
        query: {
          _id: id,
        },
        options: {
          populate: [
            'profile_image',
            {
              path: 'addressIds',
              populate: [
                {
                  path: 'address',
                },
              ],
            },
            { path: 'locationIds', model: 'location' },
            { path: 'roleId', model: 'role', select: 'name code' },
            { path: 'membership._id', model: 'membership' },
            { path: 'membership.categories._id', model: 'category' },
          ],
        },
      }
      commonApi({
        action: 'getPatientList',
        data,
      }).then(({ DATA = {} }) => {
        if (DATA.data?.[0]?.purchasedPlans) {
          setMembershipData(DATA.data?.[0]?.purchasedPlans)
          setSelectedMemberShipID(
            DATA.data?.[0]?.purchasedPlans?.membershipId?._id
          )
        } else {
          setMembershipData({})
          setSelectedMemberShipID()
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const memberShipList = async () => {
    setLoading(true)
    try {
      const data = {
        query: {
          isDeleted: false,
        },
        options: {
          select: [],
          populate: [
            {
              path: 'categories',
              populate: ['_id'],
            },
            {
              path: 'duration',
            },
          ],
          sort: {
            createdAt: -1,
          },
        },
      }
      await commonApi({
        action: 'findMembership',
        data,
      }).then(({ DATA = {} }) => {
        const { data = [] } = DATA
        setAllMemberShip(data)
      })
    } finally {
      setLoading(false)
    }
  }

  const onSelectMemberShip = id => {
    setSelectedMemberShipID(id)
  }

  const onCancelMembership = async e => {
    e.preventDefault()
    setLoading(true)

    const data = {
      id: id,
    }

    try {
      await commonApi({
        action: 'cancelMembership',
        data: data,
      }).then(({ DATA, MESSAGE }) => {
        toast.success(MESSAGE)
      })
    } finally {
      setLoading(false)
    }
  }
  const updateMemberShip = async () => {
    setLoading(true)
    try {
      await commonApi({
        action: 'updateUser',
        parameters: [id],
        data: {
          purchasedPlans: {
            membershipId: selectedMemberShipID,
          },
        },
      }).then(({ MESSAGE = '' }) => {
        toast.success(MESSAGE)
      })
    } finally {
      setLoading(false)
    }
  }
  return {
    loading,
    memberShipData,
    allMemberShip,
    selectedMemberShipID,
    onSelectMemberShip,
    onCancelMembership,
    updateMemberShip,
  }
}

export default useCustomerMembership
