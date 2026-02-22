import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import MainLayout from './layouts/MainLayout';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Attractions = lazy(() => import('./pages/Attractions'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const Booking = lazy(() => import('./pages/Booking'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const UserLogin = lazy(() => import('./pages/UserLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const FrontendAdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const FrontendAdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const WaterWorld = lazy(() => import('./pages/WaterWorld'));
const Terms = lazy(() => import('./pages/Terms'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Resort = lazy(() => import('./pages/Resort'));
const PicnicSpot = lazy(() => import('./pages/PicnicSpot'));
const Garden = lazy(() => import('./pages/Garden'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
  </div>
);

const App = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="book" element={<Booking />} />
          <Route path="about" element={<About />} />
          <Route path="attractions" element={<Attractions />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="park" element={<Home />} />
          <Route path="offers" element={<Home />} />
          <Route path="events" element={<Home />} />
          <Route path="/register" element={<UserLogin isRegister={true} />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          {/* New Content Pages */}
          <Route path="/waterworld" element={<WaterWorld />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/resort" element={<Resort />} />
          <Route path="/picnic-spot" element={<PicnicSpot />} />
          <Route path="/garden" element={<Garden />} />
        </Route>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* Frontend Admin Routes */}
        <Route path="/frontendadmin" element={<FrontendAdminLogin />} />
        <Route path="/frontendadmin/dashboard" element={<FrontendAdminDashboard />} />
      </Routes>
    </Suspense>
  );
}

export default App;
