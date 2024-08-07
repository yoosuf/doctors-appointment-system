import React, { useState } from 'react';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');

  const calculateBMI = () => {
    if (weight && feet && inches) {
      const weightInKg = parseFloat(weight);
      const totalInches = parseInt(feet) * 12 + parseInt(inches);
      const heightInMeters = totalInches * 0.0254; // Convert height from inches to meters
    }
  };

  return (
    <div className='grid grid-cols-3 gap-3'>
      <div>
        <label>Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div>
        <label>Height (feet):</label>
        <input
          type="number"
          value={feet}
          onChange={(e) => setFeet(e.target.value)}
        />
      </div>
      <div>
        <label>Height (inches):</label>
        <input
          type="number"
          value={inches}
          onChange={(e) => setInches(e.target.value)}
        />
      </div>
    </div>
  );
};

export default BMICalculator;
