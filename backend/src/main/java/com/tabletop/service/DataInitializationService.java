package com.tabletop.service;

import com.tabletop.entity.Restaurant;
import com.tabletop.entity.User;
import com.tabletop.entity.Booking;
import com.tabletop.entity.Review;
import com.tabletop.repository.RestaurantRepository;
import com.tabletop.repository.UserRepository;
import com.tabletop.repository.BookingRepository;
import com.tabletop.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class DataInitializationService implements CommandLineRunner {
    
    @Autowired
    private RestaurantRepository restaurantRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private ReviewRepository reviewRepository;
    
    @Override
    public void run(String... args) throws Exception {
        initializeData();
    }
    
    private void initializeData() {
        // Create sample users
        User admin = new User("admin", "admin@tabletop.lk", "admin123", "Admin", "User");
        admin.setRole(User.Role.ADMIN);
        admin.setPhoneNumber("+94 11 123 4567");
        userRepository.save(admin);
        
        User user1 = new User("johnsmith", "john.smith@email.com", "password123", "John", "Smith");
        user1.setPhoneNumber("+94 77 123 4567");
        userRepository.save(user1);
        
        User user2 = new User("sarahj", "sarah.johnson@email.com", "password123", "Sarah", "Johnson");
        user2.setPhoneNumber("+94 77 234 5678");
        userRepository.save(user2);
        
        User user3 = new User("mikechen", "mike.chen@email.com", "password123", "Mike", "Chen");
        user3.setPhoneNumber("+94 77 345 6789");
        userRepository.save(user3);
        
        // Create sample restaurants
        Restaurant restaurant1 = new Restaurant(
            "The Spice Garden",
            "Authentic Sri Lankan cuisine with a modern twist. Experience the rich flavors of traditional recipes passed down through generations.",
            "123 Galle Road, Colombo 03",
            "Colombo",
            "Sri Lankan",
            new BigDecimal("4.5"),
            2
        );
        restaurant1.setPhoneNumber("+94 11 234 5678");
        restaurant1.setWebsite("https://spicegarden.lk");
        restaurant1.setImageUrl("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500");
        restaurantRepository.save(restaurant1);
        
        Restaurant restaurant2 = new Restaurant(
            "Bamboo Garden",
            "Contemporary Asian fusion restaurant offering innovative dishes that blend Eastern and Western culinary traditions.",
            "456 Kandy Road, Kandy",
            "Kandy",
            "Asian Fusion",
            new BigDecimal("4.3"),
            3
        );
        restaurant2.setPhoneNumber("+94 81 234 5678");
        restaurant2.setWebsite("https://bamboogarden.lk");
        restaurant2.setImageUrl("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500");
        restaurantRepository.save(restaurant2);
        
        Restaurant restaurant3 = new Restaurant(
            "Café Francais",
            "Elegant French bistro serving classic French dishes with a contemporary presentation. Perfect for romantic dinners.",
            "789 Marine Drive, Negombo",
            "Negombo",
            "French",
            new BigDecimal("4.7"),
            4
        );
        restaurant3.setPhoneNumber("+94 31 234 5678");
        restaurant3.setWebsite("https://cafefrancais.lk");
        restaurant3.setImageUrl("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500");
        restaurantRepository.save(restaurant3);
        
        Restaurant restaurant4 = new Restaurant(
            "Sakura Sushi Bar",
            "Fresh sushi and sashimi prepared by master chefs. Experience authentic Japanese cuisine in a modern setting.",
            "321 Independence Avenue, Colombo 07",
            "Colombo",
            "Japanese",
            new BigDecimal("4.6"),
            3
        );
        restaurant4.setPhoneNumber("+94 11 345 6789");
        restaurant4.setWebsite("https://sakurasushi.lk");
        restaurant4.setImageUrl("https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500");
        restaurantRepository.save(restaurant4);
        
        Restaurant restaurant5 = new Restaurant(
            "Dolce Vita",
            "Authentic Italian trattoria serving handmade pasta and wood-fired pizzas. A taste of Italy in the heart of Sri Lanka.",
            "258 Park Street, Colombo 05",
            "Colombo",
            "Italian",
            new BigDecimal("4.8"),
            3
        );
        restaurant5.setPhoneNumber("+94 11 567 8901");
        restaurant5.setWebsite("https://dolcevita.lk");
        restaurant5.setImageUrl("https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500");
        restaurantRepository.save(restaurant5);
        
        // Create sample bookings
        Booking booking1 = new Booking(
            user1,
            restaurant1,
            LocalDateTime.now().plusDays(1).withHour(19).withMinute(0),
            4,
            "Table near the window, vegetarian options needed"
        );
        booking1.setStatus(Booking.BookingStatus.CONFIRMED);
        bookingRepository.save(booking1);
        
        Booking booking2 = new Booking(
            user2,
            restaurant3,
            LocalDateTime.now().plusDays(2).withHour(20).withMinute(30),
            2,
            "Anniversary dinner, romantic table"
        );
        booking2.setStatus(Booking.BookingStatus.CONFIRMED);
        bookingRepository.save(booking2);
        
        Booking booking3 = new Booking(
            user3,
            restaurant4,
            LocalDateTime.now().plusDays(3).withHour(18).withMinute(0),
            6,
            "Business dinner, private area preferred"
        );
        booking3.setStatus(Booking.BookingStatus.PENDING);
        bookingRepository.save(booking3);
        
        // Create sample reviews
        Review review1 = new Review(
            user1,
            restaurant1,
            new BigDecimal("4.5"),
            "Excellent Sri Lankan cuisine! The curry was perfectly spiced and the service was outstanding. Will definitely come back."
        );
        reviewRepository.save(review1);
        
        Review review2 = new Review(
            user2,
            restaurant3,
            new BigDecimal("4.8"),
            "Absolutely romantic atmosphere and the French dishes were authentic. Perfect for special occasions!"
        );
        reviewRepository.save(review2);
        
        Review review3 = new Review(
            user3,
            restaurant4,
            new BigDecimal("4.6"),
            "Fresh sushi and professional service. The chef's selection was amazing. Highly recommended for sushi lovers."
        );
        reviewRepository.save(review3);
        
        Review review4 = new Review(
            user1,
            restaurant5,
            new BigDecimal("4.9"),
            "Best Italian food in Colombo! The pasta was handmade and the pizza crust was perfect. Authentic Italian experience."
        );
        reviewRepository.save(review4);
        
        System.out.println("Sample data initialized successfully!");
    }
}
