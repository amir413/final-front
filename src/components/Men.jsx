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

    const fetchItems = async () => {
        try {
            const endpoint = window.location.hostname === 'localhost'
                ? 'http://localhost:3001/getItems'
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
            if (sortOrder === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
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

    return (
        <div className="flex p-6">
            <div className="flex flex-col ml-auto mr-6 w-[300px]">
                {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
                <div className="flex flex-col mb-4">
                    <select 
                        value={sortOrder} 
                        onChange={(e) => setSortOrder(e.target.value)} 
                        className="border p-2 mb-2"
                    >
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>
                <button 
                    onClick={handlePriceRangeClick} 
                    className="bg-blue-500 text-white p-2 rounded mb-4"
                >
                    Price 100 - 200
                </button>
                <div className="mb-4">
                    <label className="mr-2">Max Price: {priceRange[1]}</label>
                    <div className="w-[100px]">
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

            <div className="flex-grow max-w-[1330px] mx-auto">
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                    {Array.isArray(filteredItems()) && filteredItems().length > 0 ? (
                        filteredItems().map(item => (
                            <Link
                                key={item._id}
                                to={`/item/${item._id}`}
                                className="overflow-hidden flex flex-col border border-gray-200 max-w-[250px] mx-auto" // Set max width for card
                            >
                                {/* Image Section */}
                                <div className="relative w-full aspect-w-16 aspect-h-9">
                                    <img 
                                        src={Array.isArray(item.imageUrls) && item.imageUrls.length > 0 
                                            ? item.imageUrls[0] 
                                            : 'https://via.placeholder.com/150'} 
                                        alt={item.title}
                                        className="object-cover w-full h-[40vh]"
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
