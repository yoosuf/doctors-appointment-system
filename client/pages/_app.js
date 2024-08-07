import Loader from '@/widget/loader'
import * as Sentry from '@sentry/browser'
import { BrowserTracing } from '@sentry/tracing'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import 'react-date-range/dist/styles.css'
import { Toaster } from 'react-hot-toast'
import 'react-responsive-modal/styles.css'
import '@/styles/rangepicker.css'
import '@/styles/responsive.css'
import '@/styles/tailwind.css'
import '@/styles/style.css'
import SnapCrackContext from '@/utils/context'
import useAppContext from '@/hooks/context/useAppContext'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const value = useAppContext()
  const [loading, setLoading] = useState(false)
  const [device, setDevice] = useState(null)
  const [pushToken, setPushToken] = useState(null)

  useEffect(() => {
    Sentry.init({
      dsn: 'https://6ecea148195de6149c27ff57ef46d663@o1172252.ingest.sentry.io/4505765678874624',
      integrations: [new BrowserTracing()],
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    })

    // Set up error handling for client-side navigation
    router.events.on('routeChangeError', err => {
      Sentry.captureException(err)
    })
  }, [])

  useEffect(() => {
    const isWebView = window.ReactNativeWebView !== undefined;
  
    if (isWebView) {
      document.addEventListener('message', handleMessage, false);
      window.addEventListener('message', handleMessage, false);
      window.ReactNativeWebView.postMessage("getDeviceAndPushToken");
  
      return () => {
        document.removeEventListener('message', handleMessage);
        window.removeEventListener('message', handleMessage);
      };
    } else {
      // console.log("This code is running in a normal browser environment. It won't execute WebView-specific logic.");
    }
  }, []);
  
  const handleMessage = event => {
    try {
      const { device: newDevice, pushToken: newPushToken } = JSON.parse(event.data);
  
      if (newDevice && newPushToken) {
        setDevice(newDevice);
        setPushToken(newPushToken);
        localStorage.setItem('userDevice', newDevice);
        localStorage.setItem('userPushToken', newPushToken);
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Toaster
        position='top-right'
        reverseOrder={false}
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: 'rgba(209, 250, 229,1)',
              color: 'rgba(5, 150, 105,1)',
              minHeight: '50px',
            },
          },
          error: {
            style: {
              background: 'rgba(254, 226, 226,1)',
              color: ' rgba(220, 38, 38,1)',
              minHeight: '50px',
            },
          },
        }}
      />
      <SnapCrackContext.Provider value={value}>
        <Component {...pageProps} />
      </SnapCrackContext.Provider>
    </>
  )
}

export default MyApp
