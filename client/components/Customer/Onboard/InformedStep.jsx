import React from 'react'
import ServiceHeader from '@/components/Layout/Header/ServiceHeader'
import 'react-datepicker/dist/react-datepicker.css'
import routes from '@/utils/routes'
import useInformed from '@/components/Customer/Onboard/hooks/useInformed'
import Signature from '@/widget/signature/Signature'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'
import { Button } from '@/components/AppUi/Form/Button'

const InformedStep = user => {
  const {
    loading,
    pageContent,
    setFingerSign,
    signSave,
    setSignSave,
    parentName,
    setParentName,
    parentEmail,
    setParentEmail,
    fingerSignUri,
    userDateOfBirth,
    submitInform,
    showParentForm,
  } = useInformed({
    userData: user,
  })

  return (
    <>
      <div>
        <div className='flex flex-col h-screen overflow-y-auto registration-form-main'>
          <ServiceHeader />
          <div className='w-full max-w-3xl p-5 mx-auto sm:p-9 sm:pb-10'>
            <div className='reg-form'>{ReactHtmlParser(pageContent)}</div>
            <div className='pb-5 mb-5 border-b border-gray-600 '>
              {showParentForm ? (
                <div>
                  <div className='grid gap-4 mt-4 sm:grid-cols-2'>
                    <div className='form-group'>
                      <label className='inline-block mb-1 text-sm text-gray-400'>
                        Parent's name *
                      </label>
                      <input
                        type='text'
                        className='w-full px-3 py-1.5 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500'
                        placeholder="Parent's name"
                        id='parentName'
                        autoComplete='off'
                        autoCapitalize='off'
                        onChange={event => setParentName(event.target.value)}
                      />
                    </div>

                    <div className='form-group'>
                      <label className='inline-block mb-1 text-sm text-gray-400'>
                        Parent's email *
                      </label>
                      <div className=''>
                        <input
                          type='text'
                          className='w-full px-3 py-1.5 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500'
                          placeholder="Parent's Email"
                          id='parentEmail'
                          autoComplete='off'
                          autoCapitalize='off'
                          onChange={event => setParentEmail(event.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}

              <label className='inline-block mt-5 mb-2'>
                {showParentForm
                  ? `Signature of parent`
                  : 'Please add your signature'}
              </label>

              <Signature
                fileName={`${user?.user?.id}sign`}
                className='p-6 text-center border border-gray-500 border-dashed cursor-pointer dropzone selected-img rounded-xl'
                setFingerSign={setFingerSign}
                signSave={signSave}
                setSignSave={setSignSave}
                fingerSignUri={fingerSignUri}
              />
            </div>
            <div className='flex items-center gap-6 pt-5 mt-5'>
              <Link href={routes.onbardLocation}>
                <span className='block w-full p-2 text-sm text-center text-gray-200 transition bg-transparent border border-gray-700 rounded-md cursor-pointer focus:outline-none hover:bg-gray-800 hover:border-gray-400'>
                  Back
                </span>
              </Link>

              <Button
                kind={'primary'}
                type='submit'
                text={`Complete`}
                onClick={() => submitInform()}

                // text={formik.isSubmitting ? 'Please wait...' : 'Next'}
                // isDisabled={formik.isSubmitting || !formik.dirty}
                // isLoading={formik.isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InformedStep
