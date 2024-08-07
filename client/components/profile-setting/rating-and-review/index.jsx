// import React, { useState } from "react";
import React, { useState } from 'react'
import Link from 'next/link'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import ToggleButton from '@/widget/ToggleButton'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { YellowBtn } from '@/widget/button/YellowBTN'
import DropdownButton from '@/widget/dropdown/dropdown'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Visit = [{ name: 'After every second Visit' }]
export default function RatingReview() {
  const [visit, setVisit] = useState(Visit[0])
  return (
    <>
      <div className='px-6 py-6 border-b border-gray-500 setting-header bg-primary'>
        <h3 className='text-lg font-semibold'>Ratings & Reviews</h3>
        <p className='text-gray-400'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>

      <div className='p-4 sm:p-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-lg font-semibold'>Enable Ratings</h3>
            <p className='text-gray-400'>
              Automatically send an email after appointment to ask for a rating
              out of 5 stars and for additional feedback about their experience
            </p>
          </div>
          <div>
            <ToggleButton />
          </div>
        </div>
        <div className='pb-5 border-b border-gray-700'>
          <div className='px-4 mt-5 border rounded-lg bg-primary border-grayMid'>
            <div className='flex items-center justify-between gap-3 py-4 border-b border-gray-700'>
              <div>
                <h4 className='text-sm font-medium'>
                  Request feedback after initial visit
                </h4>
                <p className='text-sm text-gray-400'>
                  If you select this option, an email will be sent following a
                  patient's initial visit with a specific practitioner
                  requesting feedback
                </p>
              </div>
              <div>
                <ToggleButton />
              </div>
            </div>
            <div className='flex flex-wrap items-center justify-between gap-3 py-4'>
              <div>
                <h4 className='text-sm font-medium'>
                  Request feedback after X amount of visits
                </h4>
                <p className='text-sm text-gray-400'>
                  An email requesting feedback will be sent after this many
                  visits with a specific practitioner.
                </p>
              </div>
              <div>
                <div className='form-group'>
                  <DropdownButton
                    value={visit}
                    MAP={Visit}
                    onChange={setVisit}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='mt-4 text-right'>
            <YellowBtn btnText='Save Changes' />
          </div>
        </div>
        <div className='py-5 border-b border-gray-700'>
          <div>
            <h3 className='text-lg font-semibold'>
              Staff Using Ratings & Reviews Emails
            </h3>
            <p className='text-gray-400'>
              Select which staff members will be included in Ratings and
              Reviews. If a staff member isn't selected here, Ratings and
              Reviews emails won't be sent out for their appointments.
            </p>
          </div>
          <div className='p-4 mt-5 border rounded-lg bg-primary border-grayMid'>
            <div className='flex flex-wrap items-center gap-3'>
              <div className='flex items-center mr-3 form-check'>
                <input
                  className='w-5 h-4 form-check-input'
                  type='checkbox'
                  value=''
                  id='flexCheckDefault'
                />
                <label
                  className='ml-2 text-sm text-gray-400 form-check-label'
                  htmlFor='flexCheckDefault'>
                  Ian
                </label>
              </div>
              <div className='flex items-center mr-3 form-check'>
                <input
                  className='w-5 h-4 form-check-input'
                  type='checkbox'
                  value=''
                  id='flexCheckDefault2'
                />
                <label
                  className='ml-2 text-sm text-gray-400 form-check-label'
                  htmlFor='flexCheckDefault2'>
                  Andreane
                </label>
              </div>
              <div className='flex items-center mr-3 form-check'>
                <input
                  className='w-5 h-4 form-check-input'
                  type='checkbox'
                  value=''
                  id='flexCheckDefault3'
                />
                <label
                  className='ml-2 text-sm text-gray-400 form-check-label'
                  htmlFor='flexCheckDefault3'>
                  Norris
                </label>
              </div>
              <div className='flex items-center mr-3 form-check'>
                <input
                  className='w-5 h-4 form-check-input'
                  type='checkbox'
                  value=''
                  id='flexCheckDefault4'
                />
                <label
                  className='ml-2 text-sm text-gray-400 form-check-label'
                  htmlFor='flexCheckDefault4'>
                  Brielle
                </label>
              </div>
              <div className='flex items-center mr-3 form-check'>
                <input
                  className='w-5 h-4 form-check-input'
                  type='checkbox'
                  value=''
                  id='flexCheckDefault5'
                />
                <label
                  className='ml-2 text-sm text-gray-400 form-check-label'
                  htmlFor='flexCheckDefault5'>
                  Rodger
                </label>
              </div>
              <div className='flex items-center mr-3 form-check'>
                <input
                  className='w-5 h-4 form-check-input'
                  type='checkbox'
                  value=''
                  id='flexCheckDefault6'
                />
                <label
                  className='ml-2 text-sm text-gray-400 form-check-label'
                  htmlFor='flexCheckDefault6'>
                  Florida
                </label>
              </div>
              <div className='flex items-center mr-3 form-check'>
                <input
                  className='w-5 h-4 form-check-input'
                  type='checkbox'
                  value=''
                  id='flexCheckDefault7'
                />
                <label
                  className='ml-2 text-sm text-gray-400 form-check-label'
                  htmlFor='flexCheckDefault7'>
                  Brock
                </label>
              </div>
              <div className='flex items-center mr-3 form-check'>
                <input
                  className='w-5 h-4 form-check-input'
                  type='checkbox'
                  value=''
                  id='flexCheckDefault8'
                />
                <label
                  className='ml-2 text-sm text-gray-400 form-check-label'
                  htmlFor='flexCheckDefault8'>
                  Koby
                </label>
              </div>
              <div className='flex items-center mr-3 form-check'>
                <input
                  className='w-5 h-4 form-check-input'
                  type='checkbox'
                  value=''
                  id='flexCheckDefault9'
                />
                <label
                  className='ml-2 text-sm text-gray-400 form-check-label'
                  htmlFor='flexCheckDefault9'>
                  Sandy
                </label>
              </div>
              <div className='flex items-center mr-3 form-check'>
                <input
                  className='w-5 h-4 form-check-input'
                  type='checkbox'
                  value=''
                  id='flexCheckDefault10'
                />
                <label
                  className='ml-2 text-sm text-gray-400 form-check-label'
                  htmlFor='flexCheckDefault10'>
                  Eleanore
                </label>
              </div>
              <div className='flex items-center mr-3 form-check'>
                <input
                  className='w-5 h-4 form-check-input'
                  type='checkbox'
                  value=''
                  id='flexCheckDefault11'
                />
                <label
                  className='ml-2 text-sm text-gray-400 form-check-label'
                  htmlFor='flexCheckDefault11'>
                  Myriam
                </label>
              </div>
            </div>
          </div>
          <div className='mt-4 text-right'>
            <YellowBtn btnText='Save Changes' />
          </div>
        </div>
        <div className='py-5 border-b border-gray-700'>
          <div>
            <h3 className='text-lg font-semibold'>
              Treatments Included in Ratings & Reviews Emails
            </h3>
            <p className='text-gray-400'>
              Select which treatments will be included in Ratings and Reviews.
              Both the treatment and the staff member of an appointment have to
              be enabled for a Ratings and Reviews email to be sent out.
            </p>
          </div>
          <div className='p-4 mt-5 border rounded-lg bg-primary border-grayMid'>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
              <div className='flex items-center mr-3 form-check'>
                <input
                  className='w-5 h-4 form-check-input'
                  type='checkbox'
                  value=''
                  id='treatment1'
                />
                <label
                  className='ml-2 text-sm text-gray-400 form-check-label'
                  htmlFor='treatment1'>
                  Initial Assessment and Treatment (Acupuncture) (60min)
                </label>
              </div>
              <div className='flex items-center mr-3 form-check'>
                <input
                  className='w-5 h-4 form-check-input'
                  type='checkbox'
                  value=''
                  id='treatment2'
                />
                <label
                  className='ml-2 text-sm text-gray-400 form-check-label'
                  htmlFor='treatment2'>
                  Subsequent Treatment (Acupuncture) (30min)
                </label>
              </div>
              <div className='flex items-center mr-3 form-check'>
                <input
                  className='w-5 h-4 form-check-input'
                  type='checkbox'
                  value=''
                  id='treatment22'
                />
                <label
                  className='ml-2 text-sm text-gray-400 form-check-label'
                  htmlFor='treatment22'>
                  Subsequent Treatment (Acupuncture) (30min)
                </label>
              </div>
              <div className='flex items-center mr-3 form-check'>
                <input
                  className='w-5 h-4 form-check-input'
                  type='checkbox'
                  value=''
                  id='treatment3'
                />
                <label
                  className='ml-2 text-sm text-gray-400 form-check-label'
                  htmlFor='treatment3'>
                  Clinical Pilates (Clinical Pilates) (60min)
                </label>
              </div>
              <div className='flex items-center mr-3 form-check'>
                <input
                  className='w-5 h-4 form-check-input'
                  type='checkbox'
                  value=''
                  id='treatment4'
                />
                <label
                  className='ml-2 text-sm text-gray-400 form-check-label'
                  htmlFor='treatment4'>
                  Subsequent Treatment (Acupuncture) (30min)
                </label>
              </div>
              <div className='flex items-center mr-3 form-check'>
                <input
                  className='w-5 h-4 form-check-input'
                  type='checkbox'
                  value=''
                  id='treatment5'
                />
                <label
                  className='ml-2 text-sm text-gray-400 form-check-label'
                  htmlFor='treatment5'>
                  Clinical Pilates (Clinical Pilates) (60min)
                </label>
              </div>
              <div className='flex items-center mr-3 form-check'>
                <input
                  className='w-5 h-4 form-check-input'
                  type='checkbox'
                  value=''
                  id='treatment6'
                />
                <label
                  className='ml-2 text-sm text-gray-400 form-check-label'
                  htmlFor='treatment6'>
                  Subsequent Treatment (Acupuncture) (30min)
                </label>
              </div>
              <div className='flex items-center mr-3 form-check'>
                <input
                  className='w-5 h-4 form-check-input'
                  type='checkbox'
                  value=''
                  id='treatment7'
                />
                <label
                  className='ml-2 text-sm text-gray-400 form-check-label'
                  htmlFor='treatment7'>
                  Clinical Pilates (Clinical Pilates) (60min)
                </label>
              </div>
            </div>
          </div>
          <div className='mt-4 text-right'>
            <YellowBtn btnText='Save Changes' />
          </div>
        </div>
        <div className='py-5 border-b border-gray-700'>
          <div className='gap-3 flex-bet'>
            <div>
              <h3 className='text-lg font-semibold'>Ask For a Google Review</h3>
              <p className='text-gray-400'>
                If you select this option, patients will also be prompted to
                leave a review on your Google Business page after submitting
                their rating.
              </p>
            </div>
            <div>
              <ToggleButton />
            </div>
          </div>
        </div>
        <div className='py-5'>
          <div className='gap-3 flex-bet'>
            <div>
              <p className='text-sm font-medium'>
                Search for your clinic location here and we will find your
                Google Place ID:
              </p>
            </div>
            <div>
              <div className='flex items-center mr-3 form-check'>
                <input
                  className='w-5 h-4 form-check-input'
                  type='checkbox'
                  value=''
                  id='manualy'
                />
                <label
                  className='ml-2 text-sm text-gray-400 form-check-label'
                  htmlFor='manualy'>
                  Manualy enter Place ID
                </label>
              </div>
            </div>
          </div>
          <div className='p-4 mt-5 overflow-x-auto border rounded-lg bg-primary border-grayMid'>
            <div className='grid grid-cols-12 gap-3'>
              <div className='col-span-4'>
                <p className='hidden text-sm text-gray-400 sm:block'>
                  {' '}
                  Location{' '}
                </p>
              </div>
              <div className='col-span-4'>
                <p className='hidden text-sm text-gray-400 sm:block'>
                  {' '}
                  Search Clinic Name{' '}
                </p>
              </div>
              <div className='col-span-4'>
                <p className='hidden text-sm text-gray-400 sm:block'>
                  {' '}
                  Place ID:{' '}
                </p>
              </div>
            </div>
            <div className='grid grid-cols-12 gap-3 mt-3'>
              <div className='items-center col-span-12 sm:col-span-4 sm:flex'>
                <p className='block mb-1 text-sm text-gray-400 sm:hidden'>
                  {' '}
                  Location{' '}
                </p>
                <p className='text-sm font-semibold'> The Village </p>
              </div>
              <div className='col-span-12 sm:col-span-4'>
                <input
                  type='text'
                  className='w-full p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                  placeholder='Enter Location'
                />
              </div>
              <div className='col-span-12 sm:col-span-4'>
                <input
                  type='text'
                  className='w-full p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                  placeholder='Enter Place Id'
                />
              </div>
            </div>
            <div className='grid grid-cols-12 gap-3 mt-3'>
              <div className='items-center col-span-12 sm:col-span-4 sm:flex'>
                <p className='block mb-1 text-sm text-gray-400 sm:hidden'>
                  {' '}
                  Location{' '}
                </p>
                <p className='text-sm font-semibold'>The District </p>
              </div>
              <div className='col-span-12 sm:col-span-4'>
                <input
                  type='text'
                  className='w-full p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                  placeholder='Enter Location'
                />
              </div>
              <div className='col-span-12 sm:col-span-4'>
                <input
                  type='text'
                  className='w-full p-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                  placeholder='Enter Place Id'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='pb-5 border-b border-gray-700'>
          <h6 className='text-sm font-medium'>
            Place ID: The unique ID of your location from Google
          </h6>
          <p className='mt-2 text-sm text-gray-400'>
            The Google Reviews feature gives your patients an opportunity to
            leave a public review on Google after they leave you a review in the
            apps. In order to provide them a link directly to your reviews on
            Google, we’ll need your unique Google Place ID for each of your
            clinic locations.
          </p>
          <div className='mt-3 text-right'>
            <YellowBtn btnText='Save Changes' />
          </div>
        </div>
      </div>
    </>
  )
}
