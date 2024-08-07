import React from 'react'
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DropdownButton = ({ MAP, onChange, value, className }) => {
  return (
    <>
      <div className={`w-full flex relative items-center  text-sm col-span-12 ${className}`}>
        <div className='w-full col-span-12 sm:col-span-6'>
          <Listbox value={value} onChange={onChange}>
            {({ open }) => (
              <>
                <div className='z-50 w-full col-span-12'>
                  <Listbox.Button className='relative inline-flex items-center justify-between w-full h-10 col-span-12 px-4 text-gray-400 bg-transparent border border-gray-500 rounded-lg'>
                    <span className='block truncate '>{value.name}</span>
                    <ChevronDownIcon
                      className='w-5 h-5 ml-2 -mr-1'
                      aria-hidden='true'
                    />
                  </Listbox.Button>
                  <Transition
                    show={open}
                    as={Fragment}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <Listbox.Options
                      static
                      className='absolute right-0 w-full mt-2 overflow-y-auto origin-top-right border border-gray-500 divide-y divide-gray-500 rounded-md shadow-lg max-h-60 bg-primary ring-1 ring-black ring-opacity-5 focus:outline-none headless-dropdown'>
                      {MAP.map((person, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `${active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-100'
                            }
                        cursor-pointer select-none relative py-2 pl-10 pr-4 group flex items-center text-sm`
                          }
                          value={person}>
                          {({ value, active }) => (
                            <span>
                              <span
                                className={`${value ? 'font-medium' : 'font-normal'
                                  } block truncate`}>
                                {person.name}
                              </span>
                              {value ? (
                                <span
                                  className={`${active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-100'
                                    } absolute inset-y-0 left-0 flex items-center pl-3`}>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='w-5 h-5'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'>
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth='2'
                                      d='M5 13l4 4L19 7'
                                    />
                                  </svg>
                                </span>
                              ) : null}
                            </span>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
      </div>
    </>
  )
}

export default DropdownButton
