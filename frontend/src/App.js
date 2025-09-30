import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import RestaurantDetail from './pages/RestaurantDetail';
import MyBookings from './pages/MyBookings';
import Favorites from './pages/Favorites';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '10px',
              border: '1px solid #ff6b35',
            },
            success: {
              style: {
                background: '#1a4a1a',
                color: '#4caf50',
                border: '1px solid #4caf50',
              },
            },
            error: {
              style: {
                background: '#4a1a1a',
                color: '#ff6b35',
                border: '1px solid #ff6b35',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
