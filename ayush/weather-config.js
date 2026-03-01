/**
 * Weather API Configuration
 * 
 * To use OpenWeatherMap API:
 * 1. Sign up at https://openweathermap.org/api
 * 2. Get your free API key
 * 3. Replace 'YOUR_API_KEY' below with your actual API key
 * 
 * Free tier: 1,000 calls/day, 60 calls/minute
 */

window.WeatherConfig = {
    // OpenWeatherMap API Key
    // Get your free API key from: https://openweathermap.org/api
    OPENWEATHER_API_KEY: 'YOUR_API_KEY', // Replace with your API key
    
    // Enable/disable OpenWeatherMap API
    USE_OPENWEATHER: false, // Set to true when you have an API key
    
    // Fallback to Open-Meteo if OpenWeatherMap fails or is not configured
    FALLBACK_TO_OPENMETEO: true
};
