import useDropdown from '@/hooks/common/useDropdown'
import useAddCustomer from '@/components/Admin/hooks/useAddCustomer'
import { REQUIRED_IMAGE_TYPE } from '@/utils/constant'
import { copy, customStyles, phoneValidation } from '@/utils/helper'
import SnapCrackButton from '@/widget/common-button'
import CloseIcon from '@/widget/image/CloseIcon'
import Loader from '@/widget/loader'
import Select from '@/widget/select'
import { subDays } from 'date-fns'
import React, { useState } from 'react'
import AsyncSelect from 'react-select/async'
import ToggleButton from '@/widget/ToggleButton'
import DatePickerField from '@/components/AppUi/Form/DatePickerField'
import { RadioGroupField } from '@/components/AppUi/Form/RadioGroup'
import { InputField } from '@/components/AppUi/Form/InputField'
import { TellField } from '@/components/AppUi/Form/TellField'

const AddCustomer = props => {
  const [startDate, setStartDate] = useState(subDays(new Date(), 1))

  const {
    genderOptionsData,
    membershipOptionsData,
    genderData,
    getAllMasterData,

    loadOptionsGender,
    loadOptionsMembership,
    selectedMembershipValue,
    setSelectedGenderValue,
    setSelectedMembershipValue,
  } = useDropdown()

  const {
    active,
    setActive,
    activeEmailNotification,
    setActiveEmailNotification,
    closeBtn,
    formik,
    loading,
    subOwnerOptionsData,
    loadOptionsSubOwner,
    selectedSubOwnerValue,
    setSelectedSubOwnerValue,
  } = useAddCustomer({
    props,
    genderData,
    getAllMasterData,
    loadOptionsGender,
    loadOptionsMembership,
    setSelectedGenderValue,
    selectedMembershipValue,
  })

  const sortData = genderOptionsData.sort((r1, r2) =>
    r1.label > r2.label ? 1 : -1
  )
  const genderArray = sortData.filter(item => item.label !== 'Other')

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <section
          id='AddCustomerModal'
          className='fixed inset-0 overflow-hidden text-sm activity-modal-main '
          style={{ zIndex: '20 !important' }}
          aria-labelledby='slide-over-title'
          role='dialog'
          aria-modal='true'>
          <div className='absolute inset-0 overflow-hidden'>
            <div
              className='absolute inset-0 transition-opacity bg-black black-layer'
              aria-hidden='true'
              onClick={() => closeBtn()}></div>
            <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal'>
              <div className='w-screen max-w-xl'>
                <div className='flex flex-col h-full shadow-xl bg-primary'>
                  <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                    <div className='flex items-center justify-between'>
                      <h2
                        className='text-base font-medium'
                        id='slide-over-title'>
                        Add Customer
                      </h2>
                      <div className='flex items-center ml-3 h-7'>
                        <button
                          type='button'
                          onClick={e => {
                            e.preventDefault, closeBtn()
                          }}
                          className='focus:outline-none '>
                          <span className='sr-only'>Close panel</span>
                          <CloseIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='relative flex-1 p-4 modal-body'>
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Account</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid grid-cols-12 gap-4'>
                          <InputField
                            id='email'
                            label={'Email'}
                            placeholder={'Email'}
                            required={true}
                            formik={formik}
                            customClass={`sm:col-span-12 col-span-12`}
                          />

                          <TellField
                            id='phone'
                            label={'Phone Number'}
                            placeholder={'Phone Number'}
                            required={true}
                            formik={formik}
                            customClass='sm:col-span-12 col-span-12'
                          />

                          <div className='col-span-12'>
                            <AsyncSelect
                              styles={customStyles}
                              isSearchable
                              // cacheOptions
                              className='text-sm'
                              placeholder='Search Sub Owner'
                              id='parentId'
                              defaultOptions={subOwnerOptionsData}
                              isClearable
                              loadOptions={loadOptionsSubOwner}
                              value={
                                JSON.stringify(selectedSubOwnerValue) === '{}'
                                  ? null
                                  : selectedSubOwnerValue
                              }
                              // filterOption={() => true}
                              onInputChange={value => {
                                loadOptionsSubOwner()
                                // }
                              }}
                              onChange={data => {
                                formik.setFieldValue('parentId', data?.value)
                                if (data === null) {
                                  setSelectedSubOwnerValue({})
                                } else {
                                  setSelectedSubOwnerValue(data)
                                }
                              }}
                            />

                            {formik.touched.parentId &&
                            formik.errors.parentId ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.parentId}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Personal Information</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid grid-cols-12 gap-4'>
                          {/* <div className='col-span-12 form-group sm:col-span-4'>
                            <div className='w-full text-gray-500 bg-transparent rounded-lg'>
                              <Select
                                placeholder='Prefix'
                                name='prefixId'
                                defaultOptions={prefixOptionsData}
                                loadOptions={loadOptionsPrefix}
                                value={selectedPrefixValue}
                                setValue={setSelectedPrefixValue}
                                formik={formik}
                              />
                            </div>
                            {formik.touched.prefixId &&
                              formik.errors.prefixId ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.prefixId}
                              </div>
                            ) : null}
                          </div> */}

                          <InputField
                            id='firstName'
                            label='First name'
                            placeholder={`John`}
                            required={true}
                            formik={formik}
                            customClass='sm:col-span-6 col-span-12'
                            type='text'
                          />

                          <InputField
                            id='lastName'
                            label='Last name'
                            placeholder={`Doe`}
                            required={true}
                            formik={formik}
                            customClass='sm:col-span-6 col-span-12'
                            type='text'
                          />

                          <RadioGroupField
                            id='genderId'
                            label='Gender'
                            options={genderArray}
                            required={true}
                            formik={formik}
                            customClass={`mt-0 mb-0 sm:col-span-12 col-span-12`}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Assign Membership</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid grid-cols-12 gap-4'>
                          <div className='col-span-12 form-group'>
                            {/* <select className='w-full px-3 py-2 text-sm text-gray-500 bg-transparent border border-gray-500 rounded-lg '>
                              <option>Select Membership</option>
                            </select> */}
                            <Select
                              placeholder='Membership'
                              name='membershipId'
                              defaultOptions={membershipOptionsData}
                              loadOptions={loadOptionsMembership}
                              value={selectedMembershipValue}
                              setValue={setSelectedMembershipValue}
                              formik={formik}
                            />

                            {formik.touched.membershipId &&
                            formik.errors.membershipId ? (
                              <div className='pt-1 pl-1 text-xs text-redAlert'>
                                {formik.errors.membershipId}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Options</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid grid-cols-12 gap-4'>
                          <div className='flex gap-1.5 justify-between items-center  col-span-12'>
                            <div>
                              <h4 className='text-sm font-medium'>Active</h4>
                              <p className='text-sm text-gray-400'>
                                Activate user after registration
                              </p>
                            </div>
                            <div>
                              <ToggleButton
                                checked={active}
                                setChecked={setActive}
                              />
                            </div>
                          </div>
                          <div className='flex gap-1.5 justify-between items-center col-span-12'>
                            <div>
                              <h4 className='text-sm font-medium'>
                                Email Notifications
                              </h4>
                              <p className='text-sm text-gray-400'>
                                Get email notifications for new system messages
                                and upcoming events.
                              </p>
                            </div>
                            <div>
                              <ToggleButton
                                checked={activeEmailNotification}
                                setChecked={setActiveEmailNotification}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center justify-end col-span-12 mt-3 buttons'>
                      <button
                        type='button'
                        onClick={e => {
                          e.preventDefault()
                          closeBtn()
                        }}
                        className='block px-4 py-2 text-sm font-medium text-center text-gray-500 transition border border-gray-700 rounded-lg bg-transprent hover:border-yellowBg'>
                        Close
                      </button>

                      <SnapCrackButton
                        type='submit'
                        text='Save Changes'
                        className='block px-4 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg hover:bg-yellow-400'
                      />
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

export default React.memo(AddCustomer)
