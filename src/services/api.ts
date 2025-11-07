/**
 * API Service for Travel Planner Backend
 * 
 * This service handles all communication with the backend API.
 * 
 * CONFIGURATION:
 * To change the backend URL, update the API_BASE_URL constant below:
 * - Development: 'http://localhost:8000/api'
 * - Production: 'https://your-backend-url.com/api'
 */

import type {
  GenerateItineraryRequest,
  GenerateItineraryResponse,
  ProcessingStatusResponse,
  ApiError,
  Itinerary
} from '../types/api';

// ============================================================================
// CONFIGURATION: Update this URL to point to your backend
// ============================================================================
const API_BASE_URL = 'http://localhost:8000/api';
// For production, change to: 'https://your-backend-url.com/api'

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Generate a new itinerary
   * POST /itinerary/generate
   */
  async generateItinerary(
    request: GenerateItineraryRequest
  ): Promise<GenerateItineraryResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/itinerary/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.error || 'Failed to generate itinerary');
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating itinerary:', error);
      throw error;
    }
  }

  /**
   * Check the status of an itinerary generation job
   * GET /itinerary/status/:jobId
   * (Optional: for async processing with job queue)
   */
  async checkJobStatus(jobId: string): Promise<ProcessingStatusResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/itinerary/status/${jobId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.error || 'Failed to check job status');
      }

      return await response.json();
    } catch (error) {
      console.error('Error checking job status:', error);
      throw error;
    }
  }

  /**
   * Get a previously generated itinerary
   * GET /itinerary/:id
   * (Optional: for saving/retrieving itineraries)
   */
  async getItinerary(id: string): Promise<Itinerary> {
    try {
      const response = await fetch(`${this.baseUrl}/itinerary/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.error || 'Failed to fetch itinerary');
      }

      const data = await response.json();
      return data.itinerary;
    } catch (error) {
      console.error('Error fetching itinerary:', error);
      throw error;
    }
  }

  /**
   * Health check endpoint
   * GET /health
   */
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Backend is not responding');
      }

      return await response.json();
    } catch (error) {
      console.error('Error checking backend health:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const apiService = new ApiService();

// Also export the class for testing or custom instances
export { ApiService };
