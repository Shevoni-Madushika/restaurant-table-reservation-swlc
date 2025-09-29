-- MySQL Database Setup for TableTop.lk Restaurant Booking Platform

-- Create database
CREATE DATABASE IF NOT EXISTS tabletop_db;
USE tabletop_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20),
    role ENUM('CUSTOMER', 'ADMIN') DEFAULT 'CUSTOMER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(50) NOT NULL,
    cuisine VARCHAR(50) NOT NULL,
    rating DECIMAL(3,2) NOT NULL CHECK (rating >= 0.0 AND rating <= 5.0),
    price_range INT NOT NULL CHECK (price_range >= 1 AND price_range <= 4),
    phone_number VARCHAR(20),
    website VARCHAR(255),
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    restaurant_id BIGINT NOT NULL,
    booking_date_time TIMESTAMP NOT NULL,
    number_of_people INT NOT NULL CHECK (number_of_people > 0),
    special_requests TEXT,
    status ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    restaurant_id BIGINT NOT NULL,
    rating DECIMAL(3,2) NOT NULL CHECK (rating >= 1.0 AND rating <= 5.0),
    review_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- Create user_favorites table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS user_favorites (
    user_id BIGINT NOT NULL,
    restaurant_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, restaurant_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- Insert sample data
-- Sample users
INSERT INTO users (username, email, password, first_name, last_name, phone_number, role) VALUES
('admin', 'admin@tabletop.lk', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lbVKQN8gYh9pZ1.7W', 'Admin', 'User', '+94 11 123 4567', 'ADMIN'),
('johnsmith', 'john.smith@email.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lbVKQN8gYh9pZ1.7W', 'John', 'Smith', '+94 77 123 4567', 'CUSTOMER'),
('sarahj', 'sarah.johnson@email.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lbVKQN8gYh9pZ1.7W', 'Sarah', 'Johnson', '+94 77 234 5678', 'CUSTOMER'),
('mikechen', 'mike.chen@email.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lbVKQN8gYh9pZ1.7W', 'Mike', 'Chen', '+94 77 345 6789', 'CUSTOMER'),
('emmaw', 'emma.wilson@email.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lbVKQN8gYh9pZ1.7W', 'Emma', 'Wilson', '+94 77 456 7890', 'CUSTOMER'),
('davidb', 'david.brown@email.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lbVKQN8gYh9pZ1.7W', 'David', 'Brown', '+94 77 567 8901', 'CUSTOMER');

-- Sample restaurants
INSERT INTO restaurants (name, description, address, city, cuisine, rating, price_range, phone_number, website, image_url) VALUES
('The Spice Garden', 'Authentic Sri Lankan cuisine with a modern twist. Experience the rich flavors of traditional recipes passed down through generations.', '123 Galle Road, Colombo 03', 'Colombo', 'Sri Lankan', 4.5, 2, '+94 11 234 5678', 'https://spicegarden.lk', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500'),
('Bamboo Garden', 'Contemporary Asian fusion restaurant offering innovative dishes that blend Eastern and Western culinary traditions.', '456 Kandy Road, Kandy', 'Kandy', 'Asian Fusion', 4.3, 3, '+94 81 234 5678', 'https://bamboogarden.lk', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500'),
('Café Francais', 'Elegant French bistro serving classic French dishes with a contemporary presentation. Perfect for romantic dinners.', '789 Marine Drive, Negombo', 'Negombo', 'French', 4.7, 4, '+94 31 234 5678', 'https://cafefrancais.lk', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500'),
('Sakura Sushi Bar', 'Fresh sushi and sashimi prepared by master chefs. Experience authentic Japanese cuisine in a modern setting.', '321 Independence Avenue, Colombo 07', 'Colombo', 'Japanese', 4.6, 3, '+94 11 345 6789', 'https://sakurasushi.lk', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500'),
('Dolce Vita', 'Authentic Italian trattoria serving handmade pasta and wood-fired pizzas. A taste of Italy in the heart of Sri Lanka.', '258 Park Street, Colombo 05', 'Colombo', 'Italian', 4.8, 3, '+94 11 567 8901', 'https://dolcevita.lk', 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500'),
('Tandoor Palace', 'Authentic North Indian cuisine with traditional tandoor cooking. Spice up your evening with our signature curries.', '654 Temple Street, Anuradhapura', 'Anuradhapura', 'Indian', 4.2, 2, '+94 25 234 5678', 'https://tandoorpalace.lk', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500'),
('Mediterranean Breeze', 'Fresh Mediterranean flavors with locally sourced ingredients. Healthy and delicious options for every palate.', '987 Beach Road, Galle', 'Galle', 'Mediterranean', 4.4, 3, '+94 91 234 5678', 'https://medbreeze.lk', 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500'),
('Burger Junction', 'Gourmet burgers made with premium ingredients. From classic beef to innovative vegetarian options.', '147 Union Place, Colombo 02', 'Colombo', 'American', 4.1, 2, '+94 11 456 7890', 'https://burgerjunction.lk', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500'),
('Golden Dragon', 'Traditional Chinese cuisine with modern presentation. Dim sum, noodles, and authentic Chinese dishes.', '369 Main Street, Kandy', 'Kandy', 'Chinese', 4.3, 2, '+94 81 345 6789', 'https://goldendragon.lk', 'https://images.unsplash.com/photo-1563379091339-03246963d4d4?w=500'),
('Seafood Paradise', 'Fresh catch of the day prepared with local spices and traditional Sri Lankan cooking methods.', '741 Harbor Road, Negombo', 'Negombo', 'Seafood', 4.6, 3, '+94 31 345 6789', 'https://seafoodparadise.lk', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500'),
('The Coffee House', 'Artisanal coffee and light meals in a cozy atmosphere. Perfect for breakfast, brunch, or afternoon coffee.', '852 High Street, Colombo 06', 'Colombo', 'Café', 4.0, 1, '+94 11 678 9012', 'https://coffeehouse.lk', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500'),
('Spice Route', 'Contemporary South Asian cuisine with bold flavors and innovative presentation. A journey through the spice routes.', '963 Fort Road, Galle', 'Galle', 'South Asian', 4.5, 3, '+94 91 456 7890', 'https://spiceroute.lk', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500');

-- Sample bookings
INSERT INTO bookings (user_id, restaurant_id, booking_date_time, number_of_people, special_requests, status) VALUES
(2, 1, '2024-01-15 19:00:00', 4, 'Table near the window, vegetarian options needed', 'CONFIRMED'),
(3, 3, '2024-01-16 20:30:00', 2, 'Anniversary dinner, romantic table', 'CONFIRMED'),
(4, 4, '2024-01-17 18:00:00', 6, 'Business dinner, private area preferred', 'PENDING'),
(2, 5, '2024-01-18 19:30:00', 3, 'Birthday celebration', 'CONFIRMED'),
(5, 2, '2024-01-19 17:30:00', 2, 'First date, quiet table', 'CONFIRMED'),
(6, 10, '2024-01-20 20:00:00', 5, 'Family dinner, kids menu needed', 'PENDING'),
(3, 6, '2024-01-21 18:30:00', 4, 'Healthy options, gluten-free available', 'CONFIRMED'),
(4, 5, '2024-01-22 19:00:00', 3, 'Spicy food preferred', 'CANCELLED'),
(5, 7, '2024-01-23 17:00:00', 2, 'Vegetarian burger options', 'CONFIRMED'),
(6, 9, '2024-01-24 20:30:00', 4, 'Dim sum selection', 'PENDING');

-- Sample reviews
INSERT INTO reviews (user_id, restaurant_id, rating, review_text) VALUES
(2, 1, 4.5, 'Excellent Sri Lankan cuisine! The curry was perfectly spiced and the service was outstanding. Will definitely come back.'),
(3, 3, 4.8, 'Absolutely romantic atmosphere and the French dishes were authentic. Perfect for special occasions!'),
(4, 4, 4.6, 'Fresh sushi and professional service. The chef''s selection was amazing. Highly recommended for sushi lovers.'),
(5, 5, 4.9, 'Best Italian food in Colombo! The pasta was handmade and the pizza crust was perfect. Authentic Italian experience.'),
(6, 2, 4.3, 'Great Asian fusion dishes with creative presentation. The ambiance is modern and comfortable.'),
(2, 6, 4.4, 'Fresh Mediterranean flavors and healthy options. The grilled fish was perfectly cooked.'),
(3, 7, 4.1, 'Good burgers with quality ingredients. The vegetarian options were surprisingly tasty.'),
(4, 5, 4.2, 'Authentic Indian flavors with proper spice levels. The tandoor items were excellent.'),
(5, 10, 4.6, 'Fresh seafood with local spices. The crab curry was outstanding!'),
(6, 9, 4.3, 'Good Chinese food with traditional flavors. The dim sum was fresh and tasty.'),
(2, 11, 4.0, 'Great coffee and light meals. Perfect for breakfast or afternoon coffee break.'),
(3, 12, 4.5, 'Innovative South Asian cuisine with beautiful presentation. The spice combinations were unique.');

-- Create indexes for better performance
CREATE INDEX idx_restaurants_city ON restaurants(city);
CREATE INDEX idx_restaurants_cuisine ON restaurants(cuisine);
CREATE INDEX idx_restaurants_rating ON restaurants(rating);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_restaurant_id ON bookings(restaurant_id);
CREATE INDEX idx_bookings_date_time ON bookings(booking_date_time);
CREATE INDEX idx_reviews_restaurant_id ON reviews(restaurant_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);

-- Show table information
SHOW TABLES;
SELECT 'Database setup completed successfully!' as status;
