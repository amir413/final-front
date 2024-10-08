import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Women from './components/Women';
import Men from './components/Men';
import Children from './components/Children';
import ItemDetail from './components/ItemDetail';

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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
