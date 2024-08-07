import React from 'react'
import CustomerSidebar from '@/components/Layout/CustomerSidebar/CustomerSidebar'
import useCustomer from '@/components/Admin/Customer/hooks/useCustomer'
import CustomerManagement from '@/components/Admin/Customer/CustomerManagement'

const ManageUser = () => {

  const {
    loading,
    id,
    setID,
    userData = {},
    customerData,
    setCustomerData = () => {},
    onChangeSearch,
    paginator = {},
    changePaginator,
    onClickCustomer,
    setUserData,
    searchValue,
    setSearchValue,
    filterData,
    filterRemove,
    onClickApplyFilter,
    filterModal,
    setFilterModal,
    membershipPlans,
  } = useCustomer()

  return (
    <>
      <div className='grid grid-cols-12'>
        <div className='xl:col-span-3 col-span-0'>
          <CustomerSidebar
            name='Manage Customers'
            loading={loading}
            id={id}
            customerData={customerData}
            onClickCustomer={onClickCustomer}
            onChangeSearch={onChangeSearch}
            paginator={paginator}
            changePaginator={changePaginator}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            filterData={filterData}
            filterRemove={filterRemove}
            onClickApplyFilter={onClickApplyFilter}
            filterModal={filterModal}
            setFilterModal={setFilterModal}
            userData={userData}
          />
        </div>
        <div className='col-span-12 overflow-y-auto xl:col-span-9 details-sec'>
          <CustomerManagement
            id={id}
            userData={userData}
            setUserData={setUserData}
            customerData={customerData}
            setCustomerData={setCustomerData}
            setID={setID}
            membershipPlans={membershipPlans}
            loading={loading}
          />
        </div>
      </div>
    </>
  )
}

export default ManageUser
