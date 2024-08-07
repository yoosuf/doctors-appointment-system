import React, { useState } from 'react'
import Link from 'next/link'

export default function SingleUser(props) {
  return (
    <>
      <button
        className='w-full'
        onClick={e => {
          e.preventDefault(),
            props.setID(props?.itemId),
            props.setUserData(props?.item)
        }}>
        <button
          className={
            props?.id === props?.itemId
              ? 'single-person-list bg-grayMid w-full flex justify-between items-center px-5 py-4 border-b border-gray-500 transition'
              : 'single-person-list w-full flex justify-between items-center px-5 py-4 border-b border-gray-500 transition hover:bg-grayMid'
          }>
          <div className='flex items-center'>
            <img
              src={props.perImg}
              className='h-10 w-10 rounded-full object-cover'
              alt='Snapcrack'
            />
            <div className='ml-3'>
              <div className='flex items-center'>
                <h3 className='font-medium mr-2'>{props.perName}</h3>
                {props.isActive && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='#22C55E'>
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
              </div>
              <p className='text-gray-400 text-sm text-left'>
                {props.perRole ? props.perRole.replace(/[^a-zA-Z ]/g, ' ') : ''}
              </p>
            </div>
          </div>
          <div className='right-arrow'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              viewBox='0 0 20 20'
              fill='#9CA3AF'>
              <path
                fillRule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </button>
      </button>
    </>
  )
}

export const ReadChat = props => {
  return (
    <div>
      <Link href='#'>
        <a className='single-person-list flex justify-between items-center px-5 py-4 border-b border-gray-500 transition hover:bg-grayMid'>
          <div className='flex items-center'>
            <img
              src={props.perImg}
              className='h-10 w-10 rounded-full object-cover'
              alt=''
            />
            <div className='ml-3'>
              <div className='flex items-center'>
                <h3 className='font-medium mr-2'>{props.perName}</h3>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='#22C55E'>
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <p className='text-gray-400 text-sm'>{props.perNum}</p>
            </div>
          </div>
          <div className='text-gray-400 text-sm'>
            <p>1h ago</p>
          </div>
        </a>
      </Link>
    </div>
  )
}
export const Unread = props => {
  return (
    <div>
      <Link href='#'>
        <a className='single-person-list flex justify-between items-center px-5 py-4 border-b border-gray-500 transition hover:bg-grayMid'>
          <div className='flex items-center'>
            <img
              src={props.perImg}
              className='h-10 w-10 rounded-full object-cover'
              alt=''
            />
            <div className='ml-3'>
              <div className='flex items-center'>
                <h3 className='font-medium mr-2'>{props.perName}</h3>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='#22C55E'>
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <p className='text-yellowBg text-sm'>{props.perNum}</p>
            </div>
          </div>
          <div className='h-5 w-5 rounded-full bg-yellowBg flex-cen text-gray-900 text-sm'>
            <p>{props.unreadNum}</p>
          </div>
        </a>
      </Link>
    </div>
  )
}
