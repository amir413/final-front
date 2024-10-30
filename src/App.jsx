import React, { useState } from 'react'; // Import useState
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Footer from './components/Footer'; // Ensure correct casing for import
import Navbar from './components/Navbar'; // Ensure correct casing for import
import Women from './components/Women';
import Men from './components/Men';
import Children from './components/Children';
import ItemDetail from './components/ItemDetail';
import Register from './components/Register'; // Import your Register component
import SignIn from './components/SignIn'; // Consistent casing
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import AddToWishlist from './components/AddToWishlist';

function App() {
  const [userId, setUserId] = useState(''); // Define userId state

  return (
    <Router>
      <Navbar /> {/* Navbar will be rendered on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/children" element={<Children />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist userId={userId} />} /> {/* Pass userId as prop */}
        <Route path="/AddToWishlist" element={<AddToWishlist userId={userId} />} /> {/* Pass userId as prop */}
      </Routes>
      <Footer /> {/* Footer will be rendered on all pages */}
    </Router>
  );
}

export default App;
