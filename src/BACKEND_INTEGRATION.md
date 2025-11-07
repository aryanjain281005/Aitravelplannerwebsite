# Backend Integration Guide

This document explains how to integrate this frontend with your backend API.

## Overview

The frontend is now configured to communicate with a backend API through a service layer. You can toggle between mock data (for development) and real API calls.

## Quick Start

### 1. Configure Backend URL

Edit `/services/api.ts` and update the `API_BASE_URL` constant:

```typescript
// For development
const API_BASE_URL = 'http://localhost:8000/api';

// For production, change to:
// const API_BASE_URL = 'https://your-backend.com/api';
```

### 2. Toggle Mock Data

In `/components/PlannerDemo.tsx`, set this flag:

```typescript
// Set to false when your backend is ready
const USE_MOCK_DATA = true;
```

## Required Backend Endpoints

Your backend needs to implement the following REST API endpoints:

### 1. Generate Itinerary

**Endpoint:** `POST /api/itinerary/generate`

**Request Body:**
```json
{
  "city": "Paris",
  "date": "2025-03-15",
  "minRating": 4.0,
  "preferences": {
    "budget": "medium",
    "interests": ["museums", "food"],
    "pace": "moderate"
  }
}
```

**Response:**
```json
{
  "success": true,
  "itinerary": {
    "city": "Paris",
    "date": "2025-03-15",
    "minRating": 4.0,
    "slots": [
      {
        "period": "Morning",
        "time": "9:00 AM - 12:00 PM",
        "activities": [
          {
            "name": "Café de Flore",
            "type": "Breakfast Spot",
            "rating": 4.3,
            "price": "€€€",
            "time": "9:00 - 10:00 AM",
            "description": "Historic café in Saint-Germain-des-Prés.",
            "redditInsight": "Locals say: Come early to avoid crowds.",
            "image": "https://example.com/image.jpg",
            "location": {
              "lat": 48.8543,
              "lng": 2.3321,
              "address": "172 Boulevard Saint-Germain, Paris"
            },
            "placeId": "ChIJxxxx"
          }
        ]
      }
    ],
    "metadata": {
      "totalEstimatedCost": "€80-120 per person",
      "totalDuration": "13 hours",
      "generatedAt": "2025-01-15T10:30:00Z"
    }
  },
  "message": "Itinerary generated successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Failed to generate itinerary",
  "code": "GENERATION_FAILED",
  "details": {
    "reason": "City not found"
  }
}
```

### 2. Health Check (Optional)

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 3. Job Status (Optional - for async processing)

**Endpoint:** `GET /api/itinerary/status/:jobId`

**Response:**
```json
{
  "jobId": "abc123",
  "status": "completed",
  "currentStep": {
    "step": 5,
    "totalSteps": 5,
    "name": "Optimizing Plan",
    "description": "Creating your itinerary",
    "status": "completed"
  },
  "progress": 100,
  "itinerary": {
    // ... same as generate endpoint
  }
}
```

## Backend Implementation Guide

### Recommended Tech Stack

The frontend expects your backend to:
- Use **FastAPI** (Python) or similar REST framework
- Integrate **LangChain** for AI agent orchestration
- Use **Gemini AI** for natural language understanding
- Connect to **Google Places API** for location data
- Scrape **Reddit** for user insights

### Example Python Backend Structure

```
backend/
├── main.py                 # FastAPI app entry point
├── api/
│   ├── routes/
│   │   └── itinerary.py    # Itinerary endpoints
│   └── models/
│       └── schemas.py      # Pydantic schemas
├── services/
│   ├── ai_agent.py         # LangChain agent
│   ├── google_places.py    # Google Places integration
│   └── reddit_scraper.py   # Reddit scraping
└── requirements.txt
```

### Example FastAPI Endpoint

```python
# api/routes/itinerary.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class GenerateItineraryRequest(BaseModel):
    city: str
    date: str
    minRating: float
    preferences: Optional[dict] = None

class Activity(BaseModel):
    name: str
    type: str
    rating: float
    price: str
    time: str
    description: str
    redditInsight: str
    image: str
    location: Optional[dict] = None
    placeId: Optional[str] = None

class TimeSlot(BaseModel):
    period: str
    time: str
    activities: List[Activity]

class Itinerary(BaseModel):
    city: str
    date: str
    minRating: float
    slots: List[TimeSlot]
    metadata: Optional[dict] = None

class GenerateItineraryResponse(BaseModel):
    success: bool
    itinerary: Itinerary
    message: Optional[str] = None

@router.post("/itinerary/generate", response_model=GenerateItineraryResponse)
async def generate_itinerary(request: GenerateItineraryRequest):
    try:
        # 1. Initialize AI Agent
        agent = AIAgent()
        
        # 2. Get places from Google Places API
        places = await get_google_places(
            city=request.city,
            min_rating=request.minRating
        )
        
        # 3. Get Reddit insights
        reddit_data = await scrape_reddit_insights(
            city=request.city,
            places=places
        )
        
        # 4. Use AI to optimize itinerary
        itinerary = await agent.create_itinerary(
            city=request.city,
            date=request.date,
            places=places,
            reddit_insights=reddit_data,
            min_rating=request.minRating
        )
        
        return GenerateItineraryResponse(
            success=True,
            itinerary=itinerary,
            message="Itinerary generated successfully"
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={"error": str(e), "code": "GENERATION_FAILED"}
        )
```

## AI Agent Implementation

Your AI agent should:

1. **Analyze the request** using Gemini AI to understand user preferences
2. **Query Google Places API** for attractions, restaurants, and experiences
3. **Filter by rating** (only include places >= minRating)
4. **Scrape Reddit** for authentic reviews and insider tips
5. **Optimize the itinerary** by:
   - Grouping activities by geographic proximity
   - Allocating appropriate time for each activity
   - Balancing morning, afternoon, and evening activities
   - Including meals at appropriate times
6. **Format the response** to match the required schema

### Example LangChain Agent

```python
from langchain.agents import initialize_agent, Tool
from langchain.llms import GoogleGenerativeAI

def create_itinerary_agent():
    llm = GoogleGenerativeAI(model="gemini-pro")
    
    tools = [
        Tool(
            name="GooglePlaces",
            func=search_google_places,
            description="Search for places in a city with ratings and reviews"
        ),
        Tool(
            name="RedditInsights",
            func=get_reddit_insights,
            description="Get authentic reviews from Reddit"
        ),
        Tool(
            name="OptimizeRoute",
            func=optimize_route,
            description="Optimize the order of activities"
        )
    ]
    
    agent = initialize_agent(
        tools=tools,
        llm=llm,
        agent="zero-shot-react-description",
        verbose=True
    )
    
    return agent
```

## Data Sources Integration

### Google Places API

```python
import googlemaps

gmaps = googlemaps.Client(key='YOUR_API_KEY')

def search_google_places(city: str, min_rating: float):
    # Search for restaurants
    restaurants = gmaps.places(
        query=f'restaurants in {city}',
        type='restaurant'
    )
    
    # Filter by rating
    filtered = [
        p for p in restaurants['results']
        if p.get('rating', 0) >= min_rating
    ]
    
    return filtered
```

### Reddit API

```python
import praw

reddit = praw.Reddit(
    client_id='YOUR_CLIENT_ID',
    client_secret='YOUR_CLIENT_SECRET',
    user_agent='travel-planner'
)

def get_reddit_insights(city: str, place_name: str):
    subreddit = reddit.subreddit('travel')
    posts = subreddit.search(f'{city} {place_name}', limit=10)
    
    insights = []
    for post in posts:
        # Extract top comments
        post.comments.replace_more(limit=0)
        for comment in post.comments[:3]:
            if len(comment.body) > 50:
                insights.append(comment.body)
    
    return insights
```

## CORS Configuration

Your backend must enable CORS for the frontend to communicate with it:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-frontend.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Testing

### Test with cURL

```bash
curl -X POST http://localhost:8000/api/itinerary/generate \
  -H "Content-Type: application/json" \
  -d '{
    "city": "Paris",
    "date": "2025-03-15",
    "minRating": 4.0
  }'
```

### Test Health Check

```bash
curl http://localhost:8000/api/health
```

## Frontend Files Reference

- **Types**: `/types/api.ts` - TypeScript interfaces
- **API Service**: `/services/api.ts` - HTTP client
- **Mock Data**: `/utils/mockData.ts` - Development data
- **Component**: `/components/PlannerDemo.tsx` - Main form

## Deployment Checklist

- [ ] Set `USE_MOCK_DATA = false` in PlannerDemo.tsx
- [ ] Configure `NEXT_PUBLIC_API_URL` environment variable
- [ ] Ensure backend CORS is configured correctly
- [ ] Test all endpoints with real data
- [ ] Add error handling and loading states
- [ ] Implement rate limiting on backend
- [ ] Add API authentication if needed
- [ ] Set up monitoring and logging

## Support

For questions about the frontend integration:
- Check TypeScript types in `/types/api.ts`
- Review the API service in `/services/api.ts`
- Look at mock data structure in `/utils/mockData.ts`

For backend implementation:
- Refer to LangChain documentation
- Review Google Places API documentation
- Check Reddit API (PRAW) documentation
