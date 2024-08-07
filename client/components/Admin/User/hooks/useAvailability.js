import commonApi from '@/api/common'
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { DAILY, TIMESLOT } from '@/utils/constant'

const selectDay = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
}

const activeDays = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
}

const useAvailability = ({ id }) => {
  const [loading, setLoading] = useState(false)

  const [edit, setEdit] = useState()

  const [dailyTimeOptionsData, setDailyTimeOptionsData] = useState([])

  const [timeSlot, setTimeSlot] = useState([])

  const [activeDay, setActiveDay] = useState({})

  const intialSelectedSlot = {
    durations: [],
    daily: [],
  }

  const initialSelectedSlots = {
    0: intialSelectedSlot,
    1: intialSelectedSlot,
    2: intialSelectedSlot,
    3: intialSelectedSlot,
    4: intialSelectedSlot,
    5: intialSelectedSlot,
    6: intialSelectedSlot,
  }

  const [selectedSlots, setSelectedSlots] = useState(initialSelectedSlots)

  useEffect(() => {
    getAllSlots()
  }, [])

  useEffect(() => {
    if (id) {
      getPhysicianSelectedSlots()
    }
  }, [id])

  const dailyTimeSlots = DATA => {
    if (DATA.length) {
      const first = _.first(DATA)

      const last = _.last(DATA)

      const startTime = moment(first?.startTime, 'HH:mm')
      const endTime = moment(last?.endTime, 'HH:mm')

      const interval = 30

      const start = moment(startTime, 'HH:mm')

      const allTimes = []

      while (start <= endTime) {
        allTimes.push(start.format('HH:mm'))
        start.add(interval, 'minutes')
      }

      let slots = []
      allTimes?.map((time, i) => {
        slots = [
          ...slots,
          {
            label: time?.concat(
              (time?.substring(0, 2) === '12' &&
                time?.substring(3, 5) === '30') ||
                time?.substring(0, 2) > 12
                ? ' PM'
                : ' AM'
            ),
            value: time,
          },
        ]
        return time
      })
      return slots
    }
  }

  const getAllSlots = async () => {
    setLoading(true)
    try {
      await commonApi({
        action: 'getAllSlots',
      }).then(async ({ DATA = [] }) => {
        await setTimeSlot(DATA)

        const mon = dailyTimeSlots(DATA.filter(d => d.dayOfWeek === 1))
        setDailyTimeOptionsData(prev => ({
          ...prev,
          mon,
        }))

        const tue = dailyTimeSlots(DATA.filter(d => d.dayOfWeek === 2))
        setDailyTimeOptionsData(prev => ({
          ...prev,
          tue,
        }))

        const wed = dailyTimeSlots(DATA.filter(d => d.dayOfWeek === 3))
        setDailyTimeOptionsData(prev => ({
          ...prev,
          wed,
        }))

        const thu = dailyTimeSlots(DATA.filter(d => d.dayOfWeek === 4))
        setDailyTimeOptionsData(prev => ({
          ...prev,
          thu,
        }))

        const fri = dailyTimeSlots(DATA.filter(d => d.dayOfWeek === 5))
        setDailyTimeOptionsData(prev => ({
          ...prev,
          fri,
        }))

        const sat = dailyTimeSlots(DATA.filter(d => d.dayOfWeek === 6))
        setDailyTimeOptionsData(prev => ({
          ...prev,
          sat,
        }))

        const sun = dailyTimeSlots(DATA.filter(d => d.dayOfWeek === 0))
        setDailyTimeOptionsData(prev => ({
          ...prev,
          sun,
        }))
      })
    } finally {
      setLoading(false)
    }
  }

  const onChange = (e, day) => {
    const key = {
      [day]: {
        isOpen: e.target.checked,
        isDaily: true,
      },
    }
    setActiveDay({ ...activeDay, ...key })

    const dayOfWeek = selectDay[day]

    setSelectedSlots(prev => ({
      ...prev,
      [dayOfWeek]: {
        durations: [],
        daily: [],
      },
    }))
  }

  const onChangeRadio = (e, day) => {
    const key = {
      [day]: {
        isOpen: e.target.checked,
        isDaily: e.target.value === 'TimeSlot' ? false : true,
      },
    }
    setActiveDay({ ...activeDay, ...key })
  }

  const onClickTimeZone = async (data = {}, type, day) => {
    const dayOfWeek = selectDay[day]

    const send = {
      startTime: data.startTime,
      endTime: data.endTime,
      duration: '30',
    }

    if (type === DAILY)
      setSelectedSlots(prev => ({
        ...prev,
        [dayOfWeek]: {
          providerId: id,
          type: type,
          daily: selectedSlots[dayOfWeek].daily.length
            ? [{ ...selectedSlots[dayOfWeek].daily?.[0], ...data }]
            : [send],
          durations: [],
          dayOfWeek: dayOfWeek,
        },
      }))
    else if (type === TIMESLOT) {
      setSelectedSlots(prev => ({
        ...prev,
        [dayOfWeek]: {
          providerId: id,
          type: type,
          daily: [],
          durations: selectedSlots[dayOfWeek].durations.find(
            x => x.startTime === data.startTime && x.endTime === data.endTime
          )
            ? selectedSlots[dayOfWeek].durations.filter(
                x =>
                  x.startTime !== data.startTime && x.endTime !== data.endTime
              )
            : [...selectedSlots[dayOfWeek].durations, send],
          dayOfWeek: dayOfWeek,
        },
      }))
    }
  }

  const getPhysicianSelectedSlots = async () => {
    setLoading(true)
    try {
      await commonApi({
        parameters: [id],
        action: 'getBookedSlots',
      }).then(({ DATA = [] }) => {
        if (DATA.length > 0) {
          setEdit(true)
          DATA.forEach(async (data = {}) => {
            if (data.type === TIMESLOT) {
              await setSelectedSlots(prev => ({
                ...prev,
                [data.dayOfWeek]: {
                  type: data.type,
                  providerId: data.providerId,
                  dayOfWeek: data.dayOfWeek,
                  durations: data.durations,
                  daily: [],
                },
              }))

              const key = {
                [activeDays[data.dayOfWeek]]: {
                  isOpen: true,
                  isDaily: false,
                },
              }
              await setActiveDay(prev => ({ ...prev, ...key }))
            } else if (data.type === DAILY) {
              const first = _.first(data.durations)
              const last = _.last(data.durations)

              await setSelectedSlots(prev => ({
                ...prev,
                [data.dayOfWeek]: {
                  type: data.type,
                  providerId: data.providerId,
                  dayOfWeek: data.dayOfWeek,
                  durations: [],
                  daily: [
                    {
                      startTime: first?.startTime,
                      endTime: last?.endTime,
                      duration: last?.duration,
                    },
                  ],
                },
              }))

              const key = {
                [activeDays[data.dayOfWeek]]: {
                  isOpen: true,
                  isDaily: true,
                },
              }
              await setActiveDay(prev => ({ ...prev, ...key }))
            }
          })
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const onSaveSlots = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      let arr = []

      const data = Object.values(selectedSlots)
      await data?.forEach((x = {}) => {
        if (x.durations.length && x.type === TIMESLOT) {
          arr = [
            ...arr,
            {
              type: x.type,
              durations: x.durations.map(({ _id, ...rest }) => {
                return {
                  ...rest,
                }
              }),
              providerId: x.providerId,
              dayOfWeek: x.dayOfWeek,
            },
          ]
        } else if (x.daily.length && x.type === DAILY) {
          arr = [
            ...arr,
            {
              type: x.type,
              durations: x.daily,
              providerId: x.providerId,
              dayOfWeek: x.dayOfWeek,
            },
          ]
        }
      })

      await commonApi({
        action: edit ? 'updateSlots' : 'createSlots',
        data: arr,
      }).then(({ DATA }) => {
        setSelectedSlots(initialSelectedSlots)
        setEdit()
        getPhysicianSelectedSlots()
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    timeSlot,
    dailyTimeOptionsData,
    activeDay,
    onChange,
    onChangeRadio,
    onClickTimeZone,
    selectedSlots,
    onSaveSlots,
    loading,
  }
}

export default useAvailability
