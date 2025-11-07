/**
 * Quick test file to verify the intelligent generator works
 * You can run this to test the generator before using in the app
 */

import { generateIntelligentItinerary, isCitySupported, getCitiesInDatabase } from './utils/intelligentGenerator';

async function test() {
  console.log('Testing Intelligent Generator...\n');
  
  // Test 1: Get cities in database
  console.log('Cities with detailed data:', getCitiesInDatabase());
  console.log('');
  
  // Test 2: Check if cities are supported
  console.log('Is Paris supported?', isCitySupported('Paris')); // true
  console.log('Is Berlin supported?', isCitySupported('Berlin')); // false
  console.log('');
  
  // Test 3: Generate itinerary for Paris
  console.log('Generating itinerary for Paris...');
  const parisItinerary = await generateIntelligentItinerary('Paris', '2025-03-15', 4.5);
  console.log('Paris Itinerary:', JSON.stringify(parisItinerary, null, 2));
  console.log('');
  
  // Test 4: Generate itinerary for unknown city
  console.log('Generating itinerary for Berlin (fallback)...');
  const berlinItinerary = await generateIntelligentItinerary('Berlin', '2025-04-20', 4.0);
  console.log('Berlin Itinerary:', JSON.stringify(berlinItinerary, null, 2));
  console.log('');
  
  // Test 5: Generate multiple times for same city (should be different)
  console.log('Generating Tokyo itinerary twice (should be different)...');
  const tokyo1 = await generateIntelligentItinerary('Tokyo', '2025-05-10', 4.0);
  const tokyo2 = await generateIntelligentItinerary('Tokyo', '2025-05-10', 4.0);
  
  console.log('Tokyo 1 morning activities:', tokyo1.slots[0].activities.map(a => a.name));
  console.log('Tokyo 2 morning activities:', tokyo2.slots[0].activities.map(a => a.name));
  console.log('Are they different?', JSON.stringify(tokyo1) !== JSON.stringify(tokyo2));
}

// Run test
test().catch(console.error);
