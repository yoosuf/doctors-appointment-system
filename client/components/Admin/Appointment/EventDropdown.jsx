import React from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/24/solid'

const EventDropdown = () => {
  const event = [
    { name: 'Appointment', code: 'APPOINTMENT' },
    { name: 'Event', code: 'EVENT' },
  ]
  const [eventselected, eventsetSelected] = useState(event[0])
  return (
    <>
      <div className='relative '>
        <Listbox value={eventselected} onChange={eventsetSelected}>
          <div className='relative'>
            <Listbox.Button className='flex items-center justify-between w-full px-3 py-2 bg-transparent border border-gray-700 rounded-lg'>
              <span className='block truncate'>{eventselected.name}</span>
              <span className='flex items-center pointer-events-none'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='w-5 h-5 ml-2 -mr-1'
                  aria-hidden='true'>
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'></path>
                </svg>
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <Listbox.Options className='absolute right-0 z-50 w-56 py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-grayMid max-h-60 focus:outline-none sm:text-sm'>
                {event.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `${active ? 'text-white bg-amber-100' : 'text-white'}
                          cursor-default select-none relative py-2 pl-4 pr-10`
                    }
                    value={person}>
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? 'font-medium' : 'font-normal'
                          } block truncate`}>
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? 'text-amber-600' : 'text-amber-600'
                            }
                                absolute inset-y-0 right-4 text-yellowBg flex items-center pl-3`}>
                            <CheckIcon className='w-5 h-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </>
  )
}

export default EventDropdown
