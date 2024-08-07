import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import commonApi from '@/api/common';
import toast from 'react-hot-toast';

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [formTitle, setFormTitle] = useState("Recover password");
  const [formDescription, setFormDescription] = useState("Enter the email associated with your account and we will send you instructions to reset your password");
  const [successState, setSuccessState] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const startCountdown = () => {
    // setLoading(true);
    setCountdown(30); 
    let interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          clearInterval(interval);
          // setLoading(false);
          return 0;
        }
      });
    }, 1000);
    return interval;
  };

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Please enter your email address'),
    }),
    onSubmit: async (values, formikHelpers) => {
      try {
        const { MESSAGE } = await commonApi({
          action: 'forgotPassword',
          data: values,
        });

        toast.success(MESSAGE);
        setSuccessState(true);
        setFormTitle(`Check your email`);
        setFormDescription(`We've sent a link to reset your password to your email address`);
        startCountdown();
      } catch (error) {
        console.error('Forgot password error:', error);
        formikHelpers.resetForm();
      } finally {
        formikHelpers.setSubmitting(false);
      }
    },
  });

  return {
    loading,
    formTitle,
    formDescription,
    formik,
    successState,
    countdown,
  };
};

export default useForgotPassword;
