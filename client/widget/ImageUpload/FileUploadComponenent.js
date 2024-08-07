import commonApi from '@/api/common'
import { baseUrl } from '@/utils/helper'
import React, { useState, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

const SignupUploadComponent = props => {
  const {
    image,
    setImage,
    formik,
    className,
    text,
    svg,
    type = {},
    text1,
    text2,
  } = props

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".jpeg,.jpg,.png,.gif, application/pdf,.doc,.docx", 
    // accept: type.value
    //   ? type.value
    //   : 'image/png,image/jpg,application/pdf,.doc,.docx',
    multiple: false,
    minSize: 0,
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
        }).then(async ({ DATA, MESSAGE }) => {
          setImage(DATA)
          formik.setFieldValue('imageIds', [DATA?.id])
        })
      } else {
        toast.error(rejectedFiles?.[0]?.errors?.[0]?.message)
      }
    },
  })
  return (
    <>
      <div>
        <div
          {...getRootProps({
            className: className,
          })}>
          <input {...getInputProps()} />
          {svg}
          <p className='text-blue-400'>
            {text} <span>{text1}</span>
          </p>
          <p>{text2}</p>
        </div>
      </div>
      {image && (
        <div className='relative flex items-center justify-center mt-4 overflow-hidden rounded-lg img-select'>
          {image.type === 'application/pdf' ? (
            <embed src={baseUrl + image.uri} className='w-32 h-24' />
          ) : (
            <img src={baseUrl + image.uri} className='w-32 h-24' alt='Snapcrack' />
          )}

          <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black delete-icon'>
            <button
              className='transition focus:outline-none'
              onClick={e => {
                e.preventDefault(),
                  formik.setFieldValue('imageIds', []),
                  setImage()
              }}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 16 16'>
                <path
                  id='delete'
                  d='M14,5.2h4V6.8H16.4V17.2a.8.8,0,0,1-.8.8H4.4a.8.8,0,0,1-.8-.8V6.8H2V5.2H6V2.8A.8.8,0,0,1,6.8,2h6.4a.8.8,0,0,1,.8.8Zm.8,1.6H5.2v9.6h9.6ZM7.6,9.2H9.2V14H7.6Zm3.2,0h1.6V14H10.8ZM7.6,3.6V5.2h4.8V3.6Z'
                  transform='translate(-2 -2)'
                  fill='#dc143c'
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default React.memo(SignupUploadComponent)
