import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Men() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc');
    const [filter, setFilter] = useState('');
    const [priceRange, setPriceRange] = useState([0, 999]);
    const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu

    const fetchItems = async () => {
        try {
            const endpoint = window.location.hostname === 'localhost'
                ? 'https://final-back-rho.vercel.app/getItems'
                : 'https://final-back-rho.vercel.app/getItems';

            const response = await axios.get(endpoint);
            setItems(response.data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch items. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const sortedItems = () => {
        return [...items].sort((a, b) => {
            return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        });
    };

    const filteredItems = () => {
        return sortedItems().filter(item =>
            item.title.toLowerCase().includes(filter.toLowerCase()) &&
            item.price >= priceRange[0] && item.price <= priceRange[1]
        );
    };

    if (loading) {
        return <div className="text-center">Loading items...</div>;
    }

    const handlePriceRangeClick = () => {
        setPriceRange([100, 200]);
    };

    const handleScrollbarChange = (event) => {
        const value = Number(event.target.value);
        setPriceRange([0, value]);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Toggle the burger menu
    };

    return (
        <div className="p-6 w-full relative">
            {/* Navbar and Filter/Sort Controls */}
            <div className="flex justify-end mb-6"> {/* Aligning the button to the right */}
                {/* Burger Menu Button */}
                <button
                    className="p-2 border border-gray-300 rounded"
                    onClick={toggleMenu}
                >
                    {/* Burger Icon (turns into X when menu is open) */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 ${menuOpen ? 'hidden' : 'block'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                    {/* X Icon (when the menu is open) */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 ${menuOpen ? 'block' : 'hidden'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Sliding Filter and Sort Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-gray-100 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Filter & Sort</h2>
                        {/* X Icon to close the menu */}
                        <button onClick={toggleMenu} className="text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" stroke="black"></path>
</svg>

                        </button>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="mb-4">
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="border p-2 w-full"
                        >
                            <option value="asc">Price: Low to High</option>
                            <option value="desc">Price: High to Low</option>
                        </select>
                    </div>

                    {/* Price Filter */}
                    <button
                        onClick={handlePriceRangeClick}
                        className="bg-black text-white p-2 w-full rounded mb-4"
                    >
                        Price 100 - 200
                    </button>

                    <div className="mb-4">
                        <label className="mr-2">Max Price: {priceRange[1]}</label>
                        <input
                            type="range"
                            min="0"
                            max="9000"
                            step="1"
                            value={priceRange[1]}
                            onChange={handleScrollbarChange}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Cards Section */}
            <div className="flex-grow max-w-[1100px] mx-auto mt-6 z-20 relative">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {Array.isArray(filteredItems()) && filteredItems().length > 0 ? (
                        filteredItems().map(item => (
                            <Link
                                key={item._id}
                                to={`/item/${item._id}`}
                                className="overflow-hidden flex flex-col border border-gray-200 relative"
                            >
                                {/* Image Section */}
                                <div className="relative w-full aspect-w-16 aspect-h-9">
                                    <img
                                        src={Array.isArray(item.imageUrls) && item.imageUrls.length > 0
                                            ? item.imageUrls[0]
                                            : 'https://via.placeholder.com/150'}
                                        alt={item.title}
                                        className="object-cover w-full h-[35vh]"
                                    />
                                </div>

                                {/* Description Section */}
                                <div className="p-2 flex-grow text-left">
                                    <p className="mb-1">{item.title}</p>
                                    <p className="text-red-600 mb-1">{item.price} EGP</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div>No items found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
