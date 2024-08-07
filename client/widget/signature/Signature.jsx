import commonApi from '@/api/common'
import { getImageUrl } from '@/utils/helper'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import SignaturePad from 'react-signature-canvas'

const Signature = ({
  fileName,
  className,
  setFingerSign,
  signSave,
  setSignSave,
  fingerSignUri,
}) => {
  const [imageURl, setImageURl] = useState(null)
  const [save, setSave] = useState(false)
  const sigCanvas = useRef({})
  const clear = () => {
    setSave(false)
    sigCanvas.current.clear()
  }

  const base64ToBlob = (b64Data, contentType, sliceSize) => {
    // eslint-disable-next-line no-param-reassign
    contentType = contentType || ''
    // eslint-disable-next-line no-param-reassign
    sliceSize = sliceSize || 512
    //const byteCharacters = Buffer.from(b64Data).toString('base64')
    const byteCharacters = atob(b64Data)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)

      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }
    const blob = new Blob(byteArrays, { type: contentType })
    return blob
  }

  const onSaveSign = async (base64, setCroppedUrl) => {
    if (!save) {
      setSignSave(false)
      return toast.error('Please sign on signature pad')
    }
    const jpegFile64 = base64.replace(/^data:image\/(png|jpeg);base64,/, '')
    const jpegBlob = base64ToBlob(jpegFile64, 'image/jpeg', 512)

    const folder = 'images'
    const payload = new FormData()
    payload?.append('folder', folder)
    payload.append('file', jpegBlob, fileName)

    if (payload) {
      await commonApi({
        action: 'imgUpload',
        data: payload,
        config: {
          contentType: 'multipart/form-data',
        },
      }).then(async ({ DATA = {}, MESSAGE }) => {
        setImageURl(getImageUrl(DATA.uri))
        setFingerSign(DATA.id)
        return false
      })
    }
  }

  useEffect(() => {
    if (signSave) onSaveSign(sigCanvas.current.getTrimmedCanvas().toDataURL())
  }, [signSave])

  useEffect(() => {
    if (fingerSignUri) setImageURl(getImageUrl(fingerSignUri))
  }, [fingerSignUri])

  return (
    <div className={className}>
      <h3>Signature Pad</h3>
      {imageURl ? (
        <img
          src={imageURl}
          alt='Sign'
          style={{
            display: 'block',
            width: '650px',
            minHeight: '50px',
            border: '1px solid #000',
            background: 'white',
          }}
        />
      ) : (
        <div className='signature-pad'>
          <SignaturePad
            ref={sigCanvas}
            canvasProps={{ className: 'signCanvas w-full' }}
            onEnd={e => setSave(true)}
          />
          <button onClick={clear}>Clear</button>
          {/* <button onClick={save}>Save</button> */}
        </div>
      )}
    </div>
  )
}

export default Signature
