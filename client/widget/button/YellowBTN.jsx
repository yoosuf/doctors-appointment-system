import React, { useState } from 'react'

export const YellowBtn = props => {
  return (
    <>
      <button
        type={props.type}
        className={` ${props?.customClass} rounded-lg bg-yellowBg focus:outline-none text-black  px-4 py-2 text-center hover:bg-yellow-400 transition inline-block text-sm font-medium whitespace-nowrap`}
        onClick={props.onClick}
        disabled={props.disabled}>
        {props.btnText}
      </button>
    </>
  )
}

export const OutlineBtn = props => {
  return (
    <>
      <button
        type={props.type}
        className={`rounded-lg bg-transprent border border-gray-700 block px-4 py-2 text-sm text-center font-medium transition hover:border-yellowBg ${props?.customClass}`}
        onClick={props.onClick}>
        {props.btnText}
      </button>
    </>
  )
}
