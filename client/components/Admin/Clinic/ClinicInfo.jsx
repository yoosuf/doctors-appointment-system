// import React, { useState } from "react";
import React, { useState } from 'react'
import 'react-tabs/style/react-tabs.css'
import { OutlineBtn, YellowBtn } from '@/widget/button/YellowBTN'

import DropdownButton from '@/widget/dropdown/dropdown'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const Lang = [{ name: 'English-America' }]
const Treatment = [{ name: 'Treatment' }]
const Time = [{ name: '1 Week' }]

export default function ClinicInfo() {
  const [lang, setLang] = useState(Lang[0])
  const [treatment, setTreatment] = useState(Treatment[0])
  const [time, setTime] = useState(Time[0])
  return (
    <>
      <div className='pb-5 border-b border-gray-700 flex-bet'>
        <h3 className='text-lg font-semibold'>Clinic Info</h3>
        <div className='flex-wrap gap-3 flex-ver '>
          <OutlineBtn btnText='Cancel' />
          <YellowBtn btnText='Save Changes' />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-5 py-4 border-b border-gray-700 sm:grid-cols-2'>
        <div>
          <h3 className='text-base font-medium'>Name</h3>
          <p className='text-gray-400'>
            Enter the given name of your business. Keep it simple, as this will
            be used throught the apps and you can eventer more official legal
            name of your business below.
          </p>
        </div>
        <div className='flex-cen'>
          <input
            type='text'
            className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
            placeholder='SNAPCRACK'
          />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-5 py-4 border-b border-gray-700 sm:grid-cols-2'>
        <div>
          <h3 className='text-base font-medium'>Legal Name</h3>
          <p className='text-gray-400'>
            Enter the legal name of your business, which will be used on
            invoicesm receipts and printed documents
          </p>
        </div>
        <div className='flex-cen'>
          <input
            type='text'
            className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
            placeholder='SnapCrack Chiropractic'
          />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-5 py-4 border-b border-gray-700 sm:grid-cols-2'>
        <div>
          <h3 className='text-base font-medium'>Website</h3>
          <p className='text-gray-400'>
            Enter your business website address. Your online booking pages will
            link back to this address
          </p>
        </div>
        <div className='flex-cen'>
          <input
            type='text'
            className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
            placeholder='enter website address'
          />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-5 py-4 border-b border-gray-700 sm:grid-cols-2'>
        <div>
          <h3 className='text-base font-medium'>Locale</h3>
          <p className='text-gray-400'>
            Choose a language. This will affect number and currency formats, and
            if available, will display all patient pacing pages in the choosen
            language.
          </p>
        </div>

        <div className='flex-cen'>
          <DropdownButton value={lang} MAP={Lang} onChange={setLang} />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-5 py-4 border-b border-gray-700 sm:grid-cols-2'>
        <div>
          <h3 className='text-base font-medium'>
            How do you refer to the treatments you offer?{' '}
          </h3>
          <p className='text-gray-400'>
            Choose the word that you typically use to describe the treatments
            that your customers book.
          </p>
        </div>
        <div className='flex-cen'>
          <DropdownButton
            value={treatment}
            MAP={Treatment}
            onChange={setTreatment}
          />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-5 py-4 border-b border-gray-700 sm:grid-cols-2'>
        <div>
          <h3 className='text-base font-medium'>Starting Patient Number</h3>
          <p className='text-gray-400'>Next patient Number 117</p>
        </div>
        <div>
          <div className='relative'>
            <div className='absolute top-0 left-0 w-10 h-full text-gray-400 rounded-l-lg bg-grayMid flex-cen -z-1'>
              <p>#</p>
            </div>
            <input
              type='text'
              className='w-full px-3 py-2 pl-12 placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
              placeholder='111'
            />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-5 py-4 border-b border-gray-700 sm:grid-cols-2'>
        <div>
          <h3 className='text-base font-medium'>
            Require staff to sign in after a period of inactivity
          </h3>
          <p className='text-gray-400'>
            If a staff member has not been active within the period of time set
            here, they will be prompted to sign in again.
          </p>
        </div>
        <div className='flex-cen'>
          <DropdownButton value={time} MAP={Time} onChange={setTime} />
        </div>
      </div>
    </>
  )
}
