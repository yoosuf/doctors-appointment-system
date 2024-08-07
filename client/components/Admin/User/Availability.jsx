import useAvailability from '@/components/Admin/User/hooks/useAvailability'
import SnapCrackButton from '@/widget/common-button'
import React from 'react'
import Days from './Days'
import Loader from '@/widget/loader'

const Availability = props => {
  const { id, disabled } = props
  const {
    loading,
    timeSlot,
    dailyTimeOptionsData,
    activeDay = {},
    onChange,
    onChangeRadio,
    onClickTimeZone,
    selectedSlots,
    onSaveSlots,
  } = useAvailability({ id })

  const {
    mon = {},
    tue = {},
    wed = {},
    thu = {},
    fri = {},
    sat = {},
    sun = {},
  } = activeDay || {}

  return (
    <div>
      <div>
        <div className='flex flex-wrap items-center justify-between gap-3 py-4'>
          <div className=''>
            <h2 className='text-lg font-bold'>Availability</h2>
            <p className='text-xs'>
              Please define your available dates and times.
            </p>
          </div>
        </div>
        <div className='relative w-full pt-2 pb-4 pl-0 pr-4 rounded-lg auth-shadow bg-primary'>
          <form method='POST'>
            <div className='flex items-center gap-3 mt-3 ml-4'>
              <input
                type='checkbox'
                className='w-4 h-4 text-sm font-bold'
                onChange={e => {
                  onChange(e, 'mon')
                }}
                checked={mon.isOpen}
              />
              <p className='text-sm font-bold'>Monday</p>
            </div>

            <Days
              {...mon}
              day='mon'
              onChangeRadio={onChangeRadio}
              dailyTimeOptionsData={dailyTimeOptionsData.mon}
              timeSlot={timeSlot?.filter(t => t.dayOfWeek === 1)}
              onClickTimeZone={onClickTimeZone}
              selectedSlots={selectedSlots}
              disabled={disabled}
            />

            <div className='flex items-center gap-3 pt-5 mt-5 ml-4 border-t border-gray-600'>
              <input
                type='checkbox'
                className='w-4 h-4 text-sm font-bold'
                onChange={e => {
                  onChange(e, 'tue')
                }}
                checked={tue.isOpen}
              />
              <p className='text-sm font-bold'>Tuesday</p>
            </div>

            <Days
              {...tue}
              day='tue'
              onChangeRadio={onChangeRadio}
              dailyTimeOptionsData={dailyTimeOptionsData.tue}
              timeSlot={timeSlot?.filter(t => t.dayOfWeek === 2)}
              onClickTimeZone={onClickTimeZone}
              selectedSlots={selectedSlots}
              disabled={disabled}
            />

            <div className='flex items-center gap-3 pt-5 mt-5 ml-5 border-t border-gray-600'>
              <input
                type='checkbox'
                className='w-4 h-4 text-sm font-bold'
                onChange={e => {
                  onChange(e, 'wed')
                }}
                checked={wed.isOpen}
              />
              <p className='text-sm font-bold'>Wednesday</p>
            </div>

            <Days
              {...wed}
              day='wed'
              onChangeRadio={onChangeRadio}
              dailyTimeOptionsData={dailyTimeOptionsData.wed}
              timeSlot={timeSlot?.filter(t => t.dayOfWeek === 3)}
              onClickTimeZone={onClickTimeZone}
              selectedSlots={selectedSlots}
              disabled={disabled}
            />

            <div className='flex items-center gap-3 pt-5 mt-5 ml-5 border-t border-gray-600'>
              <input
                type='checkbox'
                className='w-4 h-4 text-sm font-bold'
                onChange={e => {
                  onChange(e, 'thu')
                }}
                checked={thu.isOpen}
              />
              <p className='text-sm font-bold'>Thursday</p>
            </div>

            <Days
              {...thu}
              day='thu'
              onChangeRadio={onChangeRadio}
              dailyTimeOptionsData={dailyTimeOptionsData.thu}
              timeSlot={timeSlot?.filter(t => t.dayOfWeek === 4)}
              onClickTimeZone={onClickTimeZone}
              selectedSlots={selectedSlots}
              disabled={disabled}
            />

            <div className='flex items-center gap-3 pt-5 mt-5 ml-5 border-t border-gray-600'>
              <input
                type='checkbox'
                className='w-4 h-4 text-sm font-bold'
                onChange={e => {
                  onChange(e, 'fri')
                }}
                checked={fri.isOpen}
              />
              <p className='text-sm font-bold'>Friday</p>
            </div>

            <Days
              {...fri}
              day='fri'
              onChangeRadio={onChangeRadio}
              dailyTimeOptionsData={dailyTimeOptionsData.fri}
              timeSlot={timeSlot?.filter(t => t.dayOfWeek === 5)}
              onClickTimeZone={onClickTimeZone}
              selectedSlots={selectedSlots}
              disabled={disabled}
            />

            <div className='flex items-center gap-3 pt-5 mt-5 ml-5 border-t border-gray-600'>
              <input
                type='checkbox'
                className='w-4 h-4 text-sm font-bold'
                onChange={e => {
                  onChange(e, 'sat')
                }}
                checked={sat.isOpen}
              />
              <p className='text-sm font-bold'>Saturday</p>
            </div>

            <Days
              {...sat}
              day='sat'
              onChangeRadio={onChangeRadio}
              dailyTimeOptionsData={dailyTimeOptionsData.sat}
              timeSlot={timeSlot?.filter(t => t.dayOfWeek === 6)}
              onClickTimeZone={onClickTimeZone}
              selectedSlots={selectedSlots}
              disabled={disabled}
            />

            <div className='flex items-center gap-3 pt-5 mt-5 ml-5 border-t border-gray-600'>
              <input
                type='checkbox'
                className='w-4 h-4 text-sm font-bold'
                onChange={e => {
                  onChange(e, 'sun')
                }}
                checked={sun.isOpen}
              />
              <p className='text-sm font-bold'>Sunday</p>
            </div>

            <Days
              {...sun}
              day='sun'
              onChangeRadio={onChangeRadio}
              dailyTimeOptionsData={dailyTimeOptionsData.sun}
              timeSlot={timeSlot?.filter(t => t.dayOfWeek === 0)}
              onClickTimeZone={onClickTimeZone}
              selectedSlots={selectedSlots}
              disabled={disabled}
            />

            <div className='flex items-center justify-end mt-4'>
              {disabled ? (
                ''
              ) : (
                <SnapCrackButton
                  type='button'
                  text='Save Changes'
                  className='block px-4 py-2 mt-4 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg hover:bg-yellow-400'
                  onClick={onSaveSlots}
                />
              )}
            </div>
          </form>
          {loading && <Loader customClass='absolute' />}
        </div>
      </div>
    </div>
  )
}

export default Availability
