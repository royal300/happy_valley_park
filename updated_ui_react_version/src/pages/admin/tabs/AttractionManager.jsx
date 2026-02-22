import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Upload } from 'lucide-react';

const AttractionManager = () => {
    const [attractions, setAttractions] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [uploading, setUploading] = useState(false);
    const apiUrl = '/backend/api/attractions.php';

    useEffect(() => {
        fetchAttractions();
    }, []);

    const fetchAttractions = async () => {
        try {
            const response = await axios.get(apiUrl);
            setAttractions(response.data);
        } catch (error) {
            console.error('Error fetching attractions:', error);
        }
    };

    const handleAddAttraction = async (e) => {
        e.preventDefault();
        const fileInput = document.getElementById('attractionImage');
        const file = fileInput.files[0];

        if (!file) {
            alert('Please select an image');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', 'Event Image');

        setUploading(true);
        try {
            const response = await axios.post(apiUrl, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.data.success) {
                setNewTitle('');
                fileInput.value = '';
                fetchAttractions();
            }
        } catch (error) {
            alert('Failed to add attraction');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this attraction?')) return;
        try {
            await axios.delete(apiUrl, { data: { id } });
            fetchAttractions();
        } catch (error) {
            alert('Failed to delete attraction');
        }
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">Manage Attractions</h2>

            {/* Add New Form */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold mb-4">Add New Attraction</h3>
                <form onSubmit={handleAddAttraction} className="flex flex-col gap-4 max-w-lg">
                    <input
                        id="attractionImage"
                        type="file"
                        accept="image/*"
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                    <button
                        type="submit"
                        disabled={uploading}
                        className="bg-green-600 text-white py-2 px-4 rounded font-bold hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                        {uploading ? 'Uploading...' : <><Upload size={18} /> Add Attraction</>}
                    </button>
                    <p className="text-xs text-gray-500">Recommended Size: 16:9 Aspect Ratio, Max 5MB</p>
                </form>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {attractions.map((attraction) => (
                    <div key={attraction.id} className="relative group rounded-xl overflow-hidden shadow-lg bg-white">
                        <img
                            src={attraction.image_url}
                            alt="Event"
                            className="w-full h-48 object-cover"
                        />
                        <button
                            onClick={() => handleDelete(attraction.id)}
                            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
            {attractions.length === 0 && <p className="text-gray-500 italic">No attractions uploaded yet.</p>}
        </div>
    );
};

export default AttractionManager;
