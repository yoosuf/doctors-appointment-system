import moment from 'moment'
import React, { useEffect, useRef } from 'react'
import { DateRangePicker } from 'react-date-range'

const RangePicker = ({ showDate, setShowDate, handleSelect, ...props }) => {
  const ref = useRef(null)

  const handleDateChange = ranges => {
    const { selection } = ranges
    handleSelect(ranges)
    if (
      moment(selection.startDate).format('MM-DD-YYYY') !==
      moment(selection.endDate).format('MM-DD-YYYY')
    ) {
      setShowDate && setShowDate(false)
    } else if (selection.startDate === '' && selection.endDate === '') {
      setShowDate && setShowDate(false)
    }
  }

  const onClickOutside = () => {
    setShowDate(false)
  }

  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside()
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [onClickOutside])

  return (
    <>
      {showDate && (
        <div ref={ref}>
          <DateRangePicker
            ranges={
              props.selectionRange ? [props.selectionRange] : [selectionRange]
            }
            onChange={handleDateChange}
            rangeColors={['#FBD63C']}
            color='#262626'
            showDateDisplay={false}
            maxDate = {props.maxDate}
          />
        </div>
      )}
    </>
  )
}
export default RangePicker
