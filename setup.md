# TableTop.lk - Quick Setup Guide

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 16+
- Maven 3.6+

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies and run
mvn clean install
mvn spring-boot:run
```

**Backend will be available at:** `http://localhost:8080`

### 2. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

**Frontend will be available at:** `http://localhost:3000`

## 📊 Sample Data

The application comes with pre-loaded sample data:

### Demo Accounts
- **Admin**: username: `admin`, password: `admin123`
- **User**: username: `user`, password: `user123`

### Sample Restaurants
- 5 restaurants across different cuisines
- Ratings from 4.3 to 4.8
- Multiple cities: Colombo, Kandy, Negombo

### Sample Bookings
- Various booking statuses
- Different party sizes
- Special requests

## 🔧 API Endpoints

### Restaurants
- `GET /api/restaurants` - All restaurants
- `GET /api/restaurants/{id}` - Restaurant details
- `GET /api/restaurants/search?city=Colombo` - Search with filters
- `POST /api/restaurants` - Create restaurant (Admin)

### Bookings
- `GET /api/bookings` - All bookings
- `GET /api/bookings/user/{userId}` - User bookings
- `POST /api/bookings` - Create booking
- `DELETE /api/bookings/{id}` - Cancel booking

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## 🎨 Frontend Features

### Pages
- **Home** (`/`) - Restaurant discovery with search
- **Restaurant Detail** (`/restaurant/:id`) - Detailed view and booking
- **My Bookings** (`/my-bookings`) - User's booking history
- **Favorites** (`/favorites`) - Saved restaurants
- **Admin Panel** (`/admin`) - Restaurant management
- **Login/Register** (`/login`, `/register`) - Authentication

### Key Features
- ✅ Restaurant search and filtering
- ✅ Table booking system
- ✅ User authentication
- ✅ Admin panel for restaurant management
- ✅ Responsive design
- ✅ Real-time search
- ✅ Rating and review system

## 🗄️ Database

- **Type**: H2 In-Memory Database
- **Console**: `http://localhost:8080/h2-console`
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: `password`

## 📱 Mock Data

Comprehensive mock data is available in the `mock-data/` directory:
- `restaurants.json` - 12 restaurant entries
- `bookings.json` - 10 booking entries
- `reviews.json` - 12 review entries
- `users.json` - 6 user entries

## 🚀 Deployment

### Backend
```bash
cd backend
mvn clean package
java -jar target/restaurant-booking-platform-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
# Serve the build folder with a web server
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📞 Support

For issues or questions:
1. Check the README.md for detailed documentation
2. Review the API endpoints in the backend
3. Check the console for error messages
4. Ensure all dependencies are installed correctly

## 🎯 Next Steps

1. **Start the backend**: `mvn spring-boot:run` in backend directory
2. **Start the frontend**: `npm start` in frontend directory
3. **Visit**: `http://localhost:3000`
4. **Login**: Use demo accounts to test features
5. **Explore**: Try searching, booking, and admin features

---

**Happy coding! 🍽️**
