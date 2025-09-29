# 🚀 Separate Backend & Frontend Setup Guide

## 📋 **Overview**
This guide shows how to run the **Backend (Spring Boot)** and **Frontend (React)** as completely separate services.

## 🗄️ **Backend Setup (Spring Boot)**

### **1. Start Backend Server**
```bash
# Navigate to backend directory
cd backend

# Start Spring Boot application
mvn spring-boot:run
```

**✅ Backend will run on:** `http://localhost:8080`
**✅ H2 Console:** `http://localhost:8080/h2-console`

### **2. Backend Features**
- **REST API endpoints** for restaurants, bookings, reviews
- **H2 in-memory database** with sample data
- **CORS enabled** for frontend communication
- **Sample data** automatically loaded on startup

### **3. Test Backend**
Open browser and visit:
- `http://localhost:8080/api/restaurants` - Should return JSON with restaurants
- `http://localhost:8080/h2-console` - Database console

---

## 🎨 **Frontend Setup (React)**

### **1. Start Frontend Server**
```bash
# Navigate to frontend directory (in NEW terminal)
cd frontend

# Install dependencies (if first time)
npm install

# Start React development server
npm start
```

**✅ Frontend will run on:** `http://localhost:3000`

### **2. Frontend Features**
- **React application** with modern UI
- **API calls** to backend at `localhost:8080`
- **Restaurant search** and filtering
- **Booking system** and user management
- **Admin panel** for restaurant management

### **3. Test Frontend**
Open browser and visit:
- `http://localhost:3000` - Main application
- Check browser console for API connection logs

---

## 🔧 **How They Communicate**

### **Architecture:**
```
Frontend (React)     →     Backend (Spring Boot)
localhost:3000             localhost:8080
     ↓                           ↑
  Makes HTTP requests      Serves REST API
  to /api/* endpoints      with CORS enabled
```

### **API Communication:**
- Frontend makes requests to `http://localhost:8080/api/*`
- Backend responds with JSON data
- CORS allows cross-origin requests
- No proxy needed - direct HTTP communication

---

## 🚀 **Quick Start Commands**

### **Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
```
**Wait for:** "Started RestaurantBookingApplication in X seconds"

### **Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
**Wait for:** "Local: http://localhost:3000"

### **Open Browser:**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080/api/restaurants`

---

## 🔍 **Verification Steps**

### **1. Check Backend is Running:**
```bash
curl http://localhost:8080/api/restaurants
```
**Expected:** JSON response with restaurant data

### **2. Check Frontend is Running:**
Visit `http://localhost:3000` in browser
**Expected:** Restaurant booking platform homepage

### **3. Check API Connection:**
- Open browser Developer Tools (F12)
- Go to Network tab
- Use the search/filter features on frontend
- **Expected:** See requests to `localhost:8080/api/*`

---

## 🛠️ **Troubleshooting**

### **Backend Issues:**
- **Port 8080 in use:** Change port in `application.properties`
- **Database errors:** Check H2 console at `/h2-console`
- **CORS errors:** Verify CORS configuration in backend

### **Frontend Issues:**
- **Port 3000 in use:** React will prompt to use different port
- **API connection failed:** Check if backend is running on 8080
- **Build errors:** Run `npm install` to update dependencies

### **Connection Issues:**
- **CORS errors:** Backend has CORS enabled, should work
- **Network errors:** Check firewall settings
- **API not responding:** Verify backend is running and accessible

---

## 📁 **Project Structure**

```
restaurant-table-reservation/
├── backend/                    # Spring Boot Backend
│   ├── src/main/java/         # Java source code
│   ├── src/main/resources/    # Configuration files
│   └── pom.xml               # Maven dependencies
│
└── frontend/                  # React Frontend
    ├── src/                  # React source code
    ├── public/               # Static files
    └── package.json          # NPM dependencies
```

---

## 🎯 **Key Points**

1. **Two Separate Services:** Backend and Frontend run independently
2. **Different Ports:** Backend (8080), Frontend (3000)
3. **Direct Communication:** Frontend calls backend API directly
4. **No Proxy:** No need for proxy configuration
5. **Independent Development:** Can work on each service separately

---

## ✅ **Success Indicators**

### **Backend Working:**
- Console shows "Started RestaurantBookingApplication"
- `http://localhost:8080/api/restaurants` returns JSON
- H2 console accessible at `http://localhost:8080/h2-console`

### **Frontend Working:**
- Browser shows restaurant booking platform
- API test component shows "Connection Successful"
- Search and filter features work
- Console shows API requests to backend

Both services are now completely independent and can be developed, deployed, and maintained separately!
