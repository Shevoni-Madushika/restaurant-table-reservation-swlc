import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { FaStar, FaMapMarkerAlt, FaUtensils, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { restaurantApi } from '../api/restaurantApi';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      // In a real app, this would fetch user's favorite restaurants
      // For now, we'll show some sample favorites
      const response = await restaurantApi.getAllRestaurants();
      setFavorites(response.data.slice(0, 4)); // Show first 4 as favorites
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Error loading your favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (restaurantId) => {
    try {
      // In a real app, this would remove from user's favorites
      setFavorites(favorites.filter(fav => fav.id !== restaurantId));
      toast.success('Restaurant removed from favorites');
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Error removing favorite');
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
    <Container className="py-5">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h2">
              <FaHeart className="me-2 text-danger" />
              My Favorites
            </h1>
            <Button as={Link} to="/" variant="primary">
              Browse More Restaurants
            </Button>
          </div>

          {favorites.length === 0 ? (
            <Alert variant="info">
              <h4>No favorites yet</h4>
              <p>Start exploring restaurants and add them to your favorites!</p>
              <Button as={Link} to="/" variant="primary">
                Find Restaurants
              </Button>
            </Alert>
          ) : (
            <Row>
              {favorites.map((restaurant) => (
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
                      <Button
                        variant="danger"
                        size="sm"
                        className="position-absolute top-0 start-0 m-3"
                        onClick={() => handleRemoveFavorite(restaurant.id)}
                      >
                        <FaHeart />
                      </Button>
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
                        <div>
                          <Button
                            as={Link}
                            to={`/restaurant/${restaurant.id}`}
                            variant="primary"
                            size="sm"
                            className="me-2"
                          >
                            View Details
                          </Button>
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

export default Favorites;
