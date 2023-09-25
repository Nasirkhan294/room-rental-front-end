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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isTokenSet = useToken();

  const initialValues = {
    name: '',
    description: '',
    price: '',
    model: '',
    image: defaultImg,
    available: true,
  };

  const RoomSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, 'Too Short!')
      .max(250, 'Too Long!')
      .matches(
        /^(?=.{4,250}$)[a-zA-Z0-9 ]+$/,
        'Name should have at least 4 characters and contain only letters, numbers, and spaces!',
      )
      .required('Name is required!'),
    description: Yup.string()
      .required('Description is required!')
      .min(5, 'Too Short!')
      .max(500, 'Too Long!'),
    price: Yup.number()
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
    dispatch(addRoom(room));
  };

  const checkAuthUser = () => {
    if (!isTokenSet) navigate('/login');
  };

  const navigateDeleteRoom = () => {
    if (message === 'Room has been successfully added') {
      navigate('/delete_room');
    }
  };

  useEffect(() => {
    navigateDeleteRoom();
    checkAuthUser();
  }, [message, isTokenSet]);
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
                  name="name"
                  color="orange"
                  size="md"
                  label="Name"
                  error={Boolean(errors.name) && touched.name}
                />
                <ErrorMessage
                  name="name"
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
