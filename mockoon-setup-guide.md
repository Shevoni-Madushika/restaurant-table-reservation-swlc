# Mockoon Setup Guide for TableTop.lk API

## 📋 Complete API Endpoints for Mockoon

### 🏪 Restaurant Endpoints

#### 1. GET /api/restaurants
**Description**: Get all restaurants
**Response Body**:
```json
[
  {
    "id": 1,
    "name": "The Spice Garden",
    "description": "Authentic Sri Lankan cuisine with a modern twist. Experience the rich flavors of traditional recipes passed down through generations.",
    "address": "123 Galle Road, Colombo 03",
    "city": "Colombo",
    "cuisine": "Sri Lankan",
    "rating": 4.5,
    "priceRange": 2,
    "phoneNumber": "+94 11 234 5678",
    "website": "https://spicegarden.lk",
    "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
    "isActive": true,
    "totalBookings": 15,
    "totalReviews": 8
  },
  {
    "id": 2,
    "name": "Bamboo Garden",
    "description": "Contemporary Asian fusion restaurant offering innovative dishes that blend Eastern and Western culinary traditions.",
    "address": "456 Kandy Road, Kandy",
    "city": "Kandy",
    "cuisine": "Asian Fusion",
    "rating": 4.3,
    "priceRange": 3,
    "phoneNumber": "+94 81 234 5678",
    "website": "https://bamboogarden.lk",
    "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500",
    "isActive": true,
    "totalBookings": 12,
    "totalReviews": 6
  },
  {
    "id": 3,
    "name": "Café Francais",
    "description": "Elegant French bistro serving classic French dishes with a contemporary presentation. Perfect for romantic dinners.",
    "address": "789 Marine Drive, Negombo",
    "city": "Negombo",
    "cuisine": "French",
    "rating": 4.7,
    "priceRange": 4,
    "phoneNumber": "+94 31 234 5678",
    "website": "https://cafefrancais.lk",
    "imageUrl": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500",
    "isActive": true,
    "totalBookings": 20,
    "totalReviews": 12
  },
  {
    "id": 4,
    "name": "Sakura Sushi Bar",
    "description": "Fresh sushi and sashimi prepared by master chefs. Experience authentic Japanese cuisine in a modern setting.",
    "address": "321 Independence Avenue, Colombo 07",
    "city": "Colombo",
    "cuisine": "Japanese",
    "rating": 4.6,
    "priceRange": 3,
    "phoneNumber": "+94 11 345 6789",
    "website": "https://sakurasushi.lk",
    "imageUrl": "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500",
    "isActive": true,
    "totalBookings": 18,
    "totalReviews": 10
  },
  {
    "id": 5,
    "name": "Dolce Vita",
    "description": "Authentic Italian trattoria serving handmade pasta and wood-fired pizzas. A taste of Italy in the heart of Sri Lanka.",
    "address": "258 Park Street, Colombo 05",
    "city": "Colombo",
    "cuisine": "Italian",
    "rating": 4.8,
    "priceRange": 3,
    "phoneNumber": "+94 11 567 8901",
    "website": "https://dolcevita.lk",
    "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500",
    "isActive": true,
    "totalBookings": 25,
    "totalReviews": 15
  }
]
```

#### 2. GET /api/restaurants/:id
**Description**: Get restaurant by ID
**Response Body** (for ID 1):
```json
{
  "id": 1,
  "name": "The Spice Garden",
  "description": "Authentic Sri Lankan cuisine with a modern twist. Experience the rich flavors of traditional recipes passed down through generations.",
  "address": "123 Galle Road, Colombo 03",
  "city": "Colombo",
  "cuisine": "Sri Lankan",
  "rating": 4.5,
  "priceRange": 2,
  "phoneNumber": "+94 11 234 5678",
  "website": "https://spicegarden.lk",
  "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
  "isActive": true,
  "totalBookings": 15,
  "totalReviews": 8,
  "recentReviews": [
    {
      "id": 1,
      "userName": "John Smith",
      "rating": 4.5,
      "reviewText": "Excellent Sri Lankan cuisine! The curry was perfectly spiced and the service was outstanding.",
      "createdAt": "2024-01-05T15:30:00"
    }
  ]
}
```

#### 3. GET /api/restaurants/search
**Description**: Search restaurants with filters
**Query Parameters**: city, cuisine, minRating, maxPriceRange
**Response Body** (filtered results):
```json
[
  {
    "id": 1,
    "name": "The Spice Garden",
    "description": "Authentic Sri Lankan cuisine with a modern twist...",
    "address": "123 Galle Road, Colombo 03",
    "city": "Colombo",
    "cuisine": "Sri Lankan",
    "rating": 4.5,
    "priceRange": 2,
    "phoneNumber": "+94 11 234 5678",
    "website": "https://spicegarden.lk",
    "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
    "isActive": true,
    "totalBookings": 15,
    "totalReviews": 8
  }
]
```

#### 4. GET /api/restaurants/search/text?q=searchTerm
**Description**: Text-based search
**Response Body**:
```json
[
  {
    "id": 1,
    "name": "The Spice Garden",
    "description": "Authentic Sri Lankan cuisine with a modern twist...",
    "address": "123 Galle Road, Colombo 03",
    "city": "Colombo",
    "cuisine": "Sri Lankan",
    "rating": 4.5,
    "priceRange": 2,
    "phoneNumber": "+94 11 234 5678",
    "website": "https://spicegarden.lk",
    "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
    "isActive": true,
    "totalBookings": 15,
    "totalReviews": 8
  }
]
```

#### 5. GET /api/restaurants/top-rated
**Description**: Get highest rated restaurants
**Response Body**:
```json
[
  {
    "id": 5,
    "name": "Dolce Vita",
    "description": "Authentic Italian trattoria serving handmade pasta...",
    "address": "258 Park Street, Colombo 05",
    "city": "Colombo",
    "cuisine": "Italian",
    "rating": 4.8,
    "priceRange": 3,
    "phoneNumber": "+94 11 567 8901",
    "website": "https://dolcevita.lk",
    "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500",
    "isActive": true,
    "totalBookings": 25,
    "totalReviews": 15
  },
  {
    "id": 3,
    "name": "Café Francais",
    "description": "Elegant French bistro serving classic French dishes...",
    "address": "789 Marine Drive, Negombo",
    "city": "Negombo",
    "cuisine": "French",
    "rating": 4.7,
    "priceRange": 4,
    "phoneNumber": "+94 31 234 5678",
    "website": "https://cafefrancais.lk",
    "imageUrl": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500",
    "isActive": true,
    "totalBookings": 20,
    "totalReviews": 12
  }
]
```

#### 6. GET /api/restaurants/most-booked
**Description**: Get most popular restaurants
**Response Body**:
```json
[
  {
    "id": 5,
    "name": "Dolce Vita",
    "description": "Authentic Italian trattoria serving handmade pasta...",
    "address": "258 Park Street, Colombo 05",
    "city": "Colombo",
    "cuisine": "Italian",
    "rating": 4.8,
    "priceRange": 3,
    "phoneNumber": "+94 11 567 8901",
    "website": "https://dolcevita.lk",
    "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500",
    "isActive": true,
    "totalBookings": 25,
    "totalReviews": 15
  },
  {
    "id": 3,
    "name": "Café Francais",
    "description": "Elegant French bistro serving classic French dishes...",
    "address": "789 Marine Drive, Negombo",
    "city": "Negombo",
    "cuisine": "French",
    "rating": 4.7,
    "priceRange": 4,
    "phoneNumber": "+94 31 234 5678",
    "website": "https://cafefrancais.lk",
    "imageUrl": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500",
    "isActive": true,
    "totalBookings": 20,
    "totalReviews": 12
  }
]
```

### 📅 Booking Endpoints

#### 7. GET /api/bookings
**Description**: Get all bookings
**Response Body**:
```json
[
  {
    "id": 1,
    "userId": 1,
    "restaurantId": 1,
    "restaurantName": "The Spice Garden",
    "bookingDateTime": "2024-01-15T19:00:00",
    "numberOfPeople": 4,
    "specialRequests": "Table near the window, vegetarian options needed",
    "status": "CONFIRMED",
    "createdAt": "2024-01-10T10:30:00"
  },
  {
    "id": 2,
    "userId": 2,
    "restaurantId": 3,
    "restaurantName": "Café Francais",
    "bookingDateTime": "2024-01-16T20:30:00",
    "numberOfPeople": 2,
    "specialRequests": "Anniversary dinner, romantic table",
    "status": "CONFIRMED",
    "createdAt": "2024-01-11T14:20:00"
  },
  {
    "id": 3,
    "userId": 3,
    "restaurantId": 4,
    "restaurantName": "Sakura Sushi Bar",
    "bookingDateTime": "2024-01-17T18:00:00",
    "numberOfPeople": 6,
    "specialRequests": "Business dinner, private area preferred",
    "status": "PENDING",
    "createdAt": "2024-01-12T09:15:00"
  }
]
```

#### 8. GET /api/bookings/user/:userId
**Description**: Get user bookings
**Response Body**:
```json
[
  {
    "id": 1,
    "userId": 1,
    "restaurantId": 1,
    "restaurantName": "The Spice Garden",
    "bookingDateTime": "2024-01-15T19:00:00",
    "numberOfPeople": 4,
    "specialRequests": "Table near the window, vegetarian options needed",
    "status": "CONFIRMED",
    "createdAt": "2024-01-10T10:30:00"
  },
  {
    "id": 4,
    "userId": 1,
    "restaurantId": 5,
    "restaurantName": "Dolce Vita",
    "bookingDateTime": "2024-01-18T19:30:00",
    "numberOfPeople": 3,
    "specialRequests": "Birthday celebration",
    "status": "CONFIRMED",
    "createdAt": "2024-01-13T16:45:00"
  }
]
```

#### 9. POST /api/bookings
**Description**: Create new booking
**Request Body**:
```json
{
  "userId": 1,
  "restaurantId": 1,
  "bookingDateTime": "2024-01-20T19:00:00",
  "numberOfPeople": 2,
  "specialRequests": "Anniversary dinner"
}
```
**Response Body**:
```json
{
  "id": 6,
  "userId": 1,
  "restaurantId": 1,
  "restaurantName": "The Spice Garden",
  "bookingDateTime": "2024-01-20T19:00:00",
  "numberOfPeople": 2,
  "specialRequests": "Anniversary dinner",
  "status": "PENDING",
  "createdAt": "2024-01-14T10:30:00"
}
```

#### 10. DELETE /api/bookings/:bookingId
**Description**: Cancel booking
**Response Body**:
```json
{
  "message": "Booking cancelled successfully"
}
```

#### 11. GET /api/bookings/availability?restaurantId=1&bookingDateTime=2024-01-20T19:00:00
**Description**: Check time slot availability
**Response Body**:
```json
true
```

### ⭐ Review Endpoints

#### 12. GET /api/reviews
**Description**: Get all reviews
**Response Body**:
```json
[
  {
    "id": 1,
    "userId": 1,
    "restaurantId": 1,
    "userName": "John Smith",
    "rating": 4.5,
    "reviewText": "Excellent Sri Lankan cuisine! The curry was perfectly spiced and the service was outstanding. Will definitely come back.",
    "createdAt": "2024-01-05T15:30:00"
  },
  {
    "id": 2,
    "userId": 2,
    "restaurantId": 3,
    "userName": "Sarah Johnson",
    "rating": 4.8,
    "reviewText": "Absolutely romantic atmosphere and the French dishes were authentic. Perfect for special occasions!",
    "createdAt": "2024-01-06T20:15:00"
  }
]
```

#### 13. GET /api/reviews/restaurant/:restaurantId
**Description**: Get restaurant reviews
**Response Body**:
```json
[
  {
    "id": 1,
    "userId": 1,
    "restaurantId": 1,
    "userName": "John Smith",
    "rating": 4.5,
    "reviewText": "Excellent Sri Lankan cuisine! The curry was perfectly spiced and the service was outstanding. Will definitely come back.",
    "createdAt": "2024-01-05T15:30:00"
  }
]
```

#### 14. POST /api/reviews
**Description**: Create new review
**Request Body**:
```json
{
  "userId": 1,
  "restaurantId": 1,
  "rating": 4.5,
  "reviewText": "Great food and excellent service!"
}
```
**Response Body**:
```json
{
  "id": 5,
  "userId": 1,
  "restaurantId": 1,
  "userName": "John Smith",
  "rating": 4.5,
  "reviewText": "Great food and excellent service!",
  "createdAt": "2024-01-14T12:30:00"
}
```

### 🔐 Authentication Endpoints

#### 15. POST /api/auth/login
**Description**: User login
**Request Body**:
```json
{
  "username": "admin",
  "password": "admin123"
}
```
**Response Body** (Success):
```json
{
  "success": true,
  "user": {
    "id": 6,
    "username": "admin",
    "email": "admin@tabletop.lk",
    "firstName": "Admin",
    "lastName": "User",
    "phoneNumber": "+94 11 123 4567",
    "role": "ADMIN"
  },
  "token": "mock-jwt-token-6"
}
```
**Response Body** (Error):
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

#### 16. POST /api/auth/register
**Description**: User registration
**Request Body**:
```json
{
  "username": "newuser",
  "email": "newuser@email.com",
  "password": "password123",
  "firstName": "New",
  "lastName": "User",
  "phoneNumber": "+94 77 999 9999"
}
```
**Response Body** (Success):
```json
{
  "success": true,
  "user": {
    "id": 7,
    "username": "newuser",
    "email": "newuser@email.com",
    "firstName": "New",
    "lastName": "User",
    "phoneNumber": "+94 77 999 9999",
    "role": "CUSTOMER"
  },
  "token": "mock-jwt-token-7"
}
```

## 🚀 Mockoon Setup Instructions

1. **Create New Environment**: Open Mockoon and create a new environment called "TableTop.lk API"

2. **Set Port**: Configure the environment to run on port 3001 (or any available port)

3. **Add Routes**: Create the following routes with the exact paths and methods:

### Restaurant Routes:
- `GET /api/restaurants`
- `GET /api/restaurants/:id`
- `GET /api/restaurants/search`
- `GET /api/restaurants/search/text`
- `GET /api/restaurants/top-rated`
- `GET /api/restaurants/most-booked`
- `POST /api/restaurants`
- `PUT /api/restaurants/:id`
- `DELETE /api/restaurants/:id`

### Booking Routes:
- `GET /api/bookings`
- `GET /api/bookings/user/:userId`
- `GET /api/bookings/restaurant/:restaurantId`
- `POST /api/bookings`
- `PUT /api/bookings/:bookingId/status`
- `DELETE /api/bookings/:bookingId`
- `GET /api/bookings/availability`

### Review Routes:
- `GET /api/reviews`
- `GET /api/reviews/restaurant/:restaurantId`
- `GET /api/reviews/user/:userId`
- `POST /api/reviews`
- `PUT /api/reviews/:id`
- `DELETE /api/reviews/:id`

### Auth Routes:
- `POST /api/auth/login`
- `POST /api/auth/register`

4. **Configure Responses**: Copy the response bodies from above for each endpoint

5. **Start Mockoon**: Run the environment and note the port (e.g., http://localhost:3001)

6. **Update Frontend**: In your React app, update the API base URL to point to Mockoon instead of the Spring Boot backend

## 🔧 Frontend Configuration Update

Update your frontend to use Mockoon:

```javascript
// In your frontend/src/api/config.js or similar
const API_BASE_URL = 'http://localhost:3001'; // Mockoon port

// Update axios configuration
axios.defaults.baseURL = API_BASE_URL;
```

This setup will give you a fully functional mock API for testing your frontend without needing the Spring Boot backend running!
