import usePage from '@/components/Admin/Page/hooks/usePage'
import { COMPONENT_ACCESS, ROUTE_ACCESS } from '@/utils/constant'
import { componentAccess } from '@/utils/helper'
import { YellowBtn } from '@/widget/button/YellowBTN'
import EditIcon from '@/widget/image/EditIcon'
import Loader from '@/widget/loader'
import Pagination from '@/widget/Pagination/Pagination'
import React, { useState } from 'react'
import DeleteIcon from '@/widget/image/DeleteIcon'
import DeleteProductModel from './DeletePageModel'
import PageForm from './PageForm'

const Page = () => {
  const [productId, setProductId] = useState(null)

  const {
    loading,
    editID,
    createForm,
    editForm,
    openDeleteModal,
    closeBtn,
    activePage,
    formik,
    submitLoading,
    // Pagination State
    pages,
    paginator,
    setPaginator,
    setPages,
    setLoading,
    dataQueryOptions,
    //
    locationValue,
    setLocationValue,
    // Dropdown State and Method
    loadOptionsProductLocation,
    productLocationOptionsData,
    setProductLocationOptionsData,
    deletePage,
  } = usePage()

  return (
    <>
      <div className='px-6 py-6 border-b border-gray-500 setting-header bg-primary'>
        <h3 className='text-lg font-semibold'>Pages</h3>
        {/* <p className='text-gray-400'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p> */}
      </div>
      <div className='p-8 service-details-box'>
        <div className='flex-wrap gap-2 pb-5 border-b border-gray-700 flex-bet'>
          <h3 className='text-lg font-semibold'>Pages</h3>
          {componentAccess(ROUTE_ACCESS.PRODUCT, COMPONENT_ACCESS.create) && (
            <YellowBtn
              btnText='New Page'
              onClick={e => {
                e.preventDefault(), createForm()
              }}
            />
          )}
        </div>
        <div className='responsive-table'>
          {pages.length === 0 ? (
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
                No Pages Found
              </div>
            </>
          ) : (
            <>
              <table className='relative profile-service-table'>
                <thead>
                  <tr>
                    <th className='pl-2 pr-2'>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map((page = {}) => (
                    <tr key={page.id}>
                      <td className='p-0'>
                        {/* <div className='gap-2 overflow-hidden flex-ver w-60 whitespace-nowrap overflow-ellipsis'> */}
                          <h3 className='text-base font-medium'>
                            Terms of condition
                          </h3>
                          <p className='text-gray-400'>
                            {page.locationIds?.[0].locationName}
                          </p>
                        {/* </div> */}
                      </td>
                      <td className='gap-5 flex-ver'>
                        <a
                          className='cursor-pointer'
                          onClick={() => {
                            openDeleteModal(page.id)
                            setProductId(page.id)
                          }}>
                          <DeleteIcon />
                        </a>
                        <a
                          className='cursor-pointer'
                          onClick={() => editForm(page.id)}>
                          <EditIcon />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* <Pagination
                paginator={paginator}
                module='findProduct'
                setPaginator={setPaginator}
                setTableData={setPages}
                setLoading={setLoading}
                dataQueryOptions={dataQueryOptions}
              /> */}
            </>
          )}
          {loading && <Loader customClass='absolute' />}
        </div>
      </div>
      <DeleteProductModel productId={productId} action={deletePage} />

      <PageForm
        activePage={activePage}
        closeBtn={closeBtn}
        formik={formik}
        loading={submitLoading}
        locationValue={locationValue}
        setLocationValue={setLocationValue}
        loadOptionsProductLocation={loadOptionsProductLocation}
        productLocationOptionsData={productLocationOptionsData}
        setProductLocationOptionsData={setProductLocationOptionsData}
        editID={editID}
      />
    </>
  )
}

export default Page
