"""
Example FastAPI Backend for Travel Planner
==========================================

This is a reference implementation showing how to build the backend API
that the frontend expects. This is meant to be copied to your backend project.

IMPORTANT: This is just an example. You'll need to:
1. Add your actual API keys
2. Implement the AI agent logic with LangChain
3. Add proper error handling
4. Set up database for storing itineraries
5. Add authentication if needed

Installation:
    pip install fastapi uvicorn pydantic langchain google-generativeai googlemaps praw

Usage:
    python backend_example.py
    # Or: uvicorn backend_example:app --reload
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import os

# Initialize FastAPI app
app = FastAPI(
    title="Travel Planner API",
    description="AI-powered travel itinerary generator",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React dev server
        "http://localhost:5173",  # Vite dev server
        # Add your production frontend URL here
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# Pydantic Models (matching frontend TypeScript types)
# ============================================================================

class Location(BaseModel):
    lat: float
    lng: float
    address: str

class Activity(BaseModel):
    name: str
    type: str
    rating: float
    price: str
    time: str
    description: str
    redditInsight: str
    image: str
    location: Optional[Location] = None
    placeId: Optional[str] = None

class TimeSlot(BaseModel):
    period: str = Field(..., pattern="^(Morning|Afternoon|Evening)$")
    time: str
    activities: List[Activity]

class ItineraryMetadata(BaseModel):
    totalEstimatedCost: Optional[str] = None
    totalDuration: Optional[str] = None
    generatedAt: Optional[str] = None

class Itinerary(BaseModel):
    city: str
    date: str
    minRating: float
    slots: List[TimeSlot]
    metadata: Optional[ItineraryMetadata] = None

class Preferences(BaseModel):
    budget: Optional[str] = None
    interests: Optional[List[str]] = None
    pace: Optional[str] = None

class GenerateItineraryRequest(BaseModel):
    city: str
    date: str
    minRating: float = Field(ge=1.0, le=5.0)
    preferences: Optional[Preferences] = None

class GenerateItineraryResponse(BaseModel):
    success: bool
    itinerary: Itinerary
    message: Optional[str] = None

class ApiError(BaseModel):
    success: bool = False
    error: str
    code: Optional[str] = None
    details: Optional[dict] = None

# ============================================================================
# Helper Functions (You'll implement these with actual logic)
# ============================================================================

async def get_google_places(city: str, min_rating: float, activity_type: str = None):
    """
    Query Google Places API for locations
    
    You'll implement this with:
        import googlemaps
        gmaps = googlemaps.Client(key=os.getenv('GOOGLE_PLACES_API_KEY'))
    """
    # Placeholder - replace with actual API call
    return [
        {
            "name": "Sample Place",
            "rating": 4.5,
            "price_level": 2,
            "place_id": "ChIJxxx",
            "photos": [],
            "geometry": {"location": {"lat": 48.8566, "lng": 2.3522}}
        }
    ]

async def get_reddit_insights(city: str, place_name: str):
    """
    Scrape Reddit for authentic reviews
    
    You'll implement this with:
        import praw
        reddit = praw.Reddit(...)
    """
    # Placeholder - replace with actual scraping
    return "Travelers say: This is a must-visit spot!"

async def get_place_image(place_data: dict):
    """
    Get image URL from Google Places photo reference
    or use Unsplash as fallback
    """
    # Placeholder - implement with actual photo API
    return "https://images.unsplash.com/photo-1502602898657-3e91760cbb34"

async def generate_with_ai(request: GenerateItineraryRequest, places_data: list):
    """
    Use LangChain + Gemini AI to create optimized itinerary
    
    You'll implement this with:
        from langchain import GoogleGenerativeAI
        from langchain.agents import initialize_agent
    """
    # This is where your AI agent logic goes
    # For now, returning a sample structure
    
    # Example morning activities
    morning_activities = [
        Activity(
            name="Local Café",
            type="Breakfast Spot",
            rating=4.5,
            price="€€",
            time="9:00 - 10:00 AM",
            description=f"Start your day in {request.city} with authentic breakfast.",
            redditInsight=await get_reddit_insights(request.city, "breakfast café"),
            image=await get_place_image({}),
            location=Location(lat=48.8566, lng=2.3522, address="Sample Address")
        )
    ]
    
    # Example afternoon activities
    afternoon_activities = [
        Activity(
            name="Main Attraction",
            type="Attraction",
            rating=4.7,
            price="€€€",
            time="2:00 - 5:00 PM",
            description=f"Explore the highlights of {request.city}.",
            redditInsight=await get_reddit_insights(request.city, "attractions"),
            image=await get_place_image({}),
        )
    ]
    
    # Example evening activities  
    evening_activities = [
        Activity(
            name="Dinner Restaurant",
            type="Dinner",
            rating=4.6,
            price="€€€",
            time="7:00 - 9:00 PM",
            description=f"Fine dining experience in {request.city}.",
            redditInsight=await get_reddit_insights(request.city, "restaurants"),
            image=await get_place_image({}),
        )
    ]
    
    return Itinerary(
        city=request.city,
        date=request.date,
        minRating=request.minRating,
        slots=[
            TimeSlot(
                period="Morning",
                time="9:00 AM - 12:00 PM",
                activities=morning_activities
            ),
            TimeSlot(
                period="Afternoon",
                time="12:00 PM - 6:00 PM",
                activities=afternoon_activities
            ),
            TimeSlot(
                period="Evening",
                time="6:00 PM - 10:00 PM",
                activities=evening_activities
            )
        ],
        metadata=ItineraryMetadata(
            totalEstimatedCost="€80-120 per person",
            totalDuration="13 hours",
            generatedAt=datetime.utcnow().isoformat()
        )
    )

# ============================================================================
# API Endpoints
# ============================================================================

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "service": "Travel Planner API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.post("/api/itinerary/generate", response_model=GenerateItineraryResponse)
async def generate_itinerary(request: GenerateItineraryRequest):
    """
    Generate a personalized travel itinerary
    
    This endpoint:
    1. Validates the request
    2. Queries Google Places API
    3. Scrapes Reddit for insights
    4. Uses AI to optimize the itinerary
    5. Returns structured response
    """
    try:
        print(f"Generating itinerary for {request.city} on {request.date}")
        
        # Step 1: Get places from Google Places API
        # Filter by rating >= minRating
        places = await get_google_places(
            city=request.city,
            min_rating=request.minRating
        )
        
        if not places:
            raise HTTPException(
                status_code=404,
                detail={
                    "success": False,
                    "error": f"No places found in {request.city} with rating >= {request.minRating}",
                    "code": "NO_PLACES_FOUND"
                }
            )
        
        # Step 2: Use AI to generate optimized itinerary
        itinerary = await generate_with_ai(request, places)
        
        # Step 3: Return successful response
        return GenerateItineraryResponse(
            success=True,
            itinerary=itinerary,
            message=f"Successfully generated itinerary for {request.city}"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error generating itinerary: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "success": False,
                "error": "Failed to generate itinerary",
                "code": "GENERATION_FAILED",
                "details": {"message": str(e)}
            }
        )

@app.get("/api/itinerary/{itinerary_id}")
async def get_itinerary(itinerary_id: str):
    """
    Retrieve a previously generated itinerary
    (Optional: requires database implementation)
    """
    # You would implement this with a database lookup
    raise HTTPException(
        status_code=501,
        detail={
            "success": False,
            "error": "Endpoint not implemented",
            "code": "NOT_IMPLEMENTED"
        }
    )

# ============================================================================
# Main
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    
    print("=" * 60)
    print("Travel Planner API Starting...")
    print("=" * 60)
    print("📍 Docs: http://localhost:8000/docs")
    print("📍 API:  http://localhost:8000/api")
    print("=" * 60)
    
    uvicorn.run(
        "backend_example:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )

"""
TODO: Implement the following for production:

1. Google Places Integration:
   - Set up Google Cloud project
   - Enable Places API
   - Add API key to environment variables
   - Implement place search with filters
   - Handle photo references

2. Reddit Scraping:
   - Create Reddit app for API access
   - Use PRAW library
   - Implement sentiment analysis on comments
   - Cache results to avoid rate limits

3. AI Agent (LangChain + Gemini):
   - Set up Gemini API key
   - Create LangChain agent with tools
   - Define optimization strategy
   - Handle context and memory

4. Database:
   - Set up PostgreSQL or MongoDB
   - Create schemas for itineraries
   - Implement CRUD operations
   - Add user authentication

5. Caching & Performance:
   - Use Redis for caching API responses
   - Implement rate limiting
   - Add request queuing for expensive operations

6. Error Handling:
   - Add comprehensive logging
   - Implement retry logic
   - Create fallback mechanisms
   - Monitor API quotas

7. Testing:
   - Write unit tests
   - Add integration tests
   - Test API endpoints
   - Load testing

8. Security:
   - Add API authentication (JWT)
   - Implement rate limiting
   - Validate all inputs
   - Sanitize user data
   - Set up HTTPS
"""
