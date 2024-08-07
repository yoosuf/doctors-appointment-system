import commonApi from '@/api/common'
import React, { useState, useRef, useEffect } from 'react'
import toast from 'react-hot-toast'
import { getTempToken } from '@/utils/localStorage'
import SnapCrackButton from '@/widget/common-button'
import Loader from '@/widget/loader'

const SignupUploadComponent = props => {
  const { image, setImage, formik, className } = props
  const temp = getTempToken()
  const [localStream, setLocalStream] = useState(null)
  const [retake, setRetake] = useState(false)
  const localVideo = useRef(null)

  const initCamera = async () => {
    // Attach the video stream to the video element and autoplay.
    try {
      const constraints = {
        video: { facingMode: 'user' },
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      setLocalStream(stream)
    } catch (e) {
      console.error(e)
    }
  }

  const captureImage = async () => {
    try {
      const folder = 'images'
      const fileName = 'profile_picture'

      const canvas = document.getElementById('canvas')
      const context = canvas.getContext('2d')

      const videoWidth = localVideo.current.videoWidth
      const videoHeight = localVideo.current.videoHeight

      // Aspect ratios
      const videoAspectRatio = videoWidth / videoHeight
      const canvasAspectRatio = canvas.width / canvas.height

      // Calculate the scale factor
      let scaleFactor
      if (videoAspectRatio > canvasAspectRatio) {
        scaleFactor = canvas.height / videoHeight
      } else {
        scaleFactor = canvas.width / videoWidth
      }

      // Calculate the drawing dimensions
      const drawWidth = videoWidth * scaleFactor
      const drawHeight = videoHeight * scaleFactor

      // Calculate the position to start drawing the video on the canvas
      const offsetX = (canvas.width - drawWidth) / 2
      const offsetY = (canvas.height - drawHeight) / 2

      // Draw the frame onto the canvas with "object-fit: cover"
      context.drawImage(
        localVideo.current,
        0,
        0,
        videoWidth,
        videoHeight,
        offsetX,
        offsetY,
        drawWidth,
        drawHeight
      )

      canvas.toBlob(async function (blob) {
        const file = new File([blob], fileName)
        // turnOffCamera;
        localStream.getTracks()[0].stop()

        const payload = new FormData()
        payload?.append('folder', folder)
        payload?.append('file', file, fileName)

        await commonApi({
          action: 'imgUpload',
          data: payload,
          config: {
            contentType: 'multipart/form-data',
            tempToken: temp,
          },
        }).then(async ({ DATA, MESSAGE }) => {
          const imageUrl =
            `${process.env.NEXT_PUBLIC_API_END_POINT}` + DATA?.uri

          toast.success(MESSAGE)
          setImage(imageUrl || '')
          setRetake(false)
          formik.setFieldValue('profile_image', DATA?.id)
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  const retakeImage = async () => {
    setRetake(true)
    initCamera()
  }

  useEffect(() => {
    initCamera()
  }, [])

  useEffect(() => {
    if (localVideo.current) localVideo.current.srcObject = localStream
  }, [localStream, localVideo])

  useEffect(() => {
    if (!localStream) return
    return () => {
      localStream?.getTracks()[0].stop()
    }
  }, [localStream])

  return (
    <div>
      <div className={className}>
        {image && !retake ? (
          <img src={image} className='object-cover w-40 h-40 rounded-2xl' />
        ) : (
          <video
            ref={localVideo}
            autoPlay
            playsInline
            muted
            controls={false}
            className='object-cover w-40 h-40 rounded-2xl'></video>
        )}
        <canvas
          id='canvas'
          width='160'
          height='160'
          hidden={true}
          className='rounded-2xl'></canvas>
      </div>
      <SnapCrackButton
        type='button'
        text={image && !retake ? `Retake Picture` : `Take Picture`}
        className='flex items-center justify-center w-40 p-3 mx-auto mt-3 mb-3 text-center transition border border-gray-700 rounded-lg bg-transprent'
        onClick={image && !retake ? retakeImage : captureImage}
      />
    </div>
  )
}

export default React.memo(SignupUploadComponent)
