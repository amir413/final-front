import { useState } from 'react';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Women from './components/Women';
import Men from './components/Men';
import Children from './components/Children';
import ItemDetail from './components/ItemDetail';
import axios from 'axios'
function App() {
  const [count, setCount] = useState(0);
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
