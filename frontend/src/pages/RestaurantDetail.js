import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Spinner, Alert, Badge } from 'react-bootstrap';
import { FaStar, FaMapMarkerAlt, FaPhone, FaGlobe, FaUtensils, FaUsers, FaCalendarAlt, FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { restaurantApi } from '../api/restaurantApi';
import { bookingApi } from '../api/bookingApi';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingForm, setBookingForm] = useState({
    bookingDateTime: '',
    numberOfPeople: 1,
    specialRequests: ''
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchRestaurant();
    checkAuthStatus();
    
    // Listen for login/logout events
    const handleUserLogin = (event) => {
      const { user } = event.detail;
      setIsLoggedIn(true);
      setCurrentUser(user);
    };
    
    const handleUserLogout = () => {
      setIsLoggedIn(false);
      setCurrentUser(null);
      setShowBookingForm(false); // Hide booking form on logout
    };

    window.addEventListener('userLoggedIn', handleUserLogin);
    window.addEventListener('userLoggedOut', handleUserLogout);

    return () => {
      window.removeEventListener('userLoggedIn', handleUserLogin);
      window.removeEventListener('userLoggedOut', handleUserLogout);
    };
  }, [id]);

  const checkAuthStatus = () => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (user && token) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(user));
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  };

  const fetchRestaurant = async () => {
    try {
      setLoading(true);
      const response = await restaurantApi.getRestaurantById(id);
      setRestaurant(response.data);
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      toast.error('Error loading restaurant details');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast.error('Please login to make a booking');
      navigate('/login');
      return;
    }

    try {
      const bookingData = {
        ...bookingForm,
        restaurantId: parseInt(id),
        userId: currentUser?.id || 1
      };

      await bookingApi.createBooking(bookingData);
      toast.success('Booking request submitted successfully!');
      setShowBookingForm(false);
      setBookingForm({
        bookingDateTime: '',
        numberOfPeople: 1,
        specialRequests: ''
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      if (error.response?.status === 401) {
        toast.error('Please login to make a booking');
        navigate('/login');
      } else {
        toast.error('Error submitting booking request');
      }
    }
  };

  const handleInputChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-warning" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-warning" style={{opacity: 0.5}} />);
    }

    return stars;
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

  if (!restaurant) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          Restaurant not found
        </Alert>
      </Container>
    );
  }

  return (
    <div>
      {/* Restaurant Hero */}
      <div className="restaurant-detail-hero">
        <Container>
          <Row>
            <Col>
              <h1 className="display-4 fw-bold mb-3">{restaurant.name}</h1>
              <p className="lead mb-4">{restaurant.description}</p>
              <div className="d-flex align-items-center mb-4">
                {(restaurant.totalReviews && restaurant.totalReviews > 0) && (
                  <div className="me-4">
                    {renderStars(restaurant.rating)}
                    <span className="ms-2 fs-5">{restaurant.rating}</span>
                  </div>
                )}
                <Badge bg="success" className="me-3">
                  <FaUtensils className="me-1" />
                  {restaurant.cuisine}
                </Badge>
                <Badge bg="secondary">
                  <FaMapMarkerAlt className="me-1" />
                  {restaurant.city}
                </Badge>
              </div>
              {isLoggedIn ? (
                <Button
                  variant="warning"
                  size="lg"
                  onClick={() => setShowBookingForm(true)}
                  style={{ backgroundColor: '#ff6b35', borderColor: '#ff6b35' }}
                >
                  <FaCalendarAlt className="me-2" />
                  Book a Table
                </Button>
              ) : (
                <div>
                  <Button
                    as={Link}
                    to="/login"
                    variant="warning"
                    size="lg"
                    style={{ backgroundColor: '#ff6b35', borderColor: '#ff6b35' }}
                  >
                    <FaSignInAlt className="me-2" />
                    Login to Book Table
                  </Button>
                  <p className="mt-2 mb-0 text-light">
                    Please login to make a reservation
                  </p>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <Row>
          <Col lg={8}>
            {/* Restaurant Information */}
            <Card className="mb-4">
              <Card.Header>
                <h4 className="mb-0">Restaurant Information</h4>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <p><strong>Address:</strong><br />{restaurant.address}</p>
                    <p><strong>City:</strong> {restaurant.city}</p>
                    <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
                  </Col>
                  <Col md={6}>
                    {restaurant.phoneNumber && (
                      <p>
                        <FaPhone className="me-2" />
                        <strong>Phone:</strong> {restaurant.phoneNumber}
                      </p>
                    )}
                    {restaurant.website && (
                      <p>
                        <FaGlobe className="me-2" />
                        <strong>Website:</strong>{' '}
                        <a href={restaurant.website} target="_blank" rel="noopener noreferrer">
                          {restaurant.website}
                        </a>
                      </p>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Reviews Section */}
            <Card>
              <Card.Header>
                <h4 className="mb-0">Reviews ({restaurant.totalReviews || 0})</h4>
              </Card.Header>
              <Card.Body>
                {(restaurant.totalReviews && restaurant.totalReviews > 0) ? (
                  <div className="text-center py-4">
                    <h2 className="display-6">{restaurant.rating}</h2>
                    <div className="mb-3">
                      {renderStars(restaurant.rating)}
                    </div>
                    <p className="text-muted">Based on {restaurant.totalReviews} reviews</p>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted">No reviews yet</p>
                  </div>
                )}
                
                {/* Sample Reviews */}
                <div className="review-card">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="mb-0">John Smith</h6>
                    <div>
                      {renderStars(4.5)}
                    </div>
                  </div>
                  <p className="text-muted small mb-0">2 days ago</p>
                  <p className="mt-2 mb-0">
                    Excellent food and service! The atmosphere was perfect for our anniversary dinner.
                  </p>
                </div>

                <div className="review-card">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="mb-0">Sarah Johnson</h6>
                    <div>
                      {renderStars(4.8)}
                    </div>
                  </div>
                  <p className="text-muted small mb-0">1 week ago</p>
                  <p className="mt-2 mb-0">
                    Amazing experience! The staff was very attentive and the food was delicious.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            {/* Booking Form - Only show for logged in users */}
            {showBookingForm && isLoggedIn && (
              <Card className="booking-form">
                <Card.Header>
                  <h5 className="mb-0">Book a Table</h5>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleBookingSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FaCalendarAlt className="me-2" />
                        Date & Time
                      </Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="bookingDateTime"
                        value={bookingForm.bookingDateTime}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FaUsers className="me-2" />
                        Number of People
                      </Form.Label>
                      <Form.Select
                        name="numberOfPeople"
                        value={bookingForm.numberOfPeople}
                        onChange={handleInputChange}
                        required
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Special Requests</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="specialRequests"
                        value={bookingForm.specialRequests}
                        onChange={handleInputChange}
                        placeholder="Any special dietary requirements or requests..."
                      />
                    </Form.Group>

                    <div className="d-grid gap-2">
                      <Button type="submit" variant="primary" size="lg">
                        Book Table
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowBookingForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            )}

            {/* Restaurant Stats */}
            <Card className="mt-4">
              <Card.Header>
                <h5 className="mb-0">Restaurant Stats</h5>
              </Card.Header>
              <Card.Body>
                <div className="text-center">
                  <div className="stats-number">{restaurant.totalBookings || 0}</div>
                  <div className="stats-label">Total Bookings</div>
                </div>
                <hr />
                <div className="text-center">
                  <div className="stats-number">{restaurant.totalReviews || 0}</div>
                  <div className="stats-label">Reviews</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RestaurantDetail;
