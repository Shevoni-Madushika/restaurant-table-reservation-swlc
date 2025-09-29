package com.tabletop.repository;

import com.tabletop.entity.Booking;
import com.tabletop.entity.User;
import com.tabletop.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    List<Booking> findByUser(User user);
    
    List<Booking> findByRestaurant(Restaurant restaurant);
    
    List<Booking> findByUserAndStatus(User user, Booking.BookingStatus status);
    
    @Query("SELECT b FROM Booking b WHERE b.restaurant = :restaurant AND " +
           "b.bookingDateTime BETWEEN :startTime AND :endTime AND " +
           "b.status IN ('PENDING', 'CONFIRMED')")
    List<Booking> findConflictingBookings(
        @Param("restaurant") Restaurant restaurant,
        @Param("startTime") LocalDateTime startTime,
        @Param("endTime") LocalDateTime endTime
    );
    
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.restaurant = :restaurant AND " +
           "b.status = 'CONFIRMED'")
    Long countConfirmedBookingsByRestaurant(@Param("restaurant") Restaurant restaurant);
}
