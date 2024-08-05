import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import css from './LoginForm.module.css';
import '../../css/form.css';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useId } from 'react';

export default function LoginForm() {
  const dispatch = useDispatch();

  const fieldIds = {
    email: useId(),
    password: useId(),
  };

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values));
    actions.resetForm();
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={clsx('form', css['form'])} autoComplete="off">
        <div className="form-row">
          <label htmlFor={fieldIds.email} className="form-label">Email</label>
          <Field className="form-input" type="email" name="email" id={fieldIds.email} />
          <ErrorMessage name="email" component="div" className="error" />
        </div>

        <div className="form-row">
          <label htmlFor={fieldIds.password} className="form-label">Password</label>
          <Field className="form-input" type="password" name="password" id={fieldIds.password} />
          <ErrorMessage name="password" component="div" className="error" />
        </div>

        <div className="form-row">
          <button className="form-btn" type="submit">Log In</button>
        </div>
      </Form>
    </Formik>
  );
}
