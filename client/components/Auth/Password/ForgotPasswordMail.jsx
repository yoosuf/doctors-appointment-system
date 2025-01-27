import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SnapCrackButton from '@/widget/common-button'
import useForgotResendLink from '@/components/Auth/hooks/password/useForgotResendLink'
import FollowUs from '@/widget/follow-us'
import AuthLayout from '@/components/Layout/AuthLayout'

export default function ForgotPasswordMail() {
  const openInNewTab = url => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const { onClickResendLink, email, seconds } = useForgotResendLink()
  return (
    <div className='h-screen registration-page authentication-bg'>
      <div className='grid grid-cols-12'>
        <div className='col-span-12 xl:col-span-3 md:col-span-5'>
          <div className='flex flex-col h-screen p-5 overflow-y-auto registration-form-main sm:p-9'>
            <div className='nav-brand'>
              <Link href='#'>
                <a className='inline-block'>
                  <Image
                    src='/images/logo.svg'
                    alt='SnapCrack'
                    width={135}
                    height={46}
                  />
                </a>
              </Link>
            </div>
            <div className='mt-12 text-center reg-form 2xl:mt-24'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='129'
                height='106'
                viewBox='0 0 129 106'
                fill='none'
                className='mx-auto'>
                <g clipPath='url(#clip0)'>
                  <path
                    d='M98.525 105.152H29.4072C26.5953 105.152 24.3457 102.892 24.3457 100.067V61.8145H103.53V100.067C103.586 102.892 101.281 105.152 98.525 105.152Z'
                    fill='#18181B'
                  />
                  <path
                    d='M98.5248 106H29.407C26.1452 106 23.502 103.344 23.502 100.067V60.9668H104.374V100.067C104.43 103.344 101.73 106 98.5248 106ZM25.1891 62.6619V100.067C25.1891 102.384 27.1012 104.305 29.407 104.305H98.4685C100.774 104.305 102.686 102.384 102.686 100.067V62.6619H25.1891Z'
                    fill='#3F3F46'
                  />
                  <path
                    d='M33.7374 38.8174H94.1944C96.6127 38.8174 98.6373 40.795 98.6373 43.2811V65.1479L63.994 89.0487L29.3508 65.1479V43.2811C29.2945 40.8515 31.2629 38.8174 33.7374 38.8174Z'
                    fill='#FAD63C'
                  />
                  <path
                    d='M60.7321 70.8553C60.4509 70.8553 60.226 70.7423 60.001 70.5728L50.9465 62.6623C50.4966 62.2668 50.4404 61.5323 50.8341 61.0802C51.2277 60.6282 51.9588 60.5717 52.4088 60.9672L60.6759 68.1996L78.9536 49.8361C79.4035 49.3841 80.0784 49.3841 80.5283 49.8361C80.9782 50.2881 80.9782 50.9662 80.5283 51.4182L61.5195 70.5163C61.3508 70.7423 61.0133 70.8553 60.7321 70.8553Z'
                    fill='#18181B'
                  />
                  <path
                    d='M98.525 105.152H29.4072C26.5953 105.152 24.3457 102.892 24.3457 100.067V61.8145L63.938 89.1055L103.53 61.8145V100.067C103.586 102.892 101.281 105.152 98.525 105.152Z'
                    fill='#18181B'
                  />
                  <path
                    d='M98.5248 106H29.407C26.1452 106 23.502 103.344 23.502 100.067V61.8144C23.502 61.4754 23.6707 61.1929 23.9519 61.0799C24.2331 60.9104 24.5705 60.9669 24.7954 61.1364L63.9378 88.0884L103.08 61.1364C103.361 60.9669 103.699 60.9669 103.924 61.0799C104.205 61.2494 104.374 61.5319 104.374 61.8144V100.067C104.43 103.344 101.73 106 98.5248 106ZM25.1891 63.3965V100.067C25.1891 102.384 27.1012 104.305 29.407 104.305H98.4685C100.774 104.305 102.686 102.384 102.686 100.067V63.3965L64.3877 89.727C64.1065 89.953 63.7128 89.953 63.4316 89.727L25.1891 63.3965Z'
                    fill='#3F3F46'
                  />
                  <path
                    d='M50.6653 5.1416L53.8709 8.19277L58.2013 7.23222L56.3454 11.2439L58.5387 15.0862L54.2083 14.5211L51.2277 17.8548L50.4403 13.5041L46.3911 11.696L50.2154 9.54885L50.6653 5.1416Z'
                    stroke='#3CBDEE'
                    strokeWidth='2'
                    strokeMiterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M5.50537 24.3525V32.715'
                    stroke='#FBD63C'
                    strokeWidth='2'
                    strokeMiterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M1.34375 28.5342H9.94832'
                    stroke='#FBD63C'
                    strokeWidth='2'
                    strokeMiterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M121.526 39.7217V51.3613'
                    stroke='#3CBDEE'
                    strokeWidth='2'
                    strokeMiterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M115.734 45.542H127.657'
                    stroke='#3CBDEE'
                    strokeWidth='2'
                    strokeMiterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M27.1011 17.8555L32.2751 25.2574'
                    stroke='#3CBDEE'
                    strokeWidth='2'
                    strokeMiterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M77.0411 5.19829C78.4698 5.19829 79.6281 4.03462 79.6281 2.59915C79.6281 1.16368 78.4698 0 77.0411 0C75.6123 0 74.4541 1.16368 74.4541 2.59915C74.4541 4.03462 75.6123 5.19829 77.0411 5.19829Z'
                    fill='#FBD63C'
                  />
                  <path
                    d='M86.8829 26.3872C87.5972 26.3872 88.1763 25.8054 88.1763 25.0877C88.1763 24.3699 87.5972 23.7881 86.8829 23.7881C86.1685 23.7881 85.5894 24.3699 85.5894 25.0877C85.5894 25.8054 86.1685 26.3872 86.8829 26.3872Z'
                    fill='#FBD63C'
                  />
                  <path
                    d='M114.946 18.5332L110.785 23.901'
                    stroke='#FBD63C'
                    strokeWidth='2'
                    strokeMiterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M8.09219 52.5484C9.45883 52.5484 10.5667 51.4354 10.5667 50.0623C10.5667 48.6893 9.45883 47.5762 8.09219 47.5762C6.72555 47.5762 5.61768 48.6893 5.61768 50.0623C5.61768 51.4354 6.72555 52.5484 8.09219 52.5484Z'
                    stroke='#3CBDEE'
                    strokeWidth='2'
                    strokeMiterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </g>
                <defs>
                  <clipPath id='clip0'>
                    <rect
                      width='128'
                      height='106'
                      fill='white'
                      transform='translate(0.5)'
                    />
                  </clipPath>
                </defs>
              </svg>
              <h3 className='mt-5 mb-2 text-2xl font-semibold text-white'>
                Check your email
              </h3>
              <p className='max-w-xs mx-auto text-sm text-gray-400'>
                we already sent link to recover your password to your email
                address {email}
              </p>

              <div className='mx-auto mt-6'>
                <a
                  onClick={() => openInNewTab('https://mail.google.com/')}
                  className='block w-full px-3 py-2 text-center text-black transition rounded-lg cursor-pointer bg-yellowBg hover:bg-yellow-400'>
                  Open Email
                </a>
                {seconds === 0 ? (
                  <SnapCrackButton
                    type='button'
                    text={`Resend link `}
                    className='block w-full p-3 mt-3 text-center transition border border-gray-700 rounded-lg bg-transprent'
                    // renderLoader={loading}
                    onClick={e => onClickResendLink(e)}
                  />
                ) : (
                  <SnapCrackButton
                    type='button'
                    text={`${seconds} sec`}
                    className='block w-full p-3 mt-3 text-center transition border border-gray-700 rounded-lg bg-transprent'
                  />
                )}
              </div>
            </div>
            <FollowUs />
          </div>
        </div>
        <div className='hidden xl:col-span-9 md:col-span-7 md:block'>
          <div className='registration-bg'></div>
        </div>
      </div>
    </div>
  )
}
