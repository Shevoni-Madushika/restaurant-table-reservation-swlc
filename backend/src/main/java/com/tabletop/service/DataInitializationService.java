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
        if (restaurantRepository.findByName("The Spice Garden").isEmpty()) {
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
        }
        
        if (restaurantRepository.findByName("Bamboo Garden").isEmpty()) {
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
        }
        
        if (restaurantRepository.findByName("Café Francais").isEmpty()) {
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
        }
        
        if (restaurantRepository.findByName("Sakura Sushi Bar").isEmpty()) {
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
        }
        
        if (restaurantRepository.findByName("Dolce Vita").isEmpty()) {
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
        }
        
        // Skip creating bookings and reviews to avoid complexity
        // These can be created through the application interface
        
        System.out.println("Sample data initialized successfully!");
    }
}
