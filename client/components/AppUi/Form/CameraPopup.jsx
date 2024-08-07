import React, { useState, useRef, useEffect, useCallback } from 'react';
import SnapCrackButton from '@/widget/common-button';
import { v4 as uuidv4 } from 'uuid'

const CameraPopup = React.memo(props => {
  const {
    className,
    imageType = 'selfie',
    onImageCapture,
  } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const localVideo = useRef(null);
  const canvasRef = useRef(null);

  const getImageDimensions = () => {
    switch (imageType) {
      case 'passport':
        return { width: 600, height: 600 }; // Example dimensions for passport
      default:
        return { width: 800, height: 600 }; // Default dimensions
    }
  };

  const initCamera = useCallback(async () => {
    setLoading(true);
    try {
      const constraints = { video: { facingMode: 'user' } };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (localVideo.current) {
        localVideo.current.srcObject = stream;
      }
      setError('');
    } catch (e) {
      console.error(e);
      setError('Camera access denied. Please allow camera permissions.');
    }
    setLoading(false);
  }, []);

  const captureImage = useCallback(async () => {
    try {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const { width, height } = getImageDimensions();

      canvas.width = width;
      canvas.height = height;
      context.drawImage(localVideo.current, 0, 0, width, height);

      canvas.toBlob(blob => {
        const filename = "captured-image.png";
        const imageFile = new File([blob], filename, {
          type: 'image/png',
          lastModified: new Date().getTime(),
        });
      
        const capturedImageObject = {
          id: uuidv4(), // Unique identifier
          file: imageFile,
          preview: URL.createObjectURL(imageFile),
        };
      
        onImageCapture(capturedImageObject); // Pass the captured image object
      }, 'image/png');
    } catch (e) {
      console.error(e);
    }
  }, [onImageCapture, getImageDimensions]);

  useEffect(() => {
    initCamera();
    return () => {
      if (localVideo.current && localVideo.current.srcObject) {
        const tracks = localVideo.current.srcObject.getTracks();
        tracks.forEach(track => track.stop()); // Stop all tracks to release the camera
      }
    };
  }, [initCamera]);

  const handleCaptureClick = captureImage;

  return (
    <div>
      <div className="flex">
        {loading && <p>Loading...</p>}
        {error && <div className='error-message'>{error}</div>}
        <video
          ref={localVideo}
          autoPlay
          controls={false}
          playsInline
          muted
          className='object-cover w-40 h-40 rounded'
        />
        <canvas
          ref={canvasRef}
          width='160'
          height='160'
          hidden={true}
          className='rounded-2xl'
        ></canvas>
      </div>
      <SnapCrackButton
        type='button'
        text='Take Photo'
        className='flex items-center justify-center w-40 p-3 mx-auto mt-3 mb-3 text-center transition bg-transparent border border-gray-700 rounded-lg'
        onClick={handleCaptureClick}
        aria-label='Take Photo'
      />
    </div>
  );
});

export default CameraPopup;
