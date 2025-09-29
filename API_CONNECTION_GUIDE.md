# 🔧 API Connection Troubleshooting Guide

## 🚨 **Current Issue**
Your frontend is not making requests to the backend - axios calls are staying on the same host instead of calling the backend API.

## ✅ **What I've Fixed**

### 1. **Created Proper API Configuration**
- `frontend/src/api/config.js` - Centralized axios configuration
- `frontend/src/api/restaurantApi.js` - Restaurant API functions
- `frontend/src/api/bookingApi.js` - Booking API functions
- `frontend/src/api/authApi.js` - Authentication API functions
- `frontend/src/config/environment.js` - Environment configuration

### 2. **Updated Home.js Component**
- Replaced direct axios calls with proper API functions
- Added API test component for debugging

### 3. **Added API Test Component**
- Visual test to verify API connection
- Shows detailed error information
- Helps debug connection issues

## 🚀 **Testing Steps**

### **Step 1: Start Your Backend**
```bash
cd backend
mvn spring-boot:run
```
**Verify:** Backend should be running on `http://localhost:8080`

### **Step 2: Start Your Frontend**
```bash
cd frontend
npm start
```
**Verify:** Frontend should be running on `http://localhost:3000`

### **Step 3: Test API Connection**
1. Open your frontend in browser: `http://localhost:3000`
2. You'll see an "API Connection Test" component at the top
3. Click "Test API Connection" button
4. Check the results:

**✅ Success:** You'll see green success message with restaurant count
**❌ Error:** You'll see red error message with details

## 🔍 **Common Issues & Solutions**

### **Issue 1: CORS Error**
**Error:** `Access to XMLHttpRequest at 'http://localhost:8080' from origin 'http://localhost:3000' has been blocked by CORS policy`

**Solution:** Your backend needs CORS configuration. I've already added this in the backend.

### **Issue 2: Connection Refused**
**Error:** `Network Error` or `ECONNREFUSED`

**Solution:** 
1. Make sure backend is running on port 8080
2. Check if port 8080 is not blocked by firewall
3. Verify backend started without errors

### **Issue 3: Wrong API URL**
**Error:** API calls going to wrong URL

**Solution:** 
1. Check `frontend/src/config/environment.js`
2. Current setting: `http://localhost:8080`
3. Change if your backend runs on different port

## 🛠️ **Debug Information**

### **Check Browser Network Tab**
1. Open browser Developer Tools (F12)
2. Go to Network tab
3. Click "Test API Connection" button
4. Look for requests to `localhost:8080`
5. Check request status and response

### **Check Console Logs**
The API configuration includes detailed logging:
- 🚀 Shows outgoing requests
- ✅ Shows successful responses  
- ❌ Shows error details

### **Backend Logs**
Check your backend console for:
- Incoming requests
- CORS configuration
- Database connection status

## 🔄 **Alternative: Use Mockoon**

If backend connection still doesn't work, use Mockoon:

### **Step 1: Setup Mockoon**
1. Open Mockoon
2. Import the endpoints from `mockoon-setup-guide.md`
3. Start Mockoon on port 3001

### **Step 2: Update Frontend Config**
Edit `frontend/src/config/environment.js`:
```javascript
const config = {
  // Change this line:
  API_BASE_URL: 'http://localhost:3001', // Mockoon port
};
```

### **Step 3: Restart Frontend**
```bash
cd frontend
npm start
```

## 📋 **Expected Behavior**

### **With Backend Running:**
- API Test shows ✅ success
- Restaurant list loads automatically
- Search and filters work
- Console shows API requests to port 8080

### **With Mockoon Running:**
- API Test shows ✅ success  
- Restaurant list loads with mock data
- All features work with mock responses
- Console shows API requests to port 3001

## 🎯 **Next Steps**

1. **Test the connection** using the API test component
2. **Check browser console** for detailed logs
3. **Verify backend is running** on port 8080
4. **Use Mockoon** if backend connection fails

The API test component will show you exactly what's happening with the connection!
