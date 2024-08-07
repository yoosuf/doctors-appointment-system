import { useEffect, useState } from 'react'
import commonApi from '@/api/common'
import { ONBOARDING_STEPS } from '@/utils/constant'
import toast from 'react-hot-toast'
import Router from 'next/router'
import routes from '@/utils/routes'
import { isEmpty } from 'lodash'
import { useFormik } from 'formik'

export const useInformed = ({ userData }) => {
  const [loading, setLoading] = useState(false)
  const [pageContent, setPageContent] = useState("")

  const [fingerSign, setFingerSign] = useState()
  const [signSave, setSignSave] = useState(false)
  const [onBoardingId, setOnBoardingId] = useState()
  const [parentName, setParentName] = useState('')
  const [parentEmail, setParentEmail] = useState('')
  const [fingerSignUri, setFingerSignUri] = useState()
  const [userDateOfBirth, setUserDateOfBirth] = useState('')
  const [showParentForm, setShowParentForm] = useState(false)

  const { user } = userData

  const loadOnBoarding = async () => {
    setLoading(true)
    try {
      let user

      const userResponse = await commonApi({
        action: 'getPatient',
        data: {},
      })

      user = userResponse.DATA.data?.[0]
      console.log(`user`, user)
      setUserDateOfBirth(user.dob)


      console.log(`user.locationIds`, user.locationIds[0])


      if (user && user.locationIds) {
        try {
          // Fetching page based on user's location IDs
          const pageResponse = await commonApi({
            action: 'findTosPageByLocation',
            parameters:[user?.locationIds[0]]
          })

          const page = pageResponse.DATA.body
          console.log(`page`, page)

          setPageContent(page)

        
        } catch (error) {s
          console.error('Error fetching page:', error)
          // Handle error for page fetching
        }
      }

      await commonApi({
        action: 'onBoardingGet',
        parameters: [user.id],
      }).then(({ DATA = {} }) => {
        setOnBoardingId(DATA.id)
        setFingerSign(DATA.fingerSign?._id)
        setFingerSignUri(DATA.fingerSign?.uri)
      })
    } finally {
      setLoading(false)
    }
  }

  const setOnboardProgressSession = async () => {
    await fetch('/api/onBoardProgress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progress: 100 }),
    })
  }

  const submitSignature = async () => {
    if (!fingerSign || isEmpty(fingerSign)) {
      return toast.error('Please sign on signature pad')
    }

    if (showParentForm) {
      if (!parentName || isEmpty(parentName)) {
        return toast.error("Parent's name is required")
      }

      if (!parentEmail || isEmpty(parentEmail)) {
        return toast.error("Parent's email is required")
      }
    }

    setLoading(true)
    const data = {
      onboardSteps: ONBOARDING_STEPS.SIGNATURE,
      totalOnboardSteps: ONBOARDING_STEPS.TOTALONBOARDSTEPS,
      userId: user.id,
      parentName,
      parentEmail,
      fingerSign,
    }
    try {
      await commonApi({
        action: 'onboardingUpdate',
        data,
        parameters: [onBoardingId],
      }).then(async ({ MESSAGE }) => {
        await setOnboardProgressSession()
        toast.success(MESSAGE)
        Router.push(routes.customerDashboard)
        setLoading(false)
      })
    } finally {
      setLoading(false)
    }
  }

  const submitInform = () => {
    // setSignSave(true)
    if (fingerSign) {
      submitSignature()
    } else {
      setSignSave(true)
    }
  }

  useEffect(() => {
    const currentDate = new Date()
    const inputDate = new Date(userDateOfBirth)
    const diffInYears = Math.floor(
      (currentDate - inputDate) / (1000 * 60 * 60 * 24 * 365)
    ) // Calculate the difference in years

    if (diffInYears < 18) {
      setShowParentForm(true)
    } else {
      setShowParentForm(false)
    }
  })

  useEffect(() => {
    if (user) loadOnBoarding()
  }, [user])

  useEffect(() => {
    if (fingerSign && signSave) submitSignature()
  }, [fingerSign])



  const formik = useFormik({
    initialValues: {
      signature: '',
      parent_name: '',
      parent_email: '',
    },
    onSubmit: values => {
      submitInform(values)
    },
  })


  return {
    formik, 
    loading,
    pageContent, 
    setFingerSign,
    signSave,
    setSignSave,
    parentName,
    setParentName,
    parentEmail,
    setParentEmail,
    fingerSignUri,
    userDateOfBirth,
    setUserDateOfBirth,
    showParentForm,
    setShowParentForm,
    submitInform,
  }
}

export default useInformed
