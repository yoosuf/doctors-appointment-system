import React, { useState } from 'react';

const StatusTooltip = ({ remarks }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        aria-describedby="tooltip"
        className="cursor-pointer text-sm px-2 py-0.5 rounded-lg bg-blue-500 text-white focus:outline-none"
      >
        Status
      </button>

      {isHovered && (
        <div
          id="tooltip"
          className="absolute z-50 p-2 mt-2 bg-white rounded-lg shadow-lg"
          style={{
            minWidth: '10rem', // Set a minimum width for the tooltip
            left: '50%', // Adjust the positioning as needed
            transform: 'translateX(-50%)', // Center the tooltip horizontally
          }}
        >
          {remarks}
        </div>
      )}
    </div>
  );
};

export default StatusTooltip;
