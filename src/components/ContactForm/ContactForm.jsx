import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useId } from 'react';
import css from './ContactForm.module.css';
import '../../css/form.css';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations.js';
import clsx from 'clsx';

export default function ContactForm() {
  const fieldIds = {
    username: useId(),
    number: useId(),
  };

  const initialValues = {
    username: '',
    number: '',
  };

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact({
      name: values.username,
      number: values.number,
    }));
    actions.resetForm();
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 digits')
      .max(50, 'Username must be at most 50 digits'),
    number: Yup.string()
      .matches(/^[0-9]+$/, 'Only numbers are allowed')
      .required('Number is required')
      .min(3, 'Number must be at least 3 digits')
      .max(50, 'Number must be at most 50 digits'),
  });

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      <Form className={clsx('form', css['form'])}>
        <div className="form-row">
          <label htmlFor={fieldIds.username} className="form-label">Username</label>
          <Field className="form-input" type="text" name="username" id={fieldIds.username} />
          <ErrorMessage name="username" component="div" className="error" />
        </div>

        <div className="form-row">
          <label htmlFor={fieldIds.number} className="form-label">Number</label>
          <Field className="form-input" type="tel" name="number" id={fieldIds.number} />
          <ErrorMessage name="number" component="div" className="error" />
        </div>

        <div className="form-row">
          <button className="form-btn" type="submit">Add contact</button>
        </div>
      </Form>
    </Formik>
  );
}