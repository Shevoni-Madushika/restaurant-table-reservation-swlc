package com.tabletop.service;

import com.tabletop.dto.RestaurantDTO;
import com.tabletop.entity.Restaurant;
import com.tabletop.repository.RestaurantRepository;
import com.tabletop.repository.ReviewRepository;
import com.tabletop.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RestaurantService {
    
    @Autowired
    private RestaurantRepository restaurantRepository;
    
    @Autowired
    private ReviewRepository reviewRepository;
    
    @Autowired
    private BookingRepository bookingRepository;
    
    public List<RestaurantDTO> getAllRestaurants() {
        return restaurantRepository.findByIsActiveTrue()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public RestaurantDTO getRestaurantById(Long id) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        return convertToDTO(restaurant);
    }
    
    public List<RestaurantDTO> searchRestaurants(String city, String cuisine, 
                                                BigDecimal minRating) {
        return restaurantRepository.findRestaurantsWithFilters(city, cuisine, minRating)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<RestaurantDTO> searchByText(String searchTerm) {
        return restaurantRepository.findBySearchTerm(searchTerm)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<RestaurantDTO> getTopRatedRestaurants() {
        return restaurantRepository.findTopRatedRestaurants()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<RestaurantDTO> getMostBookedRestaurants() {
        return restaurantRepository.findMostBookedRestaurants()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<RestaurantDTO> getPublicRestaurants(String city, String cuisine, 
                                                   BigDecimal minRating, Boolean isActive) {
        // If no filters provided, return all active restaurants
        if (city == null && cuisine == null && minRating == null && isActive == null) {
            return restaurantRepository.findByIsActiveTrue()
                    .stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        }
        
        // Use existing search functionality with additional active filter
        List<Restaurant> restaurants = restaurantRepository.findRestaurantsWithFilters(city, cuisine, minRating);
        
        // Filter by active status if specified
        if (isActive != null) {
            restaurants = restaurants.stream()
                    .filter(r -> r.getIsActive().equals(isActive))
                    .collect(Collectors.toList());
        }
        
        return restaurants.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public RestaurantDTO createRestaurant(Restaurant restaurant) {
        Restaurant savedRestaurant = restaurantRepository.save(restaurant);
        return convertToDTO(savedRestaurant);
    }
    
    public RestaurantDTO updateRestaurant(Long id, Restaurant restaurantDetails) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        
        restaurant.setName(restaurantDetails.getName());
        restaurant.setDescription(restaurantDetails.getDescription());
        restaurant.setAddress(restaurantDetails.getAddress());
        restaurant.setCity(restaurantDetails.getCity());
        restaurant.setCuisine(restaurantDetails.getCuisine());
        restaurant.setRating(restaurantDetails.getRating());
        restaurant.setPriceRange(restaurantDetails.getPriceRange());
        restaurant.setPhoneNumber(restaurantDetails.getPhoneNumber());
        restaurant.setWebsite(restaurantDetails.getWebsite());
        restaurant.setImageUrl(restaurantDetails.getImageUrl());
        
        Restaurant updatedRestaurant = restaurantRepository.save(restaurant);
        return convertToDTO(updatedRestaurant);
    }
    
    public void deleteRestaurant(Long id) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        restaurant.setIsActive(false);
        restaurantRepository.save(restaurant);
    }
    
    private RestaurantDTO convertToDTO(Restaurant restaurant) {
        RestaurantDTO dto = new RestaurantDTO();
        dto.setId(restaurant.getId());
        dto.setName(restaurant.getName());
        dto.setDescription(restaurant.getDescription());
        dto.setAddress(restaurant.getAddress());
        dto.setCity(restaurant.getCity());
        dto.setCuisine(restaurant.getCuisine());
        dto.setRating(restaurant.getRating());
        dto.setPriceRange(restaurant.getPriceRange());
        dto.setPhoneNumber(restaurant.getPhoneNumber());
        dto.setWebsite(restaurant.getWebsite());
        dto.setImageUrl(restaurant.getImageUrl());
        dto.setIsActive(restaurant.getIsActive());
        
        // Set additional statistics
        dto.setTotalBookings(bookingRepository.countConfirmedBookingsByRestaurant(restaurant));
        dto.setTotalReviews(reviewRepository.countReviewsByRestaurant(restaurant));
        
        return dto;
    }
}
