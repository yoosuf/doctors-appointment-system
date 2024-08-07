import React, { useState } from 'react'
import Link from 'next/link'
import HomeCustomerBillingColumn from '@/widget/react-table/homeCustomerBilling'
import ReactTableList from '@/widget/react-table/ReactTableList'
import useCard from '@/components/Customer/Billing/hooks/useCard'
import AddPaymentMethod from './PaymentMethod'
import DeletePopupModal from '@/widget/modal/DeletePopupModal'
import useBillingDetail from '@/components/Customer/Billing/hooks/useBillingDetail'
import OrderOverview from './OrderOverview'

import CreditCard from './CreditCard'

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

const BillingHome = ({ cardDetails }) => {
  const [orderObj, setOrderObj] = useState({})

  const {
    cardData = [],
    openModal,
    closeModal,
    openDeleteModal,
    onDeleteCard,
    label,
    loading,
    CloseBtn,
    formik,
    focus,
    handleInputFocus,
    expiryMonthValidation,
    expiryYearValidation,
    cardNumberValidation,
  } = useCard({ cardDetails })

  const {
    paginator,
    billingDetail,
    setPaginator,
    setBillingDetail,
    loading: loader,
    setLoading,
    dataQueryOptions,
    openInvoicePDF,
    handleDatePicker,
    selectionRange,
    handleSelect,
    setShowDate,
    showDate,
    selectedLocationValue,
    setSelectedLocationValue,
    locationOptionsData,
    loadOptionsLocation,
  } = useBillingDetail()

  const openAddCardModal = async () => {
    const AddPaymentMethodModal = document.getElementById('AddPaymentMethod')
    AddPaymentMethodModal.classList.add('active')
  }

  const openOverviewModel = async (e, data) => {
    const AddOverviewModel = document.getElementById('OrderOverviewModal')
    AddOverviewModel?.classList.add('active')
    setOrderObj(data)
  }

  return (
    <>
      <div className='flex flex-wrap gap-4 my-5 atm-main'>
        {cardData.length > 0 &&
          cardData.map((card = {}) => (
            <CreditCard card={card} openModal={openModal} />
          ))}

        <a
          onClick={() => openAddCardModal()}
          className='flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer add-atm-card bg-primary border-grayLight'>
          <div className='relative text-gray-400 rounded-md cursor-pointer'>
            <span>{cardData.length === 0 ? 'Add Card' : 'Change Card'}</span>
          </div>
        </a>
      </div>
      <div className='overflow-hidden rounded-lg products bg-primary'>
        <div className='grid grid-cols-12 gap-4 p-4'>
          <div className='hidden xl:col-span-1 xl:block'>Invoices</div>
        </div>

        {/* table */}
        <div>
          <ReactTableList
            columns={HomeCustomerBillingColumn(this, openOverviewModel)}
            page={1}
            data={billingDetail}
            recordsFiltered={15}
            paginator={paginator}
            module='customerInvoiceList'
            setTableData={setBillingDetail}
            setPaginator={setPaginator}
            loading={loader}
            setLoading={setLoading}
            dataQueryOptions={dataQueryOptions}
          />
        </div>
        {/* /table */}
      </div>

      <AddPaymentMethod
        loading={loading}
        CloseBtn={CloseBtn}
        formik={formik}
        focus={focus}
        handleInputFocus={handleInputFocus}
        expiryMonthValidation={expiryMonthValidation}
        expiryYearValidation={expiryYearValidation}
        cardNumberValidation={cardNumberValidation}
      />

      <OrderOverview orderObj={orderObj} />

      {openDeleteModal && (
        <DeletePopupModal
          closeModal={closeModal}
          onClickDelete={onDeleteCard}
          label={label}
        />
      )}
    </>
  )
}

export default BillingHome
