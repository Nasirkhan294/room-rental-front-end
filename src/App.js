import useToken from './redux/Auth/useToken';
import { unsetAuthToken } from './api/api';
import AppRouter from './routers';

function App() {
  if (useToken) unsetAuthToken();
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
