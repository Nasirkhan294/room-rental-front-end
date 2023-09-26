import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from '@material-tailwind/react';
import {
  loginUser,
  selectAuthStatus,
  selectAuthMessage,
} from '../redux/Auth/authSlice';
import useToken from '../redux/Auth/useToken';
import Alert from './Alert';
import { Spinner } from './Loader';

const Login = () => {
  const [user, setUser] = useState({});
  const status = useSelector(selectAuthStatus);
  const message = useSelector(selectAuthMessage);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isTokenSet = useToken();

  const handleChange = (e) => {
    const {
      target: { name: input, value },
    } = e;
    setUser({ ...user, [input]: value });
  };

  const handleSignIn = () => dispatch(loginUser(user));

  useEffect(() => {
    if (isTokenSet) navigate('/');
  }, [isTokenSet]);

  document.title = 'Room Rental | Login';
  return (
    <>
      {status === 'unauthorized' && <Alert message={message} />}
      <Card className="mt-5 max-w-sm mx-auto bg-white/90 backdrop-blur-md relative top-6">
        <CardHeader
          variant="gradient"
          className="bg-orange-500 mb-4 grid h-28 place-items-center"
        >
          <Typography
            variant="h3"
            color="white"
            className="font-osans uppercase tracking-widest font-light"
          >
            Login
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            color="orange"
            onChange={handleChange}
            name="email"
            label="Email"
            size="lg"
          />
          <Input
            color="orange"
            type="password"
            onChange={handleChange}
            name="password"
            label="password"
            size="lg"
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            color="orange"
            onClick={handleSignIn}
            variant="gradient"
            fullWidth
            className="flex justify-center items-center"
          >
            {status === 'loading' ? <Spinner /> : <span>Sign In</span>}
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <NavLink
              to="/register"
              className="ml-1 font-bold hover:text-gray-600 text-orange-700"
            >
              Sign Up
            </NavLink>
          </Typography>
        </CardFooter>
      </Card>
    </>
  );
};

export default Login;
