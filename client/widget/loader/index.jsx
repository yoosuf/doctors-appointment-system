import React from 'react'

const Loader = ({ customClass }) => {
  return (
    <>
      <div
        className={`loader h-full w-full z-90 flex-cen top-0 left-0 ${
          customClass ? customClass : 'fixed'
        }`}>
        <div>
          <div className='loadingio-spinner-interwind-bpcx0kacrt9'>
            <div className='ldio-gwzmtr0i3ot'>
              <div>
                <div>
                  <div>
                    <div></div>
                  </div>
                </div>
                <div>
                  <div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className='text-center'>Loading...</p>
        </div>
      </div>
    </>
  )
}

export default React.memo(Loader)
