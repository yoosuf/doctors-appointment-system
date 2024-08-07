import React from 'react'
import AsyncSelect from 'react-select/async'
import { customStyles } from '@/utils/helper'
import moment from 'moment'

const Days = props => {
  if (!props.isOpen) return false
  const { day, selectedSlots, disabled } = props

  const selectDay = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
  }

  return (
    <>
      <div className='ml-4'>
        <div className='flex items-center justify-between'>
          <div
            className='flex items-center gap-4 mt-2'
            onChange={e => {
              props.onChangeRadio(e, props.day)
            }}>
            <div className='flex items-center text-xs'>
              <input
                type='radio'
                className='cursor-pointer'
                id='Daily'
                name={props.day}
                value='Daily'
                checked={props.isDaily}
              />
              &nbsp;
              <label htmlFor='Daily'>Daily</label>
            </div>
            <div className='flex items-center text-xs'>
              <input
                type='radio'
                className='cursor-pointer'
                id='timeSlot'
                name={props.day}
                value='TimeSlot'
                checked={!props.isDaily}
              />
              &nbsp;
              <label htmlFor='timeSlot'>Time slot</label>
            </div>
          </div>
        </div>
        {props.isOpen && props.isDaily && (
          <div className='grid grid-cols-2 gap-4 mt-3'>
            <div>
              <AsyncSelect
                styles={customStyles}
                isSearchable
                cacheOptions
                placeholder='Start Time'
                value={selectedSlots[selectDay[day]].daily?.map((d = {}) => {
                  if (d.startTime) {
                    return {
                      label: d.startTime?.concat(
                        (d.startTime?.substring(0, 2) === '12' &&
                          d.startTime?.substring(3, 5) === '30') ||
                          d.startTime?.substring(0, 2) > 12
                          ? ' PM'
                          : ' AM'
                      ),
                      value: d.startTime,
                    }
                  }
                  return null
                })}
                isOptionDisabled={option =>
                  selectedSlots[selectDay[day]].daily?.length > 0
                    ? option.value.substring(0, 2) <
                      selectedSlots[
                        selectDay[day]
                      ].daily?.[0]?.endTime?.substring(0, 2)
                      ? false
                      : true
                    : false
                }
                defaultOptions={props.dailyTimeOptionsData}
                filterOption={() => true}
                onChange={data => {
                  const label = data?.label?.substring(0, 5)
                  const value = {
                    startTime: label,
                  }
                  props.onClickTimeZone(value, 'DAILY', props.day)
                }}
                isDisabled={disabled ? true : false}
              />
            </div>
            <div>
              <AsyncSelect
                styles={customStyles}
                isSearchable
                cacheOptions
                className='text-sm'
                placeholder='End Time'
                isOptionDisabled={option =>
                  selectedSlots[selectDay[day]].daily?.length > 0
                    ? option.value.substring(0, 2) >
                      selectedSlots[
                        selectDay[day]
                      ].daily?.[0]?.startTime?.substring(0, 2)
                      ? false
                      : true
                    : false
                }
                value={selectedSlots[selectDay[day]].daily?.map((d = {}) => {
                  if (d.endTime) {
                    return {
                      label: d.endTime?.concat(
                        (d.endTime?.substring(0, 2) === '12' &&
                          d.endTime?.substring(3, 5) === '30') ||
                          d.endTime?.substring(0, 2) > 12
                          ? ' PM'
                          : ' AM'
                      ),
                      value: d.endTime,
                    }
                  }
                  return null
                })}
                defaultOptions={props.dailyTimeOptionsData}
                filterOption={() => true}
                onChange={data => {
                  const label = data?.label?.substring(0, 5)
                  const value = {
                    endTime: label,
                    duration: '30',
                  }
                  props.onClickTimeZone(value, 'DAILY', props.day)
                }}
                isDisabled={disabled ? true : false}
              />
            </div>
          </div>
        )}
        {props.isOpen && !props.isDaily && (
          <div className='time-slot flex items-center flex-wrap gap-2 mt-3'>
            {props.timeSlot?.map((data = {}) => {
              const timeZone = data.endTime.slice(0, 2)
              return (
                <button
                  onClick={e => {
                    e.preventDefault(),
                      props.onClickTimeZone(data, 'TIMESLOT', props.day)
                  }}
                  disabled={disabled ? true : false}
                  className={
                    selectedSlots[selectDay[day]].durations.length
                      ? selectedSlots[selectDay[day]].durations.map((d = {}) =>
                          d.startTime === data.startTime &&
                          d.endTime === data.endTime
                            ? `sm:pl-2 sm:pr-2 border text-black border-gray-400 bg-yellowBg px-2 py-1.5 rounded-lg ${
                                disabled
                                  ? 'cursor-not-allowed'
                                  : 'cursor-pointer'
                              } `
                            : `sm:pl-2 sm:pr-2 border border-gray-400 px-2 py-1.5 rounded-lg ${
                                disabled
                                  ? 'cursor-not-allowed'
                                  : 'cursor-pointer'
                              }`
                        )
                      : `sm:pl-2 sm:pr-2 border border-gray-400 px-2 py-1.5 rounded-lg ${
                          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                        }`
                  }>
                  {data.startTime + '-' + data.endTime}
                  {timeZone >= 12 ? ' PM' : ' AM'}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default Days
