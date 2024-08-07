import React, { useEffect, useState } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render () {
    return (
      <Html lang='en'>
        <Head title={`Snapcrack`} nonce=''>
          <link rel='shortcut icon' type='image/jpg' href='/favicon.png' />
          <link
            rel='shortcut icon'
            type='image/png'
            sizes='16x16'
            href='/favicon.ico'
          />
          <link rel='apple-touch-icon' href='/apple-touch-icon.png' />

          <script
            src='//instant.page/5.2.0'
            type='module'
            integrity='sha384-jnZyxPjiipYXnSU0ygqeac2q7CVYMbh84q0uHVRRxEtvFPiQYbXWUorga2aqZJ0z'></script>
          {/* 
          {process.env.NEXT_PUBLIC_BUGHERD_KEY && (
            <script
              type='text/javascript'
              src={`https://www.bugherd.com/sidebarv2.js?apikey=${process.env.NEXT_PUBLIC_BUGHERD_KEY}`}
              async={true}></script>
          )} */}

          {process.env.NEXT_PUBLIC_GOOGLE_API_KEY && (
            <script
              src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}></script>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
