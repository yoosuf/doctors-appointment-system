import React, { useState, useEffect } from 'react'
import commonApi from '@/api/common'
import {
  APPOINTMENT_CHART_TYPE,
  CHART_VIEWABLE,
  REQUIRED_FIELD,
  IDENTIFY_TYPE,
} from '@/utils/constant'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getUser } from '@/utils/localStorage'
import toast from 'react-hot-toast'
import { getRole } from '@/utils/helper'

const viewableOptions = [
  { label: 'Viewable By Chiro', value: CHART_VIEWABLE.CHIRO },
  { label: 'Viewable By Everyone', value: CHART_VIEWABLE.EVERYONE },
]

const fieldLabels = {
  blood_pressure: 'Blood Pressure',
  pervious_injection_iv: 'Previous Vitamin Injections/IVs',
  pervious_injection_iv_description: 'Description of Previous Injection',
  medication_allergy: 'Medication Allergy',
  medication_allergy_description: 'Description of Medication Allergy',
  other_allergy: 'Other Allergy',
  other_allergy_description: 'Description of Other Allergy',
  injection_type: 'Injection Type',
  injection_volume: 'Injection Volume',
  height: 'Height',
  weight: 'Weight',
  bmi: 'BMI',
  side_effects: 'Side Effects',
  iv_type: 'IV Type',
  iv_volume: 'IV Volume',
  injection_side: 'Injection Side',
  injection_side_description: 'Description of Injection Side',
}

const useNurseSOAP = ({
  closeModal,
  chartData,
  listAllChart,
  appointmentDetail,
  servicesToServe,
}) => {
  const [loading, setLoading] = useState(false)
  const [editID, setEditID] = useState()
  const [selectedViewable, setSelectedViewable] = useState([])
  const [injectioArray, setInjectioArray] = useState({})
  const [iVArray, setIVArray] = useState({})

  useEffect(() => {
    const initializeFormWithChartData = () => {
      if (chartData && typeof chartData === 'object' && chartData.id) {
        setEditID(chartData.id)

        console.log(`chartData`, chartData)

        const transformedData = chartData.chartData.reduce((acc, item) => {
          acc[item.key] = item.value
          return acc
        }, {})


        console.log(`transformedData`, JSON.stringify(transformedData))

        formik.setValues(transformedData)
      }
    }

    setLoading(true)
    fetchServices()
    initializeFormWithChartData()
    setLoading(false)
  }, [chartData, editID])

  /**
   * fetch all servcies and add it on the state
   */
  const fetchServices = async () => {
    const filteredServices = servicesToServe.filter(
      data => data?.name === 'Injection' || data?.name === 'IV'
    )

    filteredServices.forEach(data => {
      if (data.name === 'Injection') {
        // console.log(data)
        setInjectioArray(data)
      } else if (data.name === 'IV') {
        setIVArray(data)
      }
    })
  }

  useEffect(() => {
    if (!editID) {
      formik.resetForm()
    }
  }, [editID])

  const closeBtn = () => {
    closeModal()
    setSelectedViewable({})
    setEditID('')
    formik.resetForm()
  }

  const concatenateFormValues = formValues => {
    const fieldsToConcatenate = [
      'blood_pressure',
      'pervious_injection_iv',
      'pervious_injection_iv_description',
      'medication_allergy',
      'medication_allergy_description',
      'other_allergy',
      'other_allergy_describe',
      'injection_type',
      'injection_volume',
      'height',
      'weight',
      'bmi',
      'side_effects',
      'iv_type',
      'iv_volume',
      'injection_side',
      'injection_side_description',
    ]

    let concatenatedValues = ''

    fieldsToConcatenate.forEach(field => {
      if (formValues[field]) {
        concatenatedValues += `${fieldLabels[field]}: ${formValues[field]}\n`
      }
    })
    return concatenatedValues
  }

  const removeItemsFromIntravenous = async values => {
    if (values.intravenous && values.intravenous.length > 0) {
      values.intravenous.forEach(item => {
        if (item.value) {
          // eslint-disable-next-line no-param-reassign
          delete item.items
        }
      })
    }

    // Convert values object to an array
    const valuesArray = Object.entries(values).map(([key, value]) => ({
      key,
      value,
    }))

    console.log(`valuesArray`, JSON.stringify(valuesArray))
    return valuesArray
  }

  const onClickSubmit = async (values = {}) => {
    const roles = getUser()
    setLoading(true)

    const dataArray = await removeItemsFromIntravenous(values)

    console.log(`dataArray`, dataArray)

    const data = {
      type: APPOINTMENT_CHART_TYPE.SOAP_NURSE,
      isActive: true,
      patientId:
        appointmentDetail.userId._id || appointmentDetail.userId._id,

      appointmentId: appointmentDetail.id,

      creatorId: getRole()?.creatorId,
      desc: concatenateFormValues(values),
      viewableBy: CHART_VIEWABLE.EVERYONE,
      patientVisible: true,
      chartData: dataArray,
    }

    try {
      await commonApi({
        parameters: editID ? [editID] : [],
        action: editID ? 'updateDailyIntakeChart' : 'addDailyIntakeChart',
        data: data,
      }).then(async ({ DATA = {}, MESSAGE }) => {
        toast.success(MESSAGE)
        closeBtn()
        listAllChart(appointmentDetail?.userId?._id)
      })
    } finally {
      setLoading(false)
    }
  }

  const initialValues = {
    blood_pressure: '',
    pervious_injection_iv: '',
    medication_allergy: '',
    other_allergy: '',
    injections: [],
    intravenous: [],
  }

  // Create a Yup validation schema based on the template
  // const validationSchema = Yup.object(
  //   template.reduce((schema, item) => {
  //     if (item.required) {
  //       // eslint-disable-next-line no-param-reassign
  //       schema[item.id] = Yup.string().required('Required')
  //     }
  //     return schema
  //   }, {})
  // )

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: values => {
      // console.log(`values`, JSON.stringify(values))
      // console.log(removeItemsFromIntravenous(values))
      onClickSubmit(values)
      closeModal()
    },
  })

  useEffect(() => {
    const injectionsArray = [];
    const iVArray = [];
  
    const matchedServices = servicesToServe.flatMap(category => {
      const matchedData = category.data.filter(service => {
        return appointmentDetail.serviceIds.some(s => s._id === service._id);
      });
  
      return matchedData.map(service => ({
        categoryId: category._id,
        categoryName: category.name,
        _id: service._id,
        serviceName: service.name,
        serviceDescription: service.description,
        servedBy: category.servedBy,
        price: service.price,
        duration: service.duration,
        items: service.items || []
      }));
    });
  
    console.log(`matchedServices`, matchedServices);
  
    const filteredServices = matchedServices.filter(
      data =>
        data.categoryName === 'Injection' || data.categoryName === 'IV'
    );
  
    console.log('filteredServices', filteredServices);
  
    filteredServices.forEach(data => {
      if (data.categoryName === 'Injection') {
        const option = {
          id: data._id,
          key: data.serviceName,
          value: '' // Assign a default value of '10' as mentioned
        };
        injectionsArray.push(option);
      } else if (data.categoryName === 'IV') {
        const option = {
          id: data._id,
          key: data.serviceName,
          value: "" 
        };
        iVArray.push(option);
      }
    });
  
    // Set the value of the injections field with the injectionsArray
    formik.setFieldValue('injections', injectionsArray);
    formik.setFieldValue('intravenous', iVArray);
  }, [appointmentDetail, servicesToServe]);

  return {
    loading,
    editID,
    formik,
    closeBtn,
    iVArray,
    injectioArray,
  }
}

export default useNurseSOAP
