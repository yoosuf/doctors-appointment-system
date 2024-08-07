import React from 'react'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
const AutoFillAddress = ({
  formik,
  className,
  id,
  placeholder,
  type,
  cityKey,
  stateKey,
  zipKey,
  disabled,
}) => {
  const handleSelect = async address => {
    geocodeByAddress(address).then(results => {
      const { address_components } = results?.[0] || {}
      let data = {}
      address_components.forEach(item => {
        item.types?.forEach(type => {
          data[type] = item.long_name
        })
      })
     
      formik.setFieldValue(
        id,
        data?.street_number || data.route
          ? (data?.street_number ? data?.street_number: "") + ' ' + data?.route
          : address
      )
      formik.setFieldValue(cityKey ? cityKey : 'cityId', data?.locality || '')
      formik.setFieldValue(
        stateKey ? stateKey : 'provinceId',
        data?.administrative_area_level_1 || ''
      )
      formik.setFieldValue(
        zipKey ? zipKey : 'postalCodeId',
        data?.postal_code || ''
      )
      formik.setFieldValue('countryId', data?.country || '')
    })
  }

  return (
    <div>
      <PlacesAutocomplete
        value={formik.values[id]}
        onChange={e => {
          formik.setFieldValue(id, e)
        }}
        onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                type: type,
                id: id,
                className: className,
                placeholder: placeholder,
                disabled: disabled,
              })}
              onKeyDown={e => {
                if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
                  //up or down
                  e.preventDefault()
                  return false
                }
              }}
            />
            <div
              className='overflow-hidden rounded-xl position-relative'
              style={{ boxShadow: '0px 2px 22px -2px rgba(0,0,0,0.46)' }}>
              <div
                className='overflow-y-auto autocomplete-dropdown-container common-scrollbar'
                style={{
                  maxHeight: '210px',
                }}>
                {loading && <div className='block py-2 mx-4'>Loading...</div>}

                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item'
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? {
                        backgroundColor: '#ffffff',
                        color: 'black',
                        cursor: 'pointer',
                      }
                    : {
                        backgroundColor: '#000000',
                        color: 'white',
                        cursor: 'pointer',
                      }
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}>
                      {suggestion?.terms?.map(data => {
                        if (data?.value === 'USA') {
                          return (
                            <span className='block py-2 mx-4'>
                              {suggestion.description}
                            </span>
                          )
                        }
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  )
}

export default AutoFillAddress
