import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import store from '../redux/store';
import '@testing-library/jest-dom/';
import DeleteRoom from '../components/DeleteRoom';

describe('AddRoom component', () => {
    test('Should render the proper DeleteRoom component', () => {
      const deleteRoom = render(
        <React.StrictMode>
          <Provider store={store}>
            <Router>
              <DeleteRoom />
            </Router>
          </Provider>
          ,
        </React.StrictMode>,
      );
      expect(deleteRoom).toMatchSnapshot();
    });
  });