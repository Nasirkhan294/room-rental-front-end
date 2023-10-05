import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import store from '../redux/store';
import '@testing-library/jest-dom/';
import Reservation from '../pages-home/ReservationRoom';

describe('Reservation component', () => {
  test('Should render the proper Reservation component', () => {
    const reservation = render(
      <React.StrictMode>
        <Provider store={store}>
          <Router>
            <Reservation />
          </Router>
        </Provider>
        ,
      </React.StrictMode>,
    );
    expect(reservation).toMatchSnapshot();
  });
});