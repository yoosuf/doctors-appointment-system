import React from 'react'
import { isEmpty } from 'lodash'
import ReactHtmlParser from 'react-html-parser'
import useProfileCustomer from '@/components/Admin/User/hooks/useProfileCustomer'

const UserHistory = ({
  id,
  setUserData
}) => {

  const {
    onBoardingAnswer,
  } = useProfileCustomer({
    id,
    setUserData
  })

  
  return (
    <>
      <div className='relative profile'>
        <div className='grid gap-5 mt-5 lg:grid-cols-1'>
            <div className='p-4 mt-4 last-activity bg-primary rounded-xl h-fit'>
              <div className='heading'>
                <h3 className='mb-5 font-semibold'>Medical History</h3>
              </div>

              <div className=''>
                  {!isEmpty(onBoardingAnswer) &&
                    onBoardingAnswer.map(item => (
                      <div className='mt-3'>
                        <h4 className='text-sm font-medium'>
                          {ReactHtmlParser(item.quesTitle)}
                        </h4>
                        <p className='mt-1 text-sm text-gray-400'>
                          {ReactHtmlParser(item.ansById)}
                        </p>
                        <p className='mt-1 text-sm text-gray-400'>
                          {item.ans &&
                            `${item.ansType === 'DATE' ? 'Date:' : ''} ${
                              item.ans
                            }`}
                        </p>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
export default UserHistory
