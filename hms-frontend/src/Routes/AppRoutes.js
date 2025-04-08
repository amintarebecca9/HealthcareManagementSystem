import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import LoginPage from '../pages/LoginPage';
// import DashboardPage from '../pages/DashboardPage';
// import EHRPage from '../pages/EHRPage';

export default function AppRoutes() {
  

  const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/dashboard" />;
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ehr"
          element={
            <ProtectedRoute allowedRoles={['doctor', 'patient']}>
              <EHRPage />
            </ProtectedRoute>
          }
        /> */}

        {/* Default fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}