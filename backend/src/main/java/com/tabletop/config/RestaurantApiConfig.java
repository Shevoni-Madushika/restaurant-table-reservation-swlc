package com.tabletop.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class RestaurantApiConfig {
    
    private final Map<Long, RestaurantApiInfo> restaurantApis;
    
    public RestaurantApiConfig() {
        this.restaurantApis = new HashMap<>();
        initializeRestaurantApis();
    }
    
    private void initializeRestaurantApis() {
        // The Spice Garden - Port 4000 - Success (200)
        restaurantApis.put(1L, new RestaurantApiInfo(
            "http://localhost:4000/api/v1/spice-garden/easy-booking",
            "POST"
        ));
        
        // Bamboo Garden - Port 4001 - Server Error (500)
        restaurantApis.put(2L, new RestaurantApiInfo(
            "http://localhost:4001/bamboo/api/v1/rest/booking",
            "POST"
        ));
        
        // Ocean Breeze - Port 4002 - Bad Request (400)
        restaurantApis.put(3L, new RestaurantApiInfo(
            "http://localhost:4002/ocean/api/v2/reservations/book",
            "POST"
        ));
        
        // Golden Dragon - Port 4003 - Created (201)
        restaurantApis.put(4L, new RestaurantApiInfo(
            "http://localhost:4003/golden/api/v1/table-booking",
            "POST"
        ));
        
        // Mountain View - Port 4004 - Created (201)
        restaurantApis.put(5L, new RestaurantApiInfo(
            "http://localhost:4004/mountain/api/v3/reserve-table",
            "POST"
        ));
    }
    
    public RestaurantApiInfo getRestaurantApi(Long restaurantId) {
        return restaurantApis.get(restaurantId);
    }
    
    public boolean hasRestaurantApi(Long restaurantId) {
        return restaurantApis.containsKey(restaurantId);
    }
    
    public static class RestaurantApiInfo {
        private final String url;
        private final String method;
        
        public RestaurantApiInfo(String url, String method) {
            this.url = url;
            this.method = method;
        }
        
        public String getUrl() {
            return url;
        }
        
        public String getMethod() {
            return method;
        }
    }
}
