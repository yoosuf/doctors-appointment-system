// import React, { useState } from "react";
import React, { useState } from 'react'
import Image from 'next/image'
import 'react-tabs/style/react-tabs.css'
import DeletePopupModal from '@/widget/modal/DeletePopupModal'
import useServiceCategory from '@/components/Admin/Service/hooks/useServiceCategory'
import { YellowBtn } from '@/widget/button/YellowBTN'
import AddCategory from './AddCategory'
import { componentAccess } from '@/utils/helper'
import { COMPONENT_ACCESS, ROUTE_ACCESS } from '@/utils/constant'
import EditIcon from '@/widget/image/EditIcon'
import DeleteIcon from '@/widget/image/DeleteIcon'
import Loader from '@/widget/loader'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProfileServiceCategory() {
  const [activeServiceCategory, setActiveServiceCategory] = useState(false)

  const openAddCategory = async () => {
    await setActiveServiceCategory(true)
    const AddService = document.getElementById('AddCategoryModal')
    AddService.classList.add('active')
  }

  const {
    loading,
    submitLoading,
    closeBtn,
    formik,
    serviceCategoryOptionsData,
    serviceCategoryValue,
    setServiceCategoryValue,
    serviceCategory,
    onClickEdit,
    editID,
    closeModal,
    openModal,
    isActiveDelete,
    onClickDelete,
    label,
    deleteID,
  } = useServiceCategory({
    activeServiceCategory,
    setActiveServiceCategory,
  })

  return (
    <>
      <div className='flex-wrap gap-2 pb-5 border-b border-gray-700 flex-bet'>
        <h3 className='text-lg font-semibold'>Services Categories</h3>
        {componentAccess(ROUTE_ACCESS.CATEGORY, COMPONENT_ACCESS.create) && (
          <YellowBtn btnText='New Categories' onClick={openAddCategory} />
        )}
      </div>
      <div className='responsive-table'>
        <table className='relative profile-service-table'>
          <tbody>
            {serviceCategory.length === 0 ? (
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
                  No Category Found
                </div>
              </>
            ) : (
              <>
                {serviceCategory.map(category => (
                  <>
                    <tr className='gap-5 flex-bet'>
                      <td className='p-0'>
                        <div className='gap-3 mb-2 flex-ver'>
                          <div className=''>
                            <div className='h-14 w-14'>
                              <Image
                                src={
                                  category?.name === 'iV Therapies'
                                    ? '/images/Order2.svg'
                                    : category?.name === 'Vitamins Injection'
                                    ? '/images/Order3.svg'
                                    : '/images/Order4.svg'
                                }
                                alt='Snapcrack'
                                height={56}
                                width={56}
                              />
                            </div>
                          </div>
                          <div>
                            <h3 className='mb-1 text-base font-semibold text-white'>
                              {category?.name}
                            </h3>
                            <p>{category?.description}</p>
                            <p className='text-white'>
                              {category.onlineBookingEnabled &&
                                'Online Booking Enabled'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='gap-3 flex-ver'>
                        {componentAccess(
                          ROUTE_ACCESS.CATEGORY,
                          COMPONENT_ACCESS.softDelete
                        ) && (
                          <a
                            className='cursor-pointer'
                            onClick={() => openModal(category)}>
                            <DeleteIcon />
                          </a>
                        )}

                        {componentAccess(
                          ROUTE_ACCESS.CATEGORY,
                          COMPONENT_ACCESS.update
                        ) && (
                          <a
                            className='cursor-pointer'
                            onClick={() => onClickEdit(category)}>
                            <EditIcon />
                          </a>
                        )}
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
      </div>
      <AddCategory
        loading={submitLoading}
        closeBtn={closeBtn}
        formik={formik}
        serviceCategoryOptionsData={serviceCategoryOptionsData}
        serviceCategoryValue={serviceCategoryValue}
        setServiceCategoryValue={setServiceCategoryValue}
        editID={editID}
      />
    </>
  )
}
