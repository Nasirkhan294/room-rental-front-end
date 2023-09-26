import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import {
  loginUser,
  selectAuthStatus,
  selectAuthMessage,
} from "../redux/Auth/authSlice";
import useToken from "../redux/Auth/useToken";
import Alert from "./Alert";
import { Spinner } from "./Loader";

const Login = () => {
  return <div>Login</div>;
};

export default Login;
