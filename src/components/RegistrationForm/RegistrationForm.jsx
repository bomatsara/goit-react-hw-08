import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from './RegistrationForm.module.css';
import '../../css/form.css';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useId } from 'react';

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const fieldIds = {
    name: useId(),
    email: useId(),
    password: useId(),
  };

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={clsx('form', css['form'])} autoComplete="off">
        <div className="form-row">
          <label htmlFor={fieldIds.name} className="form-label">Username</label>
          <Field className="form-input" type="text" name="name" id={fieldIds.name} />
          <ErrorMessage name="name" component="div" className="error" />
        </div>

        <div className="form-row">
          <label htmlFor={fieldIds.email} className="form-label">Email</label>
          <Field type="email" name="email" className="form-input" id={fieldIds.email} />
          <ErrorMessage name="email" component="div" className="error" />
        </div>

        <div className="form-row">
          <label htmlFor={fieldIds.password} className="form-label">Password</label>
          <Field type="password" name="password" className="form-input" id={fieldIds.password} />
          <ErrorMessage name="password" component="div" className="error" />
        </div>

        <div className="form-row">
          <button className="form-btn" type="submit">Register</button>
        </div>
      </Form>
    </Formik>
  );
}
