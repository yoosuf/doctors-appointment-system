import React, { useEffect, useState } from 'react';
import commonApi from '@/api/common';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import io from 'socket.io-client';

const SERVER_URL = process.env.NEXT_PUBLIC_API_END_POINT;

const useCancelAppointment = (closeModal, appointmentDetail, closeParentModel) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(SERVER_URL, { transports: ['websocket'] });
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const initialValues = {
        remarks: '',
    };

    const validationSchema = Yup.object({
        remarks: Yup.string().required('Please enter remarks.'),
    });

    const onClickSubmit = async (values, formikHelpers) => {
        try {
            const data = {
                remarks: values.remarks,
                status: 'canceled',
            };
            const response = await commonApi({
                parameters: [appointmentDetail.id],
                action: 'partiallyUpdateAppointment',
                data,
            });

            socket.emit('appointmentAdded', response.DATA);
            toast.success('Appointment is canceled!');
        } catch (error) {
            toast.error('Error cancelling the appointment');
        } finally {
            formikHelpers.setSubmitting(false);
            closeModal();
            closeParentModel();
            formikHelpers.resetForm();
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: onClickSubmit,
    });

    return { formik };
};

export default useCancelAppointment;
