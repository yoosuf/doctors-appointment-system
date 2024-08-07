// import React, { useState } from "react";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
export default function CheckIn1() {
  return (
    <>
      <div className='flex flex-col p-8 checkin2 checkin-bg'>
        <header className='checkin-header flex-bet'>
          <Link href='#'>
            <a className='logo'>
              <Image
                src='/images/checkIn/checkin-page-logo.svg'
                alt=''
                height={60}
                width={158}
              />
            </a>
          </Link>
          <div className='items-center gap-3 sm:flex'>
            <div className='text-sm text-right date sm:text-left'>
              <p>9 March 2021</p>
              <p>Wednesday</p>
            </div>
            <div className='time'>
              <h3 className='text-3xl text-right sm:text-5xl sm:text-left'>
                17:44
              </h3>
            </div>
          </div>
        </header>
        <section className='items-center justify-between gap-3 py-12 my-auto text-center middle-banner md:flex md:py-3 md:text-left'>
          <div className='mb-8 text-center banner-text md:mb-0 md:text-left'>
            <h3 className='text-3xl font-bold uppercase sm:text-4xl'>
              Welcome to snapcrack <br />
              <span className='text-yellowBg'>Self check in</span>
            </h3>
            <p className='my-6 text-gray-300'>
              Please enter your phone number below to get started
            </p>
            <div className='max-w-xs mx-auto md:mx-0'>
              <div className='relative flex items-center col-span-12 lg:col-span-4 sm:col-span-6'>
                <div className='absolute left-3'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'>
                    <path
                      d='M2 3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H5.153C5.38971 2.00011 5.6187 2.08418 5.79924 2.23726C5.97979 2.39034 6.10018 2.6025 6.139 2.836L6.879 7.271C6.91436 7.48222 6.88097 7.69921 6.78376 7.89003C6.68655 8.08085 6.53065 8.23543 6.339 8.331L4.791 9.104C5.34611 10.4797 6.17283 11.7293 7.22178 12.7782C8.27072 13.8272 9.52035 14.6539 10.896 15.209L11.67 13.661C11.7655 13.4695 11.9199 13.3138 12.1106 13.2166C12.3012 13.1194 12.5179 13.0859 12.729 13.121L17.164 13.861C17.3975 13.8998 17.6097 14.0202 17.7627 14.2008C17.9158 14.3813 17.9999 14.6103 18 14.847V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18H15C7.82 18 2 12.18 2 5V3Z'
                      fill='#9CA3AF'
                    />
                  </svg>
                </div>
                <input
                  type='text'
                  className='w-full px-3 py-3 pl-10 placeholder-gray-500 bg-black border border-black rounded-lg'
                  placeholder='eg. 921 333 233'
                />
              </div>
            </div>
            <Link href='#'>
              <a className='inline-flex items-center gap-2 px-6 py-4 mt-8 font-medium text-center text-black transition rounded-lg bg-yellowBg hover:bg-yellow-400'>
                Check In
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-5 h-5'
                    viewBox='0 0 20 20'
                    fill='#3F3F46'>
                    <path
                      fillRule='evenodd'
                      d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
              </a>
            </Link>
          </div>
          <div className='bannerImg'>
            <Image
              src='/images/checkIn/girl-run.svg'
              alt=''
              height={533}
              width={342}
            />
          </div>
        </section>
        <div className='gap-3 lang flex-ver'>
          <div>
            <Image
              src='/images/checkIn/USA.svg'
              alt=''
              height={28}
              width={28}
            />
          </div>
          <Link href='#'>
            <a>
              <span className='text-yellowBg'> EN</span> | SPAIN
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}
