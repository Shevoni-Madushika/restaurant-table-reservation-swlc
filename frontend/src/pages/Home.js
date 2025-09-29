import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import { FaSearch, FaStar, FaMapMarkerAlt, FaUtensils, FaDollarSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { restaurantApi } from '../api/restaurantApi';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    city: '',
    cuisine: '',
    minRating: '',
    maxPriceRange: ''
  });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await restaurantApi.getAllRestaurants();
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (searchTerm) {
        const response = await restaurantApi.searchByText(searchTerm);
        setRestaurants(response.data);
      } else {
        const response = await restaurantApi.searchRestaurants(filters);
        setRestaurants(response.data);
      }
    } catch (error) {
      console.error('Error searching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
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

  const renderPriceRange = (priceRange) => {
    return '$'.repeat(priceRange);
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
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <Row className="text-center">
            <Col>
              <h1 className="display-4 fw-bold mb-4">
                Discover Amazing Restaurants
              </h1>
              <p className="lead mb-5">
                Find and book tables at the best restaurants in Sri Lanka
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        {/* Search and Filters */}
        <div className="search-filters">
          <Form onSubmit={handleSearch}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaSearch className="me-2" />
                    Search Restaurants
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search by name, cuisine, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaMapMarkerAlt className="me-2" />
                    City
                  </Form.Label>
                  <Form.Select
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Cities</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Galle">Galle</option>
                    <option value="Negombo">Negombo</option>
                    <option value="Anuradhapura">Anuradhapura</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaUtensils className="me-2" />
                    Cuisine
                  </Form.Label>
                  <Form.Select
                    name="cuisine"
                    value={filters.cuisine}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Cuisines</option>
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
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaDollarSign className="me-2" />
                    Max Price
                  </Form.Label>
                  <Form.Select
                    name="maxPriceRange"
                    value={filters.maxPriceRange}
                    onChange={handleFilterChange}
                  >
                    <option value="">Any Price</option>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button 
                  type="submit" 
                  variant="warning" 
                  size="lg"
                  style={{ backgroundColor: '#ff6b35', borderColor: '#ff6b35' }}
                >
                  <FaSearch className="me-2" />
                  Search Restaurants
                </Button>
              </Col>
            </Row>
          </Form>
        </div>

        {/* Restaurants Grid */}
        <Row>
          {restaurants.map((restaurant) => (
            <Col key={restaurant.id} lg={4} md={6} className="mb-4">
              <Card className="restaurant-card h-100">
                <div className="position-relative">
                  <img
                    src={restaurant.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500'}
                    alt={restaurant.name}
                    className="restaurant-image"
                  />
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="rating-badge">
                      <FaStar className="me-1" />
                      {restaurant.rating}
                    </span>
                  </div>
                </div>
                <Card.Body>
                  <Card.Title className="h5">{restaurant.name}</Card.Title>
                  <Card.Text className="text-muted mb-2">
                    <FaMapMarkerAlt className="me-1" />
                    {restaurant.city}
                  </Card.Text>
                  <Card.Text className="text-muted mb-2">
                    <FaUtensils className="me-1" />
                    {restaurant.cuisine}
                  </Card.Text>
                  <Card.Text className="text-muted mb-3">
                    <FaDollarSign className="me-1" />
                    <span className="price-range">
                      {renderPriceRange(restaurant.priceRange)}
                    </span>
                  </Card.Text>
                  <Card.Text className="small text-muted mb-3">
                    {restaurant.description.substring(0, 100)}...
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {renderStars(restaurant.rating)}
                      <span className="ms-2 text-muted">
                        ({restaurant.totalReviews || 0} reviews)
                      </span>
                    </div>
                    <Button
                      as={Link}
                      to={`/restaurant/${restaurant.id}`}
                      variant="warning"
                      size="sm"
                      style={{ backgroundColor: '#ff6b35', borderColor: '#ff6b35' }}
                    >
                      View Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {restaurants.length === 0 && !loading && (
          <div className="text-center py-5">
            <h3>No restaurants found</h3>
            <p className="text-muted">Try adjusting your search criteria</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Home;
