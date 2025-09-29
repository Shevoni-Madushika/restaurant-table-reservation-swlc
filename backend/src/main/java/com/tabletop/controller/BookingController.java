package com.tabletop.controller;

import com.tabletop.dto.BookingDTO;
import com.tabletop.entity.Booking;
import com.tabletop.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {
    
    @Autowired
    private BookingService bookingService;
    
    @GetMapping
    public ResponseEntity<List<BookingDTO>> getAllBookings() {
        List<BookingDTO> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingDTO>> getBookingsByUser(@PathVariable Long userId) {
        List<BookingDTO> bookings = bookingService.getBookingsByUser(userId);
        return ResponseEntity.ok(bookings);
    }
    
    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<BookingDTO>> getBookingsByRestaurant(@PathVariable Long restaurantId) {
        List<BookingDTO> bookings = bookingService.getBookingsByRestaurant(restaurantId);
        return ResponseEntity.ok(bookings);
    }
    
    @PostMapping
    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingDTO bookingDTO) {
        BookingDTO createdBooking = bookingService.createBooking(bookingDTO);
        return ResponseEntity.ok(createdBooking);
    }
    
    @PutMapping("/{bookingId}/status")
    public ResponseEntity<BookingDTO> updateBookingStatus(
            @PathVariable Long bookingId, 
            @RequestParam String status) {
        
        Booking.BookingStatus bookingStatus = Booking.BookingStatus.valueOf(status.toUpperCase());
        BookingDTO updatedBooking = bookingService.updateBookingStatus(bookingId, bookingStatus);
        return ResponseEntity.ok(updatedBooking);
    }
    
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/availability")
    public ResponseEntity<Boolean> checkAvailability(
            @RequestParam Long restaurantId,
            @RequestParam String bookingDateTime) {
        
        LocalDateTime dateTime = LocalDateTime.parse(bookingDateTime);
        boolean isAvailable = bookingService.isTimeSlotAvailable(restaurantId, dateTime);
        return ResponseEntity.ok(isAvailable);
    }
}
