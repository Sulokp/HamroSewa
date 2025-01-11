// File: src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard'; // Import the AdminDashboard component
import NotFoundPage from './components/NotFoundPage'; // Import the 404 page
import './App.css';
import ProfessionalSignup from './components/ProfessionalSignup';

const App = () => {
  // Function to protect routes
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated'); // Check if the user is authenticated

    // If not authenticated, redirect to the login page
    if (!isAuthenticated) {
      return <Navigate to="/admin-login" />;
    }

    // If authenticated, render the protected component (children)
    return children;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/Professional" element={<ProfessionalSignup />} />
        
        {/* Protect the admin-dashboard route */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard /> {/* Only accessible if authenticated */}
            </PrivateRoute>
          }
        />
        
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
