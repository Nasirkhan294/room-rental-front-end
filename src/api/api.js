const BASE_URL = 'http://localhost:4000/api/v1';

// set the authentication token in local storage
const setAuthToken = (token) => localStorage.setItem('token', token);
// remove the authentication token from local storage
const unsetAuthToken = () => localStorage.removeItem('token');

// create options for HTTP requests with JSON body
const createRequestOptions = (method, body) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
  },
  body: JSON.stringify(body),
});
//  handle API responses
const handleApiResponse = async (response) => {
  const { status } = response;

  if (status === 200 || status === 201) {
    const data = await response.json();
    return { status: 'succeeded', data };
  }

  if (status === 401) {
    unsetAuthToken();
    return {
      status: 'Unauthorized',
      error: 'Unauthorized, You must Login or Register',
      message: 'Login failed, Please check your credentials',
    };
  }

  if (status === 422) {
    const data = await response.json();
    return { status: 'Failed', data, message: data.message };
  }

  if (status === 500) {
    unsetAuthToken();
    return {
      status: 'Expired',
      error: 'Unauthorized, You must Login or Register',
      message: 'Session for User has expired',
    };
  }

  return null;
};

const api = {
  // User registration
  register: async (user) => {
    const response = await fetch(
      `${BASE_URL}/signup`,
      createRequestOptions('POST', user),
    );

    const { status: code } = response;

    if (code === 200) setAuthToken(response);

    const data = await response.json();
    return data;
  },
  //   User Login
  login: async (user) => {
    const response = await fetch(
      `${BASE_URL}/login`,
      createRequestOptions('POST', user),
    );

    const result = await handleApiResponse(response);

    if (result && result.status === 'succeeded') {
      setAuthToken(response.headers.get('Authorization'));
      return { ...result, user: result.data };
    }

    return result;
  },

  //  User logout
  logout: async () => {
    const response = await fetch(
      `${BASE_URL}/logout`,
      createRequestOptions('DELETE'),
    );

    const result = await handleApiResponse(response);

    if (result && result.status === 'succeeded') {
      unsetAuthToken();
    }

    return result;
  },

  // Fetch authenticated user
  fetchAuthUser: async () => {
    const response = await fetch(
      `${BASE_URL}/users`,
      createRequestOptions('GET'),
    );
    return handleApiResponse(response);
  },

  // Fetch available rooms
  fetchAvailableRooms: async () => {
    const response = await fetch(`${BASE_URL}/rooms`);
    return response.json();
  },

  // Fetch a room by ID
  fetchRoom: async (id) => {
    const response = await fetch(`${BASE_URL}/rooms/${id}`);
    return response.json();
  },

  // Reserve a room
  reserveRoom: async (id, booking) => {
    const response = await fetch(
      `${BASE_URL}/users/${id}/bookings`,
      createRequestOptions('POST', booking),
    );
    return response.json();
  },

  //  Fetch user's bookings
  fetchBookings: async (id) => {
    const response = await fetch(
      `${BASE_URL}/users/${id}/bookings`,
      createRequestOptions('GET'),
    );
    return response.json();
  },

  //  Toggle room availability
  toggleRoomAvailability: async (roomId, room) => {
    const response = await fetch(`${BASE_URL}/rooms/${roomId}/availability`, {
      ...createRequestOptions('PATCH', room),
    });

    return handleApiResponse(response);
  },

  //  Delete a booking
  deleteBooking: async (userId, bookingId) => {
    const response = await fetch(
      `${BASE_URL}/users/${userId}/bookings/${bookingId}`,
      createRequestOptions('DELETE'),
    );
    return response.json();
  },
};

export default api;
