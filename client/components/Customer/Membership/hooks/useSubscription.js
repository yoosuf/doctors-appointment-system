import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast'
import commonApi from '@/api/common'
import { transformMembershipData, flattenObject } from '@/utils/membership';
import socket from '@/utils/socket'; // Import the socket instance

const useSubscription = ({ userData }) => {

  const [loading, setLoading] = useState(false);
  const [invitationData, setInvitationData] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);


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



  useEffect(() => {
    console.log(`userData`, userData.id);
    console.log('useSubscription hook: userData changed');
  
    const userId = userData.id;
  
    console.log('User ID:', userId);
  
    // Check if userId exists before subscribing
    if (userId) {
      setLoading(true); // Set loading state when starting the subscription process
  
      // Subscribe to membership data for the specified user
      const subscribe = subscribeToMembership(userId, data => {
        // console.log('subscribeToMembership:', data);
  
        // Ensure data exists before updating state
        if (data) {
          setInvitationData(flattenObject(data?.invitationReward));
          setSubscriptionData(transformMembershipData(data?.membership));
        }
        
        setLoading(false); // Always set loading state to false after subscription updates
      });
  
      // Clean up subscription on component unmount
      return () => {
        console.log('useSubscription hook: Cleanup');
        subscribe(); // Unsubscribe when component unmounts
      };
    } else {
      // Handle case where userId doesn't exist
      console.log('User ID not found.');
    }
  }, [userData]);




  const openMembershipModal = e => {
    e.preventDefault();
    setLoading(true);
    try {
      openModal();
    } catch (error) {
      // Handle any errors that occur during opening modal
      console.error("Error opening modal:", error);
    } finally {
      setLoading(false);
    }
  };


  const subscribeToMembership = (userId, callback) => {
    console.log('Subscribing to membership data for user ID:', userId);
    socket.emit('subscribeToMembership', userId);

    // Listen for membershipData event
    socket.on('membershipData', callback);

    // Return a function to unsubscribe when component unmounts
    return () => {
      console.log('Unsubscribing from membership data for user ID:', userId);
      socket.off('membershipData', callback);
    };
  };



  const onBuyMembership = async (e, id, card) => {
    console.log('Entering onBuyMembership function')
    e.preventDefault()
    // socket.emit('subscribeToMembership', userId);


    console.log('Preventing default event action')
    if (card.length === 0) {
      console.log('Card length is 0, displaying error message')
      toast.error('Please add the card')
    } else if (id && card.length) {

      setLoading(true)
      const userId = userData?.id;

      try {

        const data = {
          membershipId: id,
        }
        await commonApi({
          action: subscriptionData?._id ? 'siwtchMembership' : 'buyMembership',
          data,
        }).then(async ({ DATA, MESSAGE }) => {
          console.log(`onBuyMembership`,DATA);
          console.log('onBuyMembership',MESSAGE);
          console.log('onBuyMembership subscriptionData',subscriptionData);

          console.log('onBuyMembership userData',userData);


          socket.emit('updateMembership', { userId });

          // `Membership is switched. You will be charged on the next billing cycle`
          closeCheckoutModal()
          toast.success(MESSAGE)
        })
      } finally {
        socket.emit('updateMembership', { userId });
        console.log('updateMembership event emitted'); 
        setLoading(false)
      }
    }
  }

  const onCancelMembership = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      console.log(`userData`, userData)
      const userId = userData?._id;

      await commonApi({
        action: 'cancelMembership',
      }).then(async ({ DATA, MESSAGE }) => {
        console.log(`onCancelMembership`, DATA);
        console.log('onCancelMembership', MESSAGE);
        // `Cancellation request received. Membership will cancel at the end of the current billing cycle ${renewalDate}`
        socket.emit('updateMembership', { userId });
        toast.success(MESSAGE)
      })
    } finally {
      setLoading(false)
    }
  }






  return {
    loading,
    invitationData, 
    subscriptionData,
    openMembershipModal,
    closeModal,
    onBuyMembership,
    onCancelMembership,
    closeCheckoutModal,
  };
};

export default useSubscription;