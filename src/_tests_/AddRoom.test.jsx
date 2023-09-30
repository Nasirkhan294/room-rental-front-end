import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import store from '../redux/store';
import '@testing-library/jest-dom/';
import AddRoom from '../components/AddRoom';

describe('AddRoom component', () => {
    test('Should render the proper AddRoom component', () => {
      const addRoom = render(
        <React.StrictMode>
          <Provider store={store}>
            <Router>
              <AddRoom />
            </Router>
          </Provider>
          ,
        </React.StrictMode>,
      );
      expect(addRoom).toMatchSnapshot();
    });
  });