import React from 'react'
import Link from 'next/link'
import usePatientFiles from '@/components/Customer/Profile/hooks/usePatientFiles'
import PatientAddFile from './PatientAddFile'
import { baseUrl } from '@/utils/helper'
import moment from 'moment'
import EditIcon from '@/widget/image/EditIcon'
import DeleteIcon from '@/widget/image/DeleteIcon'
import { useDebouncedCallback } from 'use-debounce'
import DeletePopupModal from '@/widget/modal/DeletePopupModal'
import Loader from '@/widget/loader'
import SearchIcon from '@/widget/image/SearchIcon'
import PlusIcon from '@/widget/image/PlusIcon'

const PatientFiles = ({ userData, patientFileData }) => {
  const {
    loading,
    files = [],
    activeFile,
    setActiveFile,
    openAddFileModal,
    getAllFilesList,
    paginator = {},
    openEdit,
    editData,
    setEditData,
    onChangeSearch,
    // Delete Modal State
    openDeleteModal,
    openModal,
    closeModal,
    onClickDelete,
    label,
    deleteID,
  } = usePatientFiles({ patientFileData })

  const debounced = useDebouncedCallback(e => {
    onChangeSearch(e)
  }, 500)

  return (
    <>
      <div className='Files'>
        <div className='flex flex-wrap items-center justify-between gap-4 pb-4 '>
          <div>
            <h3 className='text-lg font-semibold'>Manage Files</h3>
            <p className='text-sm text-gray-500'>
              Current owner has {paginator?.itemCount} chart files
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <div className='relative flex items-center w-full'>
              <div className='absolute left-3'>
                <SearchIcon />
              </div>
              <input
                type='text'
                className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
                placeholder='Search'
                onChange={debounced}
                autoComplete='off'
                autoCapitalize='off'
              />
            </div>
            <button
              type='button'
              onClick={e => {
                e.preventDefault(), openAddFileModal()
              }}
              className='flex items-center justify-center px-2 py-2 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg sm:px-4 hover:bg-yellow-400 '>
              <PlusIcon />
              <span className='ml-2 text-sm font-medium whitespace-nowrap'>
                Add New
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className='relative'>
        {files.length === 0 ? (
          <div className='py-20'>
            <div className='flex items-center justify-center text-xl'>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-24 h-24'
                  viewBox='0 0 20 20'
                  fill='currentColor'>
                  <path d='M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z' />
                </svg>
              </div>
            </div>
            <div className='flex items-center justify-center text-2xl'>
              No Files Found
            </div>
          </div>
        ) : (
          <>
            <div className='grid grid-cols-12 gap-3'>
              {files.map((file = {}) => (
                <div className='relative flex flex-col col-span-12 overflow-hidden rounded-lg single-owner-file lg:col-span-4 sm:col-span-6 bg-primary'>
                  <div className='p-3 single-owner-file-text'>
                    <h3 className='my-2 font-medium'>{file.title}</h3>
                    <p className='text-sm text-gray-400'>{file.description}</p>
                    {file.imageIds?.length > 0 && (
                      <>
                        {file.imageIds?.map((image = {}) => (
                          <>
                            {image?.type === 'application/pdf' ? (
                              <div className='flex mt-3' key={image?._id}>
                                <iframe
                                  src={baseUrl + image?.uri}
                                  className='object-cover w-full h-40 rounded-lg'
                                />
                              </div>
                            ) : (
                              <div className='flex mt-3' key={image?._id}>
                                <img
                                  src={baseUrl + image?.uri}
                                  className='object-cover w-full h-40 rounded-lg'
                                  alt='Snapcrack'
                                />
                              </div>
                            )}
                          </>
                        ))}
                      </>
                    )}

                    <div className='flex items-center justify-center gap-3 files-icons'>
                      <a
                        className='cursor-pointer'
                        onClick={() => openEdit(file)}>
                        <EditIcon color='#18181B' />
                      </a>

                      <a
                        className='cursor-pointer'
                        onClick={() =>
                          window.open(baseUrl + file.imageIds?.[0]?.uri)
                        }>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-6 h-6'
                          viewBox='0 0 20 20'
                          fill='#18181B'>
                          <path
                            fillRule='evenodd'
                            d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </a>

                      {/* <a
                      className='cursor-pointer'
                      onClick={() => openModal(file)}>
                      <DeleteIcon color='#18181B' />
                    </a> */}
                    </div>
                  </div>
                  <div className='flex items-center justify-between p-3 mt-auto file-bottom'>
                    <div className='flex items-center'>
                      <Link href='#'>
                        <a>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-5 h-5'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='#9ca3af'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                            />
                          </svg>
                        </a>
                      </Link>
                      <Link href='#'>
                        <a className='ml-2'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-5 h-5'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='#9ca3af'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                            />
                          </svg>
                        </a>
                      </Link>
                    </div>
                    <p className='pl-3 text-sm text-gray-400'>
                      {moment(file.updatedAt).format('MMMM DD, YYYY')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {loading && <Loader customClass='absolute' />}
      </div>

      <PatientAddFile
        activeFile={activeFile}
        setActiveFile={setActiveFile}
        // loading={loading}
        editData={editData}
        getAllFilesList={getAllFilesList}
        openAddFileModal={openAddFileModal}
        setEditData={setEditData}
      />

      {openDeleteModal && (
        <DeletePopupModal
          closeModal={closeModal}
          onClickDelete={onClickDelete}
          data={deleteID}
          label={label}
        />
      )}
    </>
  )
}

export default PatientFiles

// import React, { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import "react-datepicker/dist/react-datepicker.css";

// const FilesHome = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   return (
//     <>
//       <div className="Files">
//         <div className="flex-wrap gap-3 mb-6 flex-bet">
//           <div className="">
//             <div>
//               <h3 className="text-lg font-semibold">Manage Files</h3>
//               <p className="text-sm text-gray-500">
//                 Current owner has 6 chart files
//               </p>
//             </div>
//           </div>
//           <div className="w-full gap-3 flex-ver sm:w-auto">
//             <div className="relative flex items-center w-full">
//               <div className="absolute left-3">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="#9CA3AF "
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   ></path>
//                 </svg>
//               </div>
//               <input
//                 type="text"
//                 className="w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg"
//                 placeholder="Search"
//               />
//             </div>
//             <button className="flex items-center justify-center px-2 py-2 text-sm font-medium text-center text-black transition rounded-lg whitespace-nowrap bg-yellowBg sm:px-4 hover:bg-yellow-400 ">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-6 h-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                 />
//               </svg>
//               <span className="ml-2 text-sm font-medium">Add New</span>
//             </button>
//           </div>
//         </div>
//         <div className="grid grid-cols-12 gap-3">
//           <div className="relative flex flex-col col-span-12 overflow-hidden rounded-lg single-owner-file lg:col-span-4 sm:col-span-6 bg-primary">
//             <div className="p-3 single-owner-file-text">
//               <div>
//                 <Link href="#">
//                   <a className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellowBg text-primary">
//                     <div className="w-1 h-1 mr-1 bg-black rounded-full round"></div>
//                     <div>Note</div>
//                   </a>
//                 </Link>
//               </div>
//               <h3 className="my-2 font-medium">Note Title</h3>
//               <p className="text-sm text-gray-400">
//                 Note Description will behave in the same way as those of other
//                 chart entries. All settings will respect the privacy and sharing
//                 settings of the person logged in.
//               </p>
//               <div className="flex items-center justify-center gap-3 files-icons">
//                 <Link href="#">
//                   <a>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-6 h-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="#18181B"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
//                       />
//                     </svg>
//                   </a>
//                 </Link>
//                 <Link href="#">
//                   <a>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-6 h-6"
//                       viewBox="0 0 20 20"
//                       fill="#18181B"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </a>
//                 </Link>
//                 <Link href="#">
//                   <a>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-6 h-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="#18181B"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
//                       />
//                     </svg>
//                   </a>
//                 </Link>
//                 <Link href="#">
//                   <a>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-6 h-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="#18181B"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                       />
//                     </svg>
//                   </a>
//                 </Link>
//               </div>
//             </div>
//             <div className="flex items-center justify-between p-3 mt-auto file-bottom">
//               <div className="flex items-center">
//                 <Link href="#">
//                   <a>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-5 h-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="#9ca3af"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                       />
//                     </svg>
//                   </a>
//                 </Link>
//                 <Link href="#">
//                   <a className="ml-2">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-5 h-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="#9ca3af"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                       />
//                     </svg>
//                   </a>
//                 </Link>
//               </div>
//               <p className="pl-3 text-sm text-gray-400">October 24, 2021</p>
//             </div>
//           </div>
//           <div className="relative flex flex-col col-span-12 overflow-hidden rounded-lg single-owner-file lg:col-span-4 sm:col-span-6 bg-primary">
//             <div className="p-3 single-owner-file-text">
//               <div>
//                 <Link href="#">
//                   <a className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-greenBg text-primary">
//                     <div>jpg</div>
//                   </a>
//                 </Link>
//               </div>
//               <h3 className="my-2 font-medium">Xray Scan</h3>
//               <p className="text-sm text-gray-400">
//                 All this image is will respect the privacy and something else...
//               </p>
//               <div className="flex mt-3">
//                 <img
//                   src="https://picsum.photos/200"
//                   className="object-cover rounded-lg h-14 w-14"
//                   alt=""
//                 />
//                 <img
//                   src="https://picsum.photos/200"
//                   className="object-cover ml-3 rounded-lg h-14 w-14"
//                   alt=""
//                 />
//               </div>
//               <div className="flex items-center justify-center gap-3 files-icons">
//                 <Link href="#">
//                   <a>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-6 h-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="#18181B"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
//                       />
//                     </svg>
//                   </a>
//                 </Link>
//                 <Link href="#">
//                   <a>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-6 h-6"
//                       viewBox="0 0 20 20"
//                       fill="#18181B"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </a>
//                 </Link>
//                 <Link href="#">
//                   <a>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-6 h-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="#18181B"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
//                       />
//                     </svg>
//                   </a>
//                 </Link>
//                 <Link href="#">
//                   <a>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-6 h-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="#18181B"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                       />
//                     </svg>
//                   </a>
//                 </Link>
//               </div>
//             </div>
//             <div className="flex items-center justify-between p-3 mt-auto file-bottom">
//               <div className="flex items-center">
//                 <Link href="#">
//                   <a>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-5 h-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="#9ca3af"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                       />
//                     </svg>
//                   </a>
//                 </Link>
//                 <Link href="#">
//                   <a className="ml-2">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-5 h-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="#9ca3af"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                       />
//                     </svg>
//                   </a>
//                 </Link>
//               </div>
//               <p className="pl-3 text-sm text-gray-400">October 24, 2021</p>
//             </div>
//           </div>
//           <div className="relative flex flex-col col-span-12 overflow-hidden rounded-lg single-owner-file lg:col-span-4 sm:col-span-6 bg-primary">
//             <div className="p-3 single-owner-file-text">
//               <div>
//                 <Link href="#">
//                   <a className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-greenBg text-primary">
//                     <div>jpg</div>
//                   </a>
//                 </Link>
//               </div>
//               <h3 className="my-2 font-medium">Xray Scan</h3>
//               <p className="text-sm text-gray-400">
//                 All this image is will respect the privacy and something else...
//               </p>
//               <div className="flex mt-3">
//                 <img
//                   src="https://picsum.photos/200"
//                   className="object-cover rounded-lg h-14 w-14"
//                   alt=""
//                 />
//                 <img
//                   src="https://picsum.photos/200"
//                   className="object-cover ml-3 rounded-lg h-14 w-14"
//                   alt=""
//                 />
//               </div>
//               <div className="flex items-center justify-center gap-3 files-icons">
//                 <Link href="#">
//                   <a>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-6 h-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="#18181B"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
//                       />
//                     </svg>
//                   </a>
//                 </Link>
//                 <Link href="#">
//                   <a>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-6 h-6"
//                       viewBox="0 0 20 20"
//                       fill="#18181B"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </a>
//                 </Link>
//                 <Link href="#">
//                   <a>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-6 h-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="#18181B"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
//                       />
//                     </svg>
//                   </a>
//                 </Link>
//                 <Link href="#">
//                   <a>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-6 h-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="#18181B"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                       />
//                     </svg>
//                   </a>
//                 </Link>
//               </div>
//             </div>
//             <div className="flex items-center justify-between p-3 mt-auto file-bottom">
//               <div className="flex items-center">
//                 <Link href="#">
//                   <a>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-5 h-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="#9ca3af"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                       />
//                     </svg>
//                   </a>
//                 </Link>
//                 <Link href="#">
//                   <a className="ml-2">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-5 h-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="#9ca3af"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                       />
//                     </svg>
//                   </a>
//                 </Link>
//               </div>
//               <p className="pl-3 text-sm text-gray-400">October 24, 2021</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FilesHome;
