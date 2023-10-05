/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
//   CardFooter,
//   CardHeader,
//   Typography,
} from '@material-tailwind/react';
// import { TrashIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteReservation,
  fetchReservations,
  // setMessageEmpty,
  // selectReservationMessage,
  // selectReservationStatus,
  roomReservations,
  // deleteReservation,
} from '../redux/Reservations/reservationsSlice';
import useToken from '../redux/Auth/useToken';
// import { authenticatedUser } from '../redux/Auth/authSlice';
// import Loader from '../components/Loader';
// import ReservationDetail from './DetailsReservation';

const Reservation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const message = useSelector(selectReservationMessage);
  const reservations = useSelector(roomReservations);
  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  const handleDelete = (reservationId) => {
    dispatch(deleteReservation({ bookingId: reservationId }));
  };

  // const status = useSelector(selectReservationStatus);
  // const currentUser = useSelector(authenticatedUser);
  const isTokenSet = useToken();

  // const handleRemoveReservation = (reservationId) => {
  //   const removeOptions = {
  //     userId: currentUser.id,
  //     reservationId,
  //   };

  //   dispatch(deleteReservation(removeOptions));
  // };

  const checkAuthUser = () => {
    if (!isTokenSet) navigate('/login');
  };

  // const handleReservationMessage = () => {
  //   if (message === 'Room has been successfully booked') dispatch(setMessageEmpty(''));
  // };

  useEffect(() => {
    checkAuthUser();
    dispatch(fetchReservations());
    // handleReservationMessage();
  }, [reservations.length]);

  document.title = `Reservations: ${reservations.length}`;
  return (
    <div className="max-w-sm mt-3 mb-5 mx-auto flex flex-col gap-y-12 h-[95%]">
      {reservations.length === 0 ? (
        <Card className="max-w-sm my-auto h-32">
          <CardBody className="text-center font-bold my-auto text-2xl">
            {' '}
            No Reservations 🕸
            {' '}
          </CardBody>
        </Card>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Reservation ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Checkin Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Checkout Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Room Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">{' '}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reservations.map(({
              id: reservationId, start_date: startDate, end_date: endDate, room_id: roomId,
            }, index) => (
              <tr key={reservationId} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}>
                <td className="px-6 py-4 whitespace-nowrap">{reservationId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatDateString(startDate)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatDateString(endDate)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/room/${roomId}`} className="text-blue-600 hover:underline">
                    See Room
                    {' '}
                    {roomId}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(reservationId)}
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Reservation.propTypes = {
//   reservationTitle: PropTypes.string.isRequired,
//   checkinDate: PropTypes.string.isRequired,
//   checkoutDate: PropTypes.string.isRequired,
//   hotel: PropTypes.string.isRequired,
//   roomAvailable: PropTypes.bool.isRequired,
// };

export default Reservation;
