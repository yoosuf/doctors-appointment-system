import React from 'react'
import useAddMembership from '@/components/Admin/Membership/hooks/useAddMembership'
import SnapCrackButton from '@/widget/common-button'
import CloseIcon from '@/widget/image/CloseIcon'
import Loader from '@/widget/loader'
import { InputField } from '@/components/AppUi/Form/InputField'
import { TextareaField } from '@/components/AppUi/Form/TextareaField'
import { SelectField } from '@/components/AppUi/Form/SelectField'
import DeleteIcon from '@/widget/image/DeleteIcon'

export default function AddMembership (props) {
  const {
    loading,
    formik,
    durationOptions,
    closeBtn,
    editID,
    serviceOptionsData,
    addItem,
    removeItem,
  } = useAddMembership(props)

  const renderedCategories = formik?.values?.categories?.map((item, index) => {
    return (
      <div
        className='grid grid-cols-2 gap-3 mb-3 d-flex align-items-center'
        key={item._id}>
        <div>
          <label htmlFor={`categoryId-${item._id}`} className='block'>
            Select Category
          </label>
          <select
            id={`categoryId-${item._id}`}
            name={`categories[${index}]._id`}
            value={item._id} // Set value directly to item._id
            onChange={e => {
              const { value } = e.target;
              formik.setFieldValue(`categories[${index}]._id`, value);
              formik.setFieldTouched(`categories[${index}]._id`, true); // Mark as touched for validation
            }}
            required={true}
            className='mt-4'>
            <option value=''>Select a value</option> {/* Default option */}
            {serviceOptionsData.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className='gap-3'>
          <div className='flex items-center'>
            <label htmlFor={`quota-${item._id}`} className='block'>
              Quota
            </label>
            <input
              type='text'
              id={`quota-${item._id}`}
              name={`categories[${index}].quota`}
              value={item.quota}
              onChange={e => {
                const { value } = e.target;
                if (value.trim() !== '') {
                  // Check if the value is not empty
                  formik.setFieldValue(`categories[${index}].quota`, value);
                  formik.setFieldTouched(`categories[${index}].quota`, true); // Mark as touched for validation
                }
              }}
              placeholder='Quota'
              required={true}
              className='mt-4'
            />
            {formik.touched.categories &&
              formik.errors.categories &&
              formik.errors.categories[index] &&
              formik.errors.categories[index].quota && (
                <div className='text-red-500'>
                  {formik.errors.categories[index].quota}
                </div>
              )}
            <button
              type='button'
              className='self-end px-3 py-3 ml-2 text-white bg-gray-500 rounded hover:bg-gray-600'
              onClick={() => removeItem(item._id)}>
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <section
          id='AddMembershipModal'
          className='fixed inset-0 z-10 flex h-screen overflow-hidden text-sm activity-modal-main flex-column'
          aria-labelledby='slide-over-title'
          role='dialog'
          aria-modal='true'>
          <div className='absolute inset-0 overflow-hidden'>
            <div
              className='absolute inset-0 transition-opacity bg-black black-layer'
              aria-hidden='true'
              onClick={() =>
                closeBtn(formik.handleReset(formik.resetForm))
              }></div>
            <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal sm:pl-10'>
              <div className='w-screen max-w-xl'>
                <div className='flex flex-col h-full shadow-xl bg-primary'>
                  <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <h2
                          className='text-base font-medium'
                          id='slide-over-title'>
                          {editID ? 'Edit' : 'Add'} Membership Plan
                        </h2>
                      </div>
                      <div className='flex items-center ml-3 h-7'>
                        <button
                          type='button'
                          className='focus:outline-none '
                          onClick={e => {
                            e.preventDefault(),
                              closeBtn(formik.handleReset(formik.resetForm))
                          }}>
                          <span className='sr-only'>Close panel</span>
                          <CloseIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='relative h-full p-4 modal-body'>
                    <div className='grid gap-2 pb-4 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Plans Information</h4>
                      </div>

                      <div className='col-span-9'>
                        <div className=''>
                          <InputField
                            id='name'
                            label={'Plan name'}
                            placeholder={'Enter plan name'}
                            required={true}
                            formik={formik}
                            customClass={`mt-4`}
                          />

                          <TextareaField
                            id='description'
                            label='Description'
                            placeholder='Enter plan description'
                            required={true}
                            formik={formik}
                            customClass={`mt-4`}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-3 border-b border-gray-700 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Price & Duration</h4>
                      </div>
                      <div className='col-span-9'>
                        <div className='grid gap-3 sm:grid-cols-2'>
                          <div>
                            <InputField
                              id='price'
                              label={'Plan price'}
                              placeholder={'Enter plan price'}
                              required={true}
                              formik={formik}
                              customClass={`mt-4`}
                            />
                          </div>
                          <div>
                            <SelectField
                              id='interval'
                              label='Plan Duration'
                              required={true}
                              options={durationOptions}
                              value={durationOptions.find(
                                option =>
                                  option.value === formik.values.interval
                              )}
                              isClearable={true}
                              isSearchable={true}
                              onChange={selectedOption => {
                                formik.setFieldValue(
                                  'interval',
                                  selectedOption?.label
                                )
                              }}
                              formik={formik}
                              customClass={`mt-4`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='grid gap-2 pb-4 mt-4 md:grid-cols-12'>
                      <div className='col-span-3'>
                        <h4 className='font-medium'>Plans Access</h4>
                      </div>
                      <div className={'mb-1 col-span-9'}>
                        {renderedCategories}
                        <button
                          type='button'
                          className='self-end px-3 py-3 text-white bg-gray-500 rounded hover:bg-gray-600'
                          onClick={addItem}>
                          Add Item
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='mt-auto'>
                    <div className='flex items-center justify-end col-span-12 p-4 border-t border-gray-700 buttons'>
                      <button
                        onClick={e => {
                          e.preventDefault(),
                            closeBtn(formik.handleReset(formik.resetForm))
                        }}
                        className='block px-4 py-2 text-sm font-medium text-center text-gray-500 transition border border-gray-700 rounded-lg bg-transprent hover:border-yellowBg'>
                        Close
                      </button>

                      <SnapCrackButton
                        type='submit'
                        text='Save'
                        className='block px-4 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg hover:bg-yellow-400'
                      />
                    </div>
                  </div>
                  {loading && <Loader customClass='absolute' />}
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  )
}
