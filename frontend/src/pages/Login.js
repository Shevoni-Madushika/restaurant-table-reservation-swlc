import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaUser, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In a real app, this would make an API call to authenticate
      // For demo purposes, we'll simulate a login
      if (formData.username === 'admin' && formData.password === 'admin123') {
        const user = {
          id: 1,
          username: 'admin',
          firstName: 'Admin',
          lastName: 'User',
          role: 'ADMIN'
        };
        const token = 'mock-jwt-token-admin';
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        toast.success('Login successful!');
        
        // Dispatch custom event to notify navbar of login
        window.dispatchEvent(new CustomEvent('userLoggedIn', { detail: { user, token } }));
        
        navigate('/admin');
      } else if (formData.username === 'user' && formData.password === 'user123') {
        const user = {
          id: 2,
          username: 'user',
          firstName: 'John',
          lastName: 'Doe',
          role: 'CUSTOMER'
        };
        const token = 'mock-jwt-token-user';
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        toast.success('Login successful!');
        
        // Dispatch custom event to notify navbar of login
        window.dispatchEvent(new CustomEvent('userLoggedIn', { detail: { user, token } }));
        
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Header className="text-center bg-primary text-white">
              <h3 className="mb-0">
                <FaSignInAlt className="me-2" />
                Login
              </h3>
            </Card.Header>
            <Card.Body className="p-4">
              {error && (
                <Alert variant="danger">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaUser className="me-2" />
                    Username
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your username"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaLock className="me-2" />
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your password"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Form>

              <hr />

              <div className="text-center">
                <p className="mb-0">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-decoration-none">
                    Sign up here
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
