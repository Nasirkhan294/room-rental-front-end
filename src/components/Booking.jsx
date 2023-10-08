import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { DatePicker } from 'antd';
import moment from 'moment';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import {
  reserveRoom,
  // selectReservationMessage,
  // selectReservationStatus,
} from '../redux/Reservations/reservationsSlice';
import useToken from '../redux/Auth/useToken';
import { availableRooms } from '../redux/Room/roomSlice';
// import { authenticatedUser } from '../redux/Auth/authSlice';
import Alert from './Alert';
import { Spinner } from './Loader';

const Booking = () => {
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  // const currentUser = useSelector(authenticatedUser);
  // const { id } = useParams();
  const rooms = useSelector(availableRooms);
  // const selectedRoom = rooms.filter((room) => room.id === id)[0];
  const message = 'useSelector(selectReservationMessage)';
  const status = 'useSelector(selectReservationStatus)';
  const { id: paramsId } = useParams();
  const initialRoomId = paramsId || (rooms.length > 0 ? rooms[0].id : 0);
  const [id, setRoomId] = useState(initialRoomId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isTokenSet = useToken();
  const handleDateFormat = (date) => {
    const dateFormatted = new Date(date);
    const options = {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    };
    return dateFormatted.toLocaleDateString('en-US', options);
  };

  const handleRoomId = (roomId) => {
    setRoomId(+roomId);
  };
  const handleReserve = () => {
    const reservation = {
      start_date: checkinDate,
      end_date: checkoutDate,
      room_id: id,
    };
    dispatch(reserveRoom(reservation));
    navigate('/reservation');
  };

  const navigateReservation = () => {
    if (message === 'Room has been successfully booked') {
      navigate('/reservation');
    }
  };

  const checkAuthUser = () => {
    if (!isTokenSet) navigate('/login');
  };

  // const handleSeletedRoom = () => {
  //   if (id) setRoomId(selectedRoom.id);
  // };

  useEffect(() => {
    // handleSeletedRoom();
    navigateReservation();
    checkAuthUser();
  }, [message, isTokenSet]);

  document.title = 'Room Rental | Booking';
  return (
    <>
      {status === 'failed' && <Alert message={message} />}
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
            Book a Room
          </Typography>
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" className="mb-2">
            Kind Note
          </Typography>
          <Typography className="text-center">
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
            disabledDate={(current) => current && current < moment().startOf('day')}
            onChange={(date) => setCheckinDate(handleDateFormat(date))}
          />
          <DatePicker
            placeholder="Check-out Date"
            placement="topLeft"
            size="large"
            format="YYYY/MM/DD"
            allowClear
            disabledDate={(current) => current && current < moment().endOf('day')}
            onChange={(date) => setCheckoutDate(handleDateFormat(date))}
          />
          <Select
            color="orange"
            className=""
            name="room"
            value={id?.toString()}
            label="Select a room"
            onChange={handleRoomId}
            required
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
          >
            {rooms.map(({ id: roomId, hosted_by: hostedBy, available }) => (
              (available ? (
                <Option value={roomId.toString()} key={roomId}>
                  {hostedBy}
                </Option>
              ) : '')

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
            {status === 'loading' ? <Spinner /> : <span>Book Room</span>}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
export default Booking;
