import { useState } from 'react';
import Navbar from '../components/Navbar';

const AppRouter = () => {
  const [open, setOpen] = useState(true);

  const handleOpen = (flag) => {
    if (flag === true || flag === false) setOpen(flag);
    else setOpen(!open);
  };
  return (
    <div className="flex w-full">
      <Navbar open={open} handleOpen={handleOpen} />
    </div>
  );
};

export default AppRouter;
