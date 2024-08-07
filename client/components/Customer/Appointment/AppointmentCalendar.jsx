import React, { useState, useEffect, useRef } from 'react'
import Calendar from 'react-calendar' // Assuming you have this library
import moment from 'moment'
import RealTimeTimeago from '@/components/AppUi/Miscellaneous/RealTimeTimeago'

const AppointmentCalendar = ({
  listsData,
  selectedList,
  timeDisplay,
  onChangeDate,
}) => {
  const calendarRef = useRef(null)

  const [calendarDate, setCalendarDate] = useState({
    from: moment().startOf('month').format('YYYY-MM-DD'),
    to: moment().endOf('month').format('YYYY-MM-DD'),
  })
  const [value, setValue] = useState(new Date())

  useEffect(() => {
    onChangeDate(calendarDate) // Notify parent of date changes
  }, [calendarDate])

  const handleCalendarChange = ({ activeStartDate }) => {
    setCalendarDate({
      from: moment(activeStartDate).startOf('month').format('YYYY-MM-DD'),
      to: moment(activeStartDate).endOf('month').format('YYYY-MM-DD'),
    })
  }

  return (
    <div className='grid gap-4'>
      <div className='p-4 transition rounded-lg patient-calendar bg-primary'>
        <div className='mb-3 flex-bet'>
          <h3 className='font-semibold'>Appointments</h3>
          {/* <a onClick={() => onChangeDate()} className='text-gray-400'>
            view all
          </a> */}
        </div>
        <Calendar
          onChange={handleCalendarChange}
          inputRef={calendarRef}
          onActiveStartDateChange={({ activeStartDate }) =>
            setCalendarDate({
              from: moment(activeStartDate)
                .startOf('month')
                .format('YYYY-MM-DD'),
              to: moment(activeStartDate).endOf('month').format('YYYY-MM-DD'),
            })
          }
          showNeighboringMonth={false}
          value={value || new Date()}
          className='bg-primary'
          tileClassName='rounded'
          tileContent={({ date }) => {
            let tempData = listsData.filter(
              listsData =>
                moment(listsData?.appointmentId?.date).utc().format('DD') ===
                moment(date).format('DD')
            )

            const isAppointment = tempData.find(
              listsData => listsData.isActive === 'isActive'
            )

            return (
              <span className='flex items-center justify-center gap-1 mt-2'>
                {isAppointment ? (
                  <p className='w-1.5 h-1.5 bg-green-500 rounded-full'></p>
                ) : (
                  ''
                )}
              </span>
            )
          }}
        />
      </div>

      {/* {JSON.stringify(listsData)} */}

      {selectedList.length > 0 &&
        selectedList.map((list = {}) => (
          <>
            {/* {JSON.stringify(list)} */}
            <div className='flex gap-3 p-5 bg-primary rounded-xl'>
              <div className='w-10 h-10 text-green-700 bg-green-100 rounded-full flex-cen'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
                  />
                </svg>
              </div>
              <div>
                <h3 className='pt-1 mb-1 text-sm text-gray-400'>
                  Checked in <RealTimeTimeago timestamp={list?.date} />
                </h3>

                <ul>
                  {list.services.map(service => (
                    <li key={service._id}>
                      <span className='text-sm text-gray-400'>
                        {service._id.name} by{' '}
                        {service.servedBy ?? `a ` + service.servedBy}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className='pt-2 text-xs text-gray-400'>
                  {list?.locationId?.locationName}
                </p>

                {list?.appointmentId?.availableSlotId ? (
                  <p className='text-xs text-gray-400'>
                    {timeDisplay(list?.appointmentId?.availableSlotId)}
                  </p>
                ) : (
                  ''
                )}
              </div>
            </div>
          </>
        ))}
    </div>
  )
}

export default AppointmentCalendar
