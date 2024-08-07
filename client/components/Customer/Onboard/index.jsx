import React from 'react'
import ServiceHeader from '@/components/Layout/Header/ServiceHeader'
import useOnboarding from '@/components/Customer/Onboard/hooks/useOnboarding'
import { SelectField } from '@/components/AppUi/Form/SelectField'
import { TellField } from '@/components/AppUi/Form/TellField'
import {
  relationshipOptions,
  heightFtOptions,
  heightInchOptions,
  weightOptions,
} from './../types/types'
import { Button } from '@/components/AppUi/Form/Button'
import { InputField } from '@/components/AppUi/Form/InputField'

const OnBoarding = user => {
  const { formik } = useOnboarding({
    userData: user,
  })

  return (
    <form onSubmit={formik.handleSubmit} autoComplete='none'>
      <div className='relative'>
        <div className='flex flex-col h-screen overflow-y-auto registration-form-main'>
          <ServiceHeader />
          <div className='w-full max-w-3xl p-5 mx-auto sm:p-9 sm:pb-2'>
            <div className='reg-form'>
              <div className='all-steps'>
                <div className='flex items-center justify-between gap-3'>
                  <h3 className='text-xl font-medium'>Onboarding</h3>
                  <p className='text-sm text-gray-400'>STEP 1/5</p>
                </div>
                <div className='grid w-full h-1 grid-cols-8 mt-2 mb-6 rounded-full bg-grayMid'>
                  <div className='h-full col-span-1 rounded-full bg-yellowBg'></div>
                </div>
              </div>

              <p className='max-w-xl mb-4 text-sm text-gray-400'>
                We need a little more information to complete your account
              </p>

              <div className='pb-5 mt-5 mb-5 border-b border-gray-600'>
                <div className='grid lg:grid-cols-2 lg:gap-3'>
                  <div>
                    <div className='grid grid-cols-2 gap-3'>
                      <div>
                        <SelectField
                          label='Height (ft.)'
                          required={true}
                          id='ft'
                          options={heightFtOptions}
                          value={heightFtOptions.find(option => option.value.toString() === formik.values.ft.toString())}
                          onChange={selectedOption => {
                            console.log(
                              'selectedOption.value:',
                              selectedOption.value
                            )
                            console.log(
                              'Setting formik.values.ft to:',
                              selectedOption.value
                            ) // Log value being set
                            formik.setFieldValue('ft', selectedOption.value)
                          }}
                          onBlur={formik.handleBlur}
                          className='w-full'
                          placeholder='Select height (ft)'
                        />
                      </div>
                      <div>
                        <SelectField
                          label={`Height (inch.)`}
                          required={true}
                          id='inch'
                          options={heightInchOptions}
                          value={heightInchOptions.find(option => option.value.toString() === formik.values.inch.toString())}

                          onChange={selectedOption => {
                            console.log(
                              'selectedOption.value:',
                              selectedOption.value
                            )
                            formik.setFieldValue('inch', selectedOption.value)
                          }}
                          onBlur={formik.handleBlur}
                          className='w-full'
                          placeholder='Select height (inch)'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='pt-4 lg:pt-0'>
                    <SelectField
                      label={`Weight`}
                      required={true}
                      id='weight'
                      options={weightOptions}
                      value={weightOptions.find(option => option.value.toString() === formik.values.weight.toString())}
                      onChange={selectedOption => {
                        formik.setFieldValue('weight', selectedOption.value)
                      }}
                      onBlur={formik.handleBlur}
                      className='w-full'
                      placeholder='Select weight (lbs)'
                    />
                  </div>
                </div>
              </div>

              <div className='grid gap-3 pb-5 mb-5 border-b border-gray-600'>
                <div>
                  <InputField
                    id='name'
                    label={'Emergency contact name'}
                    placeholder={'Emergency contact name'}
                    required={true}
                    formik={formik}
                  />
                </div>

                <div>
                  <TellField
                    id='phone'
                    label={'Contact number'}
                    placeholder={'Phone Number'}
                    required={true}
                    formik={formik}
                    customClass='mt-0'
                  />
                </div>

                <div>
                  <SelectField
                    formik={formik}
                    id='relationToYou'
                    label={'Relationship type'}
                    required={true}
                    options={relationshipOptions}
                    onChange={selectedOption => {
                      formik.setFieldValue(
                        'relationToYou',
                        selectedOption?.label
                      )
                    }}
                    onBlur={formik.handleBlur}
                    value={relationshipOptions.find(
                      option => option.value === formik.values.relationToYou
                    )}
                  />
                </div>
              </div>
            </div>
            <div className='flex items-center gap-3 '>
              <Button
                kind={'primary'}
                type='submit'
                text={formik.isSubmitting ? 'Please wait...' : 'Continue'}
                isDisabled={formik.isSubmitting || !formik.dirty}
                isLoading={formik.isSubmitting}
              />
            </div>
          </div>
        </div>
        {/* {loading && <Loader customClass='absolute' />} */}
      </div>
    </form>
  )
}

export default OnBoarding
