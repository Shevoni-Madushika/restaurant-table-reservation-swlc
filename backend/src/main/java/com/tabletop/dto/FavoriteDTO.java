package com.tabletop.dto;

import java.time.LocalDateTime;

public class FavoriteDTO {
    
    private Long id;
    private Long userId;
    private Long restaurantId;
    private String restaurantName;
    private String restaurantCity;
    private String restaurantCuisine;
    private String restaurantImageUrl;
    private LocalDateTime createdAt;
    
    // Constructors
    public FavoriteDTO() {}
    
    public FavoriteDTO(Long id, Long userId, Long restaurantId, String restaurantName, 
                      String restaurantCity, String restaurantCuisine, String restaurantImageUrl, 
                      LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.restaurantCity = restaurantCity;
        this.restaurantCuisine = restaurantCuisine;
        this.restaurantImageUrl = restaurantImageUrl;
        this.createdAt = createdAt;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
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
    
    public String getRestaurantName() {
        return restaurantName;
    }
    
    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }
    
    public String getRestaurantCity() {
        return restaurantCity;
    }
    
    public void setRestaurantCity(String restaurantCity) {
        this.restaurantCity = restaurantCity;
    }
    
    public String getRestaurantCuisine() {
        return restaurantCuisine;
    }
    
    public void setRestaurantCuisine(String restaurantCuisine) {
        this.restaurantCuisine = restaurantCuisine;
    }
    
    public String getRestaurantImageUrl() {
        return restaurantImageUrl;
    }
    
    public void setRestaurantImageUrl(String restaurantImageUrl) {
        this.restaurantImageUrl = restaurantImageUrl;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
