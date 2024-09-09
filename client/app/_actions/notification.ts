import api from '../_utils/api';

export async function getNotifications() {
    try {
        const res = await api.post('/notification/getnotifications'); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};
