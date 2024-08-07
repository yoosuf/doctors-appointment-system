import React, { useState, useEffect } from 'react'
import commonApi from '@/api/common'
import { useField, useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import socket from '@/utils/socket'; // Import the socket instance



const usePatientAlert = ({ closeModal, patientId }) => {

    const [loading, setLoading] = useState(false)

    const [listAlertData, setAlertData] = useState([])

    const [alertCount, setAlertCount] = useState(0)

    const [selectedTabIndex, setSelectedTabIndex] = useState(0)


    useEffect( () => {
        if (patientId) {
             getAlertList();
        }
        const intervalId = setInterval( () => {
            if (patientId) {
                 getAlertList();
            }
        }, 3600);

        return () => {
            clearInterval(intervalId);
        };
    }, [patientId]);




    const getAlertList = () => {
        setLoading(true);
        const data = {
            query: {},
            options: {
                sort: {
                    createdAt: -1,
                },
                pagination: false,
                populate: [],
            },
            isCountOnly: false,
        }
        commonApi({
            parameters: patientId ? [patientId] : [],
            action: 'listAlertListByPatient',
            data,
        }).then(({ DATA = {} }) => {
            setAlertData(DATA.data)
            setAlertCount(DATA.data.length);
            setLoading(false)
        })

    }


    const onClickSubmit = async (values) => {

        const data = {
            body: values.body,
        }
        await commonApi({
            parameters: patientId ? [patientId] : [],
            action: 'addAlertListByPatient',
            data,
        }).then(async ({ DATA }) => {

            socket.emit('appointmentAdded', DATA);

            toast.success(`Alert added!`)
        })

    }


    const formik = useFormik({
        initialValues: {
            body: '',
        },
        validationSchema: Yup.object({
            body: Yup.string()
                .required('Please enter an alert message.'),
        }),
        onSubmit: async values => {
            await onClickSubmit(values, patientId)
            closeModal();
        },
    })


    return {
        loading, 
        listAlertData,
        formik,
        alertCount,
        selectedTabIndex,
        setSelectedTabIndex
    }


}

export default usePatientAlert;
