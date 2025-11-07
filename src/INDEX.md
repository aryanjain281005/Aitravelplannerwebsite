# 📋 Project Index - Quick Navigation

Use this index to quickly find what you need.

## 🚀 Getting Started

Start here based on what you want to do:

| I want to... | Go to |
|--------------|-------|
| **Get running in 5 minutes** | [QUICK_START.md](./QUICK_START.md) |
| **Understand the project** | [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) |
| **Read full documentation** | [README.md](./README.md) |
| **Integrate with backend** | [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) |
| **Check dependencies** | [DEPENDENCIES.md](./DEPENDENCIES.md) |

## 📁 File Locations

### Documentation
- 📘 [README.md](./README.md) - Complete project guide
- 🏁 [QUICK_START.md](./QUICK_START.md) - Fast setup guide
- 🔌 [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) - API specs
- 📦 [DEPENDENCIES.md](./DEPENDENCIES.md) - Dependencies
- 📊 [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Overview
- 📋 [INDEX.md](./INDEX.md) - This file

### Frontend Code

#### Main App
- 🎯 `/App.tsx` - Main application component

#### Components (in `/components/`)
- 🏠 `Hero.tsx` - Landing hero section
- ⚡ `Features.tsx` - Features showcase
- 📝 `PlannerDemo.tsx` - Main planner form (API integrated)
- 📅 `SampleItinerary.tsx` - Itinerary display
- 🔧 `TechStack.tsx` - Tech stack section
- 👣 `Footer.tsx` - Footer component
- 🖱️ `CustomCursor.tsx` - Custom cursor with effects
- ⬇️ `ScrollIndicator.tsx` - Scroll indicator

#### UI Components (in `/components/ui/`)
40+ shadcn/ui components including:
- `button`, `card`, `input`, `label`
- `calendar`, `select`, `slider`, `badge`
- `dialog`, `popover`, `sheet`, `tabs`
- And many more...

#### API Integration (in `/`)
- 🔧 `/services/api.ts` - API client service
- 📘 `/types/api.ts` - TypeScript types
- 🎭 `/utils/mockData.ts` - Mock data

#### Styling
- 🎨 `/styles/globals.css` - Global styles + Tailwind

### Backend Reference
- 🐍 `/backend_example.py` - FastAPI backend template
- 📦 `/backend_requirements.txt` - Python packages

## 🎯 Common Tasks

### Task: Run Frontend Only (Development)
```bash
npm install
npm run dev
```
Uses mock data - no backend needed.

**Files involved:**
- `/components/PlannerDemo.tsx` (set `USE_MOCK_DATA = true`)
- `/utils/mockData.ts` (contains sample data)

---

### Task: Connect to Real Backend
1. **Set API URL** - Edit `/services/api.ts`:
   ```typescript
   const API_BASE_URL = 'http://localhost:8000/api';
   ```

2. **Enable real API** - Edit `/components/PlannerDemo.tsx`:
   ```typescript
   const USE_MOCK_DATA = false;
   ```

3. **Start backend** - See [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)

**Files involved:**
- `/services/api.ts` (makes API calls)
- `/components/PlannerDemo.tsx` (form component)
- `/types/api.ts` (type definitions)

---

### Task: Customize the Design

**Colors & Theme:**
- Edit `/styles/globals.css`

**Animations:**
- Edit individual components
- Adjust `transition` properties

**Layout:**
- Edit component files in `/components/`

---

### Task: Add New Features

1. **Create new component** - Add to `/components/`
2. **Add types** - Update `/types/api.ts`
3. **Update API service** - Modify `/services/api.ts`
4. **Import in App** - Add to `/App.tsx`

---

### Task: Implement Backend

1. **Copy backend files:**
   - `backend_example.py`
   - `backend_requirements.txt`

2. **Follow guide:**
   - [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)

3. **Required endpoints:**
   - `POST /api/itinerary/generate`
   - `GET /api/health` (optional)

---

### Task: Deploy to Production

**Frontend:**
1. Build: `npm run build`
2. Deploy to Vercel/Netlify/Cloudflare
3. Set environment variables

**Backend:**
1. Deploy to Railway/Render/Cloud Run
2. Set API keys in environment
3. Update frontend `.env` with production URL

---

## 🔍 Find Specific Information

### API Specifications
- **Request types**: `/types/api.ts` → `GenerateItineraryRequest`
- **Response types**: `/types/api.ts` → `GenerateItineraryResponse`
- **API endpoints**: [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)

### TypeScript Types
All types defined in: `/types/api.ts`

Key interfaces:
- `Itinerary` - Main itinerary structure
- `TimeSlot` - Morning/Afternoon/Evening
- `Activity` - Individual activity/place
- `GenerateItineraryRequest` - API request
- `GenerateItineraryResponse` - API response

### Component Props
Check each component file for props interface:
- `PlannerDemo` → `PlannerDemoProps`
- `SampleItinerary` → `SampleItineraryProps`

### Styling System
- **Tailwind config**: `/styles/globals.css` (inline theme)
- **Custom classes**: Also in `globals.css`
- **Component styles**: Inline with Tailwind classes

### Mock Data
Sample itinerary structure: `/utils/mockData.ts`

Use this as reference for backend response format.

## 📊 Architecture Overview

```
┌─────────────────────────────────────────┐
│           User Interface                │
│  (Hero, Features, PlannerDemo, etc.)    │
└──────────────────┬──────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────┐
│         API Service Layer               │
│         (/services/api.ts)              │
└──────────────────┬──────────────────────┘
                   │
        ┌──────────┴──────────┐
        ↓                     ↓
┌──────────────┐      ┌──────────────┐
│  Mock Data   │      │ Real Backend │
│ (Development)│      │ (Production) │
└──────────────┘      └──────────────┘
```

## 🎓 Learning Path

**New to the project?** Follow this order:

1. **Start** → [QUICK_START.md](./QUICK_START.md)
2. **Understand** → [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
3. **Explore** → [README.md](./README.md)
4. **Integrate** → [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)

**Want to modify something?** Find it in this index, then:
1. Locate the file
2. Read inline comments
3. Check type definitions
4. Make changes
5. Test

## 📞 Quick Reference

| Need | File |
|------|------|
| Change API URL | `/services/api.ts` (update API_BASE_URL) |
| Toggle mock data | `/components/PlannerDemo.tsx` |
| Add new API endpoint | `/services/api.ts` |
| Define new types | `/types/api.ts` |
| Modify sample data | `/utils/mockData.ts` |
| Change colors | `/styles/globals.css` |
| Add UI component | `/components/ui/` |
| Create new page section | `/components/` |

## ✅ Quick Checks

**Is everything working?**
- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts the app
- [ ] You can see the UI at http://localhost:3000
- [ ] Form accepts input
- [ ] Mock itinerary generates and displays

**Ready for backend?**
- [ ] Backend is running on port 8000
- [ ] Health check works: `curl http://localhost:8000/api/health`
- [ ] API_BASE_URL in `/services/api.ts` matches backend
- [ ] `USE_MOCK_DATA = false` in PlannerDemo.tsx
- [ ] Frontend can fetch from backend

**Ready to deploy?**
- [ ] Build completes: `npm run build`
- [ ] No TypeScript errors
- [ ] Environment variables configured
- [ ] Backend deployed and accessible
- [ ] CORS configured correctly

## 🆘 Need Help?

1. **UI not working?**
   - Check [QUICK_START.md](./QUICK_START.md) troubleshooting

2. **API integration issues?**
   - Read [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)
   - Check `/services/api.ts` comments

3. **Type errors?**
   - Review `/types/api.ts`
   - Ensure backend response matches types

4. **Styling issues?**
   - Check `/styles/globals.css`
   - Review Tailwind classes in components

5. **General questions?**
   - See [README.md](./README.md)
   - Check inline code comments

---

**Last Updated:** October 15, 2025

**Project Status:** ✅ Frontend Complete | 📝 Backend Template Provided

**Ready to:** Test, Develop, Integrate, Deploy
