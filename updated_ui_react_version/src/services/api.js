import axios from 'axios';

// Configure base URL based on environment or proxy
const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor to add Token
api.interceptors.request.use(config => {
    const token = localStorage.getItem('hv_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const bookingService = {
    getPricing: async () => {
        try {
            const response = await api.get('?r=razorpay/api-booking/pricing');
            return response.data;
        } catch (error) {
            return {
                status: 'success',
                pricing: [
                    { id: 1, name: 'Adult Ticket', price: 900, type: 'Regular' },
                    { id: 2, name: 'Child Ticket', price: 700, type: 'below_10' },
                    { id: 3, name: 'Senior Citizen', price: 600, type: 'Senior' },
                ]
            };
        }
    },

    createBooking: async (bookingData) => {
        const response = await api.post('?r=razorpay/api-booking/create', bookingData);
        return response.data;
    },

    verifyPayment: async (paymentData) => {
        const response = await api.post('?r=razorpay/api-booking/verify', paymentData);
        return response.data;
    },

    // Auth Endpoints
    sendLoginOtp: async (phone) => api.post('?r=razorpay/auth/send-login-otp', { phone_number: phone }),
    verifyLoginOtp: async (phone, otp) => api.post('?r=razorpay/auth/verify-login-otp', { phone_number: phone, entered_otp: otp }),
    sendSignupOtp: async (phone) => api.post('?r=razorpay/auth/send-signup-otp', { phone_number: phone }),
    register: async (data) => api.post('?r=razorpay/auth/register', data),
    getProfile: async () => api.get('?r=razorpay/api-booking/profile')
};

export default api;
