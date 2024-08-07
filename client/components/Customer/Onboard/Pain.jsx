import React from 'react'
import SnapCrackButton from '@/widget/common-button'
import ServiceHeader from '@/components/Layout/Header/ServiceHeader'
import Link from 'next/link'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file'
import 'react-datepicker/dist/react-datepicker.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Image from 'next/image'
import routes from '@/utils/routes'
import Router from 'next/router'
import usePain from '@/components/Customer/Onboard/hooks/usePain'
import { FRONT_PART, BACK_PART } from '@/utils/constant'
import { isEmpty } from 'lodash'
import DeleteIcon from '@/widget/image/DeleteIcon'
import Loader from '@/widget/loader'

const Pain = user => {
  const pointStyle =
    'cursor-pointer no-select relative body-num flex-cen bg-yellowBg rounded-full h-5 w-5 text-gray-900 z-10 font-medium'
  const {
    chartTemplateData,
    onAddPoint,
    selectedPoint,
    onDeletePoint,
    onChangeText,
    submitPainChart,
    loading,
  } = usePain({
    userData: user,
  })
  const onPainScale = () => {
    return Router.push(routes.painScale)
  }

  return (
    <>
      <div className='relative'>
        <div className='flex flex-col h-screen overflow-y-auto registration-form-main'>
          <ServiceHeader />
          <div className='w-full max-w-3xl p-5 mx-auto sm:p-9 sm:pb-10'>
            <div className='reg-form'>
              <div className='all-steps'>
                <div className='flex items-center justify-between gap-3'>
                  <h3 className='text-xl font-medium'>Onboarding</h3>
                  <p className='text-sm text-gray-400'>STEP 4/8</p>
                </div>
                <div className='grid w-full h-1 grid-cols-8 mt-2 mb-6 rounded-full bg-grayMid'>
                  <div className='h-full col-span-4 rounded-full bg-yellowBg'></div>
                </div>
              </div>
              <h3 className='mb-2 text-2xl font-semibold text-white'>
                Where is the pain?
              </h3>
              <p className='max-w-xl mb-4 text-sm text-gray-400'>
                Show us where it hurts on the body below.
              </p>
              <div className='pb-5 mt-5 mb-5'>
                <Tabs>
                  <TabList className='flex justify-center w-full gap-3 overflow-x-auto front-back-tab'>
                    <Tab className='inline-block py-2 text-gray-400 transition bg-transparent border rounded-lg px-14 border-whiteMid'>
                      <Link href='#'>
                        <a>Front</a>
                      </Link>
                    </Tab>
                    <Tab className='inline-block py-2 text-gray-400 transition bg-transparent border rounded-lg px-14 border-whiteMid'>
                      <Link href='#'>
                        <a>Back</a>
                      </Link>
                    </Tab>
                  </TabList>

                  <TabPanel>
                    <div className='mt-10 text-center'>
                      <div className='relative inline-block body-pic'>
                        <Image
                          src='/images/chiro/body-chart4.svg'
                          width={137}
                          height={308}
                          alt=''
                        />
                        {!isEmpty(FRONT_PART) &&
                          FRONT_PART.map(item => (
                            <div className={item.pointStyle}>
                              <a
                                onClick={e =>
                                  onAddPoint(e, chartTemplateData?.[item.point])
                                }
                                className={pointStyle}>
                                {chartTemplateData?.[item.point]?.point}
                              </a>
                            </div>
                          ))}
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className='mt-10 text-center'>
                      <div className='relative inline-block body-pic'>
                        <Image
                          src='/images/chiro/body-chart1.svg'
                          width={137}
                          height={308}
                          alt=''
                        />
                        {!isEmpty(BACK_PART) &&
                          BACK_PART.map(item => (
                            <div className={item.pointStyle}>
                              <a
                                onClick={e =>
                                  onAddPoint(e, chartTemplateData?.[item.point])
                                }
                                className={pointStyle}>
                                {chartTemplateData?.[item.point]?.point}
                              </a>
                            </div>
                          ))}
                      </div>
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
            {selectedPoint?.map((selected = {}) => (
              <div key={selected._id} className='mt-2'>
                <div className='flex gap-3'>
                  <div className='w-5 h-5 gap-3 text-xs font-semibold text-gray-900 rounded-full bg-yellowBg flex-cen'>
                    <p>{selected.point}</p>
                  </div>
                  <textarea
                    id={selected._id}
                    placeholder='Enter Description'
                    rows='2'
                    value={selected.desc}
                    onChange={e => onChangeText(e)}
                    className='w-full col-span-12 p-3 text-white placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'></textarea>
                </div>
                <div className='mt-2 text-right'>
                  <a
                    onClick={e => onDeletePoint(e, selected._id)}
                    className='inline-flex items-center gap-2 px-4 py-2 text-sm text-center text-gray-500 transition border border-gray-700 rounded-lg cursor-pointer noselect bg-transprent hover:border-yellowBg'>
                    <span>Delete</span>
                    <DeleteIcon className='w-5 h-5' />
                  </a>
                </div>
              </div>
            ))}
            <div className='flex items-center gap-3 pt-5 mt-5'>
              <Link href={routes.ReasonForVisit}>
                <a className='flex items-center justify-center w-full py-2 border border-gray-400 rounded-lg cursor-pointer'>
                  Back
                </a>
              </Link>
              <SnapCrackButton
                onClick={submitPainChart}
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

export default Pain
