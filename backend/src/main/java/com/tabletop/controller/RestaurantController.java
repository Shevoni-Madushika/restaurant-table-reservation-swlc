package com.tabletop.controller;

import com.tabletop.dto.RestaurantDTO;
import com.tabletop.entity.Restaurant;
import com.tabletop.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = "*")
public class RestaurantController {
    
    @Autowired
    private RestaurantService restaurantService;
    
    @GetMapping
    public ResponseEntity<List<RestaurantDTO>> getAllRestaurants(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String cuisine,
            @RequestParam(required = false) BigDecimal minRating) {
        
        // If any filter parameters are provided, use search functionality
        if (city != null || cuisine != null || minRating != null) {
            List<RestaurantDTO> restaurants = restaurantService.searchRestaurants(city, cuisine, minRating);
            return ResponseEntity.ok(restaurants);
        }
        
        // Otherwise, return all restaurants
        List<RestaurantDTO> restaurants = restaurantService.getAllRestaurants();
        return ResponseEntity.ok(restaurants);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<RestaurantDTO> getRestaurantById(@PathVariable Long id) {
        RestaurantDTO restaurant = restaurantService.getRestaurantById(id);
        return ResponseEntity.ok(restaurant);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<RestaurantDTO>> searchRestaurants(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String cuisine,
            @RequestParam(required = false) BigDecimal minRating) {
        
        List<RestaurantDTO> restaurants = restaurantService.searchRestaurants(
                city, cuisine, minRating);
        return ResponseEntity.ok(restaurants);
    }
    
    @GetMapping("/search/text")
    public ResponseEntity<List<RestaurantDTO>> searchByText(@RequestParam String q) {
        List<RestaurantDTO> restaurants = restaurantService.searchByText(q);
        return ResponseEntity.ok(restaurants);
    }
    
    @GetMapping("/top-rated")
    public ResponseEntity<List<RestaurantDTO>> getTopRatedRestaurants() {
        List<RestaurantDTO> restaurants = restaurantService.getTopRatedRestaurants();
        return ResponseEntity.ok(restaurants);
    }
    
    @GetMapping("/most-booked")
    public ResponseEntity<List<RestaurantDTO>> getMostBookedRestaurants() {
        List<RestaurantDTO> restaurants = restaurantService.getMostBookedRestaurants();
        return ResponseEntity.ok(restaurants);
    }
    
    // Public API endpoint for external consumers
    @GetMapping("/public")
    public ResponseEntity<List<RestaurantDTO>> getPublicRestaurants(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String cuisine,
            @RequestParam(required = false) BigDecimal minRating,
            @RequestParam(required = false) Boolean isActive) {
        
        List<RestaurantDTO> restaurants = restaurantService.getPublicRestaurants(city, cuisine, minRating, isActive);
        return ResponseEntity.ok(restaurants);
    }
    
    @PostMapping
    public ResponseEntity<RestaurantDTO> createRestaurant(@RequestBody Restaurant restaurant) {
        RestaurantDTO createdRestaurant = restaurantService.createRestaurant(restaurant);
        return ResponseEntity.ok(createdRestaurant);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<RestaurantDTO> updateRestaurant(@PathVariable Long id, 
                                                        @RequestBody Restaurant restaurant) {
        RestaurantDTO updatedRestaurant = restaurantService.updateRestaurant(id, restaurant);
        return ResponseEntity.ok(updatedRestaurant);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Long id) {
        restaurantService.deleteRestaurant(id);
        return ResponseEntity.ok().build();
    }
}
