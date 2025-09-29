import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedListings from './components/FeaturedListings';
import TrustSection from './components/TrustSection';
import WorkspaceSection from './components/WorkspaceSection';
import SustainabilitySection from './components/SustainabilitySection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FeaturedListings />
      <TrustSection />
      <WorkspaceSection />
      <SustainabilitySection />
      <Footer />
    </div>
  );
}

export default App;