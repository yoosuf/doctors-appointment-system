// import React, { useState } from "react";
import React, { useState } from 'react'
import Link from 'next/link'
import AddMembership from '@/components/Admin/Membership/AddMembership'
import { YellowBtn } from '@/widget/button/YellowBTN'
import useMembership from '@/components/Admin/Membership/hooks/useMembership'
import DeleteIcon from '@/widget/image/DeleteIcon'
import EditIcon from '@/widget/image/EditIcon'
import DeletePopupModal from '@/widget/modal/DeletePopupModal'
import Loader from '@/widget/loader'
import { componentAccess } from '@/utils/helper'
import { COMPONENT_ACCESS, ROUTE_ACCESS } from '@/utils/constant'

export default function ProfileMembership() {
  const {
    loading,
    memberShipList,
    getAllMemberShipData,
    openModal,
    closeModal,
    openDeleteModal,
    deleteID,
    label,
    onClickDelete,
    openEditModal,
    editData,
    setEditData,
  } = useMembership()
  const [activeMembership, setActiveMembership] = useState(false)

  const AddMembershipModal = async () => {
    await setActiveMembership(true)
    const addMembership = document.getElementById('AddMembershipModal')
    addMembership.classList.add('active')
  }

  return (
    <>
      <div className='px-6 py-6 border-b border-gray-500 setting-header bg-primary'>
        <h3 className='text-lg font-semibold'>Membership</h3>
      </div>
      <div className='p-8 service-details-box'>
        <div className='flex-wrap gap-2 pb-5 border-b border-gray-700 flex-bet'>
          <h3 className='text-lg font-semibold'>Membership</h3>
          {componentAccess(
            ROUTE_ACCESS.MEMBERSHIP,
            COMPONENT_ACCESS.create
          ) && (
            <YellowBtn
              btnText='New Membership'
              onClick={e => {
                e.preventDefault(), AddMembershipModal()
              }}
            />
          )}
        </div>
        <div className='responsive-table'>
          <table className='relative'>
            <tbody>
              {memberShipList.length === 0 ? (
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
                    No Memebership Found
                  </div>
                </>
              ) : (
                <>
                  {memberShipList.map((membership = {}) => (
                    <tr className='gap-3 py-6' key={membership.id}>
                      <td className='px-0 py-6'>
                        <div className='gap-2 mb-2 flex-ver'>
                          <h4 className='text-base font-semibold text-white'>
                            {membership.name?.toUpperCase()}
                          </h4>
                        </div>
                        <p>{membership.description}</p>
                        <p className='text-blueBg w-72'>
                          {membership.planAccess?.map((plan = {}, i) => (
                            <>
                              {i < membership.planAccess.length - 2
                                ? ` ${
                                    plan.quantity + ' ' + plan.categoryId?.name
                                  }, `
                                : i < membership.planAccess.length - 1
                                ? ` ${
                                    plan.quantity + ' ' + plan.categoryId?.name
                                  } and`
                                : ` ${
                                    plan.quantity + ' ' + plan.categoryId?.name
                                  } `}
                            </>
                          ))}
                        </p>
                        {membership.duration?.code === 'MONTHLY' && (
                          <a className='inline-block px-3 py-1 mt-2 text-xs font-medium text-gray-900 rounded-full cursor-pointer bg-yellowBg'>
                            Expire in 1 month
                          </a>
                        )}
                      </td>
                      <td>
                        <h3 className='text-base font-semibold text-white'>
                          ${membership.price}
                        </h3>
                      </td>
                      <td>
                        <div className='gap-5 flex-ver'>
                          {componentAccess(
                            ROUTE_ACCESS.MEMBERSHIP,
                            COMPONENT_ACCESS.softDelete
                          ) && (
                            <a
                              className='cursor-pointer'
                              onClick={() => openModal(membership)}>
                              <DeleteIcon />
                            </a>
                          )}

                          {componentAccess(
                            ROUTE_ACCESS.MEMBERSHIP,
                            COMPONENT_ACCESS.update
                          ) && (
                            <a
                              className='cursor-pointer'
                              onClick={() => openEditModal(membership.id)}>
                              <EditIcon />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
            {loading && <Loader customClass='absolute' />}
          </table>
        </div>
      </div>
      <AddMembership
        activeMembership={activeMembership}
        setActiveMembership={setActiveMembership}
        getAllMemberShipData={getAllMemberShipData}
        editData={editData}
        setEditData={setEditData}
      />

      {openDeleteModal && (
        <DeletePopupModal
          closeModal={closeModal}
          onClickDelete={onClickDelete}
          label={label}
          data={deleteID}
        />
      )}
    </>
  )
}
