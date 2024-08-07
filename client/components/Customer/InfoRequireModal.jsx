import React from 'react'
import { OutlineBtn, YellowBtn } from '@/widget/button/YellowBTN'
import Router from 'next/router'
import routes from '@/utils/routes'
import { REDIRECT_ONBOARDING } from '@/utils/constant'


export default function InfoRequire() {
  const closeBtn = () => {
    const InfoRequireModal = document.getElementById('InfoRequireModal')
    InfoRequireModal.classList.remove('active')
  }

  const goToOnboarding = () => {
    const InfoRequireModal = document.getElementById('InfoRequireModal')
    const onBordProg = InfoRequireModal?.dataset?.onBordProg
    if (onBordProg === 0) {
      Router.push(routes[REDIRECT_ONBOARDING[0]])
    } else {
      const progress = (onBordProg / 100) * 5
      const redProg = Math.round(progress)
      Router.push(routes[REDIRECT_ONBOARDING[redProg]])
    }
  }

  return (
    <div
      className='fixed inset-0 overflow-y-auto activity-modal-main '
      aria-labelledby='modal-title'
      id='InfoRequireModal'
      role='dialog'
      aria-modal='true'
      onBordProg='0'
      style={{ zIndex: '111' }}>
      <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
        <div
          className='absolute inset-0 transition-opacity bg-black black-layer'
          aria-hidden='true'></div>

        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'>
          &#8203;
        </span>

        <div className='inline-block px-2 py-3 overflow-hidden text-left align-bottom transition-all transform rounded-lg shadow-xl bg-0f0f0f sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
          <div className='mb-3 text-right'>
            <a href='#' onClick={closeBtn}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5 ml-auto'
                viewBox='0 0 20 20'
                fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
          </div>
          <div>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='37'
                height='47'
                viewBox='0 0 37 47'
                fill='none'
                className='mx-auto'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M13.7178 4.21875C14.5316 2.17334 16.1809 0.53125 18.5 0.53125C20.8191 0.53125 22.4684 2.17334 23.2822 4.21875H36.9375V46.625H0.0625V4.21875H13.7178ZM20.3438 6.0625C20.3438 5.0398 19.5227 4.21875 18.5 4.21875C17.4773 4.21875 16.6562 5.0398 16.6562 6.0625V7.90625H11.125V11.5938H25.875V7.90625H20.3438V6.0625ZM3.75 7.90625H7.4375V15.2812H29.5625V7.90625H33.25V42.9375H3.75V7.90625ZM16.6562 26.3438V20.8125H20.3438V26.3438H25.875V30.0312H20.3438V35.5625H16.6562V30.0312H11.125V26.3438H16.6562Z'
                  fill='#FBD63C'
                />
              </svg>
            </div>
            <div className='mt-5 text-center'>
              <h3 className='text-lg font-semibold leading-6' id='modal-title'>
                Important information required!
              </h3>
              <div className='mt-2'>
                <p className='text-sm text-gray-400'>
                  We need some important medical history information from you,
                  before we can provide you with any of our services. Please
                  take a minute to fill out and submit the medical forms.
                </p>
              </div>
            </div>
          </div>
          <div className='mt-5'>
            <div className='gap-3 flex-cen'>
              <OutlineBtn btnText='I’ll do this later' onClick={closeBtn} />
              <YellowBtn
                btnText='Yes, fill out forms'
                onClick={goToOnboarding}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
