import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import AddRoomPage from '../pages/AddRoomPage';
import DeleteRoomPage from '../pages/DeleteRoomPage';
import RoomDetails from '../pages/RoomDetails';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProtectedRoute from '../components/ProtectedRoute';
import { getAuthenticatedUser } from '../redux/Auth/authSlice';
import useToken from '../redux/Auth/useToken';
import BookingPage from '../pages/BookingPage';
import Reservation from '../pages/Reservation';

const AppRouter = () => {
  const [open, setOpen] = useState(false);
  const isTokenSet = useToken();
  const dispatch = useDispatch();

  if (isTokenSet) dispatch(getAuthenticatedUser);

  const handleOpen = (flag) => {
    if (flag === true || flag === false) setOpen(flag);
    else setOpen(!open);
  };

  useEffect(() => {
    if (isTokenSet) dispatch(getAuthenticatedUser);
  }, [isTokenSet]);

  return (
    <div className="flex w-full">
      <Navbar open={open} handleOpen={handleOpen} />
      <div className="p-7 px-2 flex-1 h-screen overflow-y-scroll">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:id" element={<RoomDetails />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/booking/" element={<BookingPage />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/add_room" element={<AddRoomPage />} />
            <Route path="/delete_room" element={<DeleteRoomPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppRouter;
