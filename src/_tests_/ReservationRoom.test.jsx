import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import store from '../redux/store';
import '@testing-library/jest-dom/';
import ReservationRoom from '../pages-home/ReservationRoom';

describe('ReservationRoom component', () => {
    test('Should render the proper Reservation component', () => {
      const reservationRoom = render(
        <React.StrictMode>
          <Provider store={store}>
            <Router>
              <ReservationRoom />
            </Router>
          </Provider>
          ,
        </React.StrictMode>,
      );
      expect(reservationRoom).toMatchSnapshot();
    });
  });
