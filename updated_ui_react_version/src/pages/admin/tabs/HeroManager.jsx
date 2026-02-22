import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HeroManager = () => {
    const [currentVideo, setCurrentVideo] = useState('');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [progress, setProgress] = useState(0);
    const apiUrl = '/backend/api/hero.php';

    useEffect(() => {
        fetchCurrentVideo();
    }, []);

    const fetchCurrentVideo = async () => {
        try {
            const response = await axios.get(apiUrl);
            if (response.data.video_url) {
                setCurrentVideo(response.data.video_url);
            }
        } catch (error) {
            console.error('Error fetching video:', error);
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = ['video/mp4', 'video/webm'];
        if (!allowedTypes.includes(file.type)) {
            setMessage('Invalid file type. Only MP4 and WebM allowed.');
            return;
        }

        // Validate file size (100MB max)
        if (file.size > 100 * 1024 * 1024) {
            setMessage('File too large. Maximum size is 100MB.');
            return;
        }

        const formData = new FormData();
        formData.append('video', file);

        setUploading(true);
        setMessage('');
        setProgress(0);

        try {
            const response = await axios.post(apiUrl, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percent);
                }
            });

            if (response.data.success) {
                setCurrentVideo(response.data.video_url);
                setMessage('✅ Video updated successfully!');
            } else {
                setMessage('❌ Upload failed: ' + (response.data.error || 'Unknown error'));
            }
        } catch (error) {
            const errMsg = error.response?.data?.error || error.message || 'Unknown error';
            setMessage('❌ Upload failed: ' + errMsg);
        } finally {
            setUploading(false);
            setProgress(0);
            e.target.value = ''; // Reset file input
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Manage Hero Video</h2>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-bold">Guidelines:</p>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                    <li>Recommended Resolution: 1920x1080 (Full HD)</li>
                    <li>Format: MP4 or WebM</li>
                    <li>Max Size: 50MB</li>
                </ul>
            </div>

            {currentVideo && (
                <div className="w-full max-w-2xl bg-black rounded-lg overflow-hidden shadow">
                    <p className="text-xs text-gray-500 p-2 bg-gray-100">Current Video:</p>
                    <video src={currentVideo} controls className="w-full" />
                </div>
            )}

            <div className="mt-4">
                <label className="block text-gray-700 font-bold mb-2">Upload New Video</label>
                <input
                    type="file"
                    accept="video/mp4,video/webm"
                    onChange={handleUpload}
                    disabled={uploading}
                    className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100
                        disabled:opacity-50"
                />
                {uploading && (
                    <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-blue-600 h-3 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="text-blue-600 mt-1 text-sm font-semibold">Uploading... {progress}%</p>
                    </div>
                )}
                {message && (
                    <p className={`mt-2 font-semibold ${message.includes('❌') ? 'text-red-600' : 'text-green-600'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default HeroManager;
