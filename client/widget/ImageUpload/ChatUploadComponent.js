import React from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

const ChatUploadComponent = ({ svg, setFiles = () => {} }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept:
      'image/jpeg,image/jpg,image/png,application/pdf,.doc,.docx,application/octet-stream',
    minSize: 0,
    maxSize: 10485760,
    multiple: true,
    onDrop: async (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles?.length > 0) {
        setFiles(prev => [...prev, ...acceptedFiles])
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
            className: 'dropzone cursor-pointer',
          })}>
          <input {...getInputProps()} />
          {svg}
        </div>
      </div>
    </>
  )
}

export default React.memo(ChatUploadComponent)
