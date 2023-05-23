import './App.scss';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../../hoc/AuthProvider';
import { RequireAuth } from '../../hoc/RequireAuth';
import { UserMainPage } from '../../pages/UserMainPage';
import { RequireUnauth } from '../../hoc/RequireUnauth';
import { LoginPage } from '../../pages/LoginPage';
import { DirectionsPage } from '../../pages/DirectionsPage';
import { USER_ROLES } from '../../constants';
import { SecretaryTabs } from '../../hoc/SecretaryTabs';
import { EmployeesPage } from '../../pages/EmployeesPage';
import { Header } from '../header/Header';
import { GraduateScriptsPage } from '../../pages/GraduateScriptsPage';
import { StudentsPage } from '../../pages/StudentsPage';
import { useCommonStore } from '../../hooks/zustand/useCommonStore';
import { useDirectionsStore } from '../../hooks/zustand/useDirectionsStore';
import { useEmployeesStore } from '../../hooks/zustand/useEmployeesStore';
import { useGraduateScriptsStore } from '../../hooks/zustand/useGraduateScriptsStore';
import { useStudentsStore } from '../../hooks/zustand/useStudentsStore';
import { DegreeWorksPage } from '../../pages/DegreeWorksPage';
import { useDegreeWorksStore } from '../../hooks/zustand/useDegreeWorksStore';
import { FilesPage } from '../../pages/FilesPage';
import { GraduateProcessPage } from '../../pages/GraduateProcessPage';
import { useAuthStore } from '../../hooks/zustand/useAuthStore';
import { useMarksStore } from '../../hooks/zustand/useMarksStore';

function App() {
  const { getAllEducationLevels } = useCommonStore((state) => state);
  const { getAllDirections } = useDirectionsStore((state) => state);
  const { getAllEmployees } = useEmployeesStore((state) => state);
  const { getAllGraduateScripts } = useGraduateScriptsStore((state) => state);
  const { getAllStudents } = useStudentsStore((state) => state);
  const { currentYear } = useCommonStore((state) => state);
  const { getAllDegreeWorks } = useDegreeWorksStore((state) => state);
  const { getAllMarks } = useMarksStore((state) => state);
  const { user } = useAuthStore((state) => state);

  React.useEffect(() => {
    getAllEducationLevels();
    getAllDirections();
    getAllEmployees();
    getAllGraduateScripts(currentYear);
    getAllStudents(currentYear);
    getAllDegreeWorks(currentYear);
    getAllMarks();
  }, [
    getAllEducationLevels,
    getAllDirections,
    getAllEmployees,
    getAllGraduateScripts,
    getAllStudents,
    currentYear,
    getAllDegreeWorks,
    getAllMarks,
  ]);

  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                {user.role.name === USER_ROLES.ADMIN ? (
                  <SecretaryTabs>
                    <UserMainPage />
                  </SecretaryTabs>
                ) : (
                  <UserMainPage />
                )}
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
              <RequireAuth roles={[USER_ROLES.SECRETARY, USER_ROLES.ADMIN]}>
                <SecretaryTabs>
                  <DirectionsPage />
                </SecretaryTabs>
              </RequireAuth>
            }
          />
          <Route
            path="/graduate-scripts"
            element={
              <RequireAuth roles={[USER_ROLES.SECRETARY, USER_ROLES.ADMIN]}>
                <SecretaryTabs>
                  <GraduateScriptsPage />
                </SecretaryTabs>
              </RequireAuth>
            }
          />
          <Route
            path="/employees"
            element={
              <RequireAuth roles={[USER_ROLES.SECRETARY, USER_ROLES.ADMIN]}>
                <SecretaryTabs>
                  <EmployeesPage />
                </SecretaryTabs>
              </RequireAuth>
            }
          />
          <Route
            path="/students"
            element={
              <RequireAuth roles={[USER_ROLES.SECRETARY, USER_ROLES.ADMIN]}>
                <SecretaryTabs>
                  <StudentsPage />
                </SecretaryTabs>
              </RequireAuth>
            }
          />
          <Route
            path="/degree-works"
            element={
              <RequireAuth roles={[USER_ROLES.SECRETARY, USER_ROLES.ADMIN]}>
                <SecretaryTabs>
                  <DegreeWorksPage />
                </SecretaryTabs>
              </RequireAuth>
            }
          />
          <Route
            path="/files"
            element={
              <RequireAuth roles={[USER_ROLES.SECRETARY, USER_ROLES.ADMIN]}>
                <SecretaryTabs>
                  <FilesPage parse />
                </SecretaryTabs>
              </RequireAuth>
            }
          />
          <Route
            path="/graduate-process"
            element={
              <RequireAuth roles={[USER_ROLES.SECRETARY, USER_ROLES.ADMIN]}>
                <GraduateProcessPage />
              </RequireAuth>
            }
          />
        </Routes>
        <ToastContainer pauseOnFocusLoss={false} />
      </AuthProvider>
    </div>
  );
}

export default App;
