import React from 'react'
import Head from 'next/head'

const SnapcrackMeta = ({ title = 'Snapcrack'}) => (
  <>
    <Head title={title} crossOrigin='yes' nonce=''>
      <title>{title}</title>
      <meta name='application-name' content={title} />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content={title} />
      <meta
        name='viewport'
        content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
      />
      <link rel='shortcut icon' type='image/jpg' href='/favicon.png' />
      <link
        rel='shortcut icon'
        type='image/png'
        sizes='16x16'
        href='/favicon.ico'
      />
      <link rel='apple-touch-icon' href='/apple-touch-icon.png' />

      {process.env.NEXT_PUBLIC_BUGHERD_KEY && (
        <script type="text/javascript" src={`https://www.bugherd.com/sidebarv2.js?apikey=${process.env.NEXT_PUBLIC_BUGHERD_KEY}`} async={true}></script>
      )}

      {process.env.NEXT_PUBLIC_GOOGLE_API_KEY && (
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}></script>
      )}
    </Head>
  </>
)

export default SnapcrackMeta
