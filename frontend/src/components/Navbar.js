import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
    
    // Listen for login events
    const handleUserLogin = (event) => {
      const { user, token } = event.detail;
      setIsLoggedIn(true);
      setUser(user);
    };
    
    // Listen for logout events
    const handleUserLogout = () => {
      setIsLoggedIn(false);
      setUser(null);
    };

    // Listen for storage changes (backup method)
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('userLoggedIn', handleUserLogin);
    window.addEventListener('userLoggedOut', handleUserLogout);
    window.addEventListener('storage', handleStorageChange);

    // Poll localStorage every 1 second as a fallback
    const interval = setInterval(checkAuthStatus, 1000);

    return () => {
      window.removeEventListener('userLoggedIn', handleUserLogin);
      window.removeEventListener('userLoggedOut', handleUserLogout);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const checkAuthStatus = () => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      const parsedUser = JSON.parse(userData);
      setIsLoggedIn(true);
      setUser(parsedUser);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('userLoggedOut'));
    
    navigate('/');
  };


  return (
    <BootstrapNavbar bg="dark" expand="lg" className="navbar-custom shadow-lg" variant="dark">
      <Container>
        <BootstrapNavbar.Brand 
          as={Link} 
          to={isLoggedIn && user?.role === 'ADMIN' ? "/admin" : "/"} 
          className="navbar-brand-custom fw-bold"
        >
          <span className="brand-icon">🍽️</span>
          <span className="brand-text">TableTop.lk</span>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle-custom" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navbar-nav-custom">
            {(!isLoggedIn || user?.role !== 'ADMIN') && (
              <Nav.Link as={Link} to="/" className="nav-link-custom">
                <span className="nav-icon">🏠</span>
                <span className="nav-text">Home</span>
              </Nav.Link>
            )}
            {isLoggedIn && user?.role !== 'ADMIN' && (
              <>
                <Nav.Link as={Link} to="/my-bookings" className="nav-link-custom">
                  <span className="nav-icon">📅</span>
                  <span className="nav-text">My Bookings</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/favorites" className="nav-link-custom">
                  <span className="nav-icon">❤️</span>
                  <span className="nav-text">Favorites</span>
                </Nav.Link>
              </>
            )}
          </Nav>
          
          <Nav className="navbar-actions">
            {isLoggedIn ? (
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" className="user-dropdown-custom">
                  <FaUser className="me-2" />
                  <span className="user-name">{user?.firstName || 'User'}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-custom">
                  {user?.role !== 'ADMIN' && (
                    <>
                      <Dropdown.Item as={Link} to="/my-bookings" className="dropdown-item-custom">
                        <span className="dropdown-icon">📅</span>
                        My Bookings
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/favorites" className="dropdown-item-custom">
                        <span className="dropdown-icon">❤️</span>
                        Favorites
                      </Dropdown.Item>
                      <Dropdown.Divider className="dropdown-divider-custom" />
                    </>
                  )}
                  {user?.role === 'ADMIN' && (
                    <Dropdown.Item as={Link} to="/admin" className="dropdown-item-custom">
                      <FaCog className="me-2" />
                      Admin Panel
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider className="dropdown-divider-custom" />
                  <Dropdown.Item onClick={handleLogout} className="dropdown-item-custom logout-item">
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="auth-buttons">
                <Button variant="outline-primary" as={Link} to="/login" className="auth-btn-custom me-2">
                  <span className="btn-icon">🔑</span>
                  <span className="btn-text">Login</span>
                </Button>
                <Button variant="primary" as={Link} to="/register" className="auth-btn-custom">
                  <span className="btn-icon">✨</span>
                  <span className="btn-text">Sign Up</span>
                </Button>
              </div>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
