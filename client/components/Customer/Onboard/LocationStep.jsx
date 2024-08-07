import React, { useMemo } from 'react'
import SnapCrackButton from '@/widget/common-button'
import ServiceHeader from '@/components/Layout/Header/ServiceHeader'
import routes from '@/utils/routes'
import Loader from '@/widget/loader'
import Link from 'next/link'
import { RadioGroup } from '@headlessui/react'
import useLocation from '@/components/Customer/Onboard/hooks/useLocation'
import { Button } from '@/components/AppUi/Form/Button'

const CheckIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='w-6 h-6 text-black'>
    <path d='M20 6L9 17l-5-5' />
  </svg>
);


const LocationOption = React.memo(({ location, selectedLocationId, onChange }) => (
  <RadioGroup.Option
    key={location.id}
    value={location}
    className={({ active, checked }) =>
      `${active ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60' : ''}
       ${location.id === selectedLocationId ? 'bg-yellowBg text-black' : 'bg-primary hover:bg-grayLight'}
        relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none transition duration-300 ease-in-out`}>
    {({ active, checked }) => (
      <>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center'>
            <div className='text-sm'>
              <RadioGroup.Label
                as='p'
                className={`font-medium  ${location.id === selectedLocationId ? 'text-black' : 'text-white'} transition duration-300 ease-in-out`}>
                {location.locationName}
              </RadioGroup.Label>
              <RadioGroup.Description
                as='span'
                className={`inline ${location.id === selectedLocationId ? 'text-sky-100' : 'text-gray-500'} transition duration-300 ease-in-out`}>
                <span>{location.description}</span>
              </RadioGroup.Description>
            </div>
          </div>
          {location.id === selectedLocationId && (
            <div className='flex-shrink-0 text-white transition duration-300 ease-in-out'>
              <CheckIcon />
            </div>
          )}
        </div>
      </>
    )}
  </RadioGroup.Option>
));

const LocationStep = ({ user, locations }) => {
  const { loading, formik } = useLocation({ userData: user });

  const handleLocationChange = useMemo(() => value => {
    formik.handleChange({
      target: { name: 'selectedLocation', value },
    });
  }, [formik]);
  
  return (
    <>
      <div>
        <div className='flex flex-col h-screen overflow-y-auto registration-form-main'>
          <ServiceHeader />
          <form onSubmit={formik.handleSubmit} className='w-full max-w-3xl p-5 mx-auto sm:p-9 sm:pb-10'>

            <div className='pb-5 mb-5 border-b border-gray-600 reg-form'>
              <div className='all-steps'>
                <div className='flex items-center justify-between gap-3'>
                  <h3 className='text-xl font-medium'>Onboarding</h3>
                  <p className='text-sm text-gray-400'>STEP 4/5</p>
                </div>
                <div className='grid w-full h-1 grid-cols-8 mt-2 mb-6 rounded-full bg-grayMid'>
                  <div className='h-full col-span-8 rounded-full bg-yellowBg'></div>
                </div>
              </div>
              <h3 className='mb-2 text-2xl font-semibold text-white'>
                Preferred location
              </h3>
              <p className='max-w-xl mb-4 text-sm text-gray-400'>
                Pick a preferred location you'd like to visit 

              </p>


              <div>
              <RadioGroup
            value={formik.values.selectedLocation}
            onChange={handleLocationChange}>
            <RadioGroup.Label className='sr-only'>Locations</RadioGroup.Label>
            <div className='space-y-2'>
              {locations.map(location => (
                <LocationOption
                  key={location.id}
                  location={location}
                  selectedLocationId={formik.values.selectedLocation?.id}
                  onChange={handleLocationChange}
                />
              ))}
            </div>
          </RadioGroup>

                {formik.errors.selectedLocation &&
                formik.touched.selectedLocation ? (
                  <div className='text-red-500'>
                    {formik.errors.selectedLocation}
                  </div>
                ) : null}
              </div>
            </div>
            <div className='flex items-center gap-6 pt-5 mt-5'>

              <Link href={routes.onbardMedicalHistory}>
                <span className='block w-full p-2 text-sm text-center text-gray-200 transition bg-transparent border border-gray-700 rounded-md cursor-pointer focus:outline-none hover:bg-gray-800 hover:border-gray-400'>
                  Back
                </span>
              </Link>


              <Button
                kind={'primary'}
                type='submit'
                text={formik.isSubmitting ? 'Please wait...' : 'Next'}
                isDisabled={formik.isSubmitting || !formik.dirty}
                isLoading={formik.isSubmitting}
              />

              {/* <SnapCrackButton
                type='submit'
                text='Next'
                className='w-full py-2 font-semibold text-black transition rounded-lg cursor-pointer bg-yellowBg hover:bg-darkYellow'
              /> */}
            </div>
          </form>
        </div>
        {loading && <Loader customClass='absolute' />}
      </div>
    </>
  )
}

export default React.memo(LocationStep);
