# Quick Start Guide

Get your travel planner running in 5 minutes!

## Frontend Only (No Backend Needed)

Perfect for testing and development.

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

The app will use **mock data** by default, so you can see how everything works without a backend.

✅ **That's it!** Open http://localhost:3000 and start planning trips!

---

## Frontend + Backend (Full Setup)

For production-ready setup with real AI.

### Part A: Backend Setup

#### 1. Create Backend Directory

```bash
mkdir backend
cd backend
```

#### 2. Copy Backend Example

Copy `backend_example.py` and `backend_requirements.txt` from the frontend project to your backend directory.

#### 3. Install Python Dependencies

```bash
pip install -r backend_requirements.txt
```

#### 4. Set Up API Keys

Create `.env` file in backend directory:

```env
# Google Places API
GOOGLE_PLACES_API_KEY=your_google_api_key_here

# Gemini AI API
GOOGLE_API_KEY=your_gemini_api_key_here

# Reddit API (for scraping)
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_secret
REDDIT_USER_AGENT=travel-planner-bot
```

**Getting API Keys:**
- **Google Places**: https://console.cloud.google.com/
- **Gemini AI**: https://makersuite.google.com/app/apikey
- **Reddit**: https://www.reddit.com/prefs/apps

#### 5. Start Backend Server

```bash
python backend_example.py
# Or: uvicorn backend_example:app --reload
```

Backend runs on: http://localhost:8000

Test it: http://localhost:8000/docs

### Part B: Frontend Setup

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Configure Backend URL

Edit `/services/api.ts` and update the API_BASE_URL constant:

```typescript
// Change this line to your backend URL
const API_BASE_URL = 'http://localhost:8000/api';
```

#### 3. Enable Real API

Edit `/components/PlannerDemo.tsx`:

```typescript
// Change this line:
const USE_MOCK_DATA = false;  // Set to false
```

#### 4. Start Frontend

```bash
npm run dev
```

Frontend runs on: http://localhost:3000

✅ **You're all set!** The frontend now talks to your backend.

---

## Testing the Integration

### 1. Test Backend Health

```bash
curl http://localhost:8000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

### 2. Test Itinerary Generation

```bash
curl -X POST http://localhost:8000/api/itinerary/generate \
  -H "Content-Type: application/json" \
  -d '{
    "city": "Paris",
    "date": "2025-03-15",
    "minRating": 4.0
  }'
```

### 3. Test Frontend

1. Open http://localhost:3000
2. Enter a city (e.g., "Paris")
3. Select a date
4. Click "Generate AI Itinerary"
5. Watch the AI process animation
6. Scroll down to see your itinerary

---

## Troubleshooting

### "Connection Refused" Error

**Problem**: Frontend can't reach backend

**Solution**:
```bash
# Make sure backend is running
cd backend
python backend_example.py

# Check the URL in /services/api.ts matches backend port
# Default: http://localhost:8000/api
```

### CORS Error

**Problem**: Browser blocks requests

**Solution**: Check `backend_example.py` has your frontend URL:

```python
allow_origins=[
    "http://localhost:3000",  # Your frontend URL
]
```

### Mock Data Still Showing

**Problem**: Frontend using mock data instead of API

**Solution**: In `/components/PlannerDemo.tsx`, set:

```typescript
const USE_MOCK_DATA = false;
```

### API Key Errors

**Problem**: "Invalid API key" errors

**Solution**:
1. Check `.env` file in backend directory
2. Verify API keys are correct
3. Make sure APIs are enabled in Google Cloud Console
4. Restart backend server after changing `.env`

---

## Next Steps

### Implement Real AI Logic

The `backend_example.py` has placeholder functions. Implement:

1. **Google Places Integration**
   ```python
   async def get_google_places(city: str, min_rating: float):
       gmaps = googlemaps.Client(key=os.getenv('GOOGLE_PLACES_API_KEY'))
       # Implement actual search
   ```

2. **Reddit Scraping**
   ```python
   async def get_reddit_insights(city: str, place_name: str):
       reddit = praw.Reddit(...)
       # Scrape real reviews
   ```

3. **LangChain AI Agent**
   ```python
   from langchain.agents import initialize_agent
   # Create AI agent with tools
   ```

### Add Features

- [ ] User authentication
- [ ] Save itineraries to database
- [ ] Share itineraries via link
- [ ] Export to PDF
- [ ] Multi-day itineraries
- [ ] Budget calculator
- [ ] Weather integration
- [ ] Maps integration

### Deploy to Production

**Frontend:**
- Vercel (recommended)
- Netlify
- Cloudflare Pages

**Backend:**
- Railway
- Render
- Google Cloud Run
- AWS EC2

---

## File Structure Reference

```
your-project/
├── frontend/
│   ├── components/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── .env
│
└── backend/
    ├── backend_example.py
    ├── requirements.txt
    └── .env
```

---

## Support

**Documentation:**
- [README.md](./README.md) - Full documentation
- [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) - API specs
- [DEPENDENCIES.md](./DEPENDENCIES.md) - Package info

**Need Help?**
- Check the type definitions in `/types/api.ts`
- Review the API service in `/services/api.ts`
- Look at mock data in `/utils/mockData.ts`

---

**Happy Coding! 🚀**
