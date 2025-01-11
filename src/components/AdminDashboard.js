import React from 'react';
import './AdminDashboard.css'; // Import the new CSS file

function AdminDashboard() {
  const stats = {
    totalUsers: 50,
    totalProfessionals: 20,
    totalBookings: 150,
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/admin-login'; // Redirect to login page after logout
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-section">
          <h2>Dashboard Overview</h2>
          <p>View user, booking, and platform statistics.</p>
          <div className="stats-container">
            <div className="stat">
              <h3>Total Users:</h3>
              <span>{stats.totalUsers}</span>
            </div>
            <div className="stat">
              <h3>Total Professionals:</h3>
              <span>{stats.totalProfessionals}</span>
            </div>
            <div className="stat">
              <h3>Total Bookings:</h3>
              <span>{stats.totalBookings}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-sections-container">
          <div className="dashboard-section1">
            <h2>Manage Professionals</h2>
            <p>Approve or disapprove professionals and manage their profiles.</p>
            <button className="btn">View Professionals</button>
          </div>

          <div className="dashboard-section1">
            <h2>Manage Consumers</h2>
            <p>View consumer profiles and their activities.</p>
            <button className="btn">View Consumers</button>
          </div>

          <div className="dashboard-section1">
            <h2>Booking Management</h2>
            <p>Oversee and resolve booking disputes or cancellations.</p>
            <button className="btn">Manage Bookings</button>
          </div>
        </div>
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2025 Hamro Sewa | All rights reserved</p>
      </footer>
    </div>
  );
}

export default AdminDashboard;
