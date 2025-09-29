# 🎨 TableTop.lk Frontend (React)

## 🚀 **Quick Start**

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

**✅ Frontend runs on:** `http://localhost:3000`

## 🔗 **Backend Connection**

The frontend connects to the backend API at:
- **Backend URL:** `http://localhost:8080`
- **API Base:** `http://localhost:8080/api/*`

## 📱 **Features**

- **Restaurant Discovery:** Search and filter restaurants
- **Table Booking:** Make reservations with special requests
- **User Management:** Login, registration, favorites
- **Admin Panel:** Manage restaurants and bookings
- **Responsive Design:** Works on desktop and mobile

## 🛠️ **Development**

### **API Configuration**
- **Config:** `src/config/environment.js`
- **API Client:** `src/api/config.js`
- **Endpoints:** `src/api/*Api.js`

### **Components**
- **Pages:** `src/pages/`
- **Components:** `src/components/`
- **Styling:** Bootstrap 5 + Custom CSS

### **Testing API Connection**
The app includes an API test component that:
- Tests backend connection
- Shows detailed error information
- Helps debug connection issues

## 🎯 **Pages**

- **Home** (`/`) - Restaurant search and discovery
- **Restaurant Detail** (`/restaurant/:id`) - Restaurant details and booking
- **My Bookings** (`/my-bookings`) - User's booking history
- **Favorites** (`/favorites`) - Saved restaurants
- **Admin Panel** (`/admin`) - Restaurant management
- **Login/Register** (`/login`, `/register`) - Authentication

## 🔧 **Configuration**

### **Change Backend URL**
Edit `src/config/environment.js`:
```javascript
const config = {
  API_BASE_URL: 'http://your-backend-url:port',
};
```

### **Use Mockoon Instead**
Edit `src/config/environment.js`:
```javascript
const config = {
  API_BASE_URL: 'http://localhost:3001', // Mockoon port
};
```

## 🧪 **Testing**

### **API Connection Test**
1. Open the app in browser
2. Look for "API Connection Test" component
3. Click "Test API Connection"
4. Check results for connection status

### **Manual Testing**
- **Search:** Use search and filter features
- **Booking:** Try making a reservation
- **Navigation:** Test all pages and links

## 📦 **Dependencies**

- **React 18** - Frontend framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **Bootstrap 5** - UI components
- **React Icons** - Icon library

## 🚀 **Build for Production**

```bash
# Create production build
npm run build

# Serve the build folder
# The build folder contains static files ready for deployment
```

## 📞 **Support**

- **Console Logs:** Check browser console for API requests
- **Network Tab:** Monitor HTTP requests in DevTools
- **API Test:** Use the built-in connection test component
