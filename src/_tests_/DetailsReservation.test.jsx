import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import store from '../redux/store';
import '@testing-library/jest-dom/';
import ReservationDetail from '../pages-home/DetailsReservation';

describe('Reservation Detail component', () => {
  test('Should render the proper Reservation Detail component', () => {
    const reservationDetail = render(
      <React.StrictMode>
        <Provider store={store}>
          <Router>
            <ReservationDetail title checkinDate checkoutDate hotel />
          </Router>
        </Provider>
        ,
      </React.StrictMode>,
    );
    expect(reservationDetail).toMatchSnapshot();
  });
});
