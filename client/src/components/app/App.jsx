import '../../App.scss';
import View from '../View/View';
import { StyledEngineProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from '../../redux/index';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <StyledEngineProvider>
        <Provider store={store}>
          <View />
          <ToastContainer pauseOnFocusLoss={false} />
        </Provider>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
