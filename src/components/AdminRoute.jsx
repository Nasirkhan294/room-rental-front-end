import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import useToken from '../redux/Auth/useToken';
import { selectAuthenticatedUser } from '../redux/Auth/authSlice';

const AdminRoute = () => {
  const isTokenSet = useToken();
  const { role } = useSelector(selectAuthenticatedUser);

  return isTokenSet && role === 1 ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
