import usePainScale from '@/components/Customer/Onboard/hooks/usePainScale'
import routes from '@/utils/routes'
import SnapCrackButton from '@/widget/common-button'
import { isEmpty } from 'lodash'
import Link from 'next/link'
import React from 'react'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-tabs/style/react-tabs.css'
import ServiceHeader from '@/components/Layout/Header/ServiceHeader'
import Loader from '@/widget/loader'

const PainScale = user => {
  const { PAIN_SCALE, setPainScale, painScale, submitPainScale, loading } =
    usePainScale({
      userData: user,
    })

  return (
    <>
      <div>
        <div className='flex flex-col h-screen overflow-y-auto registration-form-main'>
          <ServiceHeader />
          <div className='w-full max-w-3xl p-5 mx-auto sm:p-9 sm:pb-10'>
            <div className='reg-form'>
              <div className='all-steps'>
                <div className='flex items-center justify-between gap-3'>
                  <h3 className='text-xl font-medium'>Onboarding</h3>
                  <p className='text-sm text-gray-400'>STEP 5/8</p>
                </div>
                <div className='grid w-full h-1 grid-cols-8 mt-2 mb-6 rounded-full bg-grayMid'>
                  <div className='h-full col-span-5 rounded-full bg-yellowBg'></div>
                </div>
              </div>
              <h3 className='mb-2 text-2xl font-semibold text-white'>
                Pain Scale
              </h3>
              <p className='max-w-xl mb-4 text-sm text-gray-400'>
                Rate the severity of your discomfort at it’s worst, on a scale
                of 1 - 10
              </p>
              <div className='grid gap-3 pb-5 mt-5 mb-5 border-b border-gray-600'>
                {!isEmpty(PAIN_SCALE) &&
                  PAIN_SCALE.map(scale => {
                    if (scale === 1 || scale === 10) {
                      return (
                        <div className='flex items-center gap-3'>
                          <button
                            className={`p-1 rounded-lg bg-grayLight h-10 w-10 hover:bg-yellowBg hover:text-black transition ${
                              painScale === scale
                                ? 'bg-yellowBg text-black'
                                : 'bg-grayLight border border-gray-600 text-gray-200'
                            }`}
                            onClick={() => setPainScale(scale)}>
                            {scale}
                          </button>
                          <p>{scale === 1 ? 'Least' : 'Most'} severe</p>
                        </div>
                      )
                    } else {
                      return (
                        <div>
                          <button
                            className={`p-1 rounded-lg bg-grayLight h-10 w-10 hover:bg-yellowBg hover:text-black transition ${
                              painScale === scale
                                ? 'bg-yellowBg text-black'
                                : 'bg-grayLight border border-gray-600 text-gray-200'
                            }`}
                            onClick={() => setPainScale(scale)}>
                            {scale}
                          </button>
                        </div>
                      )
                    }
                  })}
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <Link href={routes.pain}>
                <a className='flex items-center justify-center w-full py-2 border border-gray-400 rounded-lg cursor-pointer'>
                  Back
                </a>
              </Link>
              <SnapCrackButton
                onClick={submitPainScale}
                type='button'
                text='Continue'
                className='w-full py-2 font-semibold text-black rounded-lg cursor-pointer bg-yellowBg'
              />
            </div>
          </div>
        </div>
        {loading && <Loader customClass='absolute' />}
      </div>
    </>
  )
}

export default PainScale
