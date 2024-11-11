import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Spinner from './Spinner'; // Import the Spinner component

// FilterMenu Component
const FilterMenu = ({ sortOrder, setSortOrder, handlePriceRangeClick, priceRange, handleScrollbarChange, menuOpen, toggleMenu }) => {
    return (
        <div className={`fixed top-0 right-0 h-full w-68 bg-gray-100 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Filter & Sort</h2>
                    <button onClick={toggleMenu} className="text-red-500" aria-label="Close filter menu">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M6 18L18 6M6 6l12 12" stroke="black"></path>
                        </svg>
                    </button>
                </div>

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

                <button
                    onClick={handlePriceRangeClick}
                    className="bg-black text-white p-2 w-full rounded mb-4"
                >
                    Price 100 - 200
                </button>

                <div className="mb-4">
                    <label className="mr-2 text-black">Max Price: {priceRange[1]}</label>
                    <input
                        type="range"
                        min="0"
                        max="9000"
                        step="1"
                        value={priceRange[1]}
                        onChange={handleScrollbarChange}
                        className="w-full range-black"
                    />
                </div>
            </div>
        </div>
    );
};

// Main Component for childern's Items
export default function childern() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc');
    const [filter, setFilter] = useState('');
    const [priceRange, setPriceRange] = useState([0, 999]);
    const [menuOpen, setMenuOpen] = useState(false);

    const fetchItems = async () => {
        try {
            const endpoint = window.location.hostname === 'localhost'
                ? 'http://localhost:3001/api/items?category=children'
                : 'https://final-back-rho.vercel.app/api/items?category=childern';

            const response = await axios.get(endpoint);
            const itemsWithActiveIndex = response.data.map(item => ({
                ...item,
                activeImageIndex: 0,
                swipeCount: 0
            }));
            setItems(itemsWithActiveIndex);
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
        return <Spinner />;  // Show the spinner while loading
    }

    if (error) {
        return <div className="text-center text-red-600">{error}</div>;
    }

    const handlePriceRangeClick = () => {
        setPriceRange([100, 200]);
    };

    const handleScrollbarChange = (event) => {
        const value = Number(event.target.value);
        setPriceRange([0, value]);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleImageChange = (index, delta) => {
        setItems(prevItems => {
            const newItems = [...prevItems];
            const totalImages = newItems[index].imageUrls.length;
            const currentIndex = newItems[index].activeImageIndex;

            newItems[index].swipeCount += 1;

            if (newItems[index].swipeCount > 2) {
                newItems[index].swipeCount = 0;
                newItems[index].activeImageIndex = (currentIndex + delta + totalImages) % totalImages;
            } else {
                newItems[index].activeImageIndex = (currentIndex + delta + totalImages) % totalImages;
            }

            return newItems;
        });
    };

    return (
        <div className="p-6 w-full relative">
            <div className="flex justify-end mb-6">
                <button
                    className="p-2 mr-4 border border-gray-300 rounded"
                    onClick={toggleMenu}
                    aria-label="Open filter menu"
                >
                    <FontAwesomeIcon icon={faFilter} className="text-black mr-1" /><span>Filter & Sort</span>
                </button>
            </div>

            <FilterMenu
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                handlePriceRangeClick={handlePriceRangeClick}
                priceRange={priceRange}
                handleScrollbarChange={handleScrollbarChange}
                menuOpen={menuOpen}
                toggleMenu={toggleMenu}
            />

            <div className="flex-grow max-w-[1100px] mx-auto mt-6 z-20 relative">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {Array.isArray(filteredItems()) && filteredItems().length > 0 ? (
                        filteredItems().map((item, index) => {
                            const activeImageIndex = item.activeImageIndex;
                            return (
                                <div key={item._id} className="overflow-hidden flex flex-col border border-gray-200 relative">
                                    <div className="relative w-full aspect-w-16 aspect-h-9">
                                        <img
                                            src={Array.isArray(item.imageUrls) && item.imageUrls.length > 0
                                                ? item.imageUrls[activeImageIndex]
                                                : 'https://via.placeholder.com/150'}
                                            alt={item.title}
                                            className="object-cover w-full h-[35vh]"
                                            loading="lazy"
                                        />
                                        {item.imageUrls.length > 1 && (
                                            <>
                                                <button
                                                    onClick={() => handleImageChange(index, -1)}
                                                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full"
                                                    aria-label="Previous image"
                                                >
                                                    &lt;
                                                </button>
                                                <button
                                                    onClick={() => handleImageChange(index, 1)}
                                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full"
                                                    aria-label="Next image"
                                                >
                                                    &gt;
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    <Link to={`/item/${item._id}`} className="p-2 flex-grow text-left">
                                        <p className="mb-1">{item.title}</p>
                                        <p className="text-gray-600 mb-1">{item.price} EGP</p>
                                    </Link>
                                </div>
                            );
                        })
                    ) : (
                        <div>No items found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
