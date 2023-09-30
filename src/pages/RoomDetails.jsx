import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { selectRoom, fetchRooms, selectRoomStatus } from '../redux/Room/roomSlice';
import Loader from '../components/Loader';

const RoomDetails = ({ open }) => {
  const { id } = useParams();
  const roomDetails = useSelector(selectRoom);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectRoomStatus);

  const handleReserve = () => {
    navigate('/booking');
  };

  document.title = `ElDorado | ${roomDetails.name}`;

  useEffect(() => {
    dispatch(fetchRooms(id));
  }, []);
  return status === 'loading' ? (
    <Loader />
  ) : (
    <div className="overflow-auto mt-10 mx-auto px-4 py-5 bg-gray-200 rounded">
      <div className={`md:flex ${open && 'tablet:flex-col'}`}>
        <div className="mr-4">
          <h1 className="text-4xl text-black font-bold self-end justify-self-start font-osans pl-2 mb-12 border-l-4 border-orange-500">
            {roomDetails.name}
          </h1>
          <img
            className="w-[1000px] min-w-[270px] rounded-lg object-cover self-stretch"
            src={roomDetails.image}
            alt={roomDetails.name}
          />
        </div>
        <div className="flex flex-col">
          <div className="mx-auto mt-2 text-2xl text-black font-bold self-end justify-self-start font-osans bg-orange-300 px-6 py-2 w-max rounded">
            $
            {roomDetails.daily_price}
            <sub className="font-features subs font-normal">/per day</sub>
          </div>
          <p className="text-xs text-black font-light text-center">
            Included Taxes and Checkup
          </p>
          <div className="text-black bg-white border border-gray-200 p-3 my-2 drop-shadow">
            <h2 className="text-xl border-l-2 border-orange-500 font-bold p-1 mb-4 bg-orange-50">
              SPECIFICATIONS
            </h2>
            <p className="">
              <span className="font-semibold ">Make:</span>
              {' '}
              {roomDetails.name}
            </p>
            <p className="text-gray ">
              <span className="font-semibold ">Model:</span>
              {' '}
              {roomDetails.model}
            </p>
            <p
              className="text-gray text-base max-w-[420px]"
            >
              <span className="font-semibold">Description:</span>
              {' '}
              {roomDetails.description}
            </p>
          </div>
          <button
            className="my-3 mx-auto self-center"
            onClick={handleReserve}
            type="button"
          >
            <span className="text-black font-bold bg-orange-500 border px-4  hover:bg-orange-600 py-3 rounded-sm my-2">
              Reserve
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

RoomDetails.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default RoomDetails;
