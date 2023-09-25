import { useState } from "react";
import Navbar from "../components/Navbar";
import { Routes, Route } from "react-router";
import AddRoomPage from "../pages/AddRoomPage";

const AppRouter = () => {
  const [open, setOpen] = useState(true);

  const handleOpen = (flag) => {
    if (flag === true || flag === false) setOpen(flag);
    else setOpen(!open);
  };
  return (
    <div className="flex w-full">
      <Navbar open={open} handleOpen={handleOpen} />
      <div className="mb-2 p-7 px-2 flex-1 h-screen overflow-y-scroll">
        <Routes>
          <Route path="/add_room" element={<AddRoomPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppRouter;
