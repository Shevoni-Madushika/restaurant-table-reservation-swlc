import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaEye, FaChartBar, FaUsers, FaUtensils, FaCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
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
    priceRange: '',
    phoneNumber: '',
    website: '',
    imageUrl: ''
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
        priceRange: '',
        phoneNumber: '',
        website: '',
        imageUrl: ''
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
      priceRange: restaurant.priceRange,
      phoneNumber: restaurant.phoneNumber || '',
      website: restaurant.website || '',
      imageUrl: restaurant.imageUrl || ''
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
                      <th>Price Range</th>
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
                        <td>{'$'.repeat(restaurant.priceRange)}</td>
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
                  <Form.Label>Price Range</Form.Label>
                  <Form.Select
                    name="priceRange"
                    value={restaurantForm.priceRange}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Price Range</option>
                    <option value="1">$ (Budget)</option>
                    <option value="2">$$ (Moderate)</option>
                    <option value="3">$$$ (Expensive)</option>
                    <option value="4">$$$$ (Very Expensive)</option>
                  </Form.Select>
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

            <Form.Group className="mb-3">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="url"
                name="website"
                value={restaurantForm.website}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                name="imageUrl"
                value={restaurantForm.imageUrl}
                onChange={handleInputChange}
              />
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
