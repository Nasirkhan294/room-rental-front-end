import React, { useEffect } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Typography,
  Input,
  Button,
  Textarea,
} from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  ErrorMessage, Formik, Form, Field,
} from 'formik';
import * as Yup from 'yup';
import {
  addRoom,
  selectRoom,
  selectRoomMessage,
  selectRoomStatus,
} from '../redux/Room/roomSlice';
import useToken from '../redux/Auth/useToken';
import Alert from './Alert';
import { Spinner } from './Loader';

const AddRoom = () => {
  const defaultImg = 'https://www.fluttercampus.com/img/4by3.webp';
  const message = useSelector(selectRoomMessage);
  const status = useSelector(selectRoomStatus);
  const availableRooms = useSelector(selectRoom);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isTokenSet = useToken();

  const initialValues = {
    location: '',
    description: '',
    price: '',
    capacity: '',
    image: defaultImg,
    available: true,
  };

  const RoomSchema = Yup.object().shape({
    location: Yup.string()
      .min(4, 'Too Short!')
      .max(250, 'Too Long!')
      .matches(
        /^(?=.{4,250}$)[a-zA-Z0-9 ]+$/,
        'Location should have at least 4 characters and contain only letters, numbers, and spaces!',
      )
      .required('Location is required!'),
    description: Yup.string()
      .required('Description is required!')
      .min(5, 'Too Short!')
      .max(500, 'Too Long!'),
    price: Yup.number()
      .required('Price is required!')
      .positive('Please enter only positive numbers!'),
    capacity: Yup.number()
      .required('Price is required!')
      .positive('Please enter only positive numbers!'),
    image: Yup.string()
      .url('Invalid URL')
      .required('Image is required!')
      .matches(
        /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
        'Should end with gif, jpeg, tiff, png, webp, bmp, or jpg',
      ),
  });

  document.title = 'Room Rental | Add Room';

  const handleAddRoom = (room) => {
    const roomdata = {
      location: room.location,
      capacity: room.capacity,
      price: room.price,
      floor: 'N/A',
      description: room.description,
      img: room.image,
    };
    dispatch(addRoom(roomdata));
    navigate('/');
  };

  const checkAuthUser = () => {
    if (!isTokenSet) navigate('/login');
  };

  useEffect(() => {
    checkAuthUser();
  }, [message, isTokenSet, availableRooms]);
  return (
    <>
      {status === 'failed' && <Alert message={message} />}
      <Card className="mt-8 mb-64 max-w-[450px] mx-auto bg-white/90 backdrop-blur-md">
        <CardHeader
          variant="gradient"
          className="mb-4 grid h-28 place-items-center bg-orange-600/90 text-white backdrop-blur-md"
        >
          <Typography
            variant="h3"
            color="white"
            className="font-osans uppercase tracking-widest font-light"
          >
            Add a room
          </Typography>
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" className="mb-2">
            Kind Note
          </Typography>
          <Typography className="text-center">
            Kindly fill in the form below to add a room to the list of available
            rooms.
          </Typography>
        </CardBody>
        <Formik
          initialValues={initialValues}
          onSubmit={handleAddRoom}
          validationSchema={RoomSchema}
        >
          {({
            errors, touched, isValid, dirty, values,
          }) => (
            <Form>
              <CardBody className="flex flex-col gap-4">
                <div>
                  <img src={values.image} alt="room-preview" />
                </div>
                <Field
                  as={Input}
                  name="location"
                  color="orange"
                  size="md"
                  label="Location"
                  error={Boolean(errors.location) && touched.location}
                />
                <ErrorMessage
                  name="location"
                  render={(msg) => (
                    <span className="text-xs text-gray-500">{msg}</span>
                  )}
                />
                <Field
                  as={Input}
                  name="image"
                  color="orange"
                  size="md"
                  label="Put a Room Image link"
                  error={Boolean(errors.image) && touched.image}
                />
                <ErrorMessage
                  name="image"
                  render={(msg) => (
                    <span className="text-xs text-gray-500">{msg}</span>
                  )}
                />
                <Field
                  as={Input}
                  name="price"
                  type="number"
                  color="orange"
                  size="lg"
                  label="Price"
                  error={Boolean(errors.price) && touched.price}
                />
                <ErrorMessage
                  name="price"
                  render={(msg) => (
                    <span className="text-xs text-gray-500">{msg}</span>
                  )}
                />
                <Field
                  as={Input}
                  name="capacity"
                  type="number"
                  color="orange"
                  size="lg"
                  label="capacity"
                  error={Boolean(errors.capacity) && touched.capacity}
                />
                <ErrorMessage
                  name="capacity"
                  render={(msg) => (
                    <span className="text-xs text-gray-500">{msg}</span>
                  )}
                />
                <Field
                  as={Textarea}
                  name="description"
                  color="orange"
                  label="Description"
                  size="md"
                  error={Boolean(errors.description) && touched.description}
                />
                <ErrorMessage
                  name="description"
                  render={(msg) => (
                    <span className="text-xs text-gray-500">{msg}</span>
                  )}
                />
                <Field
                  as={Checkbox}
                  name="available"
                  color="orange"
                  defaultChecked
                  label={values.available ? 'Available' : "Don't put in list"}
                />
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  type="submit"
                  color="orange"
                  variant="gradient"
                  fullWidth
                  className="capitalize flex justify-center items-center"
                  disabled={!isValid || !dirty}
                >
                  {status === 'loading' ? <Spinner /> : <span>Add Room</span>}
                </Button>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default AddRoom;
