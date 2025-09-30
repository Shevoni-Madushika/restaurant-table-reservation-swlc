package com.tabletop.service;

import com.tabletop.dto.BookingDTO;
import com.tabletop.entity.Booking;
import com.tabletop.entity.Restaurant;
import com.tabletop.entity.User;
import com.tabletop.repository.BookingRepository;
import com.tabletop.repository.RestaurantRepository;
import com.tabletop.repository.UserRepository;
import com.tabletop.service.ExternalRestaurantApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private RestaurantRepository restaurantRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ExternalRestaurantApiService externalRestaurantApiService;
    
    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<BookingDTO> getBookingsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return bookingRepository.findByUser(user)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<BookingDTO> getBookingsByRestaurant(Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        return bookingRepository.findByRestaurant(restaurant)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        User user = userRepository.findById(bookingDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Restaurant restaurant = restaurantRepository.findById(bookingDTO.getRestaurantId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        
        // Call external restaurant API first
        ExternalRestaurantApiService.ExternalBookingResult externalResult = 
            externalRestaurantApiService.callRestaurantApi(restaurant.getId(), bookingDTO);
        
        // If external API call failed, throw exception
        if (!externalResult.isSuccess()) {
            throw new RuntimeException("Restaurant booking failed: " + externalResult.getMessage());
        }
        
        // Create booking in our database only if external API call succeeded
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setRestaurant(restaurant);
        booking.setBookingDateTime(bookingDTO.getBookingDateTime());
        booking.setNumberOfPeople(bookingDTO.getNumberOfPeople());
        booking.setSpecialRequests(bookingDTO.getSpecialRequests());
        booking.setStatus(Booking.BookingStatus.CONFIRMED); // Set as confirmed since external API succeeded
        
        Booking savedBooking = bookingRepository.save(booking);
        return convertToDTO(savedBooking);
    }
    
    public BookingDTO updateBookingStatus(Long bookingId, Booking.BookingStatus status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        booking.setStatus(status);
        Booking updatedBooking = bookingRepository.save(booking);
        return convertToDTO(updatedBooking);
    }
    
    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        booking.setStatus(Booking.BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }
    
    public boolean isTimeSlotAvailable(Long restaurantId, LocalDateTime bookingDateTime) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        
        LocalDateTime startTime = bookingDateTime.minusHours(1);
        LocalDateTime endTime = bookingDateTime.plusHours(1);
        
        List<Booking> conflictingBookings = bookingRepository.findConflictingBookings(
                restaurant, startTime, endTime);
        
        return conflictingBookings.isEmpty();
    }
    
    private BookingDTO convertToDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setUserId(booking.getUser().getId());
        dto.setRestaurantId(booking.getRestaurant().getId());
        dto.setRestaurantName(booking.getRestaurant().getName());
        dto.setBookingDateTime(booking.getBookingDateTime());
        dto.setNumberOfPeople(booking.getNumberOfPeople());
        dto.setSpecialRequests(booking.getSpecialRequests());
        dto.setStatus(booking.getStatus().toString());
        dto.setCreatedAt(booking.getCreatedAt());
        return dto;
    }
}
