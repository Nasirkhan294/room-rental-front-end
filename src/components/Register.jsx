import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  registerUser,
  selectAuthStatus,
  selectAuthMessage,
} from "../redux/Auth/authSlice";
import useToken from "../redux/Auth/useToken";
import Alert from "./Alert";
import { Spinner } from "./Loader";

const Register = () => {
  return <div>Register</div>;
};

export default Register;
