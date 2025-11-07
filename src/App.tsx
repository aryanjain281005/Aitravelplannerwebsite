import { useState } from "react";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { PlannerDemo } from "./components/PlannerDemo";
import { SampleItinerary } from "./components/SampleItinerary";
import { TechStack } from "./components/TechStack";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import { Toaster } from "./components/ui/sonner";
import type { Itinerary } from "./types/api";

export default function App() {
  const [generatedItinerary, setGeneratedItinerary] = useState<Itinerary | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Toaster position="top-right" richColors />
      <CustomCursor />
      <Hero />
      <Features />
      <PlannerDemo onItineraryGenerated={setGeneratedItinerary} />
      <SampleItinerary itinerary={generatedItinerary} />
      <TechStack />
      <Footer />
    </div>
  );
}
