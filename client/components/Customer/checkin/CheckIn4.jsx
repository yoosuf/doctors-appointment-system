// import React, { useState } from "react";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Clock from 'react-live-clock';
import moment from 'moment';
import Router from 'next/router';
import routes from '@/utils/routes'

export default function CheckIn1() {
  return (
    <>
      <div className='checkin4 checkin-bg p-8 flex flex-col'>
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
          <div className='sm:flex items-center gap-3'>
            <div className='date text-sm sm:text-left text-right'>
            <p>
                <Clock
                  date={moment()}
                  format={'DD MMMM YYYY'}
                  ticking={true}
                />
              </p>
              <p>
                <Clock
                  date={moment()}
                  format={'dddd'} 
                />
              </p>
            </div>
            <div className='time'>
              <h3 className='sm:text-5xl text-3xl sm:text-left text-right'>
              <Clock
                  format={'HH:mm'}
                  ticking={true}
                />
              </h3>
            </div>
          </div>
        </header>
        <section className='middle-banner md:flex justify-between items-center gap-3 my-auto md:py-3 py-12 md:text-left text-center'>
          <div className='banner-text md:mb-0 mb-8 md:text-left text-center'>
            <h3 className='font-bold sm:text-4xl text-3xl uppercase'>
              Please{' '}
              <span className='text-yellowBg'>
                check your <br />
                Self check in
              </span>
            </h3>
            <p className='my-6 text-gray-300 max-w-xs md:mx-0 mx-auto'>
              we sent link to your phone to authorize your check in, if you want
              to change your phone number please use the button below
            </p>

            <Link href='javascript:void(0)'>
              <a
                onClick={() => Router.push(routes.checkin)}
                className='rounded-lg bg-yellowBg text-black inline-flex items-center px-6 py-4 text-center hover:bg-yellow-400 transition font-medium gap-2 mt-4'
              >
                Change Phone Number
              </a>
            </Link>
          </div>
          <div className='bannerImg'>
            <Image
              src='/images/checkIn/checkin-mobile.png'
              alt=''
              height={463}
              width={229}
            />
          </div>
        </section>
        {/* <div className='lang flex-ver gap-3'>
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
        </div> */}
      </div>
    </>
  )
}
