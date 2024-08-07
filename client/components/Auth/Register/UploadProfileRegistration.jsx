import React from 'react'
import useProfileImage from '@/components/Auth/hooks/register/useProfileImage'
import SignupUploadComponent from '@/widget/ImageUpload/SignupUploadComponent'
import SnapCrackButton from '@/widget/common-button'
import AuthLayout from '@/components/Layout/AuthLayout'
import { Button } from '@/components/AppUi/Form/Button'

export default function UploadProfileRegistration () {
  const { image, setImage, formik, loading, redirectLogin } = useProfileImage()

  return (
    <AuthLayout
      title={`Upload your photo`}
      subTitle={`Capture your profile image now or do it later`}>
      <form onSubmit={formik.handleSubmit}>
        <div className='mt-8 text-center reg-form'>
          <div>
            <SignupUploadComponent
              image={image}
              setImage={setImage}
              formik={formik}
              className='inline-block w-40 h-40 mx-auto transition border-2 border-gray-700 border-dashed rounded-2xl bg-transprent'
            />
          </div>
          {formik.touched.profile_image && formik.errors.profile_image && (
            <div className='text-sm text-redAlert'>
              {formik.errors.profile_image}
            </div>
          )}

          <div className={`mb-4`}>
            <Button
              kind={'primary'}
              type='submit'
              text={formik.isSubmitting ? 'Please wait...' : 'Complete'}
              isDisabled={formik.isSubmitting || !formik.dirty}
              isLoading={formik.isSubmitting}
            />
          </div>
        </div>
      </form>
    </AuthLayout>
  )
}
