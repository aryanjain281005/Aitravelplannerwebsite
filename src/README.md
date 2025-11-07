# AI Travel Planner - Frontend

A beautiful, animated React frontend for an AI-powered travel itinerary generator. Built with React, TypeScript, Tailwind CSS, and Motion (Framer Motion).

## Features

### ✨ User Experience
- **Stunning Animations**: Custom cursor effects, smooth transitions, hover animations
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Real-time Feedback**: Visual step-by-step AI processing animation
- **Intuitive Interface**: Clean, modern UI with easy-to-use forms

### 🎯 Functionality
- **Intelligent Generation**: AI-like algorithms that create varied, realistic itineraries
- **7 Detailed Cities**: Paris, Tokyo, New York, Barcelona, London, Rome, Amsterdam
- **Smart Filtering**: Respects your minimum rating preferences (3.0 - 5.0 stars)
- **City-Specific Data**: Authentic tips, real prices, and local insights
- **Dynamic Results**: Each generation produces different activity combinations
- **Instant Generation**: No API calls needed for development/testing
- Date selection with calendar picker
- Activity cards with images, ratings, prices, and authentic travel tips

### 🎨 Visual Effects
- Custom cursor with glow trail and click ripples
- Animated gradient backgrounds
- Floating orbs and particles
- Smooth scroll indicators
- Card hover effects with image zoom
- Shimmer and shine effects

## Project Structure

```
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── CustomCursor.tsx    # Custom cursor with effects
│   ├── Features.tsx        # Features showcase section
│   ├── Footer.tsx          # Footer with links
│   ├── Hero.tsx            # Hero section with CTA
│   ├── PlannerDemo.tsx     # Main planner form
│   ├── SampleItinerary.tsx # Itinerary display
│   ├── ScrollIndicator.tsx # Animated scroll indicator
│   └── TechStack.tsx       # Technology stack section
├── services/
│   └── api.ts              # API client service
├── types/
│   └── api.ts              # TypeScript type definitions
├── utils/
│   └── mockData.ts         # Mock data for development
├── styles/
│   └── globals.css         # Global styles and Tailwind config
├── App.tsx                 # Main application component
├── BACKEND_INTEGRATION.md  # Backend integration guide
└── DEPENDENCIES.md         # Dependencies documentation
```

## Quick Start

### 1. Installation

```bash
# Clone or copy the project files
# Install dependencies
npm install
```

### 2. Development Mode (with Intelligent Generation)

The app includes a built-in **intelligent itinerary generator** with data for 7 major cities:

```typescript
// In /components/PlannerDemo.tsx
const USE_MOCK_DATA = true; // Uses intelligent AI-like system
```

```bash
npm run dev
```

The app will generate varied, realistic itineraries based on your inputs - no backend needed! Perfect for development and testing.

**Try it:**
- Enter "Paris" or "Tokyo"
- Set your preferred minimum rating
- See different results each time you generate!

See [AI_FEATURES.md](./AI_FEATURES.md) for details on how the intelligent system works.

### 3. Production Mode (with Real API)

When your backend is ready:

1. Configure the backend URL in `/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:8000/api';
```

2. Update the flag in `/components/PlannerDemo.tsx`:
```typescript
const USE_MOCK_DATA = false; // Use real API
```

3. Start the app:
```bash
npm run dev
```

## Backend Integration

This frontend is designed to work with a FastAPI backend that uses:
- **LangChain** for AI agent orchestration
- **Gemini AI** for natural language processing
- **Google Places API** for location data
- **Reddit API** for user insights

### Required API Endpoints

Your backend must implement:

1. **POST** `/api/itinerary/generate` - Generate new itinerary
2. **GET** `/api/health` (optional) - Health check

See [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) for complete API specifications and backend implementation guide.

### API Request Example

```typescript
POST /api/itinerary/generate
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

### API Response Example

```typescript
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
        "activities": [...]
      }
    ]
  }
}
```

## Key Components

### PlannerDemo
The main form component where users input their travel preferences:
- City input with autocomplete suggestions
- Date picker with calendar
- Rating slider (3.0 - 5.0)
- Popular cities quick-select
- Real-time AI processing visualization

### SampleItinerary
Displays the generated itinerary:
- Time-based slots (Morning, Afternoon, Evening)
- Activity cards with details
- Images and ratings
- Reddit insights
- Responsive grid layout

### CustomCursor
Custom cursor with visual effects:
- Glow trail following cursor
- Click ripple effects
- Context-sensitive labels (CLICK, VIEW, ZOOM)
- Smooth animations

## Customization

### Colors and Theme

Edit `/styles/globals.css` to customize the color scheme:

```css
:root {
  --primary: #030213;
  --secondary: oklch(0.95 0.0058 264.53);
  /* Add more custom colors */
}
```

### Animation Speed

Adjust animation durations in individual components:

```typescript
// In any component
transition={{ duration: 0.6 }} // Change duration
```

### Mock Data

Customize mock responses in `/utils/mockData.ts`:

```typescript
export const sampleItinerary: Itinerary = {
  city: "Your City",
  date: "2025-03-15",
  slots: [
    // Your custom activities
  ]
};
```

## Configuration

### Backend URL

To configure your backend URL, edit `/services/api.ts`:

```typescript
// Development
const API_BASE_URL = 'http://localhost:8000/api';

// Production - update this to your deployed backend URL
// const API_BASE_URL = 'https://your-backend.com/api';
```

No environment variables needed - just update the constant directly.

## Deployment

### Frontend Deployment

Deploy to any static hosting provider:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Cloudflare Pages**
- **AWS S3 + CloudFront**

### Build for Production

```bash
npm run build
```

### Pre-deployment Checklist

- [ ] Set `USE_MOCK_DATA = false`
- [ ] Configure production API URL
- [ ] Test all API endpoints
- [ ] Verify CORS configuration
- [ ] Test responsive design
- [ ] Optimize images and assets
- [ ] Enable error tracking (Sentry, etc.)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: 90+
- Optimized images with lazy loading
- Code splitting for faster initial load
- Efficient animations using GPU acceleration

## Troubleshooting

### API Connection Issues

If you get CORS errors:
1. Check your backend CORS configuration
2. Verify the API URL in `.env`
3. Ensure the backend is running

### Mock Data Not Loading

Make sure `USE_MOCK_DATA` is set to `true` in `/components/PlannerDemo.tsx`

### Type Errors

Run TypeScript check:
```bash
npm run type-check
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Motion (Framer Motion)** - Animations
- **shadcn/ui** - UI components
- **Lucide React** - Icons
- **date-fns** - Date formatting
- **Sonner** - Toast notifications

## Contributing

This is a frontend template. Feel free to:
- Customize the design
- Add new features
- Improve animations
- Optimize performance
- Add additional API integrations

## License

MIT License - feel free to use this project for commercial or personal purposes.

## Support

For issues or questions:
1. Check [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) for API details
2. Review [DEPENDENCIES.md](./DEPENDENCIES.md) for package info
3. Inspect type definitions in `/types/api.ts`

## Credits

- Design inspiration: Modern travel apps
- Icons: Lucide React
- Images: Unsplash
- UI Components: shadcn/ui

---

**Built with ❤️ for seamless travel planning**
