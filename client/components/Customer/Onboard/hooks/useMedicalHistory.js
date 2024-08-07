import { useEffect, useState } from 'react'
import commonApi from '@/api/common'
import { ONBOARDING_STEPS } from '@/utils/constant'
import routes from '@/utils/routes'
import _, { isEmpty } from 'lodash'
import moment from 'moment'
import Router from 'next/router'
import toast from 'react-hot-toast'
import * as Yup from 'yup';
import { useFormik } from 'formik';

export const useMedicalHistory = ({ userData }) => {
  const [loading, setLoading] = useState(false)
  const [questionList, setQuestionList] = useState([])
  const [answerData, setAnswerData] = useState([])

  const { user } = userData;

  const loadOnBoarding = async () => {
    const data = {
      options: {
        pagination: false,
        populate: [
          {
            path: 'queId',
            select: 'title',
          },
        ],
      },
      query: {
        userId: user.id,
        isActive: true,
      },
    }
    setLoading(true)
    try {
      await commonApi({
        action: 'onBoardingAnswerget',
        data,
      }).then(({ DATA }) => {
        if (!isEmpty(DATA?.data)) {
          const temp = DATA.data?.map((item = {}) => {
            const { quesId, ansIds, ans, ansType } = item
            return {
              quesId,
              ansIds,
              ans,
              ansType,
              // ansDisplay: ansType === 'DATE' ? new Date(ans) : ans,

            }
          })

          console.log(temp)
          setAnswerData(temp)
        }
        setLoading(false)
      })
    } finally {
      setLoading(false)
    }
  }

  const getAllQuestion = async () => {
    const data = {
      query: {
        isActive: true,
      },
      options: {
        pagination: false,
        sort: { seq: 1 },
      },
    }
    setLoading(true)
    try {
      await commonApi({
        action: 'onBoardingQuestionGet',
        data,
      }).then(({ DATA }) => {
        if (DATA) {
          // console.log(JSON.stringify(DATA.data))
          setQuestionList(DATA.data)
        }
      })
    } finally {
      setLoading(false)
    }
  }


  const submitMedicalHistory = async () => {


    let allAnswersValid = true; // Initialize a flag to track if all answers are valid

    if (answerData.length !== 16) {
    //   for (let i = 0; i < answerData.length; i++) {
    //     const { ansIds, ansType, ans } = answerData[i];
    

    //     // if (isEmpty(ansIds) || 
    //     // (!isEmpty(ansType) && (ansType === "TEXT" || ansType === "DATE") && isEmpty(ans))) {

    //     // if (isEmpty(ansIds) || 
    //     //     (!isEmpty(ansType) && (ansType === "TEXT") && isEmpty(ans))) {
    //     //   allAnswersValid = false; // Set the flag to false if any answer is missing or invalid
    //     //   break; // Exit the loop early if an invalid answer is found
    //     // }
    //   }
    // } else {
      allAnswersValid = false; // Set the flag to false if the answerData length is not 16
    }
    
    if (!allAnswersValid) {
      return toast.error('Please answer all questions and enter your answers'); // Display an error if any answer is missing or invalid
    }
    


    try {
      const data = {
        onboardSteps: ONBOARDING_STEPS.MEDICAL,
        totalOnboardSteps: ONBOARDING_STEPS.TOTALONBOARDSTEPS,
        userId: user.id,
        answerData: _.uniqBy(answerData, 'quesId').map((item = {}) => {
          const data = item
          delete data.ansDisplay
          return { ...data }
        }),
      }
      setLoading(true)


      await commonApi({
        action: 'onBoardingAnswerSubmit',
        data,
      }).then(({ MESSAGE }) => {
        toast.success(MESSAGE)
        Router.push(routes.onbardLocation)
        setLoading(false)
      })
    }  finally {
      setLoading(false)
    }
  }

  const handleAnswerChange = (e, questionId, ansType) => {
    if (e.target.checked) {
      if (_.find(answerData, { quesId: questionId })) {
        setAnswerData(prev => {
          return prev.map(item => {
            if (item.quesId === questionId) {
              return {
                quesId: item.quesId,
                ansIds: [e.target.value],
                ansType,
              }
            } else {
              return item
            }
          })
        })
      } else {
        setAnswerData(prev => {
          return [
            ...prev,
            { quesId: questionId, ansIds: [e.target.value], ansType },
          ]
        })
      }
    } else {
      const tempAnswerData = _.find(answerData, { quesId: questionId })
      if (tempAnswerData.ansIds.length < 2) {
        setAnswerData(prev => {
          return prev.filter(dt => dt.quesId !== questionId)
        })
      } else {
        setAnswerData(prev => {
          return prev.map(item => {
            if (item.quesId === questionId) {
              if (item.ansIds.length > 1) {
                return {
                  quesId: item.quesId,
                  ansIds: item.ansIds.filter(ans => ans !== e.target.value),
                  ansType,
                }
              } else {
                return null
              }
            } else {
              return item
            }
          })
        })
      }
    }
  }

  const onChangeAnsType = (e, questionId, type) => {
    setAnswerData(prev => {
      return prev.map(item => {
        if (item.quesId === questionId) {
          return {
            ...item,
            ansDisplay: type === 'date' ? e : e.target.value,
            ans:
              type === 'date' ? moment(e).format('yyyy-MM-DD') : e.target.value,
          }
        } else {
          return item
        }
      })
    })
  }

  useEffect(() => {
    getAllQuestion()
  }, [])

  useEffect(() => {
    if (user) loadOnBoarding()
  }, [user])



  const formik = useFormik({
    initialValues: {
      refferalName: '',
    },
    validationSchema: Yup.object({
      refferalName: Yup.string()
        .trim('Referral name cannot include leading and trailing space.')
        .strict(true)
        .nullable() //.required('Please enter referral name.') 
        ,
    }),
    onSubmit: values => {
      submitMedicalHistory(values)
    },
  })

  return {
    formik, 
    loading,
    questionList,
    handleAnswerChange,
    answerData,
    submitMedicalHistory,
    onChangeAnsType,
  }
}

export default useMedicalHistory
