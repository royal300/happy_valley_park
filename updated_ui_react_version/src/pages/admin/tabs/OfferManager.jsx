import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Upload } from 'lucide-react';

const OfferManager = () => {
    const [offers, setOffers] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const apiUrl = '/backend/api/offers.php';

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const response = await axios.get(apiUrl);
            if (Array.isArray(response.data)) {
                setOffers(response.data);
            }
        } catch (error) {
            console.error('Error fetching offers:', error);
        }
    };

    const handleAddOffer = async (e) => {
        e.preventDefault();
        const fileInput = document.getElementById('offerImage');
        const file = fileInput?.files[0];

        if (!file) {
            setMessage('❌ Please select an image');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', 'Offer Banner');

        setUploading(true);
        setMessage('');

        try {
            const response = await axios.post(apiUrl, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.data.success) {
                setNewTitle('');
                fileInput.value = '';
                setMessage('✅ Offer banner added successfully!');
                fetchOffers();
            } else {
                setMessage('❌ ' + (response.data.error || 'Upload failed'));
            }
        } catch (error) {
            const errMsg = error.response?.data?.error || 'Failed to add offer';
            setMessage('❌ ' + errMsg);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this offer banner?')) return;
        try {
            await axios.delete(apiUrl, { data: { id } });
            setMessage('✅ Offer deleted');
            fetchOffers();
        } catch (error) {
            setMessage('❌ Failed to delete offer');
        }
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">Manage Offer Banners</h2>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                <p className="font-bold">Guidelines:</p>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                    <li>Recommended Aspect Ratio: 16:9</li>
                    <li>Format: JPG, PNG, or WebP</li>
                    <li>Max Size: 5MB</li>
                    <li>These images appear in the "Offer Zone" section on the homepage</li>
                </ul>
            </div>

            {message && (
                <p className={`font-semibold ${message.includes('❌') ? 'text-red-600' : 'text-green-600'}`}>
                    {message}
                </p>
            )}

            {/* Add New Form */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold mb-4">Add New Offer Banner</h3>
                <form onSubmit={handleAddOffer} className="flex flex-col gap-4 max-w-lg">
                    <input
                        id="offerImage"
                        type="file"
                        accept="image/*"
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-orange-600 file:text-white hover:file:bg-orange-700"
                    />
                    <button
                        type="submit"
                        disabled={uploading}
                        className="bg-orange-600 text-white py-2 px-4 rounded font-bold hover:bg-orange-700 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {uploading ? 'Uploading...' : <><Upload size={18} /> Add Offer Banner</>}
                    </button>
                </form>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer) => (
                    <div key={offer.id} className="relative group rounded-xl overflow-hidden shadow-lg bg-white">
                        <img
                            src={offer.image_url}
                            alt="Offer"
                            className="w-full h-48 object-cover"
                        />
                        <button
                            onClick={() => handleDelete(offer.id)}
                            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
            {offers.length === 0 && <p className="text-gray-500 italic">No offer banners uploaded yet.</p>}
        </div>
    );
};

export default OfferManager;
