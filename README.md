# TableTop.lk - Restaurant Booking Platform

A comprehensive web services-based restaurant booking platform for TableTop.lk, designed to help users discover and reserve tables at restaurants by integrating data from various restaurant platforms.

## 🚀 Features

### Core Functionality
- **Restaurant Discovery**: Search and filter restaurants by location, cuisine, rating, and price range
- **Table Reservations**: Book tables with special requests and dietary requirements
- **User Management**: User registration, authentication, and profile management
- **Favorites System**: Save favorite restaurants for quick access
- **Booking History**: View past and upcoming reservations
- **Admin Panel**: Manage restaurants, bookings, and analytics

### Technical Features
- **RESTful API**: Comprehensive REST API for all operations
- **Real-time Search**: Advanced filtering and search capabilities
- **Responsive Design**: Mobile-first, modern UI/UX
- **Mock Data Integration**: Ready-to-use mock data for development
- **Analytics Dashboard**: Restaurant performance metrics and insights

## 🏗️ Architecture

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.2.0 with Java 17
- **Database**: H2 in-memory database for development
- **Security**: Spring Security with JWT authentication
- **API**: RESTful web services
- **Validation**: Bean validation for data integrity

### Frontend (React)
- **Framework**: React 18.2.0
- **UI Library**: React Bootstrap 5.2.3
- **Routing**: React Router DOM 6.8.1
- **HTTP Client**: Axios for API communication
- **Icons**: React Icons for consistent iconography

## 📁 Project Structure

```
restaurant-table-reservation/
├── backend/                          # Spring Boot Backend
│   ├── src/main/java/com/tabletop/
│   │   ├── entity/                   # JPA Entities
│   │   ├── repository/               # Data Access Layer
│   │   ├── service/                  # Business Logic
│   │   ├── controller/               # REST Controllers
│   │   └── dto/                      # Data Transfer Objects
│   ├── src/main/resources/
│   │   └── application.yml           # Configuration
│   └── pom.xml                      # Maven Dependencies
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── components/              # Reusable Components
│   │   ├── pages/                   # Page Components
│   │   ├── App.js                   # Main App Component
│   │   └── index.js                  # Entry Point
│   ├── public/
│   └── package.json                 # NPM Dependencies
├── mock-data/                       # Mock JSON Data
│   ├── restaurants.json             # Restaurant Data
│   ├── bookings.json                # Booking Data
│   ├── reviews.json                 # Review Data
│   └── users.json                   # User Data
└── README.md                        # Project Documentation
```

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- Maven 3.6 or higher
- Git

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   mvn clean install
   ```

3. **Run the application**:
   ```bash
   mvn spring-boot:run
   ```

4. **Access the application**:
   - API Base URL: `http://localhost:8080`
   - H2 Database Console: `http://localhost:8080/h2-console`
   - Database URL: `jdbc:h2:mem:testdb`
   - Username: `sa`
   - Password: `password`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Access the application**:
   - Frontend URL: `http://localhost:3000`

## 📚 API Documentation

### Restaurant Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/restaurants` | Get all restaurants |
| GET | `/api/restaurants/{id}` | Get restaurant by ID |
| GET | `/api/restaurants/search` | Search restaurants with filters |
| GET | `/api/restaurants/search/text?q={term}` | Text-based search |
| GET | `/api/restaurants/top-rated` | Get top-rated restaurants |
| GET | `/api/restaurants/most-booked` | Get most booked restaurants |
| POST | `/api/restaurants` | Create new restaurant |
| PUT | `/api/restaurants/{id}` | Update restaurant |
| DELETE | `/api/restaurants/{id}` | Delete restaurant |

### Booking Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings` | Get all bookings |
| GET | `/api/bookings/user/{userId}` | Get user bookings |
| GET | `/api/bookings/restaurant/{restaurantId}` | Get restaurant bookings |
| POST | `/api/bookings` | Create new booking |
| PUT | `/api/bookings/{id}/status` | Update booking status |
| DELETE | `/api/bookings/{id}` | Cancel booking |
| GET | `/api/bookings/availability` | Check time slot availability |

### Search Parameters

#### Restaurant Search
- `city`: Filter by city
- `cuisine`: Filter by cuisine type
- `minRating`: Minimum rating (0.0-5.0)
- `maxPriceRange`: Maximum price range (1-4)

#### Example API Calls
```bash
# Search restaurants in Colombo
GET /api/restaurants/search?city=Colombo

# Search Italian restaurants with rating >= 4.0
GET /api/restaurants/search?cuisine=Italian&minRating=4.0

# Text search for "sushi"
GET /api/restaurants/search/text?q=sushi
```

## 🎨 Frontend Features

### Pages
- **Home**: Restaurant discovery with search and filters
- **Restaurant Detail**: Detailed restaurant information and booking
- **My Bookings**: User's booking history and management
- **Favorites**: User's favorite restaurants
- **Admin Panel**: Restaurant and booking management
- **Login/Register**: User authentication

### Components
- **Navbar**: Navigation with user authentication
- **Restaurant Card**: Restaurant display with ratings and actions
- **Booking Form**: Table reservation form
- **Search Filters**: Advanced filtering options
- **Admin Dashboard**: Management interface

## 📊 Mock Data

The project includes comprehensive mock data for development:

### Restaurants (12 entries)
- Various cuisines: Sri Lankan, Indian, Chinese, Italian, French, Japanese, Mediterranean, American
- Multiple cities: Colombo, Kandy, Galle, Negombo, Anuradhapura
- Price ranges: $ to $$$$
- Ratings: 4.0 to 4.8

### Bookings (10 entries)
- Different booking statuses: PENDING, CONFIRMED, CANCELLED
- Various party sizes and special requests
- Time slots across different dates

### Reviews (12 entries)
- User reviews with ratings and comments
- Associated with restaurants and users

### Users (6 entries)
- Customer and admin accounts
- Complete user profiles with contact information

## 🔧 Configuration

### Backend Configuration (`application.yml`)
```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:h2:mem:testdb
    username: sa
    password: password
  
  h2:
    console:
      enabled: true
      path: /h2-console
```

### Frontend Configuration
- Proxy configuration for API calls
- Bootstrap 5.2.3 for styling
- React Router for navigation
- Axios for HTTP requests

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Build the JAR file:
   ```bash
   mvn clean package
   ```

2. Run the JAR:
   ```bash
   java -jar target/restaurant-booking-platform-1.0.0.jar
   ```

### Frontend Deployment
1. Build for production:
   ```bash
   npm run build
   ```

2. Serve the build folder with a web server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Backend Development**: Spring Boot, JPA, REST APIs
- **Frontend Development**: React, Bootstrap, Modern UI/UX
- **Database Design**: H2, JPA Entities, Relationships
- **API Integration**: Mock data, RESTful services

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**TableTop.lk** - Simplifying restaurant discovery and table reservations in Sri Lanka! 🍽️
