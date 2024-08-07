import React from 'react';

const MedicalHistoryAlert = ({ onBordProg, goToOnboarding }) => {
  return (
    onBordProg < 100 && ( 
        <a
        href='#'
        onClick={goToOnboarding}
        className='flex items-center gap-3 p-4 mb-5 text-sm font-medium text-red-500 bg-red-100 rounded-lg'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='16'
          viewBox='0 0 37 47'
          fill='currentColor'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M13.7178 4.21875C14.5316 2.17334 16.1809 0.53125 18.5 0.53125C20.8191 0.53125 22.4684 2.17334 23.2822 4.21875H36.9375V46.625H0.0625V4.21875H13.7178ZM20.3438 6.0625C20.3438 5.0398 19.5227 4.21875 18.5 4.21875C17.4773 4.21875 16.6562 5.0398 16.6562 6.0625V7.90625H11.125V11.5938H25.875V7.90625H20.3438V6.0625ZM3.75 7.90625H7.4375V15.2812H29.5625V7.90625H33.25V42.9375H3.75V7.90625ZM16.6562 26.3438V20.8125H20.3438V26.3438H25.875V30.0312H20.3438V35.5625H16.6562V30.0312H11.125V26.3438H16.6562Z'
            fill='currentColor'
          />
        </svg>
        Medical history information is needed.
      </a>
    )
  );
}

export default MedicalHistoryAlert;