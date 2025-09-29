import apiClient from './config';

// Booking API endpoints
export const bookingApi = {
  // Get all bookings
  getAllBookings: () => apiClient.get('/api/bookings'),
  
  // Get user bookings
  getUserBookings: (userId) => apiClient.get(`/api/bookings/user/${userId}`),
  
  // Get restaurant bookings
  getRestaurantBookings: (restaurantId) => apiClient.get(`/api/bookings/restaurant/${restaurantId}`),
  
  // Create booking
  createBooking: (booking) => apiClient.post('/api/bookings', booking),
  
  // Update booking status
  updateBookingStatus: (bookingId, status) => apiClient.put(`/api/bookings/${bookingId}/status?status=${status}`),
  
  // Cancel booking
  cancelBooking: (bookingId) => apiClient.delete(`/api/bookings/${bookingId}`),
  
  // Check availability
  checkAvailability: (restaurantId, bookingDateTime) => 
    apiClient.get(`/api/bookings/availability?restaurantId=${restaurantId}&bookingDateTime=${bookingDateTime}`),
};
