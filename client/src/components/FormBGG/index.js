import React from 'react';

// import TextInput from './TextInputFormik'
import { Formik, Form, Field, ErrorMessage } from 'formik'
// import Yup from 'yup'
// import isEmpty from 'lodash/isEmpty'

const doValidate = ({ bggUsername }) => {
  let errors = {};

  //? TODO: more?
  bggUsername = bggUsername.trim();
  //TODO: affect the input field with trim
  if (!bggUsername) {
    errors.bggUsername = ''; 
  }

  return errors;
}

const doSubmit = (values, actions) => {
  // this could also easily use props or other
  // local state to alter the behavior if needed
  // this.props.sendValuesToServer(values)

  console.log("values:\n", values);
  // const fd = new FormData();
  // Object.entries(values).forEach(([k,v]) => {
    // console.log("for each k,v", k, v);
    // fd.append(k,v)
  // });
  
  // console.log(fd.has('bggUsername'), fd.getAll('bggUsername'));
  // console.log("fd:\n", fd);

  fetch('/bgglink', {
    method: 'POST',
    body: JSON.stringify(values),
    headers: { 'Content-Type': 'application/json' },
  })

  .then(response => response.json())
  .then(json => { console.log(json); })

  .catch(error => {
    console.log("fetch error\n", error);
  })

  .finally(() => { actions.setSubmitting(false) });

  // setTimeout(() => {
  //   alert(JSON.stringify(values, null, 2))
  // }, 2000);
};


const FormBGG = () => (
  <Formik

    initialValues={{
      bggUsername: ''
    }}

    validate={doValidate}
    onSubmit={doSubmit}
  >

    {({ errors, dirty, isSubmitting }) => (
      <Form>
        <Field
          type="text"
          name="bggUsername"
          label="BGG Username"
          placeholder="Bgg Username"
          // component={TextInput}
        />
        <ErrorMessage name="bggUsername" component="div" />

        <button 
          type="submit"

          disabled={
               isSubmitting
            || !dirty
            || Object.keys(errors).length //= !isEmpty(errors)
          }
        >
          Import Collection
        </button>
      </Form>
    )}

  </Formik>
);


export default FormBGG;
