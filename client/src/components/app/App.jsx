import './App.scss';
import { Provider } from 'react-redux';
import store from '../../redux/index';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../../hoc/AuthProvider';
import { RequireAuth } from '../../hoc/RequireAuth';
import { UserMainPage } from '../pages/UserMainPage';
import { RequireUnauth } from '../../hoc/RequireUnauth';
import { LoginPage } from '../pages/LoginPage';
import { DirectionsPage } from '../pages/DirectionsPage';
import { USER_ROLES } from '../../constants';
import { SecretaryTabs } from '../../hoc/SecretaryTabs';
import { GraduateScriptsPage } from '../pages/GraduateScriptsPage';
import { EmployeesPage } from '../pages/EmployeesPage';
import { Header } from '../header/Header';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <UserMainPage />
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
            <Route
              path="/directions"
              element={
                <RequireAuth role={USER_ROLES.SECRETARY}>
                  <SecretaryTabs>
                    <DirectionsPage />
                  </SecretaryTabs>
                </RequireAuth>
              }
            />
            <Route
              path="/graduate-scripts"
              element={
                <RequireAuth role={USER_ROLES.SECRETARY}>
                  <SecretaryTabs>
                    <GraduateScriptsPage />
                  </SecretaryTabs>
                </RequireAuth>
              }
            />
            <Route
              path="/employees"
              element={
                <RequireAuth role={USER_ROLES.SECRETARY}>
                  <SecretaryTabs>
                    <EmployeesPage />
                  </SecretaryTabs>
                </RequireAuth>
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
