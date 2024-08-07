import React from 'react'
import { isEmpty } from 'lodash'
import ReactHtmlParser from 'react-html-parser'
import useProfileCustomer from '@/components/Admin/User/hooks/useProfileCustomer'
import Loader from '@/widget/loader'

const MedicalHistory = ({
  id,
  setUserData,
  setUser
}) => {

  const {
    loading,
    onBoardingAnswer,
  } = useProfileCustomer({
    id,
    setUserData,
  })


  return (
    <>
      <div className='p-5 history'>
        <h3 className='font-semibold'>Medical History</h3>

        <div className=''>
          {!isEmpty(onBoardingAnswer) &&
            onBoardingAnswer.map(item => (
              <div className='mt-1'>
                <h4 className='text-sm font-medium'>
                  {ReactHtmlParser(item.quesTitle)}
                </h4>
                <p className='mt-1 text-sm text-gray-400'>
                  {ReactHtmlParser(item.ansById)}
                </p>
                <p className='mt-1 text-sm text-gray-400'>
                  {item.ans &&
                    `${item.ansType === 'DATE' ? 'Date:' : ''} ${item.ans
                    }`}
                </p>
              </div>
            ))}

          {(loading) && <Loader customClass='inherit' />}

        </div>
      </div>
    </>
  )
}

export default MedicalHistory
