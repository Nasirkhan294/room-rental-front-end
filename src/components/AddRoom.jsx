import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Typography,
  Input,
  Button,
  Textarea,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  addRoom,
  selectRoomMessage,
  selectRoomStatus,
} from "../redux/Room/roomSlice";
import useToken from "../redux/Auth/useToken";
import Alert from './Alert'
import { Spinner } from "./Loader";

const AddRoom = () => {
  return <div>AddRoom</div>;
};

export default AddRoom;
