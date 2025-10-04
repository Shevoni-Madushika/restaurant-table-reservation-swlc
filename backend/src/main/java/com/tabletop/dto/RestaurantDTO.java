package com.tabletop.dto;

import java.math.BigDecimal;
import java.util.List;

public class RestaurantDTO {
    private Long id;
    private String name;
    private String description;
    private String address;
    private String city;
    private String cuisine;
    private BigDecimal rating;
    private String phoneNumber;
    private String website;
    private String imageUrl;
    private String bookingApiUrl;
    private String secretKey;
    private Boolean isActive;
    private Long totalBookings;
    private Long totalReviews;
    private List<ReviewDTO> recentReviews;
    
    // Constructors
    public RestaurantDTO() {}
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    
    public String getCuisine() { return cuisine; }
    public void setCuisine(String cuisine) { this.cuisine = cuisine; }
    
    public BigDecimal getRating() { return rating; }
    public void setRating(BigDecimal rating) { this.rating = rating; }
    
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    
    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public String getBookingApiUrl() { return bookingApiUrl; }
    public void setBookingApiUrl(String bookingApiUrl) { this.bookingApiUrl = bookingApiUrl; }
    
    public String getSecretKey() { return secretKey; }
    public void setSecretKey(String secretKey) { this.secretKey = secretKey; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    
    public Long getTotalBookings() { return totalBookings; }
    public void setTotalBookings(Long totalBookings) { this.totalBookings = totalBookings; }
    
    public Long getTotalReviews() { return totalReviews; }
    public void setTotalReviews(Long totalReviews) { this.totalReviews = totalReviews; }
    
    public List<ReviewDTO> getRecentReviews() { return recentReviews; }
    public void setRecentReviews(List<ReviewDTO> recentReviews) { this.recentReviews = recentReviews; }
}
