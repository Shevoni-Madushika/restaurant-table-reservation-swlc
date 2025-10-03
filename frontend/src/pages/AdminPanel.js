import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaEye, FaChartBar, FaUsers, FaUtensils, FaCalendarAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { restaurantApi } from '../api/restaurantApi';
import { bookingApi } from '../api/bookingApi';

const AdminPanel = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [restaurantForm, setRestaurantForm] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    cuisine: '',
    rating: '',
    phoneNumber: '',
    website: '',
    imageUrl: '',
    bookingApiUrl: '',
    secretKey: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [restaurantsRes, bookingsRes] = await Promise.all([
        restaurantApi.getAllRestaurants(),
        bookingApi.getAllBookings()
      ]);
      setRestaurants(restaurantsRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error loading admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleRestaurantSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRestaurant) {
        await restaurantApi.updateRestaurant(editingRestaurant.id, restaurantForm);
        toast.success('Restaurant updated successfully');
      } else {
        await restaurantApi.createRestaurant(restaurantForm);
        toast.success('Restaurant created successfully');
      }
      setShowRestaurantModal(false);
      setEditingRestaurant(null);
      setRestaurantForm({
        name: '',
        description: '',
        address: '',
        city: '',
        cuisine: '',
        rating: '',
        phoneNumber: '',
        website: '',
        imageUrl: '',
        bookingApiUrl: '',
        secretKey: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error saving restaurant:', error);
      toast.error('Error saving restaurant');
    }
  };

  const handleEditRestaurant = (restaurant) => {
    setEditingRestaurant(restaurant);
    setRestaurantForm({
      name: restaurant.name,
      description: restaurant.description,
      address: restaurant.address,
      city: restaurant.city,
      cuisine: restaurant.cuisine,
      rating: restaurant.rating,
      phoneNumber: restaurant.phoneNumber || '',
      website: restaurant.website || '',
      imageUrl: restaurant.imageUrl || '',
      bookingApiUrl: restaurant.bookingApiUrl || '',
      secretKey: restaurant.secretKey || ''
    });
    setShowRestaurantModal(true);
  };

  const handleDeleteRestaurant = async (restaurantId) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      try {
        await restaurantApi.deleteRestaurant(restaurantId);
        toast.success('Restaurant deleted successfully');
        fetchData();
      } catch (error) {
        console.error('Error deleting restaurant:', error);
        toast.error('Error deleting restaurant');
      }
    }
  };

  const handleInputChange = (e) => {
    setRestaurantForm({
      ...restaurantForm,
      [e.target.name]: e.target.value
    });
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

  const getMostBookedRestaurants = () => {
    const restaurantBookingCounts = {};
    
    // Count bookings for each restaurant
    bookings.forEach(booking => {
      const restaurantId = booking.restaurantId;
      if (restaurantBookingCounts[restaurantId]) {
        restaurantBookingCounts[restaurantId]++;
      } else {
        restaurantBookingCounts[restaurantId] = 1;
      }
    });

    // Create array with restaurant data and booking counts
    return restaurants
      .map(restaurant => ({
        ...restaurant,
        bookingCount: restaurantBookingCounts[restaurant.id] || 0
      }))
      .sort((a, b) => b.bookingCount - a.bookingCount);
  };

  const getHighestRatedRestaurants = () => {
    return restaurants
      .slice()
      .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
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

  return (
    <div className="admin-panel">
      <Container className="py-5">
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h2">Admin Panel</h1>
              <Button
                variant="primary"
                onClick={() => setShowRestaurantModal(true)}
              >
                <FaPlus className="me-2" />
                Add Restaurant
              </Button>
            </div>

            {/* Statistics Cards */}
            <Row className="mb-5">
              <Col md={3}>
                <Card className="stats-card">
                  <Card.Body>
                    <div className="stats-number">{restaurants.length}</div>
                    <div className="stats-label">Total Restaurants</div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="stats-card">
                  <Card.Body>
                    <div className="stats-number">{bookings.length}</div>
                    <div className="stats-label">Total Bookings</div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="stats-card">
                  <Card.Body>
                    <div className="stats-number">
                      {bookings.filter(b => b.status === 'CONFIRMED').length}
                    </div>
                    <div className="stats-label">Confirmed Bookings</div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="stats-card">
                  <Card.Body>
                    <div className="stats-number">
                      {bookings.filter(b => b.status === 'PENDING').length}
                    </div>
                    <div className="stats-label">Pending Bookings</div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Analytics Section */}
            <Row className="mb-5">
              <Col md={6}>
                <Card>
                  <Card.Header>
                    <h4 className="mb-0">
                      <FaChartBar className="me-2" />
                      Most Booked Restaurants
                    </h4>
                  </Card.Header>
                  <Card.Body>
                    {getMostBookedRestaurants().length > 0 ? (
                      <div className="analytics-list">
                        {getMostBookedRestaurants().slice(0, 5).map((restaurant, index) => (
                          <div key={restaurant.id} className="analytics-item">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <strong>{index + 1}. {restaurant.name}</strong>
                                <br />
                                <small className="text-muted">{restaurant.city} • {restaurant.cuisine}</small>
                              </div>
                              <Badge bg="primary">{restaurant.bookingCount} bookings</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted">No booking data available</p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card>
                  <Card.Header>
                    <h4 className="mb-0">
                      <FaChartBar className="me-2" />
                      Highest Rated Restaurants
                    </h4>
                  </Card.Header>
                  <Card.Body>
                    {getHighestRatedRestaurants().length > 0 ? (
                      <div className="analytics-list">
                        {getHighestRatedRestaurants().slice(0, 5).map((restaurant, index) => (
                          <div key={restaurant.id} className="analytics-item">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <strong>{index + 1}. {restaurant.name}</strong>
                                <br />
                                <small className="text-muted">{restaurant.city} • {restaurant.cuisine}</small>
                              </div>
                              <div className="text-end">
                                <Badge bg="warning">{restaurant.rating} ⭐</Badge>
                                <br />
                                <small className="text-muted">{restaurant.city}</small>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted">No rating data available</p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Restaurants Management */}
            <Card className="mb-4">
              <Card.Header>
                <h4 className="mb-0">
                  <FaUtensils className="me-2" />
                  Restaurants Management
                </h4>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>City</th>
                      <th>Cuisine</th>
                      <th>Rating</th>
                      <th>API Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {restaurants.map((restaurant) => (
                      <tr key={restaurant.id}>
                        <td>
                          <div>
                            <strong>{restaurant.name}</strong>
                            <br />
                            <small className="text-muted">{restaurant.address}</small>
                          </div>
                        </td>
                        <td>{restaurant.city}</td>
                        <td>{restaurant.cuisine}</td>
                        <td>
                          <Badge bg="warning">{restaurant.rating}</Badge>
                        </td>
                        <td>
                          {restaurant.bookingApiUrl ? (
                            <Badge bg="success">Configured</Badge>
                          ) : (
                            <Badge bg="warning">Not Set</Badge>
                          )}
                        </td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={() => handleEditRestaurant(restaurant)}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteRestaurant(restaurant.id)}
                          >
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Bookings Management */}
            <Card>
              <Card.Header>
                <h4 className="mb-0">
                  <FaCalendarAlt className="me-2" />
                  Bookings Management
                </h4>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Restaurant</th>
                      <th>Date & Time</th>
                      <th>Party Size</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.restaurantName}</td>
                        <td>{new Date(booking.bookingDateTime).toLocaleString()}</td>
                        <td>{booking.numberOfPeople} people</td>
                        <td>{getStatusBadge(booking.status)}</td>
                        <td>
                          <Button
                            variant="outline-info"
                            size="sm"
                            className="me-2"
                          >
                            <FaEye />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Restaurant Modal */}
      <Modal show={showRestaurantModal} onHide={() => setShowRestaurantModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingRestaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleRestaurantSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Restaurant Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={restaurantForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={restaurantForm.city}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={restaurantForm.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={restaurantForm.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Cuisine</Form.Label>
                  <Form.Select
                    name="cuisine"
                    value={restaurantForm.cuisine}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Cuisine</option>
                    <option value="Sri Lankan">Sri Lankan</option>
                    <option value="Indian">Indian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Italian">Italian</option>
                    <option value="Japanese">Japanese</option>
                    <option value="French">French</option>
                    <option value="Mediterranean">Mediterranean</option>
                    <option value="American">American</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phoneNumber"
                    value={restaurantForm.phoneNumber}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    name="rating"
                    value={restaurantForm.rating}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type="url"
                    name="website"
                    value={restaurantForm.website}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                name="imageUrl"
                value={restaurantForm.imageUrl}
                onChange={handleInputChange}
              />
            </Form.Group>

            <hr className="my-4" />
            <h5 className="mb-3">🔗 Booking API Configuration</h5>
            
            <Form.Group className="mb-3">
              <Form.Label>Booking API URL</Form.Label>
              <Form.Control
                type="url"
                name="bookingApiUrl"
                value={restaurantForm.bookingApiUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/api/booking"
              />
              <Form.Text className="text-muted">
                Enter the external booking API endpoint for this restaurant
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Secret Key</Form.Label>
              <Form.Control
                type="text"
                name="secretKey"
                value={restaurantForm.secretKey}
                onChange={handleInputChange}
                placeholder="restaurant_secret_key_2024"
              />
              <Form.Text className="text-muted">
                Secret key for the external booking API (for display purposes)
              </Form.Text>
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowRestaurantModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingRestaurant ? 'Update Restaurant' : 'Add Restaurant'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminPanel;
