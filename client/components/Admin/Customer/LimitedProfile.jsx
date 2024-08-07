import useDropdown from '@/hooks/common/useDropdown'
import useCustomerActivity from '@/components/Admin/Customer/hooks/useCustomerActivity'
import useCustomerChartList from '@/components/Admin/Customer/hooks/useCustomerChartList'
import useMedicalAlertAndNote from '@/components/Admin/Customer/hooks/useMedicalAlertAndNote'
import useProfileCustomer from '@/components/Admin/User/hooks/useProfileCustomer'
import { APPOINTMENT_CHART_TYPE } from '@/utils/constant'
import { baseUrl } from '@/utils/helper'
import { referralInfo } from '@/utils/routes'
import EditIcon from '@/widget/image/EditIcon'
import EmailIcon from '@/widget/image/EmailIcon'
import PhoneIcon from '@/widget/image/PhoneIcon'
import Loader from '@/widget/loader'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const LimitedProfile = ({
  id,
  setUserData,
  customerData,
  setCustomerData,
  setID,
}) => {

  const {
    loading,
    formik,
    image,
    setImage,
    startDate,
    setStartDate,
    setOpen,
    prefixOptionsData,
    loadOptionsPrefix,
    defaultPrefixValue,
    setDefaultPrefixValue,
    genderOptionsData,
    setGenderOptionsData,
    loadOptionsGender,
    defaultGenderValue,
    setDefaultGenderValue,
    onClickCancel,
    userData,
    editData,
    setEditData,
    onBoardingDetail,
    onBoardingAnswer,
  } = useProfileCustomer({
    id,
    setUserData,
    customerData,
    setCustomerData,
    setID,
  })

  const { loading: loader, activityList } = useCustomerActivity({ id })

  const { loading: chartLoader, chartList } = useCustomerChartList({ id })

  const { notes = [] } = useMedicalAlertAndNote({ id })

  const {
    weight,
    height = {},
    emergencyContact,
    refferalInformation = {},
    aggravates,
    painScale,
    visitReason,
    discomfort,
  } = onBoardingDetail

  return (
    <>
      <div className='relative profile'>
          <div className='grid gap-5 mt-5 lg:grid-cols-2'>
            <div className=''>
              <div className='p-4 overview bg-primary rounded-xl'>
                <div className='flex items-center justify-between heading '>
                  <h3 className='font-semibold'>Overview</h3>

                  <a
                    onClick={() => setEditData(true)}
                    className='flex items-center justify-center w-10 h-10 transition rounded-lg bg-grayMid hover:bg-grayLight'>
                    <EditIcon className='w-4 h-4' color='#9CA3AF' />
                  </a>
                </div>
                <div className='grid gap-4 mt-4 sm:grid-cols-2'>
                  <div>
                    <h4 className='text-sm font-medium'>Full Name</h4>
                    <p className='mt-1 text-sm text-gray-400'>
                      {userData?.firstName + ' ' + userData?.lastName}
                    </p>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium'>Gender/Age</h4>
                    <p className='mt-1 text-sm text-gray-400'>
                      {userData?.dob
                        ? moment().diff(userData?.dob, 'years') + ' yr'
                        : '-'}
                      /{' '}
                      {userData?.genderId?.name
                        ? userData?.genderId?.name
                        : '-'}
                    </p>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium'>Email</h4>
                    <div className='flex items-center mt-1'>
                      <div className=' min-w-[20px]'>
                        <EmailIcon />
                      </div>
                      <p className='ml-2 text-sm text-gray-400 break-all'>
                        {userData?.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium'>Phone Number</h4>
                    <div className='flex items-center mt-1'>
                      <PhoneIcon />
                      <p className='ml-2 text-sm text-gray-400'>
                        {userData?.phone}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium'>Address</h4>
                    <div className='flex items-center mt-1'>
                      {userData?.addressIds?.[0]?.address ? (
                        <p className='text-sm text-gray-400'>
                          {userData?.addressIds?.[0]?.address?.addressLine1}{' '}
                          {userData?.addressIds?.[0]?.address?.addressLine2}{' '}
                          {userData?.addressIds?.[0]?.address?.cityNm}{' '}
                          {userData?.addressIds?.[0]?.address?.provinceNm}{' '}
                          {userData?.addressIds?.[0]?.address?.countryId?.name}{' '}
                          {userData?.addressIds?.[0]?.address?.postalCodeNm}
                        </p>
                      ) : (
                        <p className='text-sm text-gray-400'>-</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* overview */}
              {/* last-activity */}
              <div className='p-4 mt-4 last-activity bg-primary rounded-xl h-fit'>
                <div className='heading'>
                  <h3 className='mb-5 font-semibold'>Last Activity</h3>
                </div>
                {activityList.length === 0 ? (
                  <div className='flex items-center justify-center'>
                    No Recent Activity Found
                  </div>
                ) : (
                  <>
                    {activityList.slice(0, 3).map((activity = {}, i) => (
                      <>
                        <div
                          key={i}
                          className='p-4 my-2 rounded-lg intian-treatment bg-grayMid'>
                          <h6 className='text-sm font-semibold'>
                            {activity.activityName}
                          </h6>
                          <div className='flex items-center mt-1'>
                            <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>
                            <p className='text-sm text-gray-400'>
                              {moment(activity.updatedAt).format(
                                'DD MMMM YYYY'
                              )}
                            </p>
                          </div>
                        </div>
                      </>
                    ))}
                  </>
                )}

                {/* <div className='p-4 mt-3 rounded-lg intian-treatment bg-grayMid'>
                  <h6 className='text-sm font-semibold'>
                    Initial Treatment{' '}
                    <span className='font-normal text-gray-400'>with</span>{' '}
                    <a href='#' className='text-yellowBg'>
                      you
                    </a>
                  </h6>
                  <div className='flex items-center mt-1'>
                    <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>
                    <p className='text-sm text-gray-400'>22 February 2020</p>
                  </div>
                </div> */}
              </div>
              {/* /last-activity */}
              {/* Customer Information */}
              <div className='gap-8 p-4 mt-4 last-activity bg-primary rounded-xl h-fit'>
                <div className='heading'>
                  <h3 className='mb-5 font-semibold'>Customer Information</h3>

                  <div className='grid grid-cols-2 gap-4'>
                    <div className='mt-3'>
                      <h4 className='text-sm font-medium'>Height</h4>
                      <p className='mt-1 text-sm text-gray-400'>
                        {height.ft ? `${height.ft} ft - ${height.in}in` : ' -'}
                      </p>
                    </div>
                    <div className='mt-3'>
                      <h4 className='text-sm font-medium'>Weight</h4>
                      <p className='mt-1 text-sm text-gray-400'>
                        {weight ? `${weight} lbs` : '-'}
                      </p>
                    </div>
                    <div className='mt-3'>
                      <h4 className='text-sm font-medium'>Name</h4>
                      <p className='mt-1 text-sm text-gray-400'>
                        {emergencyContact?.name}
                      </p>
                    </div>
                    <div className='mt-3'>
                      <h4 className='text-sm font-medium'>Phone</h4>
                      <p className='mt-1 text-sm text-gray-400'>
                        {emergencyContact?.phone
                          ? `+${emergencyContact.phone}`
                          : '-'}
                      </p>
                    </div>
                    <div className='mt-3'>
                      <h4 className='text-sm font-medium'>Relation to you</h4>
                      <p className='mt-1 text-sm text-gray-400'>
                        {emergencyContact?.relationToYou}
                      </p>
                    </div>
                    <div className='mt-3'>
                      <h4 className='text-sm font-medium'>
                        Who reffered you (name)
                      </h4>
                      <p className='mt-1 text-sm text-gray-400'>
                        {refferalInformation?.refferalName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Customer Information */}
              
            </div>

            <div className=''>
              {/* chart */}
              <div className='p-4 mb-4 rounded-lg bg-primary'>
                <h1 className='mb-4'>Notes</h1>
                {notes.length === 0 ? (
                  <div className='flex items-center justify-center my-2'>
                    No Notes Found
                  </div>
                ) : (
                  notes.map((note = {}) => (
                    <>
                      {note.type === 'ALERT' ? (
                        <a
                          key={note.id}
                          className='relative flex items-center px-4 py-3 mt-4 text-sm font-semibold text-yellow-700 bg-yellow-100 rounded-lg note1 '>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-7 w-7'
                            viewBox='0 0 20 20'
                            fill='#EFB100'>
                            <path
                              fillRule='evenodd'
                              d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                              clipRule='evenodd'></path>
                          </svg>
                          <span className='ml-3'>{note.desc}</span>
                        </a>
                      ) : (
                        <a
                          key={note.id}
                          className='relative flex items-center px-4 py-3 mt-4 text-sm font-semibold text-green-700 bg-green-100 rounded-lg note1'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-7 w-7'
                            viewBox='0 0 20 20'
                            fill='#15803D'>
                            <path d='M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z'></path>
                            <path d='M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z'></path>
                          </svg>
                          <span className='ml-3'>NOTE : {note.desc}</span>
                        </a>
                      )}
                    </>
                  ))
                )}
              </div>
              <div className='p-4 chart bg-primary rounded-xl h-fit'>
                <div className='flex items-center justify-between mb-5 heading'>
                  <h3 className='font-semibold '>Chart</h3>
                </div>
                {chartList.length === 0 ? (
                  <div className='flex items-center justify-center'>
                    No Chart Found
                  </div>
                ) : (
                  <>
                    {chartList.slice(0, 3).map((chart = {}) => (
                      <div
                        key={chart.id}
                        className='p-4 my-2 rounded-lg intian-treatment bg-grayMid'>
                        <div className='flex flex-col justify-between gap-y-1 sm:flex-row sm:items-center'>
                          <h6 className='order-2 text-sm font-semibold sm:order-1'>
                            {moment(chart.createdAt).format('MMM DD, YYYY')}{' '}
                          </h6>
                          <div className='flex items-center order-1 sm:order-2'>
                            <a className='chart-profile flex gap-1.5 items-center'>
                              <img
                                src={
                                  baseUrl + chart.chiroId?.profile_image?.uri
                                }
                                className='w-6 h-6 rounded-full'
                                alt='Snapcrack'
                              />
                              <p className='text-sm'>
                                {' '}
                                {chart.createdBy?.firstName +
                                  ' ' +
                                  chart.createdBy?.lastName}
                              </p>
                            </a>
                          </div>
                        </div>
                        <div className='mt-1'>
                          <p className='text-sm text-gray-400'>
                            {chart.type === APPOINTMENT_CHART_TYPE.SOAP
                              ? chart.objective
                              : chart.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              {/* Aggravates  */}
              <div className='grid grid-cols-2 gap-8 p-4 mt-4 last-activity bg-primary rounded-xl h-fit'>
                <div className='heading'>
                  <h3 className='mb-5 font-semibold'>What aggravates this?</h3>

                  <div className=''>
                    <div className='mt-3'>
                      <h4 className='mb-3 text-sm font-medium'>
                        What aggravates this condition?
                      </h4>
                      <div className='grid gap-3 '>
                        {aggravates &&
                          aggravates.map(desc => (
                            <p className='mt-1 text-sm text-gray-400'>
                              {desc.name}
                            </p>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className='mb-5 font-semibold'>Reason for visit</h3>

                  <div>
                    <div className='mt-3'>
                      <h4 className='text-sm font-medium'>
                        Main reason for this visit?
                      </h4>
                      {visitReason &&
                        visitReason.map(desc => (
                          <p className='mt-1 text-sm text-gray-400'>
                            {desc.name}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
                <div className='heading '>
                  <h3 className='mb-5 font-semibold'>Pain Scale</h3>

                  <div className=''>
                    <div className='mt-3'>
                      <h4 className='text-sm font-medium'>
                        Rate the severity of your discomfort at it’s worst, on a
                        scale of 1 - 10
                      </h4>
                      <p className='mt-1 text-sm text-gray-400'>{painScale}</p>
                    </div>
                  </div>
                </div>
                <div className=''>
                  <h3 className='mb-5 font-semibold'>
                    Describe your discomfort
                  </h3>

                  <div className=''>
                    <div className='mt-3'>
                      <h4 className='text-sm font-medium'>
                        What term(s) describes your discomfort best?
                      </h4>
                      {discomfort &&
                        discomfort.map(desc => (
                          <p className='mt-1 text-sm text-gray-400'>
                            {desc.name}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Aggravates */}
              {/* Medical History  */}
              <div className='p-4 mt-4 last-activity bg-primary rounded-xl h-fit'>
                <div className='heading'>
                  <h3 className='mb-5 font-semibold'>Medical History</h3>

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
              {/* Medical History */}
              {/* /chart */}
            </div>
          </div>
       
        {(loader || chartLoader) && <Loader customClass='absolute' />}
      </div>
    </>
  )
}

export default LimitedProfile
