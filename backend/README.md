# 🗄️ TableTop.lk Backend (Spring Boot)

## 🚀 **Quick Start**

```bash
# Navigate to backend directory
cd backend

# Start the application
mvn spring-boot:run
```

**✅ Backend runs on:** `http://localhost:8080`

## 📊 **Database**

- **Type:** H2 In-Memory Database
- **Console:** `http://localhost:8080/h2-console`
- **JDBC URL:** `jdbc:h2:mem:testdb`
- **Username:** `sa`
- **Password:** `password`

## 🔗 **API Endpoints**

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/{id}` - Get restaurant by ID
- `GET /api/restaurants/search` - Search restaurants
- `POST /api/restaurants` - Create restaurant (Admin)

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/user/{userId}` - Get user bookings
- `POST /api/bookings` - Create booking
- `DELETE /api/bookings/{id}` - Cancel booking

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create review

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## 🧪 **Test API**

```bash
# Test restaurants endpoint
curl http://localhost:8080/api/restaurants

# Test with browser
# Visit: http://localhost:8080/api/restaurants
```

## 📋 **Sample Data**

The application automatically loads sample data:
- 12 restaurants across different cuisines
- 10 sample bookings
- 12 reviews
- 6 users (including admin)

## 🔧 **Configuration**

- **Database:** H2 (in-memory) for development
- **CORS:** Enabled for frontend communication
- **Security:** Basic authentication configured
- **Logging:** Debug level enabled

## 🚀 **Production Setup**

For production with MySQL:

1. Update `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://your-host:3306/tabletop_db
spring.datasource.username=your-username
spring.datasource.password=your-password
```

2. Run database setup script:
```bash
mysql -u username -p < database-setup.sql
```

## 📞 **Support**

- **Logs:** Check console output for detailed logs
- **Database:** Use H2 console for data inspection
- **API:** Test endpoints with curl or browser
