import commonApi from '@/api/common'
import React, { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { formattedMembershipObj } from '@/utils/membership'
import socket from '@/utils/socket'; // Import the socket instance

const useMembership = ({ userData, membershipList }) => {
  const [loading, setLoading] = useState(false)
  const [membershipDataArray] = useState(membershipList)
  const [currentMembership, setCurrentMembership] = useState({})

  useEffect(() => {
    console.log('Formatted ', formattedMembershipObj(userData?.membership))
    console.log(`currentMembership FROM useMembership`, currentMembership)
  }, [currentMembership])

  const openModal = () => {
    const MemberShipModal = document.getElementById('selectMembershipModal')
    MemberShipModal.classList.add('active')
  }

  const closeModal = () => {
    const MemberShipModal = document.getElementById('selectMembershipModal')
    MemberShipModal.classList.remove('active')
  }

  const closeCheckoutModal = () => {
    const checkoutEventModal = document.getElementById('checkoutEventModal')
    checkoutEventModal.classList.remove('active')
  }

  const openMembershipModal = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      openModal()
    } finally {
      setLoading(false)
    }
  }

  useEffect(async () => {
    await getMemberProfile()
  }, [])

  const getMemberProfile = async () => {
    await commonApi({
      action: 'getPatientObject',
    }).then(async data => {
      setCurrentMembership(formattedMembershipObj(data?.membership))
    })
  }

  const onBuyMembership = async (e, id, card) => {
    console.log('Entering onBuyMembership function')
    e.preventDefault()
    console.log('Preventing default event action')
    if (card.length === 0) {
      console.log('Card length is 0, displaying error message')
      toast.error('Please add the card')
    } else if (id && card.length) {

      setLoading(true)
      try {
        const data = {
          membershipId: id,
        }
        await commonApi({
          action: currentMembership._id ? 'siwtchMembership' : 'buyMembership',
          data,
        }).then(async ({ DATA, MESSAGE }) => {
          socket.emit('updateMembership', { userId, updatedMembershipData });
          closeCheckoutModal()
          toast.success(DATA)
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const onCancelMembership = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await commonApi({
        action: 'cancelMembership',
      }).then(async ({ DATA, MESSAGE }) => {

        socket.emit('updateMembership', { userId, updatedMembershipData });
        toast.success(DATA)
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    openMembershipModal,
    closeModal,
    loading,
    setLoading,
    membershipDataArray,
    onBuyMembership,
    onCancelMembership,
    currentMembership,
    closeCheckoutModal,
  }
}

export default useMembership
