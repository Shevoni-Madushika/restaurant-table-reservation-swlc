// Utility for user-friendly error messages
export const getErrorMessage = (error, context = 'general') => {
  // Log the technical error for debugging
  console.error(`Error in ${context}:`, error);
  
  // Check if it's a network error
  if (!error.response) {
    return 'Network error. Please check your connection and try again.';
  }
  
  const status = error.response.status;
  const data = error.response.data;
  
  // Handle specific error contexts
  switch (context) {
    case 'booking':
      // Show the same message for ALL booking errors
      return 'Bookings not available at the moment. Please try again later.';
      
    case 'favorites':
      if (status === 400 || status === 500) {
        return 'Unable to update favorites. Please try again later.';
      }
      if (status === 401) {
        return 'Please login to manage favorites';
      }
      break;
      
    case 'reviews':
      if (status === 400 || status === 500) {
        return 'Unable to submit review. Please try again later.';
      }
      if (status === 401) {
        return 'Please login to submit a review';
      }
      break;
      
    case 'restaurants':
      if (status === 400 || status === 500) {
        return 'Unable to load restaurants. Please try again later.';
      }
      break;
      
    case 'auth':
      if (status === 401) {
        return 'Invalid credentials. Please check your login details.';
      }
      if (status === 400) {
        return 'Invalid request. Please check your information.';
      }
      break;
      
    default:
      // Generic error messages based on status codes
      if (status >= 500) {
        return 'Server error. Please try again later.';
      }
      if (status === 404) {
        return 'Requested resource not found.';
      }
      if (status === 403) {
        return 'You do not have permission to perform this action.';
      }
      if (status === 401) {
        return 'Please login to continue.';
      }
      if (status >= 400) {
        return 'Request failed. Please try again.';
      }
  }
  
  // Fallback message
  return 'Something went wrong. Please try again later.';
};

// Specific error message functions for common scenarios
export const getBookingErrorMessage = (error) => getErrorMessage(error, 'booking');
export const getFavoriteErrorMessage = (error) => getErrorMessage(error, 'favorites');
export const getReviewErrorMessage = (error) => getErrorMessage(error, 'reviews');
export const getRestaurantErrorMessage = (error) => getErrorMessage(error, 'restaurants');
export const getAuthErrorMessage = (error) => getErrorMessage(error, 'auth');
