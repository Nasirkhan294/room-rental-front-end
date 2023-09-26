import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  cardFooter,
  Typography,
  CardFooter,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Switch from "./Switch";
import {
  allRooms,
  selectRoomStatus,
  toggleAvailability,
  setMessageEmpty,
} from "../redux/Room/roomSlice";
import useToken from "../redux/Auth/useToken";

const DeleteRoom = () => {
  const rooms = useSelector(allRooms);
  const status = useSelector(selectRoomStatus);
  const isTokenSet = useToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteRoom = (status, roomId) => {
    const room = {
      available: status,
    };

    setTimeout(() => {
      dispatch(toggleAvailability({ roomId, room }));
    }, 1000);
  };

//   document.title = "Room Rental | Delete Room";
//   return status === "loading" ? (
//     <Loader />
//   ) : (
//     <>
//       <CardHeader
//         variant="gradient"
//         className="sticky top-2 z-30 mb-16 grid h-28 place-items-center text-white bg-orange-600/90 backdrop-blur-md"
//       >
//         <Typography
//           variant="h3"
//           color="white"
//           className="font-osans uppercase tracking-widest font-light"
//         >
//           Delete a Room
//         </Typography>
//       </CardHeader>
//       {rooms.length === 0 ? (
//         <Card className="max-w-sm mt-48 mx-auto h-32">
//           <CardBody className="text-center font-bold my-auto text-2xl">
//             No Rooms Available
//           </CardBody>
//         </Card>
//       ) : (
//         <div className="Room-Grid grid gap-6">
//           {rooms.map(({ id: roomId, name, image, price, available }) => (
//             <Card key={roomId} className="cursor-pointer my-5">
//               <CardHeader
//                 color="orange"
//                 className="relative h-56 mx-0.5"
//                 onClick={() => navigate(`/room-details/${roomId}`)}
//               >
//                 <img
//                   src={image}
//                   alt="img-blur-shadow"
//                   className="h-full w-full object-cover"
//                 />
//               </CardHeader>
//               <CardBody className="px-2 text-center">
//                 <Typography variant="h5" className="mb-2 whitespace-pre-wrap">
//                     {name}
//                 </Typography>
//               </CardBody>
//               <CardFooter divider className="flex items-center justify-between py-3">
//                 <Typography variant="small">
//                     ${price}
//                 </Typography>
//                 <Switch
//                     status={available}
//                     roomName={name}
//                     roomId={roomId}
//                     handleRemove={handleDeleteRoom}
//                   />
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

// export default DeleteRoom;
