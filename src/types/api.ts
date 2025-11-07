/**
 * API Types for Travel Planner Backend Integration
 * 
 * These types define the contract between the frontend and backend.
 * Your backend should implement endpoints that accept and return data matching these types.
 */

// Request Types
export interface GenerateItineraryRequest {
  city: string;
  date: string; // ISO date string (e.g., "2025-03-15")
  minRating: number; // Minimum rating filter (e.g., 4.0, 4.5, 5.0)
  preferences?: {
    budget?: 'low' | 'medium' | 'high';
    interests?: string[]; // e.g., ["museums", "food", "nightlife"]
    pace?: 'relaxed' | 'moderate' | 'packed';
  };
}

// Response Types
export interface Activity {
  name: string;
  type: string; // e.g., "Breakfast Spot", "Attraction", "Lunch", "Experience"
  rating: number;
  price: string; // e.g., "€", "€€", "€€€", "Free"
  time: string; // e.g., "9:00 - 10:00 AM"
  description: string;
  redditInsight: string; // Insight from Reddit reviews
  image: string; // URL to the image
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  placeId?: string; // Google Places ID for reference
}

export interface TimeSlot {
  period: 'Morning' | 'Afternoon' | 'Evening';
  time: string; // e.g., "9:00 AM - 12:00 PM"
  activities: Activity[];
}

export interface Itinerary {
  city: string;
  date: string;
  minRating: number;
  slots: TimeSlot[];
  metadata?: {
    totalEstimatedCost?: string;
    totalDuration?: string;
    generatedAt?: string;
  };
}

export interface GenerateItineraryResponse {
  success: boolean;
  itinerary: Itinerary;
  message?: string;
}

// Error Response
export interface ApiError {
  success: false;
  error: string;
  code?: string;
  details?: any;
}

// Processing Status (for real-time updates)
export interface ProcessingStep {
  step: number;
  totalSteps: number;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

export interface ProcessingStatusResponse {
  jobId: string;
  status: 'processing' | 'completed' | 'failed';
  currentStep: ProcessingStep;
  progress: number; // 0-100
  itinerary?: Itinerary;
  error?: string;
}
