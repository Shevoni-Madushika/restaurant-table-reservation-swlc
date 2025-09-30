package com.tabletop.controller;

import com.tabletop.dto.FavoriteDTO;
import com.tabletop.entity.Favorite;
import com.tabletop.entity.Restaurant;
import com.tabletop.entity.User;
import com.tabletop.repository.FavoriteRepository;
import com.tabletop.repository.RestaurantRepository;
import com.tabletop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "*")
public class FavoriteController {
    
    @Autowired
    private FavoriteRepository favoriteRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RestaurantRepository restaurantRepository;
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FavoriteDTO>> getFavoritesByUser(@PathVariable Long userId) {
        List<Favorite> favorites = favoriteRepository.findByUserId(userId);
        List<FavoriteDTO> favoriteDTOs = favorites.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(favoriteDTOs);
    }
    
    @GetMapping("/user/{userId}/restaurant/{restaurantId}")
    public ResponseEntity<Boolean> isFavorited(@PathVariable Long userId, @PathVariable Long restaurantId) {
        boolean isFavorited = favoriteRepository.existsByUserIdAndRestaurantId(userId, restaurantId);
        return ResponseEntity.ok(isFavorited);
    }
    
    @PostMapping
    public ResponseEntity<FavoriteDTO> addToFavorites(@RequestBody FavoriteRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        
        // Check if already favorited
        if (favoriteRepository.existsByUserAndRestaurant(user, restaurant)) {
            throw new RuntimeException("Restaurant already in favorites");
        }
        
        Favorite favorite = new Favorite(user, restaurant);
        Favorite savedFavorite = favoriteRepository.save(favorite);
        return ResponseEntity.ok(convertToDTO(savedFavorite));
    }
    
    @DeleteMapping("/user/{userId}/restaurant/{restaurantId}")
    public ResponseEntity<Void> removeFromFavorites(@PathVariable Long userId, @PathVariable Long restaurantId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        
        favoriteRepository.deleteByUserAndRestaurant(user, restaurant);
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFavorite(@PathVariable Long id) {
        favoriteRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
    private FavoriteDTO convertToDTO(Favorite favorite) {
        FavoriteDTO dto = new FavoriteDTO();
        dto.setId(favorite.getId());
        dto.setUserId(favorite.getUser().getId());
        dto.setRestaurantId(favorite.getRestaurant().getId());
        dto.setRestaurantName(favorite.getRestaurant().getName());
        dto.setRestaurantCity(favorite.getRestaurant().getCity());
        dto.setRestaurantCuisine(favorite.getRestaurant().getCuisine());
        dto.setRestaurantImageUrl(favorite.getRestaurant().getImageUrl());
        dto.setCreatedAt(favorite.getCreatedAt());
        return dto;
    }
    
    // Inner class for request body
    public static class FavoriteRequest {
        private Long userId;
        private Long restaurantId;
        
        public Long getUserId() {
            return userId;
        }
        
        public void setUserId(Long userId) {
            this.userId = userId;
        }
        
        public Long getRestaurantId() {
            return restaurantId;
        }
        
        public void setRestaurantId(Long restaurantId) {
            this.restaurantId = restaurantId;
        }
    }
}
