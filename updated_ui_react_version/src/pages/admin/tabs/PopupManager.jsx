import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Upload, Eye, EyeOff } from 'lucide-react';

const PopupManager = () => {
    const [popups, setPopups] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const apiUrl = '/backend/api/popup.php';

    useEffect(() => {
        fetchPopups();
    }, []);

    const fetchPopups = async () => {
        try {
            const response = await axios.post(apiUrl, { action: 'list' }, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (Array.isArray(response.data)) {
                setPopups(response.data);
            }
        } catch (error) {
            console.error('Error fetching popups:', error);
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        setMessage('');

        try {
            const response = await axios.post(apiUrl, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.data.success) {
                setMessage('✅ Popup image uploaded! It is now the active popup.');
                e.target.value = '';
                fetchPopups();
            } else {
                setMessage('❌ ' + (response.data.error || 'Upload failed'));
            }
        } catch (error) {
            setMessage('❌ ' + (error.response?.data?.error || 'Upload failed'));
        } finally {
            setUploading(false);
        }
    };

    const handleToggle = async (id, currentlyActive) => {
        try {
            await axios.post(apiUrl, {
                action: 'toggle',
                id,
                is_active: !currentlyActive
            }, { headers: { 'Content-Type': 'application/json' } });
            setMessage(currentlyActive ? '🔕 Popup deactivated' : '🔔 Popup activated');
            fetchPopups();
        } catch (error) {
            setMessage('❌ Toggle failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this popup image?')) return;
        try {
            await axios.delete(apiUrl, { data: { id } });
            setMessage('✅ Popup deleted');
            fetchPopups();
        } catch (error) {
            setMessage('❌ Delete failed');
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Manage Popup</h2>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                <p className="font-bold">How it works:</p>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                    <li>Upload an image — it becomes the active popup automatically</li>
                    <li>Only <strong>one popup</strong> can be active at a time</li>
                    <li>Toggle the eye icon to activate/deactivate</li>
                    <li>Visitors see the popup once when they open the website</li>
                </ul>
            </div>

            {message && (
                <p className={`font-semibold ${message.includes('❌') ? 'text-red-600' : 'text-green-600'}`}>
                    {message}
                </p>
            )}

            {/* Upload */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold mb-4">Upload New Popup Image</h3>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={uploading}
                    className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:bg-purple-600 file:text-white
                        hover:file:bg-purple-700
                        disabled:opacity-50"
                />
                {uploading && <p className="text-purple-600 mt-2 text-sm font-semibold">Uploading...</p>}
                <p className="text-xs text-gray-500 mt-2">Recommended: Square or portrait image, max 5MB</p>
            </div>

            {/* Popup List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {popups.map((popup) => (
                    <div key={popup.id} className={`relative group rounded-xl overflow-hidden shadow-lg bg-white border-2 ${popup.is_active == 1 ? 'border-green-500' : 'border-gray-200'}`}>
                        {popup.is_active == 1 && (
                            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                                ACTIVE
                            </div>
                        )}
                        <img
                            src={popup.image_url}
                            alt="Popup"
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-3 flex justify-between items-center">
                            <button
                                onClick={() => handleToggle(popup.id, popup.is_active == 1)}
                                className={`p-2 rounded-full ${popup.is_active == 1 ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                                title={popup.is_active == 1 ? 'Deactivate' : 'Activate'}
                            >
                                {popup.is_active == 1 ? <Eye size={22} /> : <EyeOff size={22} />}
                            </button>
                            <button
                                onClick={() => handleDelete(popup.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                                title="Delete"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {popups.length === 0 && <p className="text-gray-500 italic">No popup images uploaded yet.</p>}
        </div>
    );
};

export default PopupManager;
