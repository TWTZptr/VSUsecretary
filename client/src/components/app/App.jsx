import './App.scss';
import { Provider } from 'react-redux';
import store from '../../redux/index';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../../hoc/AuthProvider';
import { RequireAuth } from '../../hoc/RequireAuth';
import { UserDefaultPage } from '../pages/UserDefaultPage';
import { RequireUnauth } from '../../hoc/RequireUnauth';
import { LoginPage } from '../pages/LoginPage';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Provider store={store}>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <UserDefaultPage />
                </RequireAuth>
              }
            />
            <Route
              path="/login"
              element={
                <RequireUnauth>
                  <LoginPage />
                </RequireUnauth>
              }
            />
          </Routes>
          <ToastContainer pauseOnFocusLoss={false} />
        </Provider>
      </AuthProvider>
    </div>
  );
}

export default App;
