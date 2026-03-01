# Database Setup Guide

## Overview
This project uses MongoDB to store all application data across all sections. The database is integrated with Mongoose ODM for schema management.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB locally: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. The default connection string is: `mongodb://localhost:27017/agrioptima`

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string
4. Update `.env` file with your connection string

### 3. Environment Variables
Create a `.env` file in the `backend` directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/agrioptima
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agrioptima
```

### 4. Start the Server
```bash
npm start
# or
node server.js
```

## Database Models

The following models are available:

1. **User** - User accounts and authentication
2. **Farm** - Farm profiles and configurations
3. **CropRecommendation** - Crop optimization recommendations
4. **Weather** - Weather data and forecasts
5. **Activity** - Farm activities and logs
6. **ResourceTracking** - Water, fertilizer, and resource usage
7. **MarketPrice** - Market prices and APMC data
8. **Subsidy** - Government subsidy schemes
9. **SoilHealth** - Soil health records and tests
10. **Credit** - Credit scores and loan information
11. **Crop** - Crop database with agronomic data

## API Endpoints

### Users
- `POST /api/users/create-or-get` - Create or get user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user

### Farms
- `POST /api/farms` - Create farm
- `GET /api/farms/user/:userId` - Get all farms for user
- `GET /api/farms/:id` - Get farm by ID
- `PUT /api/farms/:id` - Update farm
- `DELETE /api/farms/:id` - Delete farm

### Crop Recommendations
- `POST /api/crop-recommendations` - Create recommendation
- `GET /api/crop-recommendations/farm/:farmId` - Get recommendations for farm
- `GET /api/crop-recommendations/farm/:farmId/latest` - Get latest recommendation
- `GET /api/crop-recommendations/user/:userId` - Get recommendations for user

### Weather
- `POST /api/weather` - Create or update weather data
- `GET /api/weather/location?state=&district=&block=` - Get weather by location
- `GET /api/weather/history?state=&district=&block=&days=30` - Get weather history

### Activities
- `POST /api/activities` - Create activity
- `GET /api/activities/farm/:farmId` - Get activities for farm
- `GET /api/activities/user/:userId` - Get activities for user
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Resource Tracking
- `POST /api/resource-tracking` - Create tracking entry
- `GET /api/resource-tracking/farm/:farmId` - Get tracking for farm
- `GET /api/resource-tracking/farm/:farmId/latest` - Get latest tracking

### Market Prices
- `POST /api/market-prices` - Create or update price
- `GET /api/market-prices/location?state=&district=&cropId=` - Get prices by location
- `GET /api/market-prices/latest?state=&district=&cropId=` - Get latest price

### Subsidies
- `GET /api/subsidies?state=&district=` - Get all active subsidies
- `GET /api/subsidies/match?state=&district=&landSize=&cropTypes=&soilType=` - Get matching subsidies
- `GET /api/subsidies/:id` - Get subsidy by ID

### Soil Health
- `POST /api/soil-health` - Create soil health record
- `GET /api/soil-health/farm/:farmId` - Get soil health for farm
- `GET /api/soil-health/farm/:farmId/latest` - Get latest soil health

### Credit
- `POST /api/credit` - Create or update credit record
- `GET /api/credit/user/:userId` - Get credit for user
- `PUT /api/credit/:id` - Update credit

### Crops
- `POST /api/crops/initialize` - Initialize crop database
- `GET /api/crops` - Get all crops
- `GET /api/crops/:id` - Get crop by ID
- `GET /api/crops/season/:season` - Get crops by season

## Frontend Integration

The frontend includes `api-service.js` which provides a convenient API wrapper. Include it in your HTML:

```html
<script src="./api-service.js"></script>
```

Then use it in your JavaScript:

```javascript
// Example: Create a farm
const farmData = {
    userId: 'user_id_here',
    state: 'Maharashtra',
    district: 'Pune',
    block: 'Pune Block',
    landSize: 10,
    soilType: 'loamy',
    soilPh: 6.5,
    waterAvailable: 50000,
    totalBudget: 500000,
    month: 6
};

AgriAPI.Farm.create(farmData)
    .then(response => console.log('Farm created:', response))
    .catch(error => console.error('Error:', error));
```

## Data Flow

1. User logs in → User record created/updated in database
2. User creates farm profile → Farm record saved
3. User runs optimization → CropRecommendation saved
4. Weather data fetched → Weather record created/updated
5. Activities logged → Activity records saved
6. Resource usage tracked → ResourceTracking records saved
7. Market prices fetched → MarketPrice records created/updated
8. Soil tests performed → SoilHealth records saved
9. Credit information → Credit records saved

All data is now persisted in MongoDB and can be queried, analyzed, and used for historical tracking and analytics.
