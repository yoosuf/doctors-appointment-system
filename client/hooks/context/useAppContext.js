import React, { useState } from 'react'

const useAppContext = () => {
  const [profileImage, setProfileImage] = useState({})
  const [loading, setLoading] = useState(false)

  return {
    profileImage,
    setProfileImage,
    loading,
    setLoading,
  }
}

export default useAppContext
