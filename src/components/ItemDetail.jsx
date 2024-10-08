import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function ItemDetail() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Determine base URL based on the environment
    const baseUrl = process.env.NODE_ENV === 'production' 
        ? 'https://final-back-rho.vercel.app/api/items' 
        : 'http://localhost:3001/api/items';

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`${baseUrl}/${id}`); // Adjust this endpoint as needed
                setItem(response.data);
            } catch (err) {
                setError('Item not found or server error');
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [id]);

    if (loading) return <div className="text-center">Loading item details...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="flex flex-col md:flex-row p-6 max-w-4xl mx-auto bg-white text-black">
            {/* Image Section */}
            <div className="w-full md:w-1/2 p-4">
                <div className="relative w-full aspect-w-16 aspect-h-9">
                    <img
                        src={Array.isArray(item.imageUrls) && item.imageUrls.length > 0
                            ? item.imageUrls[0]
                            : 'https://via.placeholder.com/600'}
                        alt={item.title}
                        className="object-cover w-full h-full rounded"
                    />
                </div>
            </div>

            {/* Description Section */}
            <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-semibold mb-2">{item.title}</h1>
                    <p className="text-lg text-gray-700 mb-4">{item.description}</p>
                    <p className="text-red-600 text-xl mb-4">{item.price} EGP</p>
                </div>
                
                {/* Actions Section */}
                <div className="flex space-x-4">
                    <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors">
                        Add to Cart
                    </button>
                    <button className="bg-white border border-black text-black py-2 px-4 rounded hover:bg-gray-200 transition-colors">
                        Add to Wishlist
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;
