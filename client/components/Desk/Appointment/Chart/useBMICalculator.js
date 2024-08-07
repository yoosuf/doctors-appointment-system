import { useState, useCallback } from 'react'

const useBMICalculator = ({ height, weight }) => {
  const [bmi, setBmi] = useState(null)

  const calculateBMI = useCallback(() => {
    if (height.feet >= 0 && height.inches >= 0 && weight > 0) {
      const totalHeightInMeters = height.feet * 0.3048 + height.inches * 0.0254
      const bmiValue = weight / totalHeightInMeters ** 2
      setBmi(bmiValue)
    } else {
      setBmi(null)
    }
  }, [height, weight])

  return [bmi, calculateBMI]
}

export default useBMICalculator
