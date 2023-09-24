import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useToken from "../redux/Auth/useToken";
import {
  logoutUser,
  selectAuthStatus,
  selectAuthenticatedUser,
} from "../redux/Auth/authSlice";
import {
  fetchReservations,
  resetReservationState,
} from "../redux/Reservations/reservationsSlice";
import {
  resetRoomState,
  resetAllRoomsState,
  fetchRooms,
} from "../redux/Room/roomSlice";
import {
  ChevronLeftIcon,
  HomeIcon,
  CreditCardIcon,
  BookmarkIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
const Navbar = () => {
  const [hide, setHide] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [authenticated, setAuthenticated] = useState(false);
  const { id, name: userName, role } = useSelector(selectAuthenticatedUser);
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);

  const menu = [
    {
      id: 1,
      name: "Home",
      icon: <HomeIcon className="w-7" />,
      path: "/",
    },
    {
      id: 2,
      name: "Booking",
      icon: <CreditCardIcon className="w-7" />,
      path: "/booking",
    },
    {
      id: 3,
      name: "Reservation",
      icon: <BookmarkIcon className="w-7" />,
      path: "/reservation",
    },
    {
      id: 4,
      name: "Add Room",
      icon: <PlusCircleIcon className="w-7" />,
      path: "/add_room",
    },
    {
      id: 5,
      name: "Delete Room",
      icon: <MinusCircleIcon className="w-7" />,
      path: "/delete_room",
    },
  ];
  return (
    <>
      <h1>Hello navbar</h1>
    </>
  );
};

export default Navbar;
