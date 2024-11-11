import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


function ItemDetail() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const [message, setMessage] = useState(""); // State for messages

    const username = localStorage.getItem('username');
    const modalRef = useRef(null); // Reference to the modal for outside click detection
    const navigate = useNavigate(); // To navigate to the login page

    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://final-back-rho.vercel.app/api/items'
        : 'http://localhost:3001/api/items';

    const wishlistBaseUrl = process.env.NODE_ENV === 'production'
        ? 'https://final-back-rho.vercel.app/api/wishlist'
        : 'http://localhost:3001/api/wishlist';

    const cartBaseUrl = process.env.NODE_ENV === 'production'
        ? 'https://final-back-rho.vercel.app/api/cart'
        : 'http://localhost:3001/api/cart';

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`${baseUrl}/${id}`);
                setItem(response.data);
                setSelectedImage(response.data.imageUrls[0]);
                await checkWishlist(response.data._id);
                await checkCart(response.data._id);
            } catch (err) {
                setError('Item not found or server error');
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [id]);

    const checkWishlist = async (itemId) => {
        try {
            const response = await axios.get(`${wishlistBaseUrl}/${username}`);
            const wishlistItems = response.data.items;
            setIsInWishlist(wishlistItems.some((wishlistItem) => wishlistItem.productId === itemId));
        } catch (err) {
            console.error('Error checking wishlist:', err);
        }
    };

    const checkCart = async (itemId) => {
        try {
            const response = await axios.get(`${cartBaseUrl}/${username}`);
            const cartItems = response.data.items;
            setIsInCart(cartItems.some((cartItem) => cartItem.productId === itemId));
        } catch (err) {
            console.error('Error checking cart:', err);
        }
    };

    const toggleWishlist = async () => {
        if (!username) {
            setMessage("Please log in to add items to your wishlist."); // Set message if not logged in
            return;
        }
        if (isInWishlist) {
            alert('Item is already in your wishlist. Remove it before adding again.');
            return;
        }
        try {
            await axios.post(`${wishlistBaseUrl}/add`, {
                username,
                itemId: item._id
            });
            setIsInWishlist(true);
            setMessage(""); // Clear message after adding
        } catch (err) {
            console.error('Error adding to wishlist:', err);
        }
    };

    const addToCart = async () => {
        if (!username) {
            setMessage("Please log in to add items to your cart."); // Set message if not logged in
            return;
        }
        if (isInCart) {
            alert('Item is already in your cart. Remove it before adding again.');
            return;
        }
        try {
            await axios.post(`${cartBaseUrl}/add`, {
                username,
                itemId: item._id,
            });
            setIsInCart(true);
            setMessage(""); // Clear message after adding
        } catch (err) {
            console.error('Error adding item to cart:', err);
        }
    };

    const openModal = () => {
        // Only open the modal on larger screens
        if (window.innerWidth > 768) {
            setIsModalOpen(true);
        }
    };

    const closeModal = () => setIsModalOpen(false);

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isModalOpen]);

    const handleThumbnailScroll = (e) => {
        e.currentTarget.scrollLeft += e.deltaY;
    };

    // Swipe functionality
    const [touchStartX, setTouchStartX] = useState(null);
    const [isSwiping, setIsSwiping] = useState(false);

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
        setIsSwiping(true);
    };

    const handleTouchMove = (e) => {
        if (!isSwiping || touchStartX === null) return;
        const touchX = e.touches[0].clientX;
        const deltaX = touchStartX - touchX;
        if (Math.abs(deltaX) > 30) { // Threshold for swipe
            // Scroll the thumbnail container
            e.currentTarget.scrollLeft += deltaX;
            setTouchStartX(touchX);
        }
    };

    const handleTouchEnd = () => {
        setIsSwiping(false);
        setTouchStartX(null);
    };

    if (loading) return <div className="text-center">Loading item details...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="flex flex-col md:flex-row p-6 max-w-4xl mx-auto bg-white text-black">
            <div className="w-full md:w-1/2 p-4">
                <img
                    src={selectedImage || 'https://via.placeholder.com/600'}
                    alt={item.title}
                    className="object-cover w-full h-full rounded cursor-pointer"
                    onClick={openModal}
                />

                {/* Thumbnail Images with Smooth Scroll and Touch Events */}
                <div 
                    className="flex space-x-2 overflow-hidden mt-4"
                    onWheel={handleThumbnailScroll}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ scrollbarWidth: 'none' }}
                >
                    {item.imageUrls.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Thumbnail ${index + 1}`}
                            onClick={() => setSelectedImage(url)}
                            className={`w-16 h-16 object-cover rounded cursor-pointer ${selectedImage === url ? 'border-2 border-black' : 'border'}`}
                        />
                    ))}
                </div>
            </div>
            <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-semibold mb-2">{item.title}</h1>
                    <p className="text-lg text-gray-700 mb-4">{item.description}</p>
                    <p className="text-gray-600 text-xl mb-4">{item.price} EGP</p>
                </div>
                <div className="flex space-x-4">
                    <button 
                        onClick={addToCart} 
                        className="bg-black text-white font-semibold py-3 px-6 hover:bg-gray-900 transition-all"
                    >
                        Add to Cart
                    </button>
                    <button 
                        onClick={toggleWishlist} 
                        className={`font-semibold py-3 px-4 border transition-all bg-white text-black border-black hover:bg-gray-100`}
                    >
                        {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                    </button>
                </div>
                {/* Message Area */}
                {message && <div className="text-red-500 mt-4">{message}</div>}
            </div>

            {/* Modal for large image view */}
            {isModalOpen && window.innerWidth > 768 && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                    <div ref={modalRef} className="relative bg-white p-4 rounded-lg max-w-3xl w-full flex">
                        {/* Left Thumbnail Column */}
                        <div className="flex flex-col">
                            {item.imageUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Modal Thumbnail ${index + 1}`}
                                    onClick={() => setSelectedImage(url)}
                                    className={`w-16 h-16 object-cover rounded cursor-pointer ${selectedImage === url ? 'border-2 border-black' : 'border'}`}
                                />
                            ))}
                        </div>
                        {/* Main Image */}
                        <img
                            src={selectedImage}
                            alt="Selected Item"
                            className="object-cover w-full h-full rounded ml-4"
                        />
                        <button onClick={closeModal} className="absolute top-2 right-2 text-black text-2xl">✖️</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemDetail;
