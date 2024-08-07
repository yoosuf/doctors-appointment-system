import React, { useEffect, useState, useRef } from 'react'
import useNurseSOAP from '@/components/Desk/Appointment/hooks/useNurseSOAP'
import SnapCrackButton from '@/widget/common-button'
import PrivacyFillcon from 'icons/PrivacyFillcon'
import Loader from '@/widget/loader'
import Select from 'react-select'
import { customStyles } from '@/utils/helper'
import { InputField } from '@/components/AppUi/Form/InputField'
import { RadioGroupField } from '@/components/AppUi/Form/RadioGroup'
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/solid'

const NurseSOAP = ({
  isOpen,
  servicesToServe,
  appointmentDetail,
  chartData,
  listAllChart = () => {},
  closeModal,
}) => {

  const modalRef = useRef(null);

  const { loading, editID, formik, iVArray, injectioArray } = useNurseSOAP({
    servicesToServe,
    appointmentDetail,
    chartData,
    closeModal,
    listAllChart,
  })

  const extractIds = dataArray => {
    return dataArray.map(({ _id, name, items }) => ({ _id, name, items }))
    // return dataArray;
  }



  useEffect(() => {
    console.log(`injections`, formik.values)

  }, [])


  

  return (
    <form onSubmit={formik.handleSubmit}>
      <section
        className={`fixed inset-0 z-10 overflow-hidden text-sm activity-modal-main ${
          isOpen ? 'active' : ''
        }`}
        aria-labelledby='slide-over-title'
        role='dialog'
        aria-modal='true'>
        <div className='absolute inset-0 overflow-hidden'>
          <div
            className='absolute inset-0 transition-opacity bg-black black-layer'
            aria-hidden='true'></div>
          {/* onClick={closeModal} */}
          <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal sm:pl-10'>
            <div className='w-screen max-w-2xl'>
              <div className='flex flex-col h-full overflow-scroll shadow-xl bg-primary'>
                <header className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-base font-medium' id='slide-over-title'>
                      {editID ? `Edit ` : `Add `} SOAP Chart
                    </h2>
                    <div className='flex items-center ml-3 h-7'>
                      <button
                        className='focus:outline-none'
                        onClick={closeModal}>
                        <span className='sr-only'>Close panel</span>
                        <XMarkIcon className='w-5 h-5' />
                      </button>
                    </div>
                  </div>
                </header>

                <main
                  className='relative flex-1 modal-body'
                  id='top-div-appointment'>
                  <div className='grid gap-2 pb-4 pl-6 pr-6 mt-4 border-b border-gray-700 md:grid-cols-12'>
                    <div className='col-span-3'>
                      <h4 className='font-medium'>Blood Pressure</h4>
                    </div>

{/* {JSON.stringify(appointmentDetail.serviceIds)} */}
                    <div className={'mb-0 col-span-9'}>
                      <InputField
                        id={`blood_pressure`}
                        placeholder={'Enter the blood pressure eg. 120/80'}
                        required={true}
                        formik={formik}
                        customClass={`mt-0`}
                      />
                    </div>
                  </div>

                  <div className='grid gap-2 pb-4 pl-6 pr-6 mt-4 border-b border-gray-700 md:grid-cols-12'>
                    <div className='col-span-3'>
                      <h4 className='font-medium'>Medical History</h4>
                    </div>

                    <div className={'mb-0 col-span-9'}>
                      <RadioGroupField
                        id={`pervious_injection_iv`}
                        label='Previous Injection / IV'
                        options={[
                          { value: 'yes', label: 'Yes' },
                          { value: 'no', label: 'No' },
                        ]}
                        required={false}
                        formik={formik}
                        customClass={`mt-2 mb-0`}
                      />
                      {formik.values.pervious_injection_iv === 'yes' && (
                        <textarea
                          type='text'
                          name='previous_injection_iv_details'
                          placeholder='Details of previous injection / IV'
                          value={formik.values.previous_injection_iv_details}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className='block w-full mt-2 text-xs leading-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                        ></textarea>
                      )}

                      <RadioGroupField
                        id={`medication_allergy`}
                        label='Medication Allergy'
                        options={[
                          { value: 'yes', label: 'Yes' },
                          { value: 'no', label: 'No' },
                        ]}
                        required={false}
                        formik={formik}
                        customClass={`mt-2 mb-0`}
                      />
                      {formik.values.medication_allergy === 'yes' && (
                        <textarea
                          type='text'
                          name='medication_allergy_details'
                          placeholder='Details of Medication Allergy'
                          value={formik.values.medication_allergy_details}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className='block w-full mt-2 text-xs leading-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                        ></textarea>
                      )}

                      <RadioGroupField
                        id={`other_allergy`}
                        label='Other Allergy'
                        options={[
                          { value: 'yes', label: 'Yes' },
                          { value: 'no', label: 'No' },
                        ]}
                        required={false}
                        formik={formik}
                        customClass={`mt-2 mb-0`}
                      />

                      {formik.values.other_allergy === 'yes' && (
                        <textarea
                          type='text'
                          name='other_allergy_details'
                          placeholder='Details of Other Allergy'
                          value={formik.values.other_allergy_details}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className='block w-full mt-2 text-xs leading-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                        />
                      )}
                    </div>
                  </div>

                  <div className='grid gap-2 pb-4 pl-6 pr-6 mt-4 border-b border-gray-700 md:grid-cols-12'>
                    <div className='col-span-3'>
                      <h4 className='font-medium'>Vitamin</h4>
                    </div>

                    <div className={'mb-0 col-span-9'}>
                      {/* Injection */}
                      <Select
                        styles={customStyles}
                        isMulti
                        name='injections'
                        placeholder={`Select the injections`}
                        options={injectioArray?.data?.map(item => ({
                          value: item._id,
                          label: item.name,
                        }))}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        value={formik.values.injections.map(option => ({
                          value: option.id,
                          label: option.key,
                        }))} // Ensure value prop matches the format of options
                        onChange={selectedOptions => {
                          // Update the injections array with the selected options
                          formik.setFieldValue(
                            'injections',
                            selectedOptions.map(option => ({
                              id: option.value,
                              key: option.label, // or any key you want to assign
                              value:
                                formik.values.injections.find(
                                  injection => injection.id === option.value
                                )?.value || '', // Use the existing value if available
                            }))
                          )
                        }}
                      />

                      {formik.values.injections.map((option, index) => (
                        <div
                          key={option.id}
                          className='grid items-center grid-cols-1 gap-3 pt-2 pb-2 sm:grid-cols-2'>
                          {/* Apply Tailwind CSS flex and margin classes */}
                          <label className='text-right'>{option.key}</label>

                          <div className='gap-3'>
                            <div className='flex items-center'>
                              {/* Apply Tailwind CSS margin class */}
                              <div className='relative mt-2 rounded-md shadow-sm'>
                                <input
                                  type='text'
                                  name={`injections.${index}.value`}
                                  placeholder='10'
                                  value={option.value} // Set input value to option.value
                                  onChange={e => {
                                    const newInjections = [
                                      ...formik.values.injections,
                                    ] // Create a copy of injections array
                                    newInjections[index].value = e.target.value // Update the value at the corresponding index
                                    formik.setFieldValue(
                                      'injections',
                                      newInjections
                                    ) // Set the updated injections array
                                  }}
                                  className='block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                                <div className='absolute inset-y-0 right-0 flex items-center'>
                                  <div
                                    className='h-full py-0 pl-2 text-gray-500 bg-transparent border-0 rounded-md pr-7 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm'
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    mg
                                  </div>
                                </div>
                              </div>
                              <TrashIcon
                                className='w-5 h-5 ml-4 text-red-500 cursor-pointer'
                                onClick={() => {
                                  const newInjections = [
                                    ...formik.values.injections,
                                  ] // Create a copy of injections array
                                  newInjections.splice(index, 1) // Remove the item at the specified index
                                  formik.setFieldValue(
                                    'injections',
                                    newInjections
                                  ) // Set the updated injections array
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {formik.values.injections.some(
                    option => option.key === 'Semaglutide'
                  ) && (
                    <div className='grid gap-2 pb-4 pl-6 pr-6 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>BMI Infomation</h4>
                      </div>

                      <div className={'mb-0 col-span-9'}>
                        <div className='grid items-center grid-cols-1 gap-3 pt-2 pb-2 sm:grid-cols-2'>
                          <InputField
                            id={`height`}
                            placeholder={`Patiant's Height`}
                            required={true}
                            formik={formik}
                            customClass={`mt-0`}
                          />

                          <div className='gap-3'>
                            <InputField
                              id={`weight`}
                              placeholder={`Patiant's Weight`}
                              required={true}
                              formik={formik}
                              customClass={`mt-0`}
                            />
                          </div>
                        </div>

                        <InputField
                          id={`bmi`}
                          placeholder={`Patiant's Body Mass Index`}
                          required={true}
                          formik={formik}
                          customClass={`mt-0`}
                        />

                        <InputField
                          id={`side_effects`}
                          placeholder={
                            'If any sideefflects, please ellabrate here'
                          }
                          required={true}
                          formik={formik}
                          customClass={`mt-0`}
                        />
                      </div>
                    </div>
                  )}

                  <div className='grid gap-2 pb-4 pl-6 pr-6 mt-4 border-b border-gray-700 md:grid-cols-12'>
                    <div className='col-span-3'>
                      <h4 className='font-medium'>Intravenous</h4>
                    </div>

                    <div className={'mb-0 col-span-9'}>
                      {/* IV  */}

                      <Select
                        styles={customStyles}
                        isMulti
                        name='intravenous'
                        options={iVArray?.data?.map(item => ({
                          value: item._id,
                          label: item.name,
                          items: item.items, // Attach items to each option
                        }))}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        value={formik.values.intravenous.map(option => ({
                          value: option.id,
                          label: option.key,
                          items: option.items, // Retain the items property for each selected option
                        }))}
                        onChange={selectedOptions => {
                          // Extract items for each selected option
                          const updatedOptions = selectedOptions.map(
                            selectedOption => {
                              const originalOption = iVArray?.data.find(
                                item => item._id === selectedOption.value
                              )
                              return {
                                id: selectedOption.value,
                                key: selectedOption.label, // or any key you want to assign
                                items: originalOption?.items || [], // Retrieve items from the original option or an empty array if not found
                                value:
                                  formik.values.intravenous.find(
                                    iv => iv.id === selectedOption.value
                                  )?.value || '', // Use the existing value if available
                              }
                            }
                          )
                          // Update the intravenous array with the selected options
                          formik.setFieldValue('intravenous', updatedOptions)
                        }}
                      />
                      {formik.values.intravenous.map((option, index) => (
                        <div
                          key={option.id}
                          data-id={option.id}
                          className='grid items-center grid-cols-1 gap-3 pt-2 pb-2 sm:grid-cols-2'>
                          <label className='text-right'>{option.key}</label>

                          <div className='gap-3'>
                            <div className='flex items-center'>
                              <Select
                                key={`${option.id}`}
                                styles={customStyles}
                                name={`intravenous.${index}.value`}
                                options={option.items?.map(item => ({
                                  value: item.name,
                                  label: item.name,
                                }))}
                                className='w-full'
                                classNamePrefix='select'
                                // value={
                                //   formik.values.intravenous[index]?.value || ''
                                // }

                                value={{
                                  value:
                                    formik.values.intravenous[index]?.value ||
                                    '',
                                  label:
                                    formik.values.intravenous[index]?.value ||
                                    '',
                                }}
                                onChange={selectedOption => {
                                  const updatedIntravenous =
                                    formik.values.intravenous.map(
                                      (item, idx) => {
                                        if (idx === index) {
                                          return {
                                            ...item,
                                            value: selectedOption?.value || '',
                                          }
                                        }
                                        return item
                                      }
                                    )
                                  formik.setFieldValue(
                                    'intravenous',
                                    updatedIntravenous
                                  )
                                }}
                              />

                              <TrashIcon
                                className='w-5 h-5 ml-4 text-red-500 cursor-pointer'
                                onClick={() => {
                                  const newInjections = [
                                    ...formik.values.intravenous,
                                  ] // Create a copy of injections array
                                  newInjections.splice(index, 1) // Remove the item at the specified index
                                  formik.setFieldValue(
                                    'intravenous',
                                    newInjections
                                  ) // Set the updated injections array
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {formik.values.intravenous.some(
                    option => option.key === 'NAD+'
                  ) && (
                    <div className='grid gap-2 pb-4 pl-6 pr-6 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>BMI Infomation</h4>
                      </div>

                      <div className={'mb-0 col-span-9'}>
                        <div className='grid items-center grid-cols-1 gap-3 pt-2 pb-2 sm:grid-cols-2'>
                          <InputField
                            id={`height`}
                            placeholder={`Patiant's Height`}
                            required={true}
                            formik={formik}
                            customClass={`mt-0`}
                          />

                          <div className='gap-3'>
                            <InputField
                              id={`weight`}
                              placeholder={`Patiant's Weight`}
                              required={true}
                              formik={formik}
                              customClass={`mt-0`}
                            />
                          </div>
                        </div>

                        <InputField
                          id={`bmi`}
                          placeholder={`Patiant's Body Mass Index`}
                          required={true}
                          formik={formik}
                          customClass={`mt-0`}
                        />

                        <InputField
                          id={`side_effects`}
                          placeholder={
                            'If any sideefflects, please ellabrate here'
                          }
                          required={true}
                          formik={formik}
                          customClass={`mt-0`}
                        />
                      </div>
                    </div>
                  )}

                  <div className='grid gap-2 pb-4 pl-6 pr-6 mt-4 md:grid-cols-12'>
                    <div className='col-span-3'>
                      <h4 className='font-medium'>Which Side</h4>
                    </div>

                    <div className={'mb-0 col-span-9'}>
                      <Select
                        styles={customStyles}
                        className='basic-single'
                        classNamePrefix='select'
                        name='recovery_injection_side'
                        value={{
                          value: formik.values.recovery_injection_side || '',
                          label: formik.values.recovery_injection_side || '',
                        }}
                        options={[
                          {
                            value: 'Left dorsogluteal region',
                            label: 'Left dorsogluteal region',
                          },
                          {
                            value: 'Right dorsogluteal region',
                            label: 'Right dorsogluteal region',
                          },
                          {
                            value: 'Left ventrogluteal region',
                            label: 'Left ventrogluteal region',
                          },
                          {
                            value: 'Right ventrogluteal region',
                            label: 'Right ventrogluteal region',
                          },
                          { value: 'Other', label: 'Other' },
                        ]}
                        onChange={selectedOption => {
                          formik.setFieldValue(
                            'recovery_injection_side',
                            selectedOption.value
                          )
                        }}
                      />

                      {formik.values.recovery_injection_side === 'Other' && (
                        <textarea
                          name='recovery_injection_side_text'
                          placeholder='Please specify'
                          value={formik.values.recovery_injection_side_text}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className='block w-full mt-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                        />
                      )}
                    </div>
                  </div>

                  {/*  */}
                </main>

                <footer className='flex-wrap gap-1 p-5 border-t modal-footer border-grayLight flex-bet'>
                  <div></div>
                  <div className='flex-wrap gap-2 flex-ver'>
                    <button
                      type='button'
                      className='block px-4 py-2 text-sm font-medium text-center transition border border-gray-700 rounded-lg bg-transprent hover:border-yellowBg undefined'
                      onClick={closeModal}>
                      Cancel
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
                </footer>
                {loading && <Loader customClass='absolute' />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  )
}

export default React.memo(NurseSOAP)
