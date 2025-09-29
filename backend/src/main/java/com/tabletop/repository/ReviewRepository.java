package com.tabletop.repository;

import com.tabletop.entity.Review;
import com.tabletop.entity.Restaurant;
import com.tabletop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    List<Review> findByRestaurant(Restaurant restaurant);
    
    List<Review> findByUser(User user);
    
    Optional<Review> findByUserAndRestaurant(User user, Restaurant restaurant);
    
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.restaurant = :restaurant")
    Double getAverageRatingByRestaurant(@Param("restaurant") Restaurant restaurant);
    
    @Query("SELECT COUNT(r) FROM Review r WHERE r.restaurant = :restaurant")
    Long countReviewsByRestaurant(@Param("restaurant") Restaurant restaurant);
}
