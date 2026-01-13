import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Attractions from './pages/Attractions';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import WaterWorld from './pages/WaterWorld';
import Terms from './pages/Terms';
import RideDetails from './pages/RideDetails';

const App = () => {
  return (
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
        <Route path="/ride/:id" element={<RideDetails />} />
      </Route>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
