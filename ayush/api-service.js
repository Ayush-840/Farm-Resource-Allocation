/**
 * API Service for AgriOptima
 * Handles all database API calls from frontend
 */

const API_BASE_URL = 'http://localhost:3000/api';

// Helper function for API calls
async function apiCall(endpoint, method = 'GET', body = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        if (body) {
            options.body = JSON.stringify(body);
        }
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'API request failed');
        }
        
        return data;
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error);
        throw error;
    }
}

// User APIs
const UserAPI = {
    createOrGet: (phone, name, role) => 
        apiCall('/users/create-or-get', 'POST', { phone, name, role }),
    
    getById: (id) => 
        apiCall(`/users/${id}`),
    
    update: (id, data) => 
        apiCall(`/users/${id}`, 'PUT', data)
};

// Farm APIs
const FarmAPI = {
    create: (farmData) => 
        apiCall('/farms', 'POST', farmData),
    
    getByUser: (userId) => 
        apiCall(`/farms/user/${userId}`),
    
    getById: (id) => 
        apiCall(`/farms/${id}`),
    
    update: (id, data) => 
        apiCall(`/farms/${id}`, 'PUT', data),
    
    delete: (id) => 
        apiCall(`/farms/${id}`, 'DELETE')
};

// Crop Recommendation APIs
const CropRecommendationAPI = {
    create: (recommendationData) => 
        apiCall('/crop-recommendations', 'POST', recommendationData),
    
    getByFarm: (farmId) => 
        apiCall(`/crop-recommendations/farm/${farmId}`),
    
    getLatestByFarm: (farmId) => 
        apiCall(`/crop-recommendations/farm/${farmId}/latest`),
    
    getByUser: (userId) => 
        apiCall(`/crop-recommendations/user/${userId}`),
    
    getById: (id) => 
        apiCall(`/crop-recommendations/${id}`)
};

// Weather APIs
const WeatherAPI = {
    createOrUpdate: (weatherData) => 
        apiCall('/weather', 'POST', weatherData),
    
    getByLocation: (state, district, block) => 
        apiCall(`/weather/location?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}&block=${encodeURIComponent(block)}`),
    
    getHistory: (state, district, block, days = 30) => 
        apiCall(`/weather/history?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}&block=${encodeURIComponent(block)}&days=${days}`)
};

// Activity APIs
const ActivityAPI = {
    create: (activityData) => 
        apiCall('/activities', 'POST', activityData),
    
    getByFarm: (farmId, limit = 50, skip = 0) => 
        apiCall(`/activities/farm/${farmId}?limit=${limit}&skip=${skip}`),
    
    getByUser: (userId, limit = 50, skip = 0) => 
        apiCall(`/activities/user/${userId}?limit=${limit}&skip=${skip}`),
    
    getById: (id) => 
        apiCall(`/activities/${id}`),
    
    update: (id, data) => 
        apiCall(`/activities/${id}`, 'PUT', data),
    
    delete: (id) => 
        apiCall(`/activities/${id}`, 'DELETE')
};

// Resource Tracking APIs
const ResourceTrackingAPI = {
    create: (trackingData) => 
        apiCall('/resource-tracking', 'POST', trackingData),
    
    getByFarm: (farmId, limit = 30, skip = 0) => 
        apiCall(`/resource-tracking/farm/${farmId}?limit=${limit}&skip=${skip}`),
    
    getLatestByFarm: (farmId) => 
        apiCall(`/resource-tracking/farm/${farmId}/latest`),
    
    update: (id, data) => 
        apiCall(`/resource-tracking/${id}`, 'PUT', data)
};

// Market Price APIs
const MarketPriceAPI = {
    createOrUpdate: (priceData) => 
        apiCall('/market-prices', 'POST', priceData),
    
    getByLocation: (state, district, cropId = null) => {
        let url = `/market-prices/location?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}`;
        if (cropId) url += `&cropId=${encodeURIComponent(cropId)}`;
        return apiCall(url);
    },
    
    getLatest: (state, district, cropId) => 
        apiCall(`/market-prices/latest?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}&cropId=${encodeURIComponent(cropId)}`)
};

// Subsidy APIs
const SubsidyAPI = {
    getAll: (state = null, district = null) => {
        let url = '/subsidies';
        if (state || district) {
            const params = new URLSearchParams();
            if (state) params.append('state', state);
            if (district) params.append('district', district);
            url += '?' + params.toString();
        }
        return apiCall(url);
    },
    
    getMatching: (state, district, landSize, cropTypes, soilType) => 
        apiCall(`/subsidies/match?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}&landSize=${landSize}&cropTypes=${encodeURIComponent(JSON.stringify(cropTypes))}&soilType=${encodeURIComponent(soilType)}`),
    
    getById: (id) => 
        apiCall(`/subsidies/${id}`)
};

// Soil Health APIs
const SoilHealthAPI = {
    create: (soilHealthData) => 
        apiCall('/soil-health', 'POST', soilHealthData),
    
    getByFarm: (farmId) => 
        apiCall(`/soil-health/farm/${farmId}`),
    
    getLatestByFarm: (farmId) => 
        apiCall(`/soil-health/farm/${farmId}/latest`),
    
    update: (id, data) => 
        apiCall(`/soil-health/${id}`, 'PUT', data)
};

// Credit APIs
const CreditAPI = {
    createOrUpdate: (creditData) => 
        apiCall('/credit', 'POST', creditData),
    
    getByUser: (userId) => 
        apiCall(`/credit/user/${userId}`),
    
    update: (id, data) => 
        apiCall(`/credit/${id}`, 'PUT', data)
};

// Crop APIs
const CropAPI = {
    initialize: (crops) => 
        apiCall('/crops/initialize', 'POST', { crops }),
    
    getAll: () => 
        apiCall('/crops'),
    
    getById: (id) => 
        apiCall(`/crops/${id}`),
    
    getBySeason: (season) => 
        apiCall(`/crops/season/${season}`)
};

// Export all APIs
window.AgriAPI = {
    User: UserAPI,
    Farm: FarmAPI,
    CropRecommendation: CropRecommendationAPI,
    Weather: WeatherAPI,
    Activity: ActivityAPI,
    ResourceTracking: ResourceTrackingAPI,
    MarketPrice: MarketPriceAPI,
    Subsidy: SubsidyAPI,
    SoilHealth: SoilHealthAPI,
    Credit: CreditAPI,
    Crop: CropAPI
};
