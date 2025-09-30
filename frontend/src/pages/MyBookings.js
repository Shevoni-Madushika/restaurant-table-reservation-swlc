import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaUtensils, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { bookingApi } from '../api/bookingApi';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthAndFetchBookings();
    
    // Listen for login events
    const handleUserLogin = (event) => {
      const { user } = event.detail;
      setUser(user);
      fetchBookings(user.id);
    };
    
    const handleUserLogout = () => {
      setUser(null);
      setBookings([]);
    };

    window.addEventListener('userLoggedIn', handleUserLogin);
    window.addEventListener('userLoggedOut', handleUserLogout);

    return () => {
      window.removeEventListener('userLoggedIn', handleUserLogin);
      window.removeEventListener('userLoggedOut', handleUserLogout);
    };
  }, []);

  const checkAuthAndFetchBookings = () => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchBookings(parsedUser.id);
    } else {
      setUser(null);
      setBookings([]);
      setLoading(false);
    }
  };

  const fetchBookings = async (userId) => {
    try {
      setLoading(true);
      const response = await bookingApi.getUserBookings(userId);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Error loading your bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await bookingApi.cancelBooking(bookingId);
      toast.success('Booking cancelled successfully');
      if (user) {
        fetchBookings(user.id); // Refresh the list
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Error cancelling booking');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: { variant: 'warning', text: 'Pending' },
      CONFIRMED: { variant: 'success', text: 'Confirmed' },
      CANCELLED: { variant: 'danger', text: 'Cancelled' },
      COMPLETED: { variant: 'info', text: 'Completed' }
    };
    
    const config = statusConfig[status] || { variant: 'secondary', text: status };
    return <Badge bg={config.variant}>{config.text}</Badge>;
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!user) {
    return (
      <Container className="py-5">
        <Row>
          <Col>
            <Alert variant="warning">
              <h4>Please Login</h4>
              <p>You need to be logged in to view your bookings.</p>
              <Button as={Link} to="/login" variant="primary">
                Login
              </Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h2">My Bookings</h1>
            <Button as={Link} to="/" variant="primary">
              Browse Restaurants
            </Button>
          </div>

          {bookings.length === 0 ? (
            <Alert variant="info">
              <h4>No bookings found</h4>
              <p>You haven't made any bookings yet. Start exploring restaurants and make your first reservation!</p>
              <Button as={Link} to="/" variant="primary">
                Find Restaurants
              </Button>
            </Alert>
          ) : (
            <Row>
              {bookings.map((booking) => (
                <Col key={booking.id} lg={6} className="mb-4">
                  <Card className="h-100">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">{booking.restaurantName}</h5>
                      {getStatusBadge(booking.status)}
                    </Card.Header>
                    <Card.Body>
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <FaCalendarAlt className="me-2 text-primary" />
                          <strong>Date & Time:</strong>
                        </div>
                        <p className="mb-0">{formatDateTime(booking.bookingDateTime)}</p>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <FaUsers className="me-2 text-primary" />
                          <strong>Party Size:</strong>
                        </div>
                        <p className="mb-0">{booking.numberOfPeople} {booking.numberOfPeople === 1 ? 'person' : 'people'}</p>
                      </div>

                      {booking.specialRequests && (
                        <div className="mb-3">
                          <div className="d-flex align-items-center mb-2">
                            <FaClock className="me-2 text-primary" />
                            <strong>Special Requests:</strong>
                          </div>
                          <p className="mb-0">{booking.specialRequests}</p>
                        </div>
                      )}

                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          Booked on {new Date(booking.createdAt).toLocaleDateString()}
                        </small>
                        <div>
                          <Button
                            as={Link}
                            to={`/restaurant/${booking.restaurantId}`}
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                          >
                            View Restaurant
                          </Button>
                          {booking.status === 'PENDING' && (
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MyBookings;
