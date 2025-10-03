import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import { FaSearch, FaStar, FaMapMarkerAlt, FaUtensils, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { restaurantApi } from '../api/restaurantApi';
import { favoriteApi } from '../api/favoriteApi';
import toast from 'react-hot-toast';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [filters, setFilters] = useState({
    city: '',
    cuisine: '',
    minRating: ''
  });

  useEffect(() => {
    fetchRestaurants();
    checkAuthStatus();
    
    // Listen for login/logout events
    const handleUserLogin = (event) => {
      const { user } = event.detail;
      setIsLoggedIn(true);
      setCurrentUser(user);
      fetchFavorites(user.id);
    };
    
    const handleUserLogout = () => {
      setIsLoggedIn(false);
      setCurrentUser(null);
      setFavorites(new Set());
    };

    window.addEventListener('userLoggedIn', handleUserLogin);
    window.addEventListener('userLoggedOut', handleUserLogout);

    return () => {
      window.removeEventListener('userLoggedIn', handleUserLogin);
      window.removeEventListener('userLoggedOut', handleUserLogout);
    };
  }, []);

  const checkAuthStatus = () => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (user && token) {
      const parsedUser = JSON.parse(user);
      setIsLoggedIn(true);
      setCurrentUser(parsedUser);
      fetchFavorites(parsedUser.id);
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  };

  const fetchFavorites = async (userId) => {
    try {
      const response = await favoriteApi.getFavorites(userId);
      const favoriteIds = new Set(response.data.map(fav => fav.restaurantId));
      setFavorites(favoriteIds);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

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

  const handleToggleFavorite = async (restaurantId) => {
    if (!isLoggedIn) {
      toast.error('Please login to add favorites');
      return;
    }

    try {
      const isFavorited = favorites.has(restaurantId);
      
      if (isFavorited) {
        await favoriteApi.removeFromFavorites(currentUser.id, restaurantId);
        setFavorites(prev => {
          const newFavorites = new Set(prev);
          newFavorites.delete(restaurantId);
          return newFavorites;
        });
        toast.success('Removed from favorites');
      } else {
        await favoriteApi.addToFavorites(currentUser.id, restaurantId);
        setFavorites(prev => new Set([...prev, restaurantId]));
        toast.success('Added to favorites');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Error updating favorites');
    }
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

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <Row className="text-center align-items-center" style={{ minHeight: '60vh' }}>
            <Col>
              <div className="hero-content">
                <h1 className="display-3 fw-bold mb-4 hero-title">
                  Savor Every Moment
                </h1>
                <p className="lead mb-4 hero-subtitle">
                  Experience culinary excellence across Sri Lanka's finest dining destinations
                </p>
                <p className="hero-description mb-5">
                  From traditional Sri Lankan flavors to international cuisine, discover restaurants that create unforgettable dining experiences. Book your perfect table in just a few clicks.
                </p>
                <div className="hero-stats">
                  <div className="stat-item">
                    <span className="stat-number">500+</span>
                    <span className="stat-label">Restaurants</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">50K+</span>
                    <span className="stat-label">Happy Diners</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">4.8★</span>
                    <span className="stat-label">Average Rating</span>
                  </div>
                </div>
              </div>
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
                  {isLoggedIn && (
                    <Button
                      variant={favorites.has(restaurant.id) ? "danger" : "outline-danger"}
                      size="sm"
                      className="position-absolute top-0 start-0 m-3"
                      onClick={() => handleToggleFavorite(restaurant.id)}
                    >
                      <FaHeart />
                    </Button>
                  )}
                </div>
                <Card.Body>
                  <Card.Title className="h5">{restaurant.name}</Card.Title>
                  <Card.Text className="text-muted mb-2">
                    <FaMapMarkerAlt className="me-1" />
                    {restaurant.city}
                  </Card.Text>
                  <Card.Text className="text-muted mb-3">
                    <FaUtensils className="me-1" />
                    {restaurant.cuisine}
                  </Card.Text>
                  <Card.Text className="small text-muted mb-3">
                    {restaurant.description.substring(0, 100)}...
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {(restaurant.totalReviews && restaurant.totalReviews > 0) && (
                        <>
                          {renderStars(restaurant.rating)}
                          <span className="ms-2 text-muted">
                            ({restaurant.totalReviews} reviews)
                          </span>
                        </>
                      )}
                      {(!restaurant.totalReviews || restaurant.totalReviews === 0) && (
                        <span className="text-muted">No reviews yet</span>
                      )}
                    </div>
                    <Button
                      as={Link}
                      to={`/restaurant/${restaurant.id}`}
                      variant="warning"
                      size="sm"
                      style={{ backgroundColor: '#ff6b35', borderColor: '#ff6b35', color: '#ffffff' }}
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
