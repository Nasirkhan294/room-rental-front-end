import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Routes, Route } from 'react-router';
import AddRoomPage from '../pages/AddRoomPage';

const AppRouter = () => {
  const [open, setOpen] = useState(true);

  const handleOpen = (flag) => {
    if (flag === true || flag === false) setOpen(flag);
    else setOpen(!open);
  };
  return (
    <div className="flex w-full">
      <Navbar open={open} handleOpen={handleOpen} />
      <Routes>
        <Route path="/booking" element={<AddRoomPage />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
