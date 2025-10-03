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
        // Create sample users only if they don't exist
        if (userRepository.findByEmail("admin@tabletop.lk").isEmpty()) {
            User admin = new User("admin", "admin@tabletop.lk", "admin123", "Admin", "User");
            admin.setRole(User.Role.ADMIN);
            admin.setPhoneNumber("+94 11 123 4567");
            userRepository.save(admin);
        }
        
        if (userRepository.findByEmail("john.smith@email.com").isEmpty()) {
            User user1 = new User("johnsmith", "john.smith@email.com", "password123", "John", "Smith");
            user1.setPhoneNumber("+94 77 123 4567");
            userRepository.save(user1);
        }
        
        if (userRepository.findByEmail("sarah.johnson@email.com").isEmpty()) {
            User user2 = new User("sarahj", "sarah.johnson@email.com", "password123", "Sarah", "Johnson");
            user2.setPhoneNumber("+94 77 234 5678");
            userRepository.save(user2);
        }
        
        if (userRepository.findByEmail("mike.chen@email.com").isEmpty()) {
            User user3 = new User("mikechen", "mike.chen@email.com", "password123", "Mike", "Chen");
            user3.setPhoneNumber("+94 77 345 6789");
            userRepository.save(user3);
        }
        
        // Create sample restaurants only if they don't exist
        if (restaurantRepository.findByName("Colombo Spice House").isEmpty()) {
            Restaurant restaurant1 = new Restaurant(
                "Colombo Spice House",
                "Authentic Sri Lankan cuisine with a modern twist. Experience the rich flavors of traditional recipes passed down through generations.",
                "123 Galle Road, Colombo 03",
                "Colombo",
                "Sri Lankan",
                new BigDecimal("4.5"),
                2
            );
            restaurant1.setPhoneNumber("+94 11 234 5678");
            restaurant1.setWebsite("https://colombospice.lk");
            restaurant1.setImageUrl("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500");
            restaurant1.setBookingApiUrl("http://localhost:4000/api/v1/colombo-spice/booking");
            restaurant1.setSecretKey("colombo_spice_secret_2024");
            restaurantRepository.save(restaurant1);
        }
        
        if (restaurantRepository.findByName("Kandy Royal Palace").isEmpty()) {
            Restaurant restaurant2 = new Restaurant(
                "Kandy Royal Palace",
                "Contemporary Asian fusion restaurant offering innovative dishes that blend Eastern and Western culinary traditions.",
                "456 Kandy Road, Kandy",
                "Kandy",
                "Asian Fusion",
                new BigDecimal("4.3"),
                3
            );
            restaurant2.setPhoneNumber("+94 81 234 5678");
            restaurant2.setWebsite("https://kandyroyal.lk");
            restaurant2.setImageUrl("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500");
            restaurant2.setBookingApiUrl("http://localhost:4001/kandy/api/v1/royal/booking");
            restaurant2.setSecretKey("kandy_royal_secret_2024");
            restaurantRepository.save(restaurant2);
        }
        
        if (restaurantRepository.findByName("Galle Fort Bistro").isEmpty()) {
            Restaurant restaurant3 = new Restaurant(
                "Galle Fort Bistro",
                "Elegant French bistro serving classic French dishes with a contemporary presentation. Perfect for romantic dinners.",
                "789 Church Street, Galle Fort",
                "Galle",
                "French",
                new BigDecimal("4.7"),
                4
            );
            restaurant3.setPhoneNumber("+94 91 234 5678");
            restaurant3.setWebsite("https://gallefortbistro.lk");
            restaurant3.setImageUrl("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500");
            restaurant3.setBookingApiUrl("http://localhost:4002/galle/api/v2/fort/reservations");
            restaurant3.setSecretKey("galle_fort_secret_2024");
            restaurantRepository.save(restaurant3);
        }
        
        if (restaurantRepository.findByName("Negombo Beach Resort").isEmpty()) {
            Restaurant restaurant4 = new Restaurant(
                "Negombo Beach Resort",
                "Fresh seafood and international cuisine with stunning ocean views. Experience dining by the beach with live music.",
                "321 Beach Road, Negombo",
                "Negombo",
                "Seafood",
                new BigDecimal("4.6"),
                3
            );
            restaurant4.setPhoneNumber("+94 31 345 6789");
            restaurant4.setWebsite("https://negombobeach.lk");
            restaurant4.setImageUrl("https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500");
            restaurant4.setBookingApiUrl("http://localhost:4003/negombo/api/v1/beach/table-booking");
            restaurant4.setSecretKey("negombo_beach_secret_2024");
            restaurantRepository.save(restaurant4);
        }
        
        if (restaurantRepository.findByName("Anuradhapura Heritage").isEmpty()) {
            Restaurant restaurant5 = new Restaurant(
                "Anuradhapura Heritage",
                "Traditional Sri Lankan cuisine showcasing ancient recipes and cooking methods. A culinary journey through history.",
                "258 Sacred City Road, Anuradhapura",
                "Anuradhapura",
                "Traditional Sri Lankan",
                new BigDecimal("4.8"),
                2
            );
            restaurant5.setPhoneNumber("+94 25 567 8901");
            restaurant5.setWebsite("https://anuradhapuraheritage.lk");
            restaurant5.setImageUrl("https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500");
            restaurant5.setBookingApiUrl("http://localhost:4004/anuradhapura/api/v3/heritage/reserve");
            restaurant5.setSecretKey("anuradhapura_heritage_secret_2024");
            restaurantRepository.save(restaurant5);
        }
        
        // Skip creating bookings and reviews to avoid complexity
        // These can be created through the application interface
        
        System.out.println("Sample data initialized successfully!");
    }
}
