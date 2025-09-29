import apiClient from './config';

// Restaurant API endpoints
export const restaurantApi = {
  // Get all restaurants
  getAllRestaurants: () => apiClient.get('/api/restaurants'),
  
  // Get restaurant by ID
  getRestaurantById: (id) => apiClient.get(`/api/restaurants/${id}`),
  
  // Search restaurants with filters
  searchRestaurants: (filters) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });
    return apiClient.get(`/api/restaurants/search?${params.toString()}`);
  },
  
  // Text-based search
  searchByText: (searchTerm) => apiClient.get(`/api/restaurants/search/text?q=${searchTerm}`),
  
  // Get top-rated restaurants
  getTopRatedRestaurants: () => apiClient.get('/api/restaurants/top-rated'),
  
  // Get most booked restaurants
  getMostBookedRestaurants: () => apiClient.get('/api/restaurants/most-booked'),
  
  // Create restaurant (Admin)
  createRestaurant: (restaurant) => apiClient.post('/api/restaurants', restaurant),
  
  // Update restaurant (Admin)
  updateRestaurant: (id, restaurant) => apiClient.put(`/api/restaurants/${id}`, restaurant),
  
  // Delete restaurant (Admin)
  deleteRestaurant: (id) => apiClient.delete(`/api/restaurants/${id}`),
};
