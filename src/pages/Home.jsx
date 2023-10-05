import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

import { availableRooms, selectRoomStatus } from '../redux/Room/roomSlice';

const Home = () => {
  document.title = 'Home';
  const rooms = useSelector(availableRooms);
  const status = useSelector(selectRoomStatus);
  const navigate = useNavigate();

  return status === 'loading' ? (
    <Loader />
  ) : (
    <>
      <div>
        <Typography
          variant="h1"
          className="uppercase font-osans mt-3 font-extralight tracking-widest mb-3 text-center sl:ml-2 text-[1.37rem] leading-7 sm:text-2xl md:text-3xl border-b-2 pb-2"
        >
          AVAILABLE ROOMS
        </Typography>
      </div>
      <div className="relative max-w-[800px] mx-auto flex flex-col mt-6">
        {rooms.map((room) => (
          <Card
            key={room.id}
            className="cursor-pointer my-5"
            onClick={() => navigate(`/room/${room.id}`)}
          >
            <CardHeader color="amber" className="relative h-56 mx-0.5">
              <img
                src={room.img}
                alt="img-blur-shadow"
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody className="px-2 text-center">
              <Typography variant="h6" className={room.available ? '' : 'p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'}>
                {room.available ? '' : 'NOT AVAILABLE 😞'}
              </Typography>
              <Typography variant="h5" className="mb-2 whitespace-pre-wrap">
                {room.hosted_by}
              </Typography>
            </CardBody>
            <CardFooter
              divider
              className="flex items-center justify-between py-3"
            >
              <Typography variant="small" className="font-semibold">
                $
                {room.price_per_day}
                /per night
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="flex gap-1 font-semibold"
              >
                {room.location}
              </Typography>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;
