import commonApi from '@/api/common'
import { SERVICES_TYPE } from '@/utils/constant'
import { customStyles } from '@/utils/helper'
import React, { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async'

const ServicesInfo = props => {
  const [
    serviceSubCategoryOptionsData,
    setServiceSubCategoryOptionsData,
  ] = useState([])
  const [categoriesValue, setCategoriesValue] = useState('')
  const [subCategoriesValue, setSubCategoriesValue] = useState('')

  const {
    serviceCategoryOptionsData,
    index,
    setFieldValue,
    errors,
    values,
    touched,
    remove,
    showAddMoreServices,
    loadOptionsChiro,
    startDate,
    clearServiceInfo,
    setChiroOptionsData,
    setChiroValue,
    setNextAvailableSlot,
    setNextAvailableSlotEnd,
  } = props

  useEffect(() => {
    if (clearServiceInfo) {
      setServiceSubCategoryOptionsData([])
      setCategoriesValue('')
      setSubCategoriesValue('')
    }
  }, [clearServiceInfo])

  const categoryValue = (id, index, callback) => {
    setSubCategoriesValue('')
    setNextAvailableSlot('')
    setNextAvailableSlotEnd('')
    const allData = {
      query: {
        categoryId: id,
        //  locationId: {
        //    $in: getUser()?.locationIds?.map( x=> x)
        //  },
        isActive: true,
      },
      options: {
        pagination: false,
        select: [],
        populate: ['categoryId'],
      },
    }
    try {
      commonApi({
        action: 'findService',
        data: allData,
      }).then(({ DATA = {} }) => {
        const subCategory = DATA?.data?.map(data => ({
          value: data?.id,
          label: data?.name,
        }))
        callback?.(subCategory)
        setServiceSubCategoryOptionsData(subCategory)
      })
    } finally {
    }
  }

  const onChangeCategoryValue = (data, index) => {
    setFieldValue(`appointmentServices.${index}.categoryId`, data?.value),
      categoryValue(data?.value, index)
    setCategoriesValue({
      label: data?.label,
      value: data?.value,
    })

    if (data.label === SERVICES_TYPE.IV_THERAPHIES) {
      showAddMoreServices(false)
    } else {
      showAddMoreServices(true)
    }
  }

  const onChangeSubCategories = async data => {
    setNextAvailableSlot('')
    setNextAvailableSlotEnd('')

    // console.log(`SUB CATEGORY `, data)
    setFieldValue(`appointmentServices.${index}.subCategoryId`, data?.value)
    await setSubCategoriesValue({ value: data?.value, label: data?.label })
  }

  useEffect(() => {
    if (
      values.appointmentServices?.length &&
      values.appointmentServices?.[0]?.subCategoryId &&
      startDate
    ) {
      loadOptionsChiro(values.appointmentServices)
    }
  }, [startDate, values.appointmentServices])

  return (
    <>
      <div
        className='grid gap-3 mb-3 gird-cols-1 sm:grid-cols-2 d-flex align-items-center'
        key={index}>
        <div className=''>
          <AsyncSelect
            styles={customStyles}
            isSearchable
            cacheOptions
            className='text-sm'
            placeholder='Service Categories'
            name='categoryId'
            defaultOptions={serviceCategoryOptionsData}
            filterOption={() => true}
            value={serviceCategoryOptionsData?.filter(
              (f = {}) =>
                f.value === values.appointmentServices[index].categoryId
            )}
            onChange={data => {
              onChangeCategoryValue(data, index)
            }}
          />

          {errors &&
            errors.appointmentServices &&
            errors.appointmentServices[index] &&
            errors.appointmentServices[index].categoryId &&
            touched &&
            touched.appointmentServices &&
            touched.appointmentServices[index] &&
            touched.appointmentServices[index].categoryId && (
              <div className='mt-1 text-sm field-error text-redAlert'>
                {errors.appointmentServices[index].categoryId}
              </div>
            )}
        </div>
        <div className='gap-3'>
          <div className='flex items-center'>
            <AsyncSelect
              styles={customStyles}
              isSearchable
              cacheOptions
              className='w-full text-sm'
              placeholder='Services Item'
              name='subCategoryId'
              defaultOptions={serviceSubCategoryOptionsData}
              filterOption={() => true}
              value={serviceSubCategoryOptionsData.filter(
                (f = {}) =>
                  f.value === values.appointmentServices[index].subCategoryId
              )}
              onChange={data => {
                onChangeSubCategories(data)
              }}
            />
            <button
              type='button'
              className='ml-1 btn-danger'
              onClick={() => remove(index)}
              hidden={values?.appointmentServices?.length === 1 && true}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5'
                viewBox='0 0 20 20'
                fill='#ff0000'>
                <path
                  fillRule='evenodd'
                  d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
          {errors &&
            errors.appointmentServices &&
            errors.appointmentServices[index] &&
            errors.appointmentServices[index].subCategoryId &&
            touched &&
            touched.appointmentServices &&
            touched.appointmentServices[index] &&
            touched.appointmentServices[index].subCategoryId && (
              <div className='mt-1 text-sm field-error text-redAlert'>
                {errors.appointmentServices[index].subCategoryId}
              </div>
            )}
        </div>
      </div>
    </>
  )
}

export default ServicesInfo
