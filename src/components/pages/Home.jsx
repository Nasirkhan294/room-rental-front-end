import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';

import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { fetchAllRooms, selectRoomStatus } from '../redux/Room/roomSlice';

const Home = () => {
  document.title = 'Home';
  const rooms = useSelector(fetchAllRooms);
  const status = useSelector(selectRoomStatus);
  const navigate = useNavigate();
  const ref = useRef();

  return status === 'loading' ? (
    <Loader />
  ) : (
    <>
      <div>
        <Typography
          variant="h1"
          className="uppercase font-osans mt-3 font-extralight tracking-widest mb-3 text-center sl:ml-2 text-[1.37rem] leading-7 sm:text-2xl md:text-3xl border-b-2 pb-2"
        >
          Latest Models
        </Typography>
      </div>
      <div className="relative max-w-[800px] mx-auto flex flex-col mt-6">
        <Carousel
          className="mx-auto max-w-[500px]"
          pauseOnHover
          pauseOnDotsHover
          autoplay
          effect="fade"
          draggable
          ref={ref}
        >
          {rooms.map((room) => (
            <Card
              key={room.id}
              className="cursor-pointer my-5"
              onClick={() => navigate(`/room-details/${room.id}`)}
            >
              <CardHeader color="amber" className="relative h-56 mx-0.5">
                <img
                  src={room.image}
                  alt="img-blur-shadow"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody className="px-2 text-center">
                <Typography variant="h5" className="mb-2 whitespace-pre-wrap">
                  {room.name}
                </Typography>
              </CardBody>
              <CardFooter
                divider
                className="flex items-center justify-between py-3"
              >
                <Typography variant="small" className="font-semibold">
                  $
                  {room.daily_price}
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="flex gap-1 font-semibold"
                >
                  {room.model}
                </Typography>
              </CardFooter>
            </Card>
          ))}
        </Carousel>
        <button
          type="button"
          onClick={() => ref.current.prev()}
          className="group rounded-full bg-amber-400 drop-shadow-md shadow-amber-500 flex justify-center items-center border-none absolute top-1/2 left-5"
        >
          <ChevronLeftIcon className="stroke-gray-600 w-7 group-hover:-translate-x-0.5 duration-300 group-active:stroke-white" />
        </button>
        <button
          type="button"
          onClick={() => ref.current.next()}
          className="group rounded-full bg-amber-400 drop-shadow-md shadow-amber-500 flex  justify-center items-center border-none absolute top-1/2 right-5"
        >
          <ChevronRightIcon className="stroke-gray-600 w-7 group-hover:translate-x-0.5 duration-300 group-active:stroke-white" />
        </button>
        <button
          type="button"
          onClick={() => ref.current.goTo(0)}
          className="group active:rotate-180 duration-300 rounded-full bg-amber-400 self-center drop-shadow-md shadow-amber-500 flex  justify-center items-center border-none"
        >
          <ArrowPathIcon className="stroke-gray-600 w-7 duration-300 group-active:stroke-white" />
        </button>
      </div>
    </>
  );
};

export default Home;
