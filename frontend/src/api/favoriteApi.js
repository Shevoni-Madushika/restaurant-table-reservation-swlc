import apiClient from './config';

// Favorite API endpoints
export const favoriteApi = {
  // Get user's favorite restaurants
  getFavorites: (userId) => apiClient.get(`/api/favorites/user/${userId}`),
  
  // Add restaurant to favorites
  addToFavorites: (userId, restaurantId) => 
    apiClient.post(`/api/favorites`, { userId, restaurantId }),
  
  // Remove restaurant from favorites
  removeFromFavorites: (userId, restaurantId) => 
    apiClient.delete(`/api/favorites/user/${userId}/restaurant/${restaurantId}`),
  
  // Check if restaurant is favorited by user
  isFavorited: (userId, restaurantId) => 
    apiClient.get(`/api/favorites/user/${userId}/restaurant/${restaurantId}`)
};
