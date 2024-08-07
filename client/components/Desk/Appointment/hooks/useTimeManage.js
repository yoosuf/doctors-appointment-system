import { LocalStorage } from '@/utils/localStorage'
import { useState, useEffect } from 'react'

const useTimeManage = props => {
  const id = props?.appointmentDetail?._id
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  // Load the timer state from localStorage when the component mounts
  useEffect(() => {
    if(id){
        const savedState = localStorage.getItem(id)
        if (savedState) {
          const { time, isRunning } = JSON.parse(savedState)
          setTime(time)
          setIsRunning(isRunning)
        }
    }
  }, [id])

  // Save the timer state to localStorage when it changes
  useEffect(() => {
    if(isRunning){
        localStorage.setItem(id, JSON.stringify({ time, isRunning }))
    }
  }, [time, isRunning])

  const start = () => {
    setIsRunning(true)
  }

  const pause = () => {
    setIsRunning(false)
  }

  const reset = () => {
    setIsRunning(false)
    setTime(0)
    localStorage.removeItem(id)
  }

  useEffect(() => {
    let interval

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevSeconds => prevSeconds + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isRunning])

  return {
    time,
    isRunning,
    start,
    pause,
    reset,
  }
}
export default useTimeManage
