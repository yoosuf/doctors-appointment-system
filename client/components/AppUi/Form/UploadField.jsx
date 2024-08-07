import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'
import { TrashIcon } from '@heroicons/react/24/solid'

const FilePreview = ({ file, onRemove }) => (
  <div className='mb-4'>
    <div className='flex items-center justify-between mb-2'>
      <img
        src={file.preview}
        alt='Image preview'
        width={250}
        height={150}
        className='rounded-md shadow-sm'
      />
      <button
        type='button'
        onClick={() => onRemove(file)}
        className='px-2 py-1 ml-2 text-white bg-red-500 rounded hover:bg-red-600'>
        <TrashIcon className='w-5 h-5' aria-hidden='true' />
      </button>
    </div>
  </div>
)

const UploadField = ({
  name,
  onFileChange,
  error,
  images,
  onFileRemove,
  dropzoneText,
}) => {
  const [fileData, setFileData] = useState([])

  const onDrop = useCallback(
    acceptedFiles => {
      const existingFileNames = new Set(fileData.map(f => f.file.name))
      const newFilesWithPreview = acceptedFiles.reduce((acc, file) => {
        if (existingFileNames.has(file.name)) {
          toast.error(`File already added: ${file.name}`)
          return acc
        }
        const fileWithPreview = {
          id: uuidv4(),
          file,
          preview: URL.createObjectURL(file),
        }
        acc.push(fileWithPreview)
        return acc
      }, [])

      if (newFilesWithPreview.length > 0) {
        setFileData(prev => [...prev, ...newFilesWithPreview])
        onFileChange(newFilesWithPreview.map(f => f.file))
      }
    },
    [onFileChange, fileData]
  )

  const removeFile = useCallback(
    index => {
      const fileToRemove = fileData[index]
      console.log(fileToRemove)

      URL.revokeObjectURL(fileToRemove.preview)
      setFileData(prevFiles => prevFiles.filter((_, i) => i !== index))

      onFileRemove(index) // Use index for removal
    },
    [fileData, onFileRemove]
  )

  useEffect(() => {
    if (images && images.length !== fileData.length) {
      const updatedFiles = images.map(image => ({
        ...image,
        preview:
          image.file instanceof Blob || image.file instanceof File
            ? URL.createObjectURL(image.file)
            : image.preview,
      }))
      setFileData(updatedFiles)
    }
  }, [images])

  useEffect(() => {
    // Clean up previews on unmount
    return () => fileData.forEach(file => URL.revokeObjectURL(file.preview))
  }, [fileData])

  const onDropRejected = useCallback(rejectedFiles => {
    rejectedFiles.forEach(file => {
      toast.error(`File type not allowed: ${file.name}`);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    onDropRejected,
    accept: 'image/jpeg, image/png' 
  })

  return (
    <div className='mb-4'>
      <div
        {...getRootProps()}
        className='flex flex-col items-center justify-center p-6 bg-gray-900 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer hover:border-gray-400'>
        <input {...getInputProps()} name={name} multiple />
        {isDragActive ? (
          <p className='text-sm text-gray-700'>{dropzoneText.active}</p>
        ) : (
          <>
            <p className='w-full text-sm text-gray-500'>
              {dropzoneText.inactive}
            </p>
            <p className='text-xs text-gray-700'>{dropzoneText.help}</p>
          </>
        )}
      </div>
      <div className='mt-4'>
        {fileData.map((file, index) => (
          <>
            <FilePreview
              key={index}
              file={file}
              onRemove={() => removeFile(index)}
            />
          </>
        ))}
      </div>

      {error && (
                <div className='text-sm text-red-500'>
                    {Object.entries(error).map(([key, value]) => (
                        <div key={key}>
                            {typeof value === 'object' ? JSON.stringify(value) : value}
                        </div>
                    ))}
                </div>
            )}
    </div>
  )
}

UploadField.defaultProps = {
  dropzoneText: {
    active: 'Drop the files here ...',
    inactive: "Drag 'n' drop some files here, or click to select files",
    help: `enter the allowed extensions`,
  },

}

export default UploadField
