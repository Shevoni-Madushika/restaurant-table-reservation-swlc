package com.tabletop.repository;

import com.tabletop.entity.Favorite;
import com.tabletop.entity.User;
import com.tabletop.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    
    List<Favorite> findByUser(User user);
    
    List<Favorite> findByRestaurant(Restaurant restaurant);
    
    Optional<Favorite> findByUserAndRestaurant(User user, Restaurant restaurant);
    
    boolean existsByUserAndRestaurant(User user, Restaurant restaurant);
    
    void deleteByUserAndRestaurant(User user, Restaurant restaurant);
    
    @Query("SELECT f FROM Favorite f WHERE f.user.id = :userId")
    List<Favorite> findByUserId(@Param("userId") Long userId);
    
    @Query("SELECT f FROM Favorite f WHERE f.restaurant.id = :restaurantId")
    List<Favorite> findByRestaurantId(@Param("restaurantId") Long restaurantId);
    
    @Query("SELECT f FROM Favorite f WHERE f.user.id = :userId AND f.restaurant.id = :restaurantId")
    Optional<Favorite> findByUserIdAndRestaurantId(@Param("userId") Long userId, @Param("restaurantId") Long restaurantId);
    
    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM Favorite f WHERE f.user.id = :userId AND f.restaurant.id = :restaurantId")
    boolean existsByUserIdAndRestaurantId(@Param("userId") Long userId, @Param("restaurantId") Long restaurantId);
}
