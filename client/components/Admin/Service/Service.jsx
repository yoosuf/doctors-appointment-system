// import React, { useState } from "react";
import React from 'react'
import Link from 'next/link'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import useServices from '@/components/Admin/Service/hooks/useServices'
import DeletePopupModal from '@/widget/modal/DeletePopupModal'
import Loader from '@/widget/loader'
import AddService from './AddService'
import ToggleButton from '@/widget/ToggleButton'
import { YellowBtn } from '@/widget/button/YellowBTN'
import { componentAccess } from '@/utils/helper'
import { COMPONENT_ACCESS, ROUTE_ACCESS } from '@/utils/constant'
import DeleteIcon from '@/widget/image/DeleteIcon'
import EditIcon from '@/widget/image/EditIcon'
import Pagination from '@/widget/Pagination/Pagination'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProfileServicesPage() {
  const {
    loading,
    service,
    paginator,
    setPaginator,
    setLoading,
    setService,
    dataQueryOptions,
    activeService,
    setActiveService,
    getAllServices,
    onClickEdit,
    editData,
    setEditData,
    // Modal State
    isActiveDelete,
    openModal,
    closeModal,
    onClickDelete,
    deleteID,
    label,
  } = useServices()

  const openAddServiceModal = async () => {
    await setActiveService(true)
    const addService = document.getElementById('AddServicesModal')
    addService.classList.add('active')
  }

  return (
    <>
      <div className='flex-wrap gap-2 pb-5 border-b border-gray-700 flex-bet'>
        <h3 className='text-lg font-semibold'>Services</h3>
        <div className='flex-wrap gap-3 flex-ver'>
          {/* <div className='form-group'>
            <Menu as='div' className='relative inline-block w-full text-left'>
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button className='inline-flex items-center justify-between w-full rounded-md border w-full px-3 py-1.5 bg-transparent border border-gray-700 rounded-lg placeholder-gray-500 relative text-gray-400 gap-3'>
                      <h4 className='text-sm '>Show All Categories</h4>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-6 h-6'
                        viewBox='0 0 20 20'
                        fill='#9CA3AF'>
                        <path
                          fillRule='evenodd'
                          d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </Menu.Button>
                  </div>

                  <Transition
                    show={open}
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'>
                    <Menu.Items
                      static
                      className='absolute right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <div className='py-1'>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='#'
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'group flex items-center px-4 py-2 text-sm'
                              )}>
                              abc
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='#'
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'group flex items-center px-4 py-2 text-sm'
                              )}>
                              abc
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div> */}
          {componentAccess(ROUTE_ACCESS.SERVICE, COMPONENT_ACCESS.create) && (
            <div>
              <YellowBtn btnText='New Services' onClick={openAddServiceModal} />
            </div>
          )}
        </div>
      </div>
      <div className='responsive-table'>
        <table className='relative'>
          <tbody>
            {service.length === 0 ? (
              <>
                <div className='flex items-center justify-center mt-20 text-xl'>
                  <div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-24 h-24'
                      viewBox='0 0 20 20'
                      fill='currentColor'>
                      <path d='M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z' />
                    </svg>
                  </div>
                </div>
                <div className='flex items-center justify-center mb-16 text-2xl'>
                  No Services Found
                </div>
              </>
            ) : (
              <>
                {service.map((data = {}) => (
                  <>
                    <tr className='py-6'>
                      <td className='p-3'>
                        <div className='gap-2 mb-2 flex-ver whitespace-nowrap'>
                          <h4 className='text-base font-semibold text-white'>
                            {data.name}
                          </h4>
                          <a className='px-3 py-1 text-xs font-medium text-gray-900 rounded-full cursor-pointer bg-greenBg'>
                            {data.categoryId?.name}
                          </a>
                        </div>
                        <p>{data.description}</p>
                        {data.timeDuration && (
                          <p>
                            Treatment Length : {data.timeDuration} Minutes.
                            Scheduled Length : {data.timeDuration}
                            Minutes
                          </p>
                        )}

                        <p>
                          {' '}
                          {data.onlineBookingEnabled &&
                            'Available in Online Booking'}
                        </p>

                        {/* <p>
                          Offered at
                          <span className='ml-1 text-blueBg'>
                            The Village, The District and 3 other Locations
                          </span>
                        </p> */}
                      </td>
                      <td className='p-3'>
                        <h3 className='text-base font-semibold text-white'>
                          ${data.price?.toFixed(2)}
                        </h3>
                      </td>
                      <td>
                        <div className='gap-3 flex-ver'>
                          {componentAccess(
                            ROUTE_ACCESS.SERVICE,
                            COMPONENT_ACCESS.softDelete
                          ) && (
                            <a
                              className='cursor-pointer'
                              onClick={() => openModal(data)}>
                              <DeleteIcon />
                            </a>
                          )}

                          {componentAccess(
                            ROUTE_ACCESS.SERVICE,
                            COMPONENT_ACCESS.update
                          ) && (
                            <a
                              className='cursor-pointer'
                              onClick={() => onClickEdit(data)}>
                              <EditIcon />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                    {isActiveDelete && (
                      <DeletePopupModal
                        closeModal={closeModal}
                        onClickDelete={onClickDelete}
                        data={deleteID}
                        label={label}
                      />
                    )}
                  </>
                ))}
              </>
            )}
          </tbody>
          {loading && <Loader customClass='absolute' />}
        </table>
        <Pagination
          paginator={paginator}
          setPaginator={setPaginator}
          setLoading={setLoading}
          dataQueryOptions={dataQueryOptions}
          setTableData={setService}
          module='findService'
        />
      </div>
      <AddService
        activeService={activeService}
        setActiveService={setActiveService}
        getAllServices={getAllServices}
        editData={editData}
        setEditData={setEditData}
      />
    </>
  )
}
