import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Footer from './components/Footer'; // Ensure correct casing for import
import Navbar from './components/navbar'; // Ensure correct casing for import
import Women from './components/Women';
import Men from './components/Men';
import Children from './components/Children';
import ItemDetail from './components/ItemDetail';
import Login from './components/signin'; // Import your Login component
import Register from './components/Register'; // Import your Register component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/children" element={<Children />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/login" element={<Login />} />       {/* Added Login Route */}
        <Route path="/register" element={<Register />} /> {/* Added Register Route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
