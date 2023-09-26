import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from '@material-tailwind/react';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import * as Yup from 'yup';
import {
  registerUser,
  selectAuthStatus,
  selectAuthMessage,
} from '../redux/Auth/authSlice';
import useToken from '../redux/Auth/useToken';
import Alert from './Alert';
import { Spinner } from './Loader';

const Register = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short')
      .max(50, 'Too Long')
      .matches(
        /^(?=.{4,50}$)(?![a-z])(?!.*[_.]{2})[a-zA-Z ]+(?<![_.])$/,
        'Name should have at least 4 characters and should not contain numbers or special characters/punctuations!',
      )
      .required('Name is required!'),
    email: Yup.string().required('Email is required!').email('Invalid Email!'),
    password: Yup.string()
      .required('Password is required!')
      .matches(
        /^[a-zA-Z0-9!@#$%^&* ]{6,20}$/,
        'Password must contain at least 6 characters!',
      ),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password not match')
      .required('Confirm Password is required!'),
  });
  const message = useSelector(selectAuthMessage);
  const status = useSelector(selectAuthStatus);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const isTokenSet = useToken();

  const handleSignUp = (user) => {
    dispatch(registerUser(user));
  };

  useEffect(() => {
    if (isTokenSet) navigate('/');
  }, [isTokenSet]);

  document.title = 'Room Rental | Register';

  return (
    <>
      {status === 'failed' && <Alert message={message} />}
      <Card className="max-w-sm mt-5 mx-auto bg-white/90 backdrop-blur-md relative top-6">
        <CardHeader
          variant="gradient"
          color="orange"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography
            variant="h3"
            color="white"
            className="font-osans uppercase tracking-widest font-light"
          >
            Register
          </Typography>
        </CardHeader>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSignUp}
          validationSchema={SignupSchema}
        >
          {({
            errors, touched, dirty, isValid,
          }) => (
            <Form>
              <CardBody className="flex flex-col gap-4">
                <Field
                  as={Input}
                  color="orange"
                  name="name"
                  label="Name"
                  size="lg"
                  error={Boolean(errors.name) && Boolean(touched.name)}
                />
                <ErrorMessage
                  name="name"
                  render={(msg) => (
                    <span className="text-xs text-gray-500">{msg}</span>
                  )}
                />
                <Field
                  as={Input}
                  color="orange"
                  name="email"
                  label="Email"
                  size="lg"
                  error={Boolean(errors.email) && Boolean(touched.email)}
                />
                <ErrorMessage
                  name="email"
                  render={(msg) => (
                    <span className="text-xs text-gray-500">{msg}</span>
                  )}
                />
                <Field
                  as={Input}
                  color="orange"
                  name="password"
                  label="Password"
                  size="lg"
                  error={Boolean(errors.password) && Boolean(touched.password)}
                />
                <ErrorMessage
                  name="password"
                  render={(msg) => (
                    <span className="text-xs text-gray-500">{msg}</span>
                  )}
                />
                <Field
                  as={Input}
                  color="orange"
                  name="passwordConfirmation"
                  label="Confirm Password"
                  size="lg"
                  error={
                    Boolean(errors.passwordConfirmation)
                    && Boolean(touched.passwordConfirmation)
                  }
                />
                <ErrorMessage
                  name="passwordConfirmation"
                  render={(msg) => (
                    <span className="text-xs text-gray-500">{msg}</span>
                  )}
                />
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  color="orange"
                  variant="gradient"
                  className="flex justify-center items-center"
                  fullWidth
                  type="submit"
                  disabled={!isValid || !dirty}
                >
                  {status === 'loading' ? <Spinner /> : <span>Register</span>}
                </Button>
                <Typography
                  variant="small"
                  className="mt-6 flex justify-center"
                >
                  Have an account?
                  <NavLink
                    to="/login"
                    className="ml-1 font-bold hover:text-gray-600 text-orange-700"
                  >
                    Sign in
                  </NavLink>
                </Typography>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default Register;
