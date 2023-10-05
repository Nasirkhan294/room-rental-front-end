import React, { useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
} from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import {
  selectRoomStatus,
  myRooms,
  fetchMyRooms,
  deleteMyRoom,
} from '../redux/Room/roomSlice';
import useToken from '../redux/Auth/useToken';

const DeleteRoom = () => {
  const dispatch = useDispatch();
  const rooms = useSelector(myRooms);
  const status = useSelector(selectRoomStatus);
  const isTokenSet = useToken();
  const navigate = useNavigate();

  const handleDeleteRoom = (roomId) => {
    dispatch(deleteMyRoom(roomId));
  };

  document.title = 'Room Rental | Delete Room';

  const checkAuthUser = () => {
    if (!isTokenSet) navigate('/login');
  };

  useEffect(() => {
    dispatch(fetchMyRooms());
    checkAuthUser();
  }, [isTokenSet, rooms.length]);

  return status === 'loading' ? (
    <Loader />
  ) : (
    <>
      <CardHeader
        variant="gradient"
        className="sticky top-2 z-30 mb-16 grid h-28 place-items-center text-white bg-orange-600/90 backdrop-blur-md"
      >
        <Typography
          variant="h3"
          color="white"
          className="font-osans uppercase tracking-widest font-light"
        >
          Delete a Room
        </Typography>
      </CardHeader>
      {rooms.length === 0 ? (
        <Card className="max-w-sm mt-48 mx-auto h-32">
          <CardBody className="text-center font-bold my-auto text-2xl">
            No Rooms Available
          </CardBody>
        </Card>
      ) : (
        <div className="Room-Grid grid gap-6">
          {rooms.map(({
            id: roomId, hosted_by: hostedBy, img, price_per_day: price,
          }) => (
            <Card key={roomId} className="cursor-pointer my-5">
              <CardHeader
                color="orange"
                className="relative h-56 mx-0.5"
                onClick={() => navigate(`/room/${roomId}`)}
              >
                <img
                  src={img}
                  alt="img-blur-shadow"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody className="px-2 text-center">
                <Typography variant="h5" className="mb-2 whitespace-pre-wrap">
                  {hostedBy}
                </Typography>
              </CardBody>
              <CardFooter
                divider
                className="flex items-center justify-between py-3"
              >
                <Typography variant="small">
                  $
                  {price}
                </Typography>
                <button
                  type="button"
                  onClick={() => handleDeleteRoom(roomId)}
                  className="text-orange-500 hover:text-orange-700"
                >
                  Delete
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default DeleteRoom;
