import React, { useEffect, useState } from 'react'
import { customStyles } from '@/utils/helper'
import SnapCrackButton from '@/widget/common-button'
import CloseIcon from '@/widget/image/CloseIcon'
import AsyncSelect from 'react-select/async'
import { YellowBtn } from '@/widget/button/YellowBTN'
import AddCustomer from '@/components/Admin/GlobalAdd/AddCustomer'
import Select from 'react-select'
import SubscriptionDetail from '@/components/AppUi/Membership/MembershipInfo'
import InvoiceTable from '@/components/AppUi/Membership/InvoiceTable'
import PaymentMethodSelector from '@/components/AppUi/Membership/PaymentMethodSelector'
import useInstantAppointment from '@/components/Admin/hooks/useInstantAppointment'

export default function InstantAppointmentForm (props) {
  const [activeCustomer, setActiveCustomer] = useState(false)

  const {
    loading,
    formik,
    closeBtn,
    loadOptionsCustomer,
    customerOptionsData,
    selectedPatientId,
    selectedServicIds,
    asyncSelectRefCustomer,
    selectedServicesForCategory,
    activeSubscription,
    lineItems,
    totalAmount,
    totalAmountToPay,
  } = useInstantAppointment(props)

  const openCustomerModal = async () => {
    await setActiveCustomer(true)
    const openAddCustomer = document.getElementById('AddCustomerModal')
    openAddCustomer.classList.add('active')
    const addAppointment = document.getElementById('InstantAppointmentModal')
    addAppointment.classList.remove('active')
  }

  const handleServiceSelection = (selectedOptions, categoryId) => {
    const selectedServiceIds = selectedOptions.map(option => option.value)

    formik.setFieldValue('selectedServices', {
      ...formik.values.selectedServices,
      [categoryId]: selectedServiceIds,
    })

    console.log(`categoryId`, categoryId)
    console.log(`selectedOptions`, selectedOptions)

    // setActiveSubscription(prevSubscription => {
    //   const updatedCategories = prevSubscription?.services?.map(category => {
    //     if (category._id === categoryId) {
    //       // Calculate temporary quota
    //       const tempQuota = selectedServiceIds.length
    //       const usedQuotaDifference = tempQuota - category.usedQuota
    //       const newUsedQuota = category.usedQuota + usedQuotaDifference

    //       if (newUsedQuota <= category.quota) {
    //         return { ...category, usedQuota: newUsedQuota }
    //       }
    //     }
    //     return category
    //   })
    //   return { ...prevSubscription, categories: updatedCategories }
    // })
  }

  // useEffect(() => {
  //   console.log(`FROM InstantAppointmentForm LINE 79`, selectedPatientId)
  // }, [])

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <section
          id='InstantAppointmentModal'
          className='fixed inset-0 z-10 flex overflow-hidden text-sm activity-modal-main flex-column'
          aria-labelledby='slide-over-title'
          role='dialog'
          aria-modal='true'>
          <div className='absolute inset-0 overflow-hidden'>
            <div
              className='absolute inset-0 transition-opacity bg-black black-layer'
              aria-hidden='true'
              onClick={() => closeBtn(formik.resetForm)}></div>
            <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal sm:pl-10'>
              <div className='w-screen max-w-2xl'>
                <div className='flex flex-col h-full shadow-xl bg-primary'>
                  {/* Header */}
                  <header className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                    <div className='flex items-center justify-between'>
                      <h2
                        className='text-base font-medium'
                        id='slide-over-title'>
                        Add Appointment
                      </h2>
                      <div className='flex items-center ml-3 h-7'>
                        <button
                          className='focus:outline-none '
                          onClick={e => {
                            e.preventDefault(), closeBtn(formik.resetForm)
                          }}>
                          <span className='sr-only'>Close panel</span>
                          <CloseIcon />
                        </button>
                      </div>
                    </div>
                  </header>

                  <main className='relative flex-1 p-8 modal-body' id='top-div'>
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Customer</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid grid-cols-12 gap-4'>
                          <div className='col-span-12'>
                            <div className='flex flex-wrap items-start gap-3 sm:flex-nowrap'>
                              <div className='relative flex items-center w-full'>
                                <div className='w-full text-gray-500 bg-transparent rounded-lg'>
                                  <AsyncSelect
                                    styles={customStyles}
                                    ref={asyncSelectRefCustomer}
                                    isSearchable
                                    className='text-sm'
                                    placeholder='Select Customer'
                                    id='patientId'
                                    defaultOptions={customerOptionsData}
                                    loadOptions={loadOptionsCustomer}
                                    onChange={data => {
                                      formik.setFieldValue(
                                        'patientId',
                                        data?.value
                                      )
                                    }}
                                  />
                                  {formik.errors &&
                                    formik.errors.patientId &&
                                    formik.touched &&
                                    formik.touched.patientId && (
                                      <div className='mt-1 text-sm field-error text-redAlert'>
                                        {formik.errors.patientId}
                                      </div>
                                    )}
                                </div>
                              </div>
                              <YellowBtn
                                type='button'
                                onClick={openCustomerModal}
                                btnText='New Customer'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Services</h4>
                      </div>

                      <div className={'mb-1 col-span-9'}>
                        {props.services.map(category => (
                          <div key={category._id} className='mt-4'>
                            <label
                              htmlFor={`category_${category._id}`}
                              className='pb-4 mb-10'>
                              {category.name}
                            </label>

                            <Select
                              isMulti
                              styles={customStyles}
                              name={`category_${category._id}`}
                              options={category.data.map(service => ({
                                value: service._id,
                                label: service.name,
                              }))}
                              onChange={selectedOptions => {
                                handleServiceSelection(
                                  selectedOptions,
                                  category._id
                                )
                              }}
                              value={selectedServicesForCategory(
                                formik.values.selectedServices,
                                category
                              )}
                            />

                            {formik.touched[`category_${category._id}`] &&
                              formik.errors[`category_${category._id}`] && (
                                <div style={{ color: 'red' }}>
                                  {formik.errors[`category_${category._id}`]}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    </div>



                    {/* {JSON.stringify(activeSubscription)} */}
                    
                    {/* <SubscriptionDetail
                      activeSubscription={activeSubscription}
                    /> */}

                    
                    {/* {JSON.stringify(lineItems)}
                    <hr />
                    {JSON.stringify(totalAmount)}
                    <hr />
                    {JSON.stringify(totalAmountToPay)}
                    <hr /> */}

                    <>
                      {totalAmount > 0 && (
                        <>
                          <InvoiceTable lineItems={lineItems} />

                          <PaymentMethodSelector />
                        </>
                      )}
                    </>
                  </main>
                  <footer className='flex-wrap gap-1 p-5 border-t modal-footer border-grayLight flex-bet '>
                    <div></div>

                    <div className='flex-wrap gap-2 flex-ver'>
                      <button
                        onClick={e => {
                          e.preventDefault(), closeBtn(formik.resetForm)
                        }}
                        className='block px-4 py-2 text-sm font-medium text-center text-gray-500 transition border border-gray-700 rounded-lg cursor-pointer bg-transprent hover:border-yellowBg'>
                        Close
                      </button>

                      <SnapCrackButton
                        type='submit'
                        text={formik.isSubmitting ? 'Please wait...' : 'Submit'}
                        className='block px-4 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg hover:bg-yellow-400'
                        renderLoader={loading}
                        // disabled={formik.isSubmitting || !formik.dirty}
                      />
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>

      <AddCustomer
        activeCustomer={activeCustomer}
        setActiveCustomer={setActiveCustomer}
      />
    </>
  )
}
