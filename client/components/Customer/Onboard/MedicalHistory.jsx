import useMedicalHistory from '@/components/Customer/Onboard/hooks/useMedicalHistory'
import _, { isEmpty } from 'lodash'
import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ReactHtmlParser from 'react-html-parser'
import ServiceHeader from '@/components/Layout/Header/ServiceHeader'
import Link from 'next/link'
import routes from '@/utils/routes'
import { Button } from '@/components/AppUi/Form/Button'
import Checkbox from '@/components/AppUi/Form/Checbbox'

const MedicalHistory = user => {
  const {
    formik,
    questionList,
    handleAnswerChange,
    answerData,
    submitMedicalHistory,
    onChangeAnsType,
  } = useMedicalHistory({
    userData: user,
  })

  const [isSnapCrackMobile, setIsSnapCrackMobile] = useState(false)

  useEffect(() => {
    // Check if user agent is SnapCrack Mobile
    const userAgent = navigator.userAgent.toLowerCase()
    setIsSnapCrackMobile(userAgent.includes('snapcrack_mobile'))
  }, [])


  function formatDate (date) {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' }
    return date.toLocaleDateString('en-US', options).replace(/\//g, ' ') // Replace slashes with spaces
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <div className='flex flex-col h-screen overflow-y-auto registration-form-main'>
          <ServiceHeader />
          <div className='w-full max-w-3xl p-5 mx-auto sm:p-9 sm:pb-10'>
            <div className='pb-5 mb-5 border-b border-gray-600 reg-form'>
              <div className='all-steps'>
                <div className='flex items-center justify-between gap-3'>
                  <h3 className='text-xl font-medium'>Onboarding</h3>
                  <p className='text-sm text-gray-400'>STEP 3/5</p>
                </div>
                <div className='grid w-full h-1 grid-cols-8 mt-2 mb-6 rounded-full bg-grayMid'>
                  <div className='h-full col-span-8 rounded-full bg-yellowBg'></div>
                </div>
              </div>
              <h3 className='mb-2 text-2xl font-semibold text-white'>
                Medical History
              </h3>
              <p className='max-w-xl mb-4 text-sm text-gray-400'>
                Please fill out as accurately as possible.
              </p>
              <div className='mt-6 history-checkbox'>
                {!isEmpty(questionList) &&
                  questionList.map((question = {}, index) => {
                    const { title = '', options = [] } = question
                    const tempQues =
                      _.find(answerData, {
                        quesId: question._id,
                      }) || []
                    return (
                      <div className='mt-6' key={index}>
                        <p className='mb-4 text-sm text-gray-400'>
                          {ReactHtmlParser(title)}
                        </p>
                        <div className='grid gap-2'>
                          {!isEmpty(options) &&
                            options.map((opt, index) => {
                              const { desc, ansType = '', _id: value } = opt
                              return (
                                <Checkbox
                                  key={index}
                                  id={value}
                                  desc={desc}
                                  value={value}
                                  checked={tempQues.ansIds?.includes(value)}
                                  onChange={e =>
                                    handleAnswerChange(e, question._id, ansType)
                                  }
                                />
                                // <label
                                //   key={index}
                                //   htmlFor={value}
                                //   className='flex items-center gap-2 text-sm text-gray-400'>
                                //   <div className='relative flex items-center gap-2'>
                                //     <input
                                //       id={value}
                                //       type='checkbox'
                                //       name={desc}
                                //       value={value}
                                //       onChange={e =>
                                //         handleAnswerChange(
                                //           e,
                                //           question._id,
                                //           ansType
                                //         )
                                //       }
                                //       checked={tempQues.ansIds?.includes(value)}
                                //     />
                                //     <div className='checkmark'></div>
                                //     <div className='label'>
                                //       {desc}
                                //     </div>
                                //   </div>
                                // </label>
                              )
                            })}
                          {tempQues.ansType === 'TEXT' ? (
                            <div>
                              <input
                                placeholder='Enter Details'
                                type='text'
                                className='w-[40%] px-3 py-2 appearance-none block rounded-md shadow-sm focus:outline-none focus:ring-2 text-md leading-4 mt-2'
                                value={tempQues.ansDisplay}
                                onChange={e =>
                                  onChangeAnsType(e, tempQues.quesId, 'text')
                                }
                              />
                            </div>
                          ) : tempQues.ansType === 'DATE' ? (
                            <>
                              {isSnapCrackMobile ? (
                                  <input
                                    type='date'
                                    value={
                                      tempQues.ans instanceof Date
                                        ? tempQues.ans.toLocaleDateString(
                                            'en-US',
                                            {
                                              month: '2-digit',
                                              day: '2-digit',
                                              year: 'numeric',
                                            }
                                          )
                                        : tempQues.ans
                                    }
                                    onChange={e =>
                                      onChangeAnsType(
                                        e.target.value,
                                        tempQues.quesId,
                                        'date'
                                      )
                                    }
                                    className='w-[40%] px-3 py-2 appearance-none block rounded-md shadow-sm focus:outline-none focus:ring-2 text-md leading-4 mt-2'
                                  />
                              ) : (
                                  <DatePicker
                                    placeholderText='Enter date'
                                    selected={tempQues.ansDisplay}
                                    onChange={date =>
                                      onChangeAnsType(
                                        date,
                                        tempQues.quesId,
                                        'date'
                                      )
                                    }
                                    dateFormat='MMMM d, yyyy'
                                    className='w-[40%] px-3 py-2 appearance-none block rounded-md shadow-sm focus:outline-none focus:ring-2 text-md leading-4 mt-2'
                                  />
                              )}
                            </>
                          ) : null}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
            <div className='flex items-center gap-6 pt-5 mt-5'>
              <Link href={routes.onbardReferralInfo}>
                <span className='block w-full p-2 text-sm text-center text-gray-200 transition bg-transparent border border-gray-700 rounded-md cursor-pointer focus:outline-none hover:bg-gray-800 hover:border-gray-400'>
                  Back
                </span>
              </Link>

              <Button
                kind={'primary'}
                type='submit'
                text='Next'
                onClick={() => submitMedicalHistory}
                // text={formik.isSubmitting ? 'Please wait...' : 'Next'}
                // isDisabled={formik.isSubmitting || !formik.dirty}
                // isLoading={formik.isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default MedicalHistory
