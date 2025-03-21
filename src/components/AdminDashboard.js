import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './AdminDashboard.css';

// Modal component to show the enlarged image
const ImageModal = ({ imageSrc, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-btn">X</button>
        <img src={imageSrc || "/placeholder.svg"} alt="Enlarged" className="modal-image" />
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [userCount, setUserCount] = useState(0);
  const [professionalCount, setProfessionalCount] = useState(0);
  const [professionals, setProfessionals] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("counts");
  const [bookings, setBookings] = useState([]);


  // Modal state
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch the counts and lists
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch("https://localhost:7173/api/Admin/count");
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error fetching counts: ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        setUserCount(data.totalUsers);
        setProfessionalCount(data.totalProfessionals);
      } catch (err) {
        console.error("Error fetching counts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const [bookingCount, setBookingCount] = useState(0);

// Fetch the booking count
useEffect(() => {
  const fetchBookingCount = async () => {
    try {
      const response = await fetch("https://localhost:7173/api/Bookings/count");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching booking count: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      setBookingCount(data.totalBookings); // Assuming the API returns an object with TotalBookings property
    } catch (err) {
      console.error("Error fetching booking count:", err);
      setError(err.message);
    }
  };

  fetchBookingCount();
}, []);


  const fetchProfessionals = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://localhost:7173/api/Admin/professionals");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching professionals: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      setProfessionals(data);
      setView("professionals");
    } catch (err) {
      console.error("Error fetching professionals:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://localhost:7173/api/Admin/users");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching users: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      setUsers(data);
      setView("users");
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openImageModal = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleUpdateStatus = async (professionalID, newStatus) => {
    try {
      const response = await fetch(`https://localhost:7173/api/Admin/update-status/${professionalID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error updating status.");
      }

      alert(`Status updated successfully! New status: ${newStatus}`);
      fetchProfessionals(); // Refresh the professional list
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };

  // Helper function to get status badge styling
  const getStatusBadge = (status) => {
    const statusMap = {
      0: { label: "Unverified", bgColor: "badge-yellow", textColor: "badge-yellow-text" },
      1: { label: "Verified", bgColor: "badge-green", textColor: "badge-green-text" },
      2: { label: "Pending", bgColor: "badge-blue", textColor: "badge-blue-text" },
      3: { label: "Suspended", bgColor: "badge-red", textColor: "badge-red-text" },
      4: { label: "Inactive", bgColor: "badge-gray", textColor: "badge-gray-text" },
    };

    const { label, bgColor, textColor } = statusMap[status] || statusMap[0];

    return <span className={`${bgColor} ${textColor} badge`}>{label}</span>;
  };
  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://localhost:7173/api/Bookings");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching bookings: ${response.statusText} - ${errorText}`);
      }
  
      const data = await response.json();
      setBookings(data); // Store fetched bookings in state
      setView("bookings");
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteBooking = async (bookingID) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const response = await fetch(`https://localhost:7173/api/Bookings/${bookingID}`, {
          method: "DELETE",
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error deleting booking: ${response.statusText} - ${errorText}`);
        }
  
        alert("Booking deleted successfully!");
        fetchBookings(); // Refresh the bookings list
      } catch (err) {
        console.error("Error deleting booking:", err);
        alert("Failed to delete booking.");
      }
    }
  };
    

  // Handle logout
  const handleLogout = () => {
    // Clear user session or token (if any), then redirect to homepage
    navigate("/"); // Redirects to the homepage ("/")
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-title">
          <h2>Admin Dashboard</h2>
        </div>
        <div className="sidebar-links">
          <button onClick={() => setView("counts")} className={`sidebar-btn ${view === "counts" ? "active" : ""}`}>
            Dashboard
          </button>
          <button onClick={fetchUsers} className={`sidebar-btn ${view === "users" ? "active" : ""}`}>
            View Users
          </button>
          <button onClick={fetchProfessionals} className={`sidebar-btn ${view === "professionals" ? "active" : ""}`}>
            View Professionals
          </button>
          <button onClick={fetchBookings} className={`sidebar-btn ${view === "bookings" ? "active" : ""}`}>
  View Bookings
</button>

          <button onClick={handleLogout} className="sidebar-btn logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
      {view === "counts" && (
  <div className="counts-container">
    <div className="count-card blue-card">
      <h2 className="count-title">Total Users</h2>
      <p className="count-number">{userCount}</p>
      <p className="count-description">Registered users in the system</p>
    </div>
    <div className="count-card green-card">
      <h2 className="count-title">Total Professionals</h2>
      <p className="count-number">{professionalCount}</p>
      <p className="count-description">Registered professionals in the system</p>
    </div>
    <div className="count-card purple-card">
      <h2 className="count-title">Total Bookings</h2>
      <p className="count-number">{bookingCount}</p>
      <p className="count-description">Total bookings made in the system</p>
    </div>
  </div>
)}


        {/* USERS LIST */}
        {view === "users" && (
          <div className="users-list">
            <div className="section-header blue-header">
              <h2 className="section-title">Users List</h2>
            </div>
            <div className="table-container">
              <table className="user-table">
                <thead>
                  <tr className="table-header">
                    <th>UserID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="no-data">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.userID} className="table-row">
                        <td>{user.userID}</td>
                        <td>{user.name}</td>
                        <td>{user.address}</td>
                        <td>{user.email}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PROFESSIONALS LIST */}
        {view === "professionals" && (
          <div className="professionals-list">
            <div className="section-header green-header">
              <h2 className="section-title">Professionals List</h2>
            </div>
            <div className="table-container">
              <table className="professional-table">
                <thead>
                  <tr className="table-header">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Profession</th>
                    <th>Status</th>
                    <th>Document Type</th>
                    <th>Document Number</th>
                    <th>Hourly Rate</th>
                    <th>Image</th>
                    <th>Document Image</th>
                    <th>Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {professionals.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="no-data">
                        No professionals found.
                      </td>
                    </tr>
                  ) : (
                    professionals.map((professional) => (
                      <tr key={professional.professionalID} className="table-row">
                        <td>{professional.professionalID}</td>
                        <td>{professional.name}</td>
                        <td>{professional.profession}</td>
                        <td>{getStatusBadge(professional.status)}</td>
                        <td>{professional.documentType}</td>
                        <td>{professional.documentNumber}</td>
                        <td>{professional.hourlyRate}/hr</td>
                        <td>
                          {professional.image ? (
                            <div className="image-container">
                              <img
                                src={`data:image/jpeg;base64,${professional.image}`}
                                alt={professional.name}
                                className="image-thumbnail"
                                onClick={() => openImageModal(`data:image/jpeg;base64,${professional.image}`)}
                              />
                            </div>
                          ) : (
                            <p>No image</p>
                          )}
                        </td>
                        <td>
                          {professional.documentImage ? (
                            <div className="image-container">
                              <img
                                src={`data:image/jpeg;base64,${professional.documentImage}`}
                                alt="Document"
                                className="image-thumbnail"
                                onClick={() =>
                                  openImageModal(`data:image/jpeg;base64,${professional.documentImage}`)
                                }
                              />
                            </div>
                          ) : (
                            <p>No document</p>
                          )}
                        </td>
                        <td>
                          <select
                            value={professional.status}
                            onChange={(e) =>
                              handleUpdateStatus(professional.professionalID, Number.parseInt(e.target.value))
                            }
                            className="status-select"
                          >
                            <option value="0">Unverified</option>
                            <option value="1">Verified</option>
                            <option value="2">Pending</option>
                            <option value="3">Suspended</option>
                            <option value="4">Inactive</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

{view === "bookings" && (
  <div className="bookings-list">
    <div className="section-header purple-header">
      <h2 className="section-title">Bookings List</h2>
    </div>
    <div className="table-container">
      <table className="booking-table">
        <thead>
          <tr className="table-header">
            <th>BookingID</th>
            <th>UserID</th>
            <th>ProfessionalID</th>
            <th>Booking Date</th>
            <th>Total Cost</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="7" className="no-data">
                No bookings found.
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr key={booking.bookingID} className="table-row">
                <td>{booking.bookingID}</td>
                <td>{booking.userID}</td>
                <td>{booking.professionalID}</td>
                <td>{new Date(booking.bookingDate).toLocaleString()}</td>
                <td>{booking.totalCost}</td>
                <td>{getStatusBadge(booking.bookingStatus)}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteBooking(booking.bookingID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
)}


        {/* Show Modal when image is clicked */}
        {selectedImage && <ImageModal imageSrc={selectedImage} onClose={closeImageModal} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
