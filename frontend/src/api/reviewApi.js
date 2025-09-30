import apiClient from './config';

// Review API endpoints
export const reviewApi = {
  // Get all reviews
  getAllReviews: () => apiClient.get('/api/reviews'),
  
  // Get reviews by restaurant
  getReviewsByRestaurant: (restaurantId) => 
    apiClient.get(`/api/reviews/restaurant/${restaurantId}`),
  
  // Get reviews by user
  getReviewsByUser: (userId) => 
    apiClient.get(`/api/reviews/user/${userId}`),
  
  // Create a new review
  createReview: (reviewData) => 
    apiClient.post('/api/reviews', reviewData),
  
  // Update a review
  updateReview: (reviewId, reviewData) => 
    apiClient.put(`/api/reviews/${reviewId}`, reviewData),
  
  // Delete a review
  deleteReview: (reviewId) => 
    apiClient.delete(`/api/reviews/${reviewId}`)
};
