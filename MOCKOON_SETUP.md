# 🚀 Complete Mockoon Setup for TableTop.lk API

## 📋 Quick Setup Steps

### 1. Create Mockoon Environment
1. Open Mockoon
2. Create new environment: "TableTop.lk API"
3. Set port: **3001** (or any available port)
4. Enable CORS: ✅

### 2. Add All API Endpoints

Create these routes in Mockoon with the exact paths and methods:

## 🏪 Restaurant Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/restaurants` | Get all restaurants |
| GET | `/api/restaurants/:id` | Get restaurant by ID |
| GET | `/api/restaurants/search` | Search with filters |
| GET | `/api/restaurants/search/text` | Text search |
| GET | `/api/restaurants/top-rated` | Top rated restaurants |
| GET | `/api/restaurants/most-booked` | Most booked restaurants |
| POST | `/api/restaurants` | Create restaurant |
| PUT | `/api/restaurants/:id` | Update restaurant |
| DELETE | `/api/restaurants/:id` | Delete restaurant |

## 📅 Booking Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/bookings` | Get all bookings |
| GET | `/api/bookings/user/:userId` | Get user bookings |
| GET | `/api/bookings/restaurant/:restaurantId` | Get restaurant bookings |
| POST | `/api/bookings` | Create booking |
| PUT | `/api/bookings/:bookingId/status` | Update booking status |
| DELETE | `/api/bookings/:bookingId` | Cancel booking |
| GET | `/api/bookings/availability` | Check availability |

## ⭐ Review Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/reviews` | Get all reviews |
| GET | `/api/reviews/restaurant/:restaurantId` | Get restaurant reviews |
| GET | `/api/reviews/user/:userId` | Get user reviews |
| POST | `/api/reviews` | Create review |
| PUT | `/api/reviews/:id` | Update review |
| DELETE | `/api/reviews/:id` | Delete review |

## 🔐 Authentication Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |

---

## 📝 Response Templates

### Sample Restaurant Response
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
  "totalReviews": 8
}
```

### Sample Booking Response
```json
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
}
```

### Sample Login Response
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

---

## 🎯 Demo Accounts

Use these accounts for testing:

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | ADMIN |
| user | user123 | CUSTOMER |
| johnsmith | password123 | CUSTOMER |

---

## 🔧 Frontend Configuration

Update your React app to use Mockoon:

```javascript
// In your frontend package.json, update the proxy:
"proxy": "http://localhost:3001"

// Or update axios base URL:
axios.defaults.baseURL = 'http://localhost:3001';
```

---

## 📊 Test Data Available

- **12 Restaurants** across different cuisines and cities
- **10 Sample Bookings** with various statuses
- **12 Reviews** with ratings and comments
- **6 Users** including admin and customers

---

## 🚀 Ready to Test!

1. Start Mockoon environment
2. Your API will be available at `http://localhost:3001`
3. Update frontend to point to Mockoon
4. Test all features without needing the Spring Boot backend!

---

**Note**: All response bodies are provided in the `mockoon-setup-guide.md` file. Copy the JSON responses from there for each endpoint in Mockoon.
