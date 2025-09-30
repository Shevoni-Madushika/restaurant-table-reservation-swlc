package com.tabletop.service;

import com.tabletop.config.RestaurantApiConfig;
import com.tabletop.dto.BookingDTO;
import com.tabletop.entity.Restaurant;
import com.tabletop.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class ExternalRestaurantApiService {
    
    @Autowired
    private RestaurantApiConfig restaurantApiConfig;
    
    @Autowired
    private RestaurantRepository restaurantRepository;
    
    private final RestTemplate restTemplate = new RestTemplate();
    
    public ExternalBookingResult callRestaurantApi(Long restaurantId, BookingDTO bookingDTO) {
        RestaurantApiConfig.RestaurantApiInfo apiInfo = restaurantApiConfig.getRestaurantApi(restaurantId);
        
        if (apiInfo == null) {
            return new ExternalBookingResult(false, "Restaurant API not configured", null);
        }
        
        try {
            // Prepare request headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            // Prepare request body
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("bookingDateTime", bookingDTO.getBookingDateTime());
            requestBody.put("numberOfPeople", bookingDTO.getNumberOfPeople());
            requestBody.put("specialRequests", bookingDTO.getSpecialRequests());
            requestBody.put("customerName", "Customer"); // You can get this from user data
            
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
            
            // Make the API call
            ResponseEntity<Map> response = restTemplate.exchange(
                apiInfo.getUrl(),
                HttpMethod.valueOf(apiInfo.getMethod()),
                request,
                Map.class
            );
            
            // Handle successful responses (200, 201)
            if (response.getStatusCode().is2xxSuccessful()) {
                Map<String, Object> responseBody = response.getBody();
                String message = "Booking confirmed with restaurant";
                if (responseBody != null && responseBody.containsKey("message")) {
                    message = (String) responseBody.get("message");
                }
                return new ExternalBookingResult(true, message, responseBody);
            }
            
            return new ExternalBookingResult(false, "Unexpected response from restaurant", null);
            
        } catch (HttpClientErrorException e) {
            // Handle 4xx errors (400, 404, etc.)
            String errorMessage = "Restaurant booking not available: " + e.getResponseBodyAsString();
            return new ExternalBookingResult(false, errorMessage, null);
            
        } catch (HttpServerErrorException e) {
            // Handle 5xx errors (500, 503, etc.)
            String errorMessage = "Restaurant system temporarily unavailable";
            return new ExternalBookingResult(false, errorMessage, null);
            
        } catch (Exception e) {
            // Handle other exceptions (network issues, timeouts, etc.)
            String errorMessage = "Unable to connect to restaurant booking system";
            return new ExternalBookingResult(false, errorMessage, null);
        }
    }
    
    public static class ExternalBookingResult {
        private final boolean success;
        private final String message;
        private final Map<String, Object> responseData;
        
        public ExternalBookingResult(boolean success, String message, Map<String, Object> responseData) {
            this.success = success;
            this.message = message;
            this.responseData = responseData;
        }
        
        public boolean isSuccess() {
            return success;
        }
        
        public String getMessage() {
            return message;
        }
        
        public Map<String, Object> getResponseData() {
            return responseData;
        }
    }
}
