import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Alert, Button, Form } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

function ResetPassword() {
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  // Assuming resetPassword functionality needs to be implemented or triggered differently
  // as useAuth0 does not provide a direct resetPassword method.
  // You might need to implement a custom method or use Auth0 rules for password reset.
  // For demonstration, using loginWithRedirect to navigate to Auth0 login page.
  const resetPassword = async (email) => {
    // Custom logic to trigger password reset or redirect to Auth0 hosted password reset page
    // This is a placeholder function. You need to replace it with actual logic.
    logger.debug(`Reset password for: ${email}`);
    // Redirect to login page or password reset page
    loginWithRedirect({
      screen_hint: 'reset_password',
    });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await resetPassword(values.email);
          navigate('/auth/sign-in');
        } catch (error) {
          const message = error.message || 'Something went wrong';

          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <Form onSubmit={handleSubmit}>
          {errors.submit && (
            <Alert className="my-3" variant="danger">
              <div className="alert-message">{errors.submit}</div>
            </Alert>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              label="Email Address"
              value={values.email}
              isInvalid={Boolean(touched.email && errors.email)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="d-grid gap-2 mt-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
            >
              Reset password
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ResetPassword;
