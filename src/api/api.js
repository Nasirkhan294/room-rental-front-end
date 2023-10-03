const baseURL = 'http://localhost:4000/api/v1';

const setAuthToken = (token) => localStorage.setItem('token', `Bearer ${token}`);

const unsetAuthToken = () => localStorage.removeItem('token');

const registerOptions = (user) => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(user),
});

const loginOptions = (user) => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(user),
});

const roomBookingOptions = (booking) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
  },
  body: JSON.stringify(booking),
});

const addRoomOptions = (room) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
  },
  body: JSON.stringify(room),
});

const removeReservationOptions = () => ({
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
  },
});

const logoutOptions = () => ({
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
  },
});

const api = {
  register: async (user) => {
    const response = await fetch(`${baseURL}/signup`, registerOptions({ user }));

    const { status: code } = response;

    if (code === 200) {
      const data = await response.json();
      setAuthToken(data.status.token);
      return data;
    }

    throw new Error('Registration failed'); // Throw an error if the registration was unsuccessful
  },
  login: async (user) => {
    const response = await fetch(`${baseURL}/login`, {
      ...loginOptions({ user }),
    });

    const { status: code } = response;

    if (code === 200) {
      const data = await response.json();
      // const { message } = data.status;
      setAuthToken(data.status.token);
      return data;
    }
    if (code === 401) {
      return {
        user: {},
        status: 'unauthorized',
        error: 'Unauthorized, You must Login or Register',
        message: 'Login failed, Please check your email and password',
      };
    }

    return null;
  },
  logout: async () => {
    const response = await fetch(`${baseURL}/logout`, {
      ...logoutOptions(),
    });

    const { status: code } = response;

    if (code === 200) {
      unsetAuthToken();
      const data = await response.json();
      return {
        user: {},
        status: 'succeeded',
        message: data.message,
      };
    }
    if (code === 500) {
      unsetAuthToken();
      return {
        user: {},
        status: 'expired',
        error: 'Unauthorized, You must Login or Register',
        message: 'Session for User has expired',
      };
    }
    return null;
  },
  fetchAuthUser: async () => {
    const response = await fetch(`${baseURL}/users`, {
      method: 'GET',
      headers: { Authorization: localStorage.getItem('token') },
    });

    const { status: code } = response;

    if (code === 401) {
      unsetAuthToken();
      return {
        user: {},
        status: 'expired',
        error: 'Unauthorized, You must Login or Register',
        message: 'Session for User has expired',
      };
    }
    if (code === 200) {
      const currentUser = await response.json();
      return currentUser;
    }
    return null;
  },
  fetchAvailableRooms: async () => {
    const response = await fetch(`${baseURL}/rooms`);
    const rooms = await response.json();
    return rooms;
  },
  fetchRoom: async (id) => {
    const response = await fetch(`${baseURL}/rooms/${id}`);
    const room = await response.json();
    return room;
  },
  reserveRoom: async (id, booking) => {
    const response = await fetch(`${baseURL}/users/${id}/reservations`, {
      ...roomBookingOptions({ booking }),
    });

    const data = await response.json();
    return data;
  },
  fetchReservations: async (id) => {
    const response = await fetch(`${baseURL}/users/${id}/reservations`, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    const reservations = await response.json();
    return reservations;
  },
  deleteReservation: async (userId, reservationId) => {
    const response = await fetch(
      `${baseURL}/users/${userId}/reservations/${reservationId}`,
      {
        ...removeReservationOptions(),
      },
    );
    const data = await response.json();
    return data;
  },
  fetchAllRooms: async () => {
    const response = await fetch(`${baseURL}/all_rooms`, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    const rooms = await response.json();
    return rooms;
  },
  addRoom: async (room) => {
    const response = await fetch(`${baseURL}/rooms`, {
      ...addRoomOptions({ room }),
    });
    const data = await response.json();
    const { status: code } = response;
    if (code === 422) {
      return {
        status: 'failed',
        data: room,
        message: data.message,
      };
    }

    return data;
  },
};

export default api;
