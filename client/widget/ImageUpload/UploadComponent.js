import commonApi from '@/api/common'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import toast from 'react-hot-toast'

const UploadComponent = props => {
  const { image, setImage, formik, text } = props

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept:"image/jpg, image/jpeg, image/png,image/webp,image/gif",
    multiple: false,
    onDrop: async (acceptedFiles, rejectedFiles) => {
         
      if (acceptedFiles?.length > 0) {
       
        const folder = 'images'
        const file = acceptedFiles[0]?.name

        const payload = new FormData()
        payload?.append('folder', folder)
        payload?.append('file', acceptedFiles[0], file)

        await commonApi({
          action: 'imgUpload',
          data: payload,
          config: {
            contentType: 'multipart/form-data',
          },
        }).then(({ DATA, MESSAGE }) => {
          toast.success(MESSAGE)
          const imageUrl =
            `${process.env.NEXT_PUBLIC_API_END_POINT}` + DATA?.uri
          setImage(imageUrl)
          formik.setFieldValue('profile_image', DATA?.id)
        })
      } else {
        toast.error(rejectedFiles?.[0]?.errors?.[0]?.message)
      }
    },
  })
  return (
    <>
      <div className=''>
        <div
          {...getRootProps({
            className:
              'dropzone cursor-pointer rounded-lg bg-transprent border border-gray-700 inline-block px-4 py-2 text-white text-sm text-center transition font-medium hover:border-yellowBg',
          })}>
          <input {...getInputProps()} />
          {text}
        </div>
      </div>
    </>
  )
}

export default React.memo(UploadComponent)
