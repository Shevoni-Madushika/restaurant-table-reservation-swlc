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
    <BootstrapNavbar bg="dark" expand="lg" className="shadow-sm" variant="dark">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold">
          🍽️ TableTop.lk
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/restaurants">Restaurants</Nav.Link>
            {isLoggedIn && user?.role !== 'ADMIN' && (
              <>
                <Nav.Link as={Link} to="/my-bookings">My Bookings</Nav.Link>
                <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
              </>
            )}
          </Nav>
          
          <Nav>
            {isLoggedIn ? (
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  <FaUser className="me-2" />
                  {user?.firstName || 'User'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {user?.role !== 'ADMIN' && (
                    <>
                      <Dropdown.Item as={Link} to="/my-bookings">
                        My Bookings
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/favorites">
                        Favorites
                      </Dropdown.Item>
                      <Dropdown.Divider />
                    </>
                  )}
                  {user?.role === 'ADMIN' && (
                    <Dropdown.Item as={Link} to="/admin">
                      <FaCog className="me-2" />
                      Admin Panel
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Button variant="outline-primary" as={Link} to="/login" className="me-2">
                  Login
                </Button>
                <Button variant="primary" as={Link} to="/register">
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
