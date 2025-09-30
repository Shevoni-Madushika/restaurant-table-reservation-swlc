package com.tabletop.repository;

import com.tabletop.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    
    List<Restaurant> findByCityIgnoreCase(String city);
    
    List<Restaurant> findByCuisineIgnoreCase(String cuisine);
    
    List<Restaurant> findByRatingGreaterThanEqual(java.math.BigDecimal rating);
    
    List<Restaurant> findByPriceRange(Integer priceRange);
    
    List<Restaurant> findByIsActiveTrue();
    
    List<Restaurant> findByName(String name);
    
    @Query("SELECT r FROM Restaurant r WHERE " +
           "(:city IS NULL OR LOWER(r.city) LIKE LOWER(CONCAT('%', :city, '%'))) AND " +
           "(:cuisine IS NULL OR LOWER(r.cuisine) LIKE LOWER(CONCAT('%', :cuisine, '%'))) AND " +
           "(:minRating IS NULL OR r.rating >= :minRating) AND " +
           "r.isActive = true")
    List<Restaurant> findRestaurantsWithFilters(
        @Param("city") String city,
        @Param("cuisine") String cuisine,
        @Param("minRating") java.math.BigDecimal minRating
    );
    
    @Query("SELECT r FROM Restaurant r WHERE " +
           "LOWER(r.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(r.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(r.cuisine) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Restaurant> findBySearchTerm(@Param("searchTerm") String searchTerm);
    
    @Query("SELECT r FROM Restaurant r ORDER BY r.rating DESC")
    List<Restaurant> findTopRatedRestaurants();
    
    @Query("SELECT r FROM Restaurant r WHERE r.id IN " +
           "(SELECT b.restaurant.id FROM Booking b GROUP BY b.restaurant.id " +
           "ORDER BY COUNT(b) DESC)")
    List<Restaurant> findMostBookedRestaurants();
}
