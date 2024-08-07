import commonApi from '@/api/common'
import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import toast from 'react-hot-toast'
import DeletePopupModal from 'widget/modal/DeletePopupModal'
import DeleteIcon from '../image/DeleteIcon'

const baseUrl = `${process.env.NEXT_PUBLIC_API_END_POINT}`

const MultiUploadComponent = props => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const [data, setData] = useState('')
  const {
    image,
    setImage,
    formik,
    type = {},
    disabled = false,
    className,
    svg,
    text1,
    text2,
    text3,
  } = props

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".jpeg,.jpg,.png,.gif, application/pdf,.doc,.docx", 
    // accept: type.value
    //   ? type.value
    //   : 'image/png,image/jpg,application/pdf,.doc,.docx',
    multiple: true,
    onDrop: async (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles?.length > 0) {
        const folder = 'images'

        const payload = new FormData()
        payload?.append('folder', folder)

        await acceptedFiles?.map(data => {
          payload?.append('file', data, data?.name)
        })

        await commonApi({
          action: 'imgUpload',
          data: payload,
          config: {
            contentType: 'multipart/form-data',
          },
        }).then(async ({ DATA, MESSAGE }) => {
          toast.success(MESSAGE)
          const data = Array.isArray(DATA) && true

          if (setImage) {
            if (data === true) {
              await setImage(image => [...image, ...DATA])
            } else {
              await setImage(image => [...image, DATA])
            }
          }
        })
      } else {
        toast.error(rejectedFiles?.[0]?.errors?.[0]?.message)
      }
    },
  })

  const onClickDelete = data => {
    const newData = image?.filter(d => d?.id !== data?.id)
    setImage(newData)
    setOpenDeleteModal(false)
  }

  useEffect(async () => {
    if (image) {
      let ids = []
      await image?.map(i => {
        ids = [...ids, i?._id ? i?._id : i?.id]
      })

      formik.setFieldValue('imageIds', ids)
    }
  }, [image])

  return (
    <>
      <div className=''>
        {!disabled && (
          <div
            {...getRootProps({
              className: className,
            })}>
            <input {...getInputProps()} />
            <div className=''>
              {svg}
              <div className='flex flex-wrap items-center justify-center gap-x-2'>
                <label className='relative text-blueBg'>{text1}</label>
                <p className='gray-600'>{text2}</p>
              </div>
              <p className='gray-400'>{text3}</p>
            </div>
          </div>
        )}

        {image && (
          <>
            <div className='flex flex-wrap items-center gap-3'>
              {image?.map(data => (
                <div className='mt-2 overflow-hidden border border-gray-400  single-profile-add rounded-xl'>
                  <div className=''>
                    <div className='relative flex items-center justify-center choose-img'>
                      {data?.type === 'application/pdf' ? (
                        <embed src={baseUrl + data?.uri} />
                      ) : (
                        <img
                          src={baseUrl + data?.uri}
                          alt={data?.name}
                          className='relative object-cover overflow-hidden border border-gray-200'
                        />
                      )}

                      <button
                        className='absolute transition delete-icon focus:outline-none'
                        onClick={e => {
                          setOpenDeleteModal(true)
                          setData(data)
                        }}>
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {openDeleteModal && (
          <DeletePopupModal
            closeModal={e => setOpenDeleteModal(false)}
            onClickDelete={onClickDelete}
            data={data}
            // label={label}
          />
        )}
      </div>
    </>
  )
}

export default React.memo(MultiUploadComponent)
