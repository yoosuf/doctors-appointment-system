import React, { useState } from 'react';
import { Popover } from '@headlessui/react';

const ServicePopover = ({ patientId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover className="relative">
      <Popover.Button 
        onMouseEnter={() => setIsOpen(true)} 
        onMouseLeave={() => setIsOpen(false)}
        className="px-4 py-2 text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600"
      >
        {(patientId?.firstName ? patientId?.firstName : '') +
          ' ' +
          (patientId?.lastName ? patientId?.lastName : '')}
      </Popover.Button>

      {isOpen && (
        <Popover.Panel 
          className="absolute z-10 mt-2 overflow-hidden transition-all bg-white rounded-lg shadow-lg w-52"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="grid grid-cols-2 p-4">
            <a href="/analytics" className="hover:text-blue-500">{patientId?.phone}</a>
            <a href="/engagement" className="hover:text-blue-500">{patientId?.email}</a>
          </div>

          <img src="/solutions.jpg" alt="" className="w-full h-auto" />
        </Popover.Panel>
      )}
    </Popover>
  );
};
