import { customStyles } from '@/utils/helper'
import React from 'react'
import AsyncSelect from 'react-select/async'

const Select = ({
  ref = undefined,
  placeholder,
  name,
  defaultOptions,
  loadOptions = () => {},
  value,
  setValue = () => {},
  formik,
  isClearable = false,
  isDisabled = false,
  setOptionsData = () => {},
  isSearchable = true,
}) => {
  const onSelectOption = data => {
    formik.setFieldValue(name, data?.value)
    if (data === null) {
      setValue({})
    } else {
      setValue({
        label: data?.label,
        value: data?.value,
      })
    }
    setOptionsData([data])
  }

  const onChangeInput = data => {
    if (data === '' && defaultOptions?.length === 0) {
      loadOptions()
    }
  }

  return (
    <>
      <AsyncSelect
        styles={customStyles}
        ref={ref}
        isSearchable={isSearchable}
        // cacheOptions
        placeholder={placeholder}
        value={JSON.stringify(value) === '{}' ? null : value}
        isDisabled={isDisabled}
        isClearable={isClearable}
        id={name}
        defaultOptions={defaultOptions}
        loadOptions={loadOptions}
        onInputChange={data => {
          onChangeInput(data)
        }}
        // filterOption={() => true}
        onChange={(data = {}) => {
          onSelectOption(data)
        }}
      />
    </>
  )
}

export default React.memo(Select)
