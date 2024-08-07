import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RadioOption = ({ name, desc }) => (
  <div className="flex items-center" key={desc}>
    <label>
      <Field type="radio" name={name} value={desc} className="mr-2" />
      {desc}
    </label>
  </div>
);

const TextOrDateField = ({ name, fieldType }) => (
  <Field
    type={fieldType}
    name={name}
    className="px-2 py-1 border rounded focus:outline-none"
  />
);

export const createValidationSchema = (questionList) => {
  const initialValues = {};
  const validationSchema = {};

  questionList.forEach((question) => {
    initialValues[question._id] = '';
    validationSchema[question._id] = Yup.string().required('This field is required');
    if (question.options.some((option) => option.ansType === 'TEXT')) {
      initialValues[`${question._id}-ansType`] = '';
      validationSchema[`${question._id}-ansType`] = Yup.string().required('This field is required');
    }
  });

  return {
    initialValues,
    validationSchema: Yup.object().shape(validationSchema),
  };
};

const MedicalQuestions = ({ questionList }) => {
  const [submissionLogs, setSubmissionLogs] = useState({});
  const { initialValues, validationSchema } = createValidationSchema(questionList);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        setSubmissionLogs([...submissionLogs, values]);
      }}
    >
      {({ values }) => (
        <Form className="max-w-lg p-4 mx-auto">
          {questionList.map((question) => (
            <div key={question._id} className="mb-4">
              <label className="block mb-2 font-bold">{question.title}</label>
              <div>
                {question.options.map((option) => (
                  <RadioOption key={option._id} name={question._id} desc={option.desc} />
                ))}
                {values[question._id] === 'Yes' && (
                  <div className="pt-2 ml-0">
                    {question.options.some(
                      (option) =>
                        option.ansType === 'TEXT' || option.ansType === 'DATE'
                    ) && (
                      <TextOrDateField
                        name={`${question._id}-ansType`}
                        fieldType={values[`${question._id}-ansType`]}
                      />
                    )}
                    <ErrorMessage
                      name={`${question._id}-ansType`}
                      component="div"
                      className="mt-1 text-red-500"
                    />
                  </div>
                )}
              </div>
              <ErrorMessage
                name={question._id}
                component="div"
                className="mt-1 text-red-500"
              />
            </div>
          ))}
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            Submit
          </button>

          {submissionLogs.length > 0 && (
            <div className="p-4 mt-4 border border-gray-300 rounded">
              <h3 className="mb-2 text-lg font-semibold">Submission Logs:</h3>
              <pre className="overflow-x-auto">
                {JSON.stringify(submissionLogs, null, 2)}
              </pre>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default MedicalQuestions;
