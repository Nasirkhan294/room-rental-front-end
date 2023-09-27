import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import HomePage from '../pages-home/Home';
import AddRoomPage from '../pages/AddRoomPage';
import DeleteRoomPage from '../pages/DeleteRoomPage';
import RoomDetails from '../pages/RoomDetails';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProtectedRoute from '../components/ProtectedRoute';
import { selectAuthenticatedUser } from '../redux/Auth/authSlice';
import useToken from '../redux/Auth/useToken';

const AppRouter = () => {
  const [open, setOpen] = useState(true);
  const isTokenSet = useToken();

  const handleOpen = (flag) => {
    if (flag === true || flag === false) setOpen(flag);
    else setOpen(!open);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isTokenSet) dispatch(selectAuthenticatedUser);
  }, [isTokenSet]);

  return (
    <div className="flex w-full">
      <Navbar open={open} handleOpen={handleOpen} />
      <div className="mb-2 p-7 px-2 flex-1 h-screen overflow-y-scroll">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/add_room" element={<AddRoomPage />} />
          <Route path="/delete_room" element={<DeleteRoomPage />} />
          <Route element={<ProtectedRoute />}>
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
