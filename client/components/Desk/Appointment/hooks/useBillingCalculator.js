import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import commonApi from '@/api/common'
import { transformMembershipData } from '@/utils/membership'

const useBillingCalculator = ({ userObj, serviceIds }) => {
  const [loading, setLoading] = useState(false)
  const [activeSubscription, setActiveSubscription] = useState({})
  const [invitationReward, setInvitationReward] = useState({})
  const [allServicesArray, setAllServicesArray] = useState([])
  const [lineItems, setLineItems] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalAmountToPay, setTotalAmountToPay] = useState(0)

  useEffect(() => {
    // console.log(`userObj`, JSON.stringify(userObj))
    // if (typeof userObj._id === 'string' && userObj._id.trim() !== '') {
      getCustomerPackageInfo()
    // }
  }, [userObj])

  useEffect(() => {
    getAllServices()
  }, [])

  const getCustomerPackageInfo = async () => {

    try {
      console.log('Fetching patient data');
      if (!userObj || !userObj?.id) {
        throw new Error('User ID is undefined or null');
      }
      
      const patientData = await commonApi({
        parameters: [userObj?.id],
        action: 'getPatientById',
      });
      
      // console.log('Patient data:', patientData);
      const formattedMembership = transformMembershipData(
        patientData?.membership
      );
      
      console.log('Formatted membership:', formattedMembership);
      setActiveSubscription(formattedMembership);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    } finally {
      console.log('Fetch and format membership data complete');
    }

    if (
      userObj?.invitationReward &&
      userObj?.invitationReward?.status === 'active'
    ) {
      console.log(`userObj?.invitationReward`, userObj?.invitationReward)
      const { _id, startDate, status, categoryId } = userObj?.invitationReward

      const invData = {
        _id,
        startDate,
        status,
        categoryId: categoryId._id,
        categoryName: categoryId.name,
      }
      console.log(`invData`, invData)

      setInvitationReward(invData)
    }

    // Existing membership case (no fetch needed)
    const formattedMembership = transformMembershipData(userObj?.membership)
    setActiveSubscription(formattedMembership)
    // setInvitationReward({})
  }

  // console.log(`userObj`, userObj?.membership)

  const getAllServices = async () => {
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@  services data:', services)
    setLoading(true)
    try {
      let modifiedData = []

      // if (services.DATA.data.length === 0) {
      const data = {
        query: {
          isActive: true,
        },
        options: {
          select: ['price', 'timeDuration', 'name', 'id', 'categoryId'],
          populate: ['categoryId'],
          pagination: false,
        },
      }

      const { DATA = {} } = await commonApi({
        action: 'findService',
        data: data,
      })

      console.log('Raw service data:', DATA)
      modifiedData = DATA.data.map(service => ({
        ...service,
        categoryId: service.categoryId?._id,
        categoryName: service.categoryId?.name,
      }))

      console.log('################# Modified service data:', modifiedData)
      setAllServicesArray(modifiedData)
      // }
      // else {

      // modifiedData = services.DATA.data.map((service) => ({
      //   ...service,
      //   categoryId: service.categoryId?._id,
      //   categoryName: service.categoryId?.name,
      // }));
      // }

      console.log('$$$$$$$$$$$$$$$$$$$ Modified service data:', modifiedData)
      setAllServicesArray(modifiedData)
    } finally {
      console.log('getAllServices complete')
      setLoading(false)
    }
  }

  const calculateRemainingQuotaByCategory = activeSubscription => {
    console.log(
      'calculateRemainingQuotaByCategory initiated with activeSubscription:',
      activeSubscription
    )
    const remainingQuotaByCategory = {}
    console.log(
      'remainingQuotaByCategory initialized:',
      remainingQuotaByCategory
    )

    activeSubscription?.categories?.forEach(sub => {
      console.log('Iterating over category:', sub)
      // const remainingQuota = sub.quota - sub.remainingQuota
      const remainingQuota = sub.remainingQuota
      console.log('remainingQuota calculated:', remainingQuota)

      remainingQuotaByCategory[sub._id] = remainingQuota
      console.log('remainingQuotaByCategory updated:', remainingQuotaByCategory)
    })
    console.log(
      'Returning calculated remainingQuotaByCategory:',
      remainingQuotaByCategory
    )
    return remainingQuotaByCategory
  }

  const generateLineItems = () => {
    console.log('generateLineItems initiated')
    const newLineItems = []
    console.log('newLineItems initialized:', newLineItems)
    let newTotalToPayAmount = 0
    console.log('newTotalToPayAmount initialized:', newTotalToPayAmount)
    let newTotalAmount = 0
    console.log('newTotalAmount initialized:', newTotalAmount)

    const remainingQuotaByCategory =
      calculateRemainingQuotaByCategory(activeSubscription)
    console.log(
      'remainingQuotaByCategory calculated:',
      remainingQuotaByCategory
    )

    // Iterate over each service ID
    serviceIds?.forEach(serviceId => {
      console.log('Iterating over service ID:', serviceId)
      // Find the selected service based on the ID
      const selectedService = allServicesArray.find(
        service => service.id === serviceId
      )
      console.log('selectedService:', selectedService)

      if (selectedService) {
        console.log('selectedService found')
        // Find the corresponding service in activeSubscription
        const matchedSubscriptionService = activeSubscription?.categories?.find(
          sub => {
            console.log(selectedService)
            sub._id === selectedService.categoryId
          }
        )
        console.log('matchedSubscriptionService:', matchedSubscriptionService)

        let amount = selectedService.price || 0 // Default to service price
        console.log('Initial amount:', amount)

        // Check if the remaining quota for the category allows for the service to be free of charge
        if (
          remainingQuotaByCategory[selectedService.categoryId] > 0 ||
          selectedService.categoryId === invitationReward.categoryId
        ) {
          console.log(
            'Quota available for category:',
            selectedService.categoryId
          )
          amount = 0
          console.log('Setting amount to 0')
          remainingQuotaByCategory[selectedService.categoryId]--
          console.log(
            'Decrementing remainingQuotaByCategory:',
            remainingQuotaByCategory
          )
        }

        // Add the line item to the new line items array
        newLineItems.push({
          _id: serviceId,
          name: selectedService.name,
          price: selectedService.price,
          categoryId: selectedService.categoryId,
          amount: amount,
        })
        console.log('Line item added:', newLineItems)

        // Increment total amounts based on the amount
        newTotalToPayAmount += amount
        console.log('newTotalToPayAmount updated:', newTotalToPayAmount)
        newTotalAmount += selectedService.price
        console.log('newTotalAmount updated:', newTotalAmount)
      }
    })

    // Set the new line items and total amounts in state
    console.log('New Line Items:', newLineItems)
    console.log('New Total To Pay Amount:', newTotalToPayAmount)
    console.log('New Total Amount:', newTotalAmount)
    setLineItems(newLineItems)
    setTotalAmountToPay(newTotalToPayAmount)
    setTotalAmount(newTotalAmount)
  }

  useEffect(() => {
    console.log('serviceIds or allServicesArray changed, generating line items') // Log trigger
    generateLineItems()
  }, [serviceIds, allServicesArray])

  useEffect(() => {
    console.log(`invitationReward`, invitationReward)
  }, [invitationReward])

  return {
    loading,
    lineItems,
    totalAmount,
    totalAmountToPay,
  }
}

export default useBillingCalculator
