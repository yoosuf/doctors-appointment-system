import React, { useEffect } from 'react'
import useCreateDailyIntake from '@/components/Desk/Appointment/hooks/useCreateDailyIntake'
import moment from 'moment'
import { customStyles } from '@/utils/helper'
import AsyncSelect from 'react-select/async'
import SnapCrackButton from '@/widget/common-button'
import Loader from '@/widget/loader'
import CloseIcon from '@/widget/image/CloseIcon'
import PrivacyFillcon from 'icons/PrivacyFillcon'
import Avatar from '@/components/AppUi/User/Avatar'

const AddDailyIntakeChart = ({ appointmentDetail, listAllChart }) => {
  const {
    closeBtn,
    onClickPainLevel,
    onClickCSProblem,
    onClickTSProblem,
    onClickLSProblem,
    onClickSLProblem,
    onClickShoulderProblem,
    onClickWristProblem,
    onClickAnklesProblem,
    onClickKempsProblem,
    onClickSLRProblem,
    onClicksetCervicalCompressionProblem,
    setNotVisiblePatient,
    onChangeBloodPressure,
    onChangeExtraNote,
    chartTemplateData,
    painLevel,
    chartCsValue,
    chartTsValue,
    chartLsValue,
    chartSLValue,
    chartShoulderValue,
    chartWristValue,
    chartAnklesValue,
    chartKempsValue,
    chartSLRValue,
    chartCervicalCompressionValue,
    textareaValue,
    notVisiblePatient,
    viewableOptions,
    asyncSelectRefViewable,
    formik,
    loading,
    bloodPressure,
    extraNote
  } = useCreateDailyIntake({
    appointmentDetail,
    listAllChart
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <section
          id='addDailyIntakeChartModal'
          className='fixed inset-0 z-10 overflow-hidden text-sm activity-modal-main'
          aria-labelledby='slide-over-title'
          role='dialog'
          aria-modal='true'>
          <div className='absolute inset-0 overflow-hidden'>
            <div
              className='absolute inset-0 transition-opacity bg-black black-layer'
              aria-hidden='true'
              onClick={(e) => {
                e.preventDefault();
                closeBtn()
              }}></div>

            <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal'>
              <div className='w-screen max-w-4xl'>
                <div className='flex flex-col h-full shadow-xl bg-primary'>
                  <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                    <div className='flex-bet'>
                      <div>
                        <h2
                          className='text-base font-medium'
                          id='slide-over-title'>
                          Add Chart
                        </h2>
                      </div>
                      <div className='flex items-center ml-3 h-7'>
                        <a
                          href='#'
                          className='focus:outline-none'
                          onClick={(e) => {
                            e.preventDefault();
                            closeBtn()
                          }}>
                          <span className='sr-only'>Close panel</span>
                          <CloseIcon />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className='relative flex-1 modal-body '>
                    <div className='flex flex-wrap items-center justify-between gap-3 px-4 pt-2 pb-4 bg-grayMid sm:px-5'>
                      <div className='flex items-center gap-2 '>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-5 h-5'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='#9CA3AF'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'></path>
                        </svg>
                        <h4>{moment().format('MMM DD, yyyy')}</h4>
                      </div>

                      <div className='flex items-center gap-3'>

                        <div className='relative miami-dropdown'>
                          <div className='flex items-center gap-2 chart-profile'>



                            <Avatar
                              imageUrl={appointmentDetail?.patientId?.profile_image?.uri}
                              userType={`Patient`}
                              size={`h-6 w-6`}
                            />

                            <span>
                              {appointmentDetail?.patientId?.firstName}{' '}
                              {appointmentDetail?.patientId?.lastName}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='p-5'>
                      <h3 className='mb-4 text-base font-medium'>
                        Daily Intake
                      </h3>



                      <div className='pain-level'>
                        <p className='mb-3'>{chartTemplateData?.[0]?.label}*</p>
                        <div className='flex-wrap gap-3 flex-ver'>
                          {chartTemplateData?.[0]?.options?.map((number, index) => (
                            <label
                              key={index}
                              className='overflow-hidden text-gray-400 border rounded-lg cursor-pointer Pain-num border-grayLight'>
                              <input
                                type='radio'
                                name='painLevel'
                                id={`painLevel_${number._id}`}
                                value={number._id}
                                checked={painLevel?.optionIds?.[0] === number._id}
                                onChange={(e) =>
                                  onClickPainLevel(
                                    e,
                                    chartTemplateData?.[0]?._id,
                                    number._id,
                                    number.name
                                  )
                                }
                                className='sr-only' // This class is used to hide the radio input but still make it accessible
                                aria-label={number.name}
                                aria-checked={painLevel?.optionIds?.[0] === number._id}
                              />
                              <div
                                className={`${painLevel?.optionIds?.[0] === number._id
                                  ? 'bg-yellowBg text-black'
                                  : 'bg-grayMid'
                                  } py-1.5 px-3 rounded-md`}>
                                <span>{number.name}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/*  */}

                      <div className='flex-wrap col-span-12 gap-8 my-3 flex-ver'>

                        {/*  */}
                        <div className=''>
                          <p className='mb-3'>
                            {chartTemplateData?.[1]?.label}
                          </p>
                          <div className='gap-3 flex-ver'>
                            {chartTemplateData?.[1]?.options?.map(data => {
                              return (
                                <label
                                  key={data._id}
                                  className='inline-block overflow-hidden text-gray-400 border rounded-lg cursor-pointer Pain-num border-grayLight'
                                  aria-label={data.name}
                                  tabIndex={data._id}
                                  onClick={e => onClickCSProblem(e, data._id, chartTemplateData?.[1]?._id, data.name)}>
                                  <input
                                    type='checkbox'
                                    className='hidden'
                                    checked={chartCsValue.optionIds.includes(data._id)}
                                    readOnly
                                    aria-hidden='true'
                                    aria-checked={chartCsValue.optionIds.includes(data._id) ? 'true' : 'false'}
                                    {...formik.getFieldProps(`dailyIntakechart.${data._id}`)}
                                  />
                                  <div
                                    className={`${chartCsValue.optionIds.includes(data._id)
                                      ? 'bg-yellowBg text-black'
                                      : 'bg-grayMid'
                                      } py-1.5 px-3 rounded-md`}>
                                    <p>{data?.name}</p>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>



                        {/*  */}

                        <div className=''>
                          <p className='mb-3'>
                            {chartTemplateData?.[2]?.label}
                          </p>
                          <div className='gap-3 flex-ver'>
                            {chartTemplateData?.[2]?.options?.map(data => {
                              return (
                                <label
                                  key={data._id}
                                  className='inline-block overflow-hidden text-gray-400 border rounded-lg cursor-pointer Pain-num border-grayLight'
                                  aria-label={data.name}
                                  tabIndex={data._id}
                                  onClick={e => onClickTSProblem(e, data._id, chartTemplateData?.[2]?._id, data.name)}>
                                  <input
                                    type='checkbox'
                                    className='hidden'
                                    checked={chartTsValue.optionIds.includes(data._id)}
                                    readOnly
                                    aria-hidden='true'
                                    aria-checked={chartTsValue.optionIds.includes(data._id) ? 'true' : 'false'}
                                  />
                                  <div
                                    className={`${chartTsValue.optionIds.includes(data._id)
                                      ? 'bg-yellowBg text-black'
                                      : 'bg-grayMid'
                                      } py-1.5 px-3 rounded-md`}>
                                    <p>{data?.name}</p>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                        {/*  */}




                        <div className=''>
                          <p className='mb-3'>
                            {chartTemplateData?.[3]?.label}
                          </p>
                          <div className='gap-3 flex-ver'>
                            {chartTemplateData?.[3]?.options?.map(data => {
                              return (
                                <label
                                  key={data._id}
                                  className='inline-block overflow-hidden text-gray-400 border rounded-lg cursor-pointer Pain-num border-grayLight'
                                  aria-label={data.name}
                                  tabIndex='0'
                                  role='checkbox'
                                  onClick={e => onClickLSProblem(e, data._id, chartTemplateData?.[3]?._id, data.name)}>
                                  <input
                                    type='checkbox'
                                    className='hidden'
                                    checked={chartLsValue.optionIds.includes(data._id)}
                                    readOnly
                                    aria-hidden='true'
                                    aria-checked={chartLsValue.optionIds.includes(data._id) ? 'true' : 'false'}
                                  />
                                  <div
                                    className={`${chartLsValue.optionIds.includes(data._id)
                                      ? 'bg-yellowBg text-black'
                                      : 'bg-grayMid'
                                      } py-1.5 px-3 rounded-md`}>
                                    <p>{data?.name}</p>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                        {/*  */}

                      </div>

                      {/*  */}
                      <div className='flex-wrap col-span-12 gap-8 flex-ver'>

                        {/*  */}
                        <div className=''>
                          <p className='mb-3'>
                            {chartTemplateData?.[4]?.label}
                          </p>
                          <div className='gap-3 flex-ver'>
                            {chartTemplateData?.[4]?.options?.map(data => {
                              return (
                                <label
                                  key={data._id}
                                  className='inline-block overflow-hidden text-gray-400 border rounded-lg cursor-pointer Pain-num border-grayLight'
                                  aria-label={data.name}
                                  tabIndex='0'
                                  role='checkbox'
                                  onClick={e => onClickSLProblem(e, data._id, chartTemplateData?.[4]?._id, data.name)}>
                                  <input
                                    type='checkbox'
                                    className='hidden'
                                    checked={chartSLValue.optionIds.includes(data._id)}
                                    readOnly
                                    aria-hidden='true'
                                    aria-checked={chartSLValue.optionIds.includes(data._id) ? 'true' : 'false'}
                                  />
                                  <div
                                    className={`${chartSLValue.optionIds.includes(data._id)
                                      ? 'bg-yellowBg text-black'
                                      : 'bg-grayMid'
                                      } py-1.5 px-3 rounded-md`}>
                                    <p>{data?.name}</p>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                        {/* */}


                        <div className=''>
                          <p className='mb-3'>
                            {chartTemplateData?.[5]?.label}
                          </p>
                          <div className='gap-3 flex-ver'>
                            {chartTemplateData?.[5]?.options?.map(data => {
                              return (
                                <label
                                  key={data._id}
                                  className='inline-block overflow-hidden text-gray-400 border rounded-lg cursor-pointer Pain-num border-grayLight'
                                  aria-label={data.name}
                                  tabIndex='0'
                                  role='checkbox'
                                  onClick={e => onClickShoulderProblem(e, data._id, chartTemplateData?.[5]?._id, data.name)}>
                                  <input
                                    type='checkbox'
                                    className='hidden'
                                    checked={chartShoulderValue.optionIds.includes(data._id)}
                                    readOnly
                                    aria-hidden='true'
                                    aria-checked={chartShoulderValue.optionIds.includes(data._id) ? 'true' : 'false'}
                                  />
                                  <div
                                    className={`${chartShoulderValue.optionIds.includes(data._id)
                                      ? 'bg-yellowBg text-black'
                                      : 'bg-grayMid'
                                      } py-1.5 px-3 rounded-md`}>
                                    <p>{data?.name}</p>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/*  */}
                        <div className=''>
                          <p className='mb-3'>
                            {chartTemplateData?.[6]?.label}
                          </p>
                          <div className='gap-3 flex-ver'>

                            {chartTemplateData?.[6]?.options?.map(data => {
                              return (
                                <label
                                  key={data._id}
                                  className='inline-block overflow-hidden text-gray-400 border rounded-lg cursor-pointer Pain-num border-grayLight'
                                  aria-label={data.name}
                                  tabIndex='0'
                                  role='checkbox'
                                  onClick={e => onClickWristProblem(e, data._id, chartTemplateData?.[6]?._id, data.name)}>
                                  <input
                                    type='checkbox'
                                    className='hidden'
                                    checked={chartWristValue.optionIds.includes(data._id)}
                                    readOnly
                                    aria-hidden='true'
                                    aria-checked={chartWristValue.optionIds.includes(data._id) ? 'true' : 'false'}
                                  />
                                  <div
                                    className={`${chartWristValue.optionIds.includes(data._id)
                                      ? 'bg-yellowBg text-black'
                                      : 'bg-grayMid'
                                      } py-1.5 px-3 rounded-md`}>
                                    <p>{data?.name}</p>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                        {/*  */}

                        <div className=''>
                          <p className='mb-3'>
                            {chartTemplateData?.[7]?.label}
                          </p>
                          <div className='gap-3 flex-ver'>

                            {chartTemplateData?.[7]?.options?.map(data => {
                              return (
                                <label
                                  key={data._id}
                                  className='inline-block overflow-hidden text-gray-400 border rounded-lg cursor-pointer Pain-num border-grayLight'
                                  aria-label={data.name}
                                  tabIndex='0'
                                  role='checkbox'
                                  onClick={e => onClickAnklesProblem(e, data._id, chartTemplateData?.[7]?._id, data.name)}>
                                  <input
                                    type='checkbox'
                                    className='hidden'
                                    checked={chartAnklesValue.optionIds.includes(data._id)}
                                    readOnly
                                    aria-hidden='true'
                                    aria-checked={chartAnklesValue.optionIds.includes(data._id) ? 'true' : 'false'}

                                  />
                                  <div
                                    className={`${chartAnklesValue.optionIds.includes(data._id)
                                      ? 'bg-yellowBg text-black'
                                      : 'bg-grayMid'
                                      } py-1.5 px-3 rounded-md`}>
                                    <p>{data?.name}</p>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/*  */}

                        <div className=''>
                          <p className='mb-3'>
                            {chartTemplateData?.[8]?.label}
                          </p>
                          <div className='gap-3 flex-ver'>

                            {chartTemplateData?.[8]?.options?.map(data => {
                              return (
                                <label
                                  key={data._id}
                                  className='inline-block overflow-hidden text-gray-400 border rounded-lg cursor-pointer Pain-num border-grayLight'
                                  aria-label={data.name}
                                  tabIndex='0'
                                  role='checkbox'
                                  onClick={e => onClickKempsProblem(e, data._id, chartTemplateData?.[8]?._id, data.name)}>
                                  <input
                                    type='checkbox'
                                    className='hidden'
                                    checked={chartKempsValue.optionIds.includes(data._id)}
                                    readOnly
                                    aria-hidden='true'
                                    aria-checked={chartKempsValue.optionIds.includes(data._id) ? 'true' : 'false'}
                                  />
                                  <div
                                    className={`${chartKempsValue.optionIds.includes(data._id)
                                      ? 'bg-yellowBg text-black'
                                      : 'bg-grayMid'
                                      } py-1.5 px-3 rounded-md`}>
                                    <p>{data?.name}</p>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/*  */}



                        <div className=''>
                          <p className='mb-3'>
                            {chartTemplateData?.[9]?.label}
                          </p>
                          <div className='gap-3 flex-ver'>

                            {chartTemplateData?.[9]?.options?.map(data => {
                              return (
                                <label
                                  key={data._id}
                                  className='inline-block overflow-hidden text-gray-400 border rounded-lg cursor-pointer Pain-num border-grayLight'
                                  aria-label={data.name}
                                  tabIndex='0'
                                  role='checkbox'
                                  onClick={e => onClickSLRProblem(e, data._id, chartTemplateData?.[9]?._id, data.name)}>
                                  <input
                                    type='checkbox'
                                    className='hidden'
                                    checked={chartSLRValue.optionIds.includes(data._id)}
                                    readOnly
                                    aria-hidden='true'
                                    aria-checked={chartSLRValue.optionIds.includes(data._id) ? 'true' : 'false'}
                                  />
                                  <div
                                    className={`${chartSLRValue.optionIds.includes(data._id)
                                      ? 'bg-yellowBg text-black'
                                      : 'bg-grayMid'
                                      } py-1.5 px-3 rounded-md`}>
                                    <p>{data?.name}</p>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>


                        <div className=''>
                          <p className='mb-3'>
                            {chartTemplateData?.[10]?.label}
                          </p>
                          <div className='gap-3 flex-ver'>

                            {chartTemplateData?.[10]?.options?.map(data => {
                              return (
                                <label
                                  key={data._id}
                                  className='inline-block overflow-hidden text-gray-400 border rounded-lg cursor-pointer Pain-num border-grayLight'
                                  aria-label={data.name}
                                  tabIndex='0'
                                  role='checkbox'
                                  onClick={e => onClicksetCervicalCompressionProblem(e, data._id, chartTemplateData?.[10]?._id, data.name)}>
                                  <input
                                    type='checkbox'
                                    className='hidden'
                                    checked={chartCervicalCompressionValue.optionIds.includes(data._id)}
                                    readOnly
                                    aria-hidden='true'
                                    aria-checked={chartCervicalCompressionValue.optionIds.includes(data._id) ? 'true' : 'false'}

                                  />
                                  <div
                                    className={`${chartCervicalCompressionValue.optionIds.includes(data._id)
                                      ? 'bg-yellowBg text-black'
                                      : 'bg-grayMid'
                                      } py-1.5 px-3 rounded-md`}>
                                    <p>{data?.name}</p>
                                  </div>
                                </label>
                              );
                            })}


                          </div>
                        </div>
                        {/*  */}

                      </div>
                      <div className='mt-3'>
                        <p className='mb-4 text-base font-medium'>
                          Assessment : Intersegmental dysfunction/wellness care
                        </p>
                      </div>

                      <div className='mt-3'>
                        <p className='mb-3'>
                          Blood Pressure
                        </p>
                        <input
                          id='blood_pressure'
                          placeholder='Blood pressure'
                          value={bloodPressure}
                          onChange={onChangeBloodPressure}
                          className='w-full p-2 bg-transparent border rounded-lg border-grayMid'
                          name='blood_pressure' />
                      </div>

                      <div className='mt-3'>
                        <p className='mb-3'>
                          Note
                          <span className='pl-0.5'>*</span>
                        </p>
                        <textarea
                          rows='2'
                          id='notes'
                          placeholder='Notes..'
                          disabled={true}
                          {...formik.getFieldProps('notes')}
                          className='w-full p-2 bg-transparent border rounded-lg border-grayMid'
                          name='notes'></textarea>
                        {formik.touched.notes && formik.errors.notes ? (
                          <div className='pt-1 pl-1 text-xs text-redAlert'>
                            {formik.errors.notes}
                          </div>
                        ) : null}
                      </div>

                      <div className='mt-3'>
                        <p className='mb-3'>
                          Other
                        </p>
                        <textarea
                          rows='2'
                          id='extra_note'
                          placeholder='Other..'
                          value={extraNote}
                          onChange={onChangeExtraNote}
                          className='w-full p-2 bg-transparent border rounded-lg border-grayMid'
                          name='extra_note'></textarea>
                      </div>

                      {/* <div className='mt-3'>
                        <p className='mb-3'>
                          Notes
                          <span className='pl-0.5'>*</span>
                        </p>
                        <textarea
                          defaultValue={textareaValue}
                          rows='4'
                          id='notes'
                          className='w-full p-2 bg-transparent border rounded-lg border-grayMid'
                          {...formik.getFieldProps('notes')}
                        />
                        {formik.touched.notes && formik.errors.notes ? (
                          <div className='pt-1 pl-1 text-xs text-redAlert'>
                            {formik.errors.notes}
                          </div>
                        ) : null}
                      </div> */}

                      {/*
                      <div className='mt-3'>
                        <p className='mb-3'>
                          Other
                          <span className='pl-0.5'>*</span>
                        </p>
                        <textarea
                          defaultValue={textareaValue}
                          rows='4'
                          id='other'
                          className='w-full p-2 bg-transparent border rounded-lg border-grayMid'
                          {...formik.getFieldProps('other')}
                        />
                        {formik.touched.other && formik.errors.other ? (
                          <div className='pt-1 pl-1 text-xs text-redAlert'>
                            {formik.errors.other}
                          </div>
                        ) : null}
                      </div>
                    */}
                      {/* <div className='flex flex-wrap items-baseline justify-between gap-3 '> */}
                      <div className='grid items-center grid-cols-12 gap-3 mt-3'>
                        <div className='col-span-12 md:col-span-6'>
                          <AsyncSelect
                            styles={customStyles}
                            ref={asyncSelectRefViewable}
                            isSearchable={false}
                            cacheOptions
                            className='text-sm'
                            placeholder={'Viewable By Chiro'}
                            id='viewableByEveryoneId'
                            defaultOptions={viewableOptions}
                            filterOption={() => true}
                            onChange={data => {
                              formik.setFieldValue(
                                'viewableByEveryoneId',
                                data?.value
                              )
                            }}
                          />
                          {formik.touched.viewableByEveryoneId &&
                            formik.errors.viewableByEveryoneId ? (
                            <div className='pt-1 pl-1 text-xs text-redAlert'>
                              {formik.errors.viewableByEveryoneId}
                            </div>
                          ) : null}
                        </div>
                        <button
                          type='button'
                          onClick={e =>
                            setNotVisiblePatient(!notVisiblePatient)
                          }
                          className={`col-span-8 md:col-span-3 py-2 px-3 Pain-num overflow-hidden cursor-pointer rounded-lg inline-block ${notVisiblePatient
                            ? 'border-grayLight text-gray-400 border'
                            : 'bg-yellowBg text-black'
                            }`}>
                          {!notVisiblePatient
                            ? 'Visible To Patient'
                            : 'Not Visible To Patient'}
                        </button>
                        <SnapCrackButton
                          type='submit'
                          className='flex items-center justify-center col-span-4 px-4 py-2 text-sm font-medium text-center text-black transition rounded-lg md:col-span-3 bg-yellowBg hover:bg-yellow-400'
                          text={
                            <>
                              Sign
                              <PrivacyFillcon />
                            </>
                          }
                        />
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                  {loading && <Loader customClass='absolute' />}
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  )
}

export default React.memo(AddDailyIntakeChart)