import React, { useState, useEffect, useRef } from 'react'
import SelectMembershipModal from './SelectMembershipModal'
import MembershipCard from '@/components/Customer/Membership/MembershipCard'
import useInvitation from '@/components/Customer/Membership/hooks/useInvitation'
import InvitationItem from '@/components/Customer/Membership/InvitationItem'
import useSubscription from '@/components/Customer/Membership/hooks/useSubscription'

const MembershipHome = ({ userData, membershipList, cardDetails }) => {
  const {
    loading,
    subscriptionData,
    onCancelMembership,
    openMembershipModal,
    closeModal,
  } = useSubscription({ userData })

  const { invitations } = useInvitation({
    userData,
  })

  return (
    <>
      <MembershipCard
        userData={userData}
        currentMembership={subscriptionData}
        onCancelMembership={onCancelMembership}
        openMembershipModal={openMembershipModal}
        loading={loading}
      />

      {invitations.length > 0 && (
        <div className='mt-4'>
          <h2 className=''>You've invited the following:</h2>
          {invitations.map((item, index) => (
            <InvitationItem key={index} invitation={item} />
          ))}
        </div>
      )}

      <SelectMembershipModal
        closeBtn={() => {
          closeModal()
        }}
        userData={userData}
        membershipData={membershipList}
        currentMembership={subscriptionData}
        cardDetails={cardDetails}
      />
    </>
  )
}

export default MembershipHome
