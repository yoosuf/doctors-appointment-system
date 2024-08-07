import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { logout, sidebarLogoUrl } from '@/utils/helper'
import Link from 'next/link'
import routes from '@/utils/routes'

export default function ServiceHeader({ userData }) {
  const [userImage, setUserImage] = useState(
    userData?.profile_image ? `${userData?.profile_image}` : sidebarLogoUrl
  )

  function Menutoggle(e) {
    const element = document.getElementById('headermenu')
    element.classList.toggle('active')
  }

  // useEffect(() => {
  //   checkUserImage()
  //   return () => {
  //     window.removeEventListener('storage', checkUserImage())
  //   }
  // }, [])

  // const checkUserImage = () => {
  //   window.addEventListener('storage', () => {
  //     setUserImage(
  //       `${
  //         userData?.profile_image
  //       }`
  //     )
  //   })
  // }

  // const openModal = () => {
  //   const quickActionModal = document.getElementById('quickAction')
  //   quickActionModal.classList.add('active')
  //   const modalBody = document.getElementById('top-div')
  //   modalBody.scrollTop = 0
  // }
  // const notificationModalOpen = () => {
  //   const notificationModal = document.getElementById('notificationModal')
  //   notificationModal.classList.add('active')
  // }

  const router = useRouter()

  return (
    <>
      <header className='flex items-center justify-between w-full px-8 py-2 border-b border-gray-500 bg-primary'>
        <Link href={routes.customerDashboard}>
          <a className='navbar-brand'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='149.172'
              height='17.018'
              viewBox='0 0 149.172 17.018'>
              <g id='header-logo' transform='translate(0 0)'>
                <g id='Group' transform='translate(0 -0.491)'>
                  <path
                    id='Path_1'
                    data-name='Path 1'
                    d='M9.962,5.957V5.691C9.962,4.324,8.885,3.543,7,3.543c-1.759,0-2.818.639-2.818,1.65,0,.674.485,1.153,1.508,1.384l3.339.763a7.465,7.465,0,0,1,3.626,1.615,3.989,3.989,0,0,1,1.257,3.105c0,3.372-2.621,5.448-6.875,5.448C2.585,17.491.018,15.4,0,11.759H3.7c.072,1.845,1.131,2.68,3.375,2.68,1.9,0,3.052-.674,3.052-1.828,0-.8-.592-1.366-1.777-1.65l-2.962-.745A8.106,8.106,0,0,1,1.813,8.707,4.064,4.064,0,0,1,.5,5.513C.485,2.372,2.944.491,7.108.491c2.657,0,4.541.781,5.6,2.325a6.519,6.519,0,0,1,.969,3.141Z'
                    fill='#fff'
                  />
                  <path
                    id='Path_2'
                    data-name='Path 2'
                    d='M26.243,17.119,21.576,8.8,19.889,5.638c.054.852.054,1.455.054,1.952.018.87.018,1.828.018,2.857v6.69H16.586V.864h3.841l4.541,8.092c.646,1.224,1.059,2.076,1.669,3.3-.054-.656-.054-1.1-.054-1.579l-.018-1.224V.864h3.375V17.137h-3.7Z'
                    fill='#fff'
                  />
                  <path
                    id='Path_3'
                    data-name='Path 3'
                    d='M36.906,13.853l-1.041,3.265H31.844L37.588.846H42.2l5.223,16.272H43.26l-.9-3.265Zm2.908-9.37-1.993,6.371h3.734Z'
                    fill='#fff'
                  />
                  <path
                    id='Path_4'
                    data-name='Path 4'
                    d='M52.9,17.119H49.2V.864h6.462c2.244,0,3.429.319,4.488,1.242a5.51,5.51,0,0,1,1.777,4.241,5.288,5.288,0,0,1-1.4,3.762A5.267,5.267,0,0,1,56.379,11.6H52.9ZM55.8,8.459a2.126,2.126,0,0,0,2.351-2.236A2.1,2.1,0,0,0,55.8,3.987H52.9v4.49H55.8Z'
                    fill='#fff'
                  />
                </g>
                <g id='Group-1' transform='translate(62.074 -0.491)'>
                  <path
                    id='Path_5'
                    data-name='Path 5'
                    d='M12.234,6.045A3.152,3.152,0,0,0,8.9,3.579c-2.71,0-4.272,1.97-4.272,5.395,0,3.389,1.562,5.412,4.164,5.412a3.251,3.251,0,0,0,3.482-2.875H16.2c-.449,3.691-3.231,5.98-7.306,5.98-4.865,0-7.97-3.318-7.97-8.518C.926,3.756,3.977.491,8.878.491c3.967,0,6.678,2.094,7.126,5.554Z'
                    fill='#f4e649'
                  />
                  <path
                    id='Path_6'
                    data-name='Path 6'
                    d='M22.251,17.119H18.625V.864h7.18c2.118,0,3.3.266,4.29.976a4.08,4.08,0,0,1,1.58,3.407,3.808,3.808,0,0,1-2.746,3.922c1.633.515,2.19,1.366,2.316,3.514l.126,2.325a3.47,3.47,0,0,0,.664,2.129H28.408c-.449-.337-.574-.586-.61-1.42L27.654,13.5c-.144-2.005-1.023-2.893-2.926-2.893H22.269v6.513Zm3.626-9.387c1.364,0,2.1-.674,2.1-1.881s-.736-1.881-2.1-1.881H22.251V7.732Z'
                    fill='#f4e649'
                  />
                  <path
                    id='Path_7'
                    data-name='Path 7'
                    d='M38.566,13.853l-1.041,3.265H33.5L39.248.846h4.613l5.224,16.272H44.9L44,13.853Zm2.908-9.37-1.992,6.371h3.734Z'
                    fill='#f4e649'
                  />
                  <path
                    id='Path_8'
                    data-name='Path 8'
                    d='M61.223,6.045a3.152,3.152,0,0,0-3.339-2.467c-2.71,0-4.272,1.97-4.272,5.395,0,3.389,1.562,5.412,4.164,5.412a3.251,3.251,0,0,0,3.482-2.875H65.19c-.449,3.691-3.231,5.98-7.306,5.98-4.864,0-7.97-3.318-7.97-8.518,0-5.217,3.051-8.482,7.952-8.482,3.967,0,6.7,2.094,7.126,5.554Z'
                    fill='#f4e649'
                  />
                  <path
                    id='Path_9'
                    data-name='Path 9'
                    d='M82.384,17.119H77.95L72.96,9.754,71.434,11.3v5.838H67.808V.864h3.626v6l5.547-6h4.865L75.419,7.27Z'
                    fill='#f4e649'
                  />
                </g>
                <path
                  id='Group-2'
                  d='M2.555,1.108A1.063,1.063,0,0,1,1.478,2.172,1.067,1.067,0,0,1,.383,1.108,1.064,1.064,0,0,1,1.478.061,1.048,1.048,0,0,1,2.555,1.108Zm-1.9,0a.812.812,0,0,0,.826.834.808.808,0,0,0,.808-.834A.823.823,0,0,0,1.478.256.837.837,0,0,0,.652,1.108Zm.646.55H1.047V.611A2.2,2.2,0,0,1,1.46.575a.872.872,0,0,1,.377.071.315.315,0,0,1,.108.231.28.28,0,0,1-.215.248v.018a.3.3,0,0,1,.2.248A1.5,1.5,0,0,0,2,1.658H1.729a.935.935,0,0,1-.09-.248q-.027-.16-.215-.16H1.316v.408Zm0-.6h.108c.144,0,.251-.053.251-.16,0-.089-.072-.16-.233-.16A.312.312,0,0,0,1.28.753v.3Z'
                  transform='translate(146.617 13.939)'
                  fill='#f4e649'
                />
              </g>
            </svg>
          </a>
        </Link>
        <div id='headermenu' className='flex items-center justify-start'>
          <div className='relative ml-5 header-profile'>
            <a>
              <img
                src={userImage}
                className='object-cover w-10 h-10 rounded-full'
                alt=''
              />
            </a>

            <div className='absolute right-0 transition logout -bottom-9'>
              <button
                onClick={e => {
                  e.preventDefault(), logout(router)
                }}
                className='bg-grayMid py-1.5 px-4 w-full rounded-lg flex items-center gap-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
