import React, { useState, useEffect } from 'react'
import UploadField from '@/components/AppUi/Form/UploadField'
import SnapCrackButton from '@/widget/common-button'
import AuthLayout from '@/components/Layout/AuthLayout'
import useUploadDocs from '@/components/Auth/hooks/register/useUploadDocs'
import CameraPopup from '@/components/AppUi/Form/CameraPopup'
import { Button } from '@/components/AppUi/Form/Button'

export default function IdentityDocs () {
  const [isCameraOpen, setIsCameraOpen] = useState(false)

  const {
    loading,
    identityDocs,
    handleFileChange,
    handleImageCapture,
    handleFileRemove,
    formik,
  } = useUploadDocs()

  useEffect(() => {
    formik.setFieldValue('identityDocs', identityDocs)
  }, [identityDocs])

  const openCamera = () => {
    setIsCameraOpen(true)
  }

  const closeCamera = () => {
    setIsCameraOpen(false)
  }

  const addCapturedImagesToPreview = capturedImage => {
    handleFileChange([capturedImage])
  }

  return (
    <AuthLayout title={`Upload your Proof`} subTitle={`Upload your ID proof`}>
      <form onSubmit={formik.handleSubmit}>
        <div className='mt-8 text-center reg-form'>
          <SnapCrackButton
            type='button'
            text='Take a Photo'
            className='block w-full p-3 mt-8 text-center text-black transition rounded-lg bg-yellowBg hover:bg-yellow-400'
            onClick={openCamera}
          />

          {isCameraOpen && (
            <div
              className='mt-10'
              style={{ display: isCameraOpen ? 'block' : 'none' }}>
              <CameraPopup
                image={null} // Provide the captured image here if needed
                setImage={image => {
                  // Handle the captured image (e.g., set it in state)
                  console.log('Captured Image:', image)
                  // Add the captured image to the UploadField component
                  addCapturedImagesToPreview([image])
                }}
                formik={formik}
                className='camera-modal'
                onImageCapture={handleImageCapture}
              />
              <button
                onClick={closeCamera}
                className='flex items-center justify-center w-40 p-3 mx-auto mt-3 mb-3 text-center transition bg-transparent border border-gray-700 rounded-lg'>
                Close Camera
              </button>
            </div>
          )}

          <div className='relative inline-flex items-center justify-center w-full'>
            <hr className='w-full h-px my-8 bg-gray-600 border-0 dark:bg-gray-700' />
            <span className='absolute px-3 font-medium text-gray-400 -translate-x-1/2 bg-gray-900 left-1/2 dark:text-white dark:bg-gray-900'>
              or
            </span>
          </div>

          <UploadField
            name='identityDocs'
            onFileChange={handleFileChange}
            onFileRemove={index => handleFileRemove(index)} // Pass index to handleFileRemove
            error={formik.touched.identityDocs && formik.errors.identityDocs}
            images={identityDocs.map(image => ({
              file: image.file,
              preview: image.preview,
            }))}
            dropzoneText={{
              active: 'Release files to upload',
              inactive: 'Click or drag the identity documents to upload',
              help: `only .jpg and png file formats are supported`,
            }}
          />

          <div className={`mb-4`}>
            <Button
              kind={'primary'}
              type='submit'
              text={formik.isSubmitting ? 'Please wait...' : 'Next'}
              isDisabled={formik.isSubmitting || !formik.dirty}
              isLoading={formik.isSubmitting}
            />
          </div>
        </div>
      </form>
    </AuthLayout>
  )
}
