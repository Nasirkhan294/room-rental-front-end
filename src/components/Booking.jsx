import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import moment from "moment";
import dayjs from "dayjs";
import {
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
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const currentUser = useSelector(selectAuthenticatedUser);
  const rooms = useSelector(fetchRooms);
  const message = useSelector(selectReservationMessage);
  const status = useSelector(selectReservationStatus);
  const selectedRoom = useSelector(selectRoom).id;
  const [roomId, setRoomId] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isTokenSet = useToken();
  const handleDateFormat = (date) =>
    moment(
      dayjs(date)
        .toDate()
        .format(YYYY - MM - DD)
    );

  const handleRoomId = (roomId) => setRoomId(+roomId);
  const handleReserve = () => {
    const reservation = {
      checkin_date: checkinDate,
      checkout_date: checkoutDate,
      room_id: roomId,
    };

    const reservationObject = {
      reservation,
      userId: currentUser.id,
    };
    dispatch(reserveRoom(reservationObject));
  };

  const navigateReservation = () => {
    if (message === "Room has been successfully booked")
      navigate("/reservation");
  };

  const checkAuthUser = () => {
    if (!isTokenSet) navigate("/login");
  };

  const handleSeletedRoom = () => {
    if (selectedRoom) setRoomId(selectedRoom);
  };

  useEffect(() => {
    handleSeletedRoom();
    navigateReservation();
    checkAuthUser();
  }, [message, isTokenSet, selectedRoom]);

  document.title = "Room Rental | Booking";
  return (
    <>
      {status === "failed" && <Alert message={message} />}
      <Card className="mt-8 max-w-sm mx-atuo bg-white/90 backdrop-blur-md">
        <CardHeader
          variant="gradient"
          className="mb-4 grid h-28 place-items-center text-white bg-orange/50 backdrop-blur-md"
        >
          <Typography
            variant="h3"
            color="white"
            className="font-osans uppercase tracking-widest font-light"
          >
            Book a Room
          </Typography>
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" className="mb-2">
            Kind Note
          </Typography>
          <Typography className="text-left">
            Explore our luxurious rooms and book your stay today.
          </Typography>
        </CardBody>
        <CardBody className="flex flex-col gap-4 text-red-500">
          <DatePicker
            placeholder="Check-in Date"
            placement="topLeft"
            size="large"
            format="YYYY/MM/DD"
            allowClear
            disabledDate={(current) =>
              current && current < moment().startOf("day")
            }
            onChange={(date) => setCheckinDate(handleDateFormat(date))}
          />
          <DatePicker
            placeholder="Check-out Date"
            placement="topLeft"
            size="large"
            format="YYYY/MM/DD"
            allowClear
            disabledDate={(current) =>
              current && current < moment().endOf("day")
            }
            onChange={(date) => setCheckoutDate(handleDateFormat(date))}
          />
          <Select
            color="orange"
            className=""
            name="room"
            value={selectedRoom?.toString()}
            label="Select a room"
            onChange={handleRoomId}
            required
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
          >
            {rooms.map(({ id: roomId, name }) => (
              <Option value={roomId.toString()} key={roomId}>
                {name}
              </Option>
            ))}
          </Select>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            type="button"
            onClick={handleReserve}
            color="orange"
            variant="gradient"
            fullWidth
            className="capitalize flex justify-center items-center"
          >
            {status === "loading" ? <Spinner /> : <span>Book Room</span>}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Booking;
