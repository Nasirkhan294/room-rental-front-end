import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import moment from "moment";
import dayjs from "dayjs";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import {
  reserveRoom,
  selectReservationMessage,
  selectReservationStatus,
} from "../redux/Reservations/reservationsSlice";
import useToken from "../redux/Auth/useToken";
import { fetchRooms, selectRoom } from "../redux/Room/roomSlice";
import { selectAuthenticatedUser } from "../redux/Auth/authSlice";
import Alert from "./Alert";
import { Spinner } from "./Loader";

const Booking = () => {
  return <div>Booking</div>;
};

export default Booking;
